-- FIX 2: SECURE SUBSCRIBERS TABLE POLICIES
-- Clean up duplicate and overly permissive policies

-- Remove all existing duplicate/overlapping policies
DROP POLICY IF EXISTS "secure_subscribers_insert_service" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_insert_service" ON public.subscribers;
DROP POLICY IF EXISTS "secure_subscribers_update_service" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_update_service" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_insert_authenticated" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_update_own" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_select_own" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_delete_own" ON public.subscribers;

-- Keep only the most secure policies and enhance them

-- Secure INSERT: Only specific edge functions can insert subscription data
CREATE POLICY "subscribers_secure_service_insert" 
ON public.subscribers 
FOR INSERT 
TO service_role
WITH CHECK (
    user_id IS NOT NULL 
    AND (
        -- Only allow from check-subscription or create-checkout functions
        current_setting('request.jwt.claims', true)::json->>'function_name' IN ('check-subscription', 'create-checkout')
    )
);

-- Secure UPDATE: Only specific edge functions can update subscription data  
CREATE POLICY "subscribers_secure_service_update" 
ON public.subscribers 
FOR UPDATE 
TO service_role
USING (user_id IS NOT NULL)
WITH CHECK (
    user_id IS NOT NULL 
    AND (
        -- Only allow from check-subscription function
        current_setting('request.jwt.claims', true)::json->>'function_name' = 'check-subscription'
    )
);

-- Add rate limiting for subscription operations
CREATE TABLE IF NOT EXISTS public.subscription_rate_limits (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    last_check TIMESTAMPTZ NOT NULL DEFAULT now(),
    check_count INTEGER DEFAULT 1,
    last_update TIMESTAMPTZ NOT NULL DEFAULT now(),
    update_count INTEGER DEFAULT 1,
    daily_reset TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '1 day')
);

-- Enable RLS on rate limiting table
ALTER TABLE public.subscription_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only service role can manage rate limits
CREATE POLICY "rate_limits_service_only" 
ON public.subscription_rate_limits 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Function to check and enforce rate limits
CREATE OR REPLACE FUNCTION public.check_subscription_rate_limit(target_user_id UUID, operation TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    current_count INTEGER;
    last_op TIMESTAMPTZ;
    daily_reset TIMESTAMPTZ;
BEGIN
    -- Get current rate limit data
    IF operation = 'check' THEN
        SELECT check_count, last_check, daily_reset 
        INTO current_count, last_op, daily_reset
        FROM public.subscription_rate_limits 
        WHERE user_id = target_user_id;
    ELSE
        SELECT update_count, last_update, daily_reset 
        INTO current_count, last_op, daily_reset
        FROM public.subscription_rate_limits 
        WHERE user_id = target_user_id;
    END IF;
    
    -- Reset if past daily reset time
    IF daily_reset IS NULL OR now() > daily_reset THEN
        INSERT INTO public.subscription_rate_limits (user_id, daily_reset) 
        VALUES (target_user_id, now() + INTERVAL '1 day')
        ON CONFLICT (user_id) DO UPDATE SET
            check_count = 1,
            update_count = 1,
            daily_reset = now() + INTERVAL '1 day';
        RETURN true;
    END IF;
    
    -- Check rate limits (max 20 checks, 5 updates per day)
    IF operation = 'check' AND (current_count IS NULL OR current_count < 20) THEN
        INSERT INTO public.subscription_rate_limits (user_id) 
        VALUES (target_user_id)
        ON CONFLICT (user_id) DO UPDATE SET
            check_count = COALESCE(subscription_rate_limits.check_count, 0) + 1,
            last_check = now();
        RETURN true;
    ELSIF operation = 'update' AND (current_count IS NULL OR current_count < 5) THEN
        INSERT INTO public.subscription_rate_limits (user_id) 
        VALUES (target_user_id)
        ON CONFLICT (user_id) DO UPDATE SET
            update_count = COALESCE(subscription_rate_limits.update_count, 0) + 1,
            last_update = now();
        RETURN true;
    END IF;
    
    -- Rate limit exceeded
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;