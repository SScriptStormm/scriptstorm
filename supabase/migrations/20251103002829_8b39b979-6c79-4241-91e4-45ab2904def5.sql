-- Create monthly usage tracking table
CREATE TABLE public.monthly_usage_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  month_year TEXT NOT NULL,
  articles_submitted INT DEFAULT 0,
  social_posts_submitted INT DEFAULT 0,
  product_descriptions_submitted INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, month_year)
);

-- Enable RLS
ALTER TABLE public.monthly_usage_tracking ENABLE ROW LEVEL SECURITY;

-- Users can view their own usage
CREATE POLICY "Users can view their own usage"
ON public.monthly_usage_tracking
FOR SELECT
USING (auth.uid() = user_id);

-- Service role can manage usage
CREATE POLICY "Service role can manage usage"
ON public.monthly_usage_tracking
FOR ALL
USING (auth.role() = 'service_role');

-- Function to check if user can submit more content
CREATE OR REPLACE FUNCTION public.can_submit_content(
  p_user_id UUID,
  p_content_type TEXT
)
RETURNS TABLE(can_submit BOOLEAN, current_count INT, monthly_limit INT, message TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_tier TEXT;
  v_current_month TEXT;
  v_current_count INT := 0;
  v_limit INT;
BEGIN
  -- Get user's subscription tier
  SELECT subscription_tier INTO v_tier
  FROM public.subscribers
  WHERE user_id = p_user_id;
  
  -- If no tier, return cannot submit
  IF v_tier IS NULL THEN
    RETURN QUERY SELECT FALSE, 0, 0, 'No active subscription found.'::TEXT;
    RETURN;
  END IF;
  
  -- Get current month
  v_current_month := TO_CHAR(NOW(), 'YYYY-MM');
  
  -- Determine limit based on tier and content type
  IF p_content_type IN ('article', 'blog_article') THEN
    v_limit := CASE v_tier
      WHEN 'starter' THEN 5
      WHEN 'growth' THEN 10
      WHEN 'scale' THEN 25
      WHEN 'authority' THEN 30
      WHEN 'dominance' THEN 50
      ELSE 5
    END;
    
    SELECT COALESCE(articles_submitted, 0) INTO v_current_count
    FROM public.monthly_usage_tracking
    WHERE user_id = p_user_id AND month_year = v_current_month;
    
  ELSIF p_content_type IN ('social_media', 'social_media_post') THEN
    v_limit := CASE v_tier
      WHEN 'starter' THEN 15
      WHEN 'growth' THEN 30
      WHEN 'scale' THEN 75
      WHEN 'authority' THEN 90
      WHEN 'dominance' THEN 150
      ELSE 15
    END;
    
    SELECT COALESCE(social_posts_submitted, 0) INTO v_current_count
    FROM public.monthly_usage_tracking
    WHERE user_id = p_user_id AND month_year = v_current_month;
    
  ELSIF p_content_type = 'product_description' THEN
    v_limit := CASE v_tier
      WHEN 'starter' THEN 5
      WHEN 'growth' THEN 10
      WHEN 'scale' THEN 25
      WHEN 'authority' THEN 30
      WHEN 'dominance' THEN 999999
      ELSE 5
    END;
    
    SELECT COALESCE(product_descriptions_submitted, 0) INTO v_current_count
    FROM public.monthly_usage_tracking
    WHERE user_id = p_user_id AND month_year = v_current_month;
  END IF;
  
  -- Check if can submit
  IF v_current_count < v_limit THEN
    RETURN QUERY SELECT 
      TRUE,
      COALESCE(v_current_count, 0),
      v_limit,
      'You can submit this content.'::TEXT;
  ELSE
    RETURN QUERY SELECT 
      FALSE,
      COALESCE(v_current_count, 0),
      v_limit,
      FORMAT('Monthly limit reached. You have used %s/%s %s this month. Upgrade to submit more.', 
        v_current_count, v_limit, p_content_type)::TEXT;
  END IF;
END;
$$;

-- Trigger function to increment usage when article is created
CREATE OR REPLACE FUNCTION public.increment_usage_counter()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_month TEXT;
BEGIN
  v_month := TO_CHAR(NOW(), 'YYYY-MM');
  
  -- Insert or update usage tracking
  IF NEW.content_type IN ('article', 'blog_article') OR NEW.content_type IS NULL THEN
    INSERT INTO public.monthly_usage_tracking (user_id, month_year, articles_submitted)
    VALUES (NEW.user_id, v_month, 1)
    ON CONFLICT (user_id, month_year) 
    DO UPDATE SET 
      articles_submitted = monthly_usage_tracking.articles_submitted + 1,
      updated_at = NOW();
      
  ELSIF NEW.content_type IN ('social_media', 'social_media_post') THEN
    INSERT INTO public.monthly_usage_tracking (user_id, month_year, social_posts_submitted)
    VALUES (NEW.user_id, v_month, 1)
    ON CONFLICT (user_id, month_year) 
    DO UPDATE SET 
      social_posts_submitted = monthly_usage_tracking.social_posts_submitted + 1,
      updated_at = NOW();
      
  ELSIF NEW.content_type = 'product_description' THEN
    INSERT INTO public.monthly_usage_tracking (user_id, month_year, product_descriptions_submitted)
    VALUES (NEW.user_id, v_month, 1)
    ON CONFLICT (user_id, month_year) 
    DO UPDATE SET 
      product_descriptions_submitted = monthly_usage_tracking.product_descriptions_submitted + 1,
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Attach trigger to articles table
CREATE TRIGGER track_monthly_usage
  AFTER INSERT ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_usage_counter();