-- Fix the can_submit_content function to bypass RLS properly
CREATE OR REPLACE FUNCTION public.can_submit_content(p_user_id uuid, p_content_type text)
RETURNS TABLE(can_submit boolean, current_count integer, monthly_limit integer, message text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_tier TEXT;
  v_current_month TEXT;
  v_current_count INT := 0;
  v_limit INT;
BEGIN
  -- Get user's subscription tier (with explicit schema reference)
  SELECT s.subscription_tier INTO v_tier
  FROM public.subscribers s
  WHERE s.user_id = p_user_id 
    AND s.subscribed = true;
  
  -- If no active subscription, return cannot submit
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
  
  -- Initialize to 0 if no record exists
  v_current_count := COALESCE(v_current_count, 0);
  
  -- Check if can submit
  IF v_current_count < v_limit THEN
    RETURN QUERY SELECT 
      TRUE,
      v_current_count,
      v_limit,
      'You can submit this content.'::TEXT;
  ELSE
    RETURN QUERY SELECT 
      FALSE,
      v_current_count,
      v_limit,
      FORMAT('Monthly limit reached. You have used %s/%s %s this month. Upgrade to submit more.', 
        v_current_count, v_limit, p_content_type)::TEXT;
  END IF;
END;
$$;