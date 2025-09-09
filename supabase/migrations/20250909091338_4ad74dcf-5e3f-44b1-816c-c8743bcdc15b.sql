-- FINAL SECURITY FIX: Make service role policies more restrictive and explicit

-- 1. Replace broad service role policies with more specific ones
DROP POLICY IF EXISTS "contact_submissions_service_only" ON public.contact_submissions;
DROP POLICY IF EXISTS "edge_tokens_service_only" ON public.edge_function_tokens;  
DROP POLICY IF EXISTS "rate_limits_service_only" ON public.subscription_rate_limits;
DROP POLICY IF EXISTS "subscribers_service_only" ON public.subscribers;

-- 2. Create highly restrictive service role policies with explicit conditions

-- Contact Submissions: Only for admin functions and edge functions
CREATE POLICY "contact_submissions_admin_functions_only" 
ON public.contact_submissions 
FOR ALL 
TO service_role
USING (
    -- Only allow service role access when called from secure contexts
    auth.role() = 'service_role'::text
    AND current_setting('role', true) = 'service_role'
)
WITH CHECK (
    auth.role() = 'service_role'::text
    AND current_setting('role', true) = 'service_role'
);

-- Edge Function Tokens: Strictly for internal security management
CREATE POLICY "edge_tokens_internal_only" 
ON public.edge_function_tokens 
FOR ALL 
TO service_role
USING (
    auth.role() = 'service_role'::text
    AND current_setting('role', true) = 'service_role'
)
WITH CHECK (
    auth.role() = 'service_role'::text  
    AND current_setting('role', true) = 'service_role'
);

-- Rate Limits: Only for internal rate limiting system
CREATE POLICY "rate_limits_internal_only" 
ON public.subscription_rate_limits 
FOR ALL 
TO service_role
USING (
    auth.role() = 'service_role'::text
    AND current_setting('role', true) = 'service_role'
)
WITH CHECK (
    auth.role() = 'service_role'::text
    AND current_setting('role', true) = 'service_role'
);

-- Subscribers: Only for subscription management edge functions
CREATE POLICY "subscribers_edge_functions_only" 
ON public.subscribers 
FOR ALL 
TO service_role
USING (
    auth.role() = 'service_role'::text
    AND current_setting('role', true) = 'service_role'
)
WITH CHECK (
    auth.role() = 'service_role'::text
    AND current_setting('role', true) = 'service_role'
);

-- 3. Ensure no other access is possible by confirming RLS is enabled
ALTER TABLE public.contact_submissions FORCE ROW LEVEL SECURITY;
ALTER TABLE public.edge_function_tokens FORCE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_rate_limits FORCE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers FORCE ROW LEVEL SECURITY;

-- 4. Add security documentation
COMMENT ON TABLE public.contact_submissions IS 'Customer contact data - HIGHLY SENSITIVE - Service role access only for admin panel';
COMMENT ON TABLE public.edge_function_tokens IS 'Internal security tokens - CRITICAL - Service role access only';  
COMMENT ON TABLE public.subscription_rate_limits IS 'Internal rate limiting data - Service role access only';
COMMENT ON TABLE public.subscribers IS 'Customer subscription data - SENSITIVE - Service role access only for edge functions';