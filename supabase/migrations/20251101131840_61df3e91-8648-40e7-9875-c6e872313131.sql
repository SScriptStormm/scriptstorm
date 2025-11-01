-- Phase 2: Add revision tracking columns to articles table
ALTER TABLE public.articles 
ADD COLUMN revisions_requested INTEGER DEFAULT 0 NOT NULL,
ADD COLUMN revisions_allowed INTEGER;

-- Phase 3: Add word count validation function
CREATE OR REPLACE FUNCTION public.get_tier_word_count_range(p_subscription_tier TEXT)
RETURNS TABLE(min_words INTEGER, max_words INTEGER)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN p_subscription_tier IN ('starter', 'growth') THEN 1500
      WHEN p_subscription_tier IN ('scale', 'authority') THEN 2000
      WHEN p_subscription_tier = 'dominance' THEN 2000
      ELSE 1500
    END AS min_words,
    CASE 
      WHEN p_subscription_tier IN ('starter', 'growth') THEN 2000
      WHEN p_subscription_tier IN ('scale', 'authority') THEN 3000
      WHEN p_subscription_tier = 'dominance' THEN 5000
      ELSE 2000
    END AS max_words;
END;
$$;

-- Phase 3: Add trigger to validate word count for blog articles
CREATE OR REPLACE FUNCTION public.validate_article_word_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_tier TEXT;
  min_words INTEGER;
  max_words INTEGER;
BEGIN
  -- Only validate blog articles
  IF NEW.content_type != 'blog_article' THEN
    RETURN NEW;
  END IF;

  -- Get user's subscription tier
  SELECT subscription_tier INTO user_tier
  FROM public.subscribers
  WHERE user_id = NEW.user_id;

  -- If no tier found, reject (user must have subscription)
  IF user_tier IS NULL THEN
    RAISE EXCEPTION 'No subscription found for user';
  END IF;

  -- Get allowed word count range for tier
  SELECT * INTO min_words, max_words
  FROM public.get_tier_word_count_range(user_tier);

  -- Validate word count is within range
  IF NEW.word_count < min_words OR NEW.word_count > max_words THEN
    RAISE EXCEPTION 'Word count % is outside allowed range for % tier (%-% words)', 
      NEW.word_count, user_tier, min_words, max_words;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for word count validation
DROP TRIGGER IF EXISTS trigger_validate_article_word_count ON public.articles;
CREATE TRIGGER trigger_validate_article_word_count
  BEFORE INSERT OR UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_article_word_count();

-- Phase 4: Add delivery tracking columns
ALTER TABLE public.articles
ADD COLUMN delivery_timeframe INTEGER, -- hours (24 or 12)
ADD COLUMN delivery_deadline TIMESTAMP WITH TIME ZONE;

-- Phase 4: Create function to auto-set delivery deadline
CREATE OR REPLACE FUNCTION public.set_article_delivery_deadline()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_tier TEXT;
  timeframe_hours INTEGER;
BEGIN
  -- Only set on insert, not update
  IF TG_OP != 'INSERT' THEN
    RETURN NEW;
  END IF;

  -- Get user's subscription tier
  SELECT subscription_tier INTO user_tier
  FROM public.subscribers
  WHERE user_id = NEW.user_id;

  -- Set timeframe based on tier (12 hours for Dominance, 24 for all others)
  IF user_tier = 'dominance' THEN
    timeframe_hours := 12;
  ELSE
    timeframe_hours := 24;
  END IF;

  -- Set delivery timeframe and calculate deadline
  NEW.delivery_timeframe := timeframe_hours;
  NEW.delivery_deadline := NEW.created_at + (timeframe_hours || ' hours')::INTERVAL;

  RETURN NEW;
END;
$$;

-- Create trigger for auto-setting delivery deadline
DROP TRIGGER IF EXISTS trigger_set_article_delivery_deadline ON public.articles;
CREATE TRIGGER trigger_set_article_delivery_deadline
  BEFORE INSERT ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_article_delivery_deadline();

-- Phase 2: Create content_revisions table for tracking revision requests
CREATE TABLE IF NOT EXISTS public.content_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  revision_notes TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending',
  admin_response TEXT
);

-- Enable RLS on content_revisions
ALTER TABLE public.content_revisions ENABLE ROW LEVEL SECURITY;

-- RLS policies for content_revisions
CREATE POLICY "Users can view their own revision requests"
ON public.content_revisions
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own revision requests"
ON public.content_revisions
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view and update all revision requests
CREATE POLICY "Admins can manage all revision requests"
ON public.content_revisions
FOR ALL
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

-- Phase 2: Create function to set revisions_allowed based on tier
CREATE OR REPLACE FUNCTION public.set_article_revisions_allowed()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_tier TEXT;
BEGIN
  -- Only set on insert if not already set
  IF TG_OP != 'INSERT' OR NEW.revisions_allowed IS NOT NULL THEN
    RETURN NEW;
  END IF;

  -- Get user's subscription tier
  SELECT subscription_tier INTO user_tier
  FROM public.subscribers
  WHERE user_id = NEW.user_id;

  -- Set revisions_allowed based on tier
  NEW.revisions_allowed := CASE user_tier
    WHEN 'starter' THEN 1
    WHEN 'growth' THEN 2
    WHEN 'scale' THEN 2
    WHEN 'authority' THEN 3
    WHEN 'dominance' THEN 999999 -- unlimited
    ELSE 1
  END;

  RETURN NEW;
END;
$$;

-- Create trigger for auto-setting revisions_allowed
DROP TRIGGER IF EXISTS trigger_set_article_revisions_allowed ON public.articles;
CREATE TRIGGER trigger_set_article_revisions_allowed
  BEFORE INSERT ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_article_revisions_allowed();