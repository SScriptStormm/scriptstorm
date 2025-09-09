-- STEP 2: Create MAXIMUM SECURITY policies

-- 1. CONTACT SUBMISSIONS - Completely locked down
-- Block ALL authenticated users from direct access
CREATE POLICY "contact_submissions_deny_all_authenticated" 
ON public.contact_submissions 
FOR ALL 
TO authenticated
USING (false)
WITH CHECK (false);

-- Allow service role only (for edge functions and admin panel)
CREATE POLICY "contact_submissions_service_role_only" 
ON public.contact_submissions 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 2. EDGE FUNCTION TOKENS - Completely locked down  
CREATE POLICY "edge_tokens_deny_all_authenticated" 
ON public.edge_function_tokens 
FOR ALL 
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "edge_tokens_service_role_only" 
ON public.edge_function_tokens 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 3. SUBSCRIPTION RATE LIMITS - Completely locked down
CREATE POLICY "rate_limits_deny_all_authenticated" 
ON public.subscription_rate_limits 
FOR ALL 
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "rate_limits_service_role_only" 
ON public.subscription_rate_limits 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 4. Create secure admin functions for contact form access
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
    -- Verify admin status
    IF NOT public.current_user_is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: Admin access required';
    END IF;
    
    -- Use service role privileges to access data
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

CREATE OR REPLACE FUNCTION public.update_contact_submission_admin(
    p_id UUID,
    p_processed BOOLEAN
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Verify admin status
    IF NOT public.current_user_is_admin() THEN
        RAISE EXCEPTION 'Unauthorized: Admin access required';
    END IF;
    
    -- Update using service role privileges
    UPDATE public.contact_submissions 
    SET processed = p_processed 
    WHERE id = p_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute to authenticated users (admin check is inside functions)
GRANT EXECUTE ON FUNCTION public.get_contact_submissions_admin TO authenticated;
GRANT EXECUTE ON FUNCTION public.update_contact_submission_admin TO authenticated;