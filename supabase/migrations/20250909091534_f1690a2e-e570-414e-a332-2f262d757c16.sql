-- FINAL SECURITY LOCKDOWN - Block anonymous access completely

-- 1. Add explicit denial policies for anonymous users on contact_submissions
CREATE POLICY "contact_submissions_deny_anonymous" 
ON public.contact_submissions 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- 2. Add explicit denial policies for anonymous users on subscribers  
CREATE POLICY "subscribers_deny_anonymous" 
ON public.subscribers 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- 3. Add explicit denial policies for anonymous users on edge_function_tokens
CREATE POLICY "edge_tokens_deny_anonymous" 
ON public.edge_function_tokens 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- 4. Add explicit denial policies for anonymous users on subscription_rate_limits
CREATE POLICY "rate_limits_deny_anonymous" 
ON public.subscription_rate_limits 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- 5. Ensure no public access to sensitive functions
REVOKE ALL ON FUNCTION public.validate_edge_function_request FROM public;
REVOKE ALL ON FUNCTION public.check_subscription_rate_limit FROM public;
REVOKE ALL ON FUNCTION public.insert_contact_submission FROM public;

-- 6. Add security validation to all admin functions
CREATE OR REPLACE FUNCTION public.get_contact_submissions_admin()
RETURNS TABLE(
    id UUID,
    name TEXT,
    email TEXT,
    company TEXT,
    service TEXT,
    project_details TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ,
    processed BOOLEAN
) AS $$
BEGIN
    -- Double check: Must be authenticated AND admin
    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'Authentication required';
    END IF;
    
    IF NOT public.current_user_is_admin() THEN
        RAISE EXCEPTION 'Admin privileges required for contact submissions access';
    END IF;
    
    -- Return secure data
    RETURN QUERY
    SELECT 
        c.id,
        c.name,
        c.email,
        c.company,
        c.service,
        c.project_details,
        c.ip_address,
        c.created_at,
        c.processed
    FROM public.contact_submissions c
    ORDER BY c.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 7. Verify no one can bypass RLS
ALTER TABLE public.contact_submissions FORCE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers FORCE ROW LEVEL SECURITY; 
ALTER TABLE public.edge_function_tokens FORCE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_rate_limits FORCE ROW LEVEL SECURITY;