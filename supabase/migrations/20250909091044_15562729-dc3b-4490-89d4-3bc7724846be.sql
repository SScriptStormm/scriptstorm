-- COMPREHENSIVE SECURITY FIX FOR ALL VULNERABILITIES

-- 1. FIX CONTACT SUBMISSIONS - Make completely secure without admin dependency
DROP POLICY IF EXISTS "contact_submissions_admin_select" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_admin_update" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_admin_delete" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_secure_insert" ON public.contact_submissions;

-- Create ultra-secure policies - NO direct access, only through admin interface
CREATE POLICY "contact_submissions_no_select" 
ON public.contact_submissions 
FOR SELECT 
TO authenticated
USING (false); -- Block all direct SELECT access

CREATE POLICY "contact_submissions_no_insert" 
ON public.contact_submissions 
FOR INSERT 
TO authenticated
WITH CHECK (false); -- Block all direct INSERT access

CREATE POLICY "contact_submissions_no_update" 
ON public.contact_submissions 
FOR UPDATE 
TO authenticated
USING (false); -- Block all direct UPDATE access

CREATE POLICY "contact_submissions_no_delete" 
ON public.contact_submissions 
FOR DELETE 
TO authenticated
USING (false); -- Block all direct DELETE access

-- Only service role can access (for admin panel and edge functions)
CREATE POLICY "contact_submissions_service_only" 
ON public.contact_submissions 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 2. FIX EDGE FUNCTION TOKENS TABLE
DROP POLICY IF EXISTS "edge_tokens_service_only" ON public.edge_function_tokens;

CREATE POLICY "edge_tokens_no_access" 
ON public.edge_function_tokens 
FOR ALL 
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "edge_tokens_service_only" 
ON public.edge_function_tokens 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 3. FIX SUBSCRIPTION RATE LIMITS TABLE  
DROP POLICY IF EXISTS "rate_limits_service_only" ON public.subscription_rate_limits;

CREATE POLICY "rate_limits_no_access" 
ON public.subscription_rate_limits 
FOR ALL 
TO authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "rate_limits_service_only" 
ON public.subscription_rate_limits 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 4. FIX SUBSCRIBERS TABLE - Ensure proper user isolation
DROP POLICY IF EXISTS "subscribers_secure_service_insert" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_secure_service_update" ON public.subscribers;

-- Users can only access their own subscription data
-- Service role can manage all (for edge functions)
CREATE POLICY "subscribers_service_only" 
ON public.subscribers 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- 5. Create secure admin functions that bypass RLS safely
CREATE OR REPLACE FUNCTION public.admin_get_contact_submissions()
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
    -- Only return data if current user is admin
    IF NOT public.current_user_is_admin() THEN
        RAISE EXCEPTION 'Access denied. Admin privileges required.';
    END IF;
    
    RETURN QUERY
    SELECT 
        cs.id,
        cs.name,
        cs.email,
        cs.company,
        cs.service,
        cs.project_details,
        cs.ip_address,
        cs.created_at,
        cs.processed
    FROM public.contact_submissions cs
    ORDER BY cs.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.admin_update_contact_submission(
    submission_id UUID,
    mark_processed BOOLEAN
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Only allow if current user is admin
    IF NOT public.current_user_is_admin() THEN
        RAISE EXCEPTION 'Access denied. Admin privileges required.';
    END IF;
    
    UPDATE public.contact_submissions 
    SET processed = mark_processed 
    WHERE id = submission_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant permissions appropriately
GRANT EXECUTE ON FUNCTION public.admin_get_contact_submissions TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_update_contact_submission TO authenticated;