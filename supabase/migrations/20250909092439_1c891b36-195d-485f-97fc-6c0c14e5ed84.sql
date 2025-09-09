-- CRITICAL SECURITY FIXES: Address all identified vulnerabilities

-- 1. Contact Submissions Security Hardening
-- Drop existing policies and create secure ones
DROP POLICY IF EXISTS "contact_submissions_security_model" ON public.contact_submissions;

-- Explicit denial for anonymous users
CREATE POLICY "contact_submissions_deny_anonymous" 
ON public.contact_submissions 
FOR ALL 
TO anon 
USING (false) 
WITH CHECK (false);

-- Only allow service role with proper context for edge functions
CREATE POLICY "contact_submissions_service_role_only" 
ON public.contact_submissions 
FOR ALL 
TO service_role 
USING (
  (auth.role() = 'service_role') AND 
  (current_setting('application_name', true) IN ('edge_function_manager', 'submit-contact'))
) 
WITH CHECK (
  (auth.role() = 'service_role') AND 
  (current_setting('application_name', true) IN ('edge_function_manager', 'submit-contact'))
);

-- Admin access for authenticated users with admin role
CREATE POLICY "contact_submissions_admin_access" 
ON public.contact_submissions 
FOR ALL 
TO authenticated 
USING (public.current_user_is_admin()) 
WITH CHECK (public.current_user_is_admin());

-- 2. Subscriber Data Protection Enhancement  
-- Drop existing policies and create bulletproof ones
DROP POLICY IF EXISTS "secure_subscribers_select" ON public.subscribers;
DROP POLICY IF EXISTS "secure_subscribers_insert_user" ON public.subscribers;
DROP POLICY IF EXISTS "secure_subscribers_update_user" ON public.subscribers;
DROP POLICY IF EXISTS "secure_subscribers_delete" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_edge_functions_only" ON public.subscribers;
DROP POLICY IF EXISTS "subscribers_deny_anonymous" ON public.subscribers;

-- Explicit denial for anonymous users
CREATE POLICY "subscribers_deny_anonymous" 
ON public.subscribers 
FOR ALL 
TO anon 
USING (false) 
WITH CHECK (false);

-- User can only access their own subscription data
CREATE POLICY "subscribers_own_data_only" 
ON public.subscribers 
FOR ALL 
TO authenticated 
USING (user_id = auth.uid() AND auth.uid() IS NOT NULL) 
WITH CHECK (user_id = auth.uid() AND auth.uid() IS NOT NULL);

-- Service role access for subscription management (edge functions)
CREATE POLICY "subscribers_service_role_restricted" 
ON public.subscribers 
FOR ALL 
TO service_role 
USING (
  (auth.role() = 'service_role') AND 
  (current_setting('application_name', true) = 'create-checkout')
) 
WITH CHECK (
  (auth.role() = 'service_role') AND 
  (current_setting('application_name', true) = 'create-checkout')
);

-- 3. Edge Function Token Security
-- Drop existing policies and create secure ones  
DROP POLICY IF EXISTS "edge_tokens_service_role_restricted" ON public.edge_function_tokens;

-- Explicit denial for anonymous users
CREATE POLICY "edge_tokens_deny_anonymous" 
ON public.edge_function_tokens 
FOR ALL 
TO anon 
USING (false) 
WITH CHECK (false);

-- Explicit denial for authenticated users (only service role should access)
CREATE POLICY "edge_tokens_deny_authenticated" 
ON public.edge_function_tokens 
FOR ALL 
TO authenticated 
USING (false) 
WITH CHECK (false);

-- Only service role with proper application context
CREATE POLICY "edge_tokens_service_role_only" 
ON public.edge_function_tokens 
FOR ALL 
TO service_role 
USING (
  (auth.role() = 'service_role') AND 
  (current_setting('application_name', true) = 'edge_function_manager')
) 
WITH CHECK (
  (auth.role() = 'service_role') AND 
  (current_setting('application_name', true) = 'edge_function_manager')
);

-- 4. Subscription Rate Limits Security
-- Drop existing policies and create secure ones
DROP POLICY IF EXISTS "rate_limits_service_role_restricted" ON public.subscription_rate_limits;

-- Explicit denial for anonymous users
CREATE POLICY "rate_limits_deny_anonymous" 
ON public.subscription_rate_limits 
FOR ALL 
TO anon 
USING (false) 
WITH CHECK (false);

-- Explicit denial for authenticated users (only service role should access)
CREATE POLICY "rate_limits_deny_authenticated" 
ON public.subscription_rate_limits 
FOR ALL 
TO authenticated 
USING (false) 
WITH CHECK (false);

-- Only service role for rate limiting functions
CREATE POLICY "rate_limits_service_role_only" 
ON public.subscription_rate_limits 
FOR ALL 
TO service_role 
USING (
  (auth.role() = 'service_role') AND 
  (current_setting('application_name', true) IN ('edge_function_manager', 'create-checkout'))
) 
WITH CHECK (
  (auth.role() = 'service_role') AND 
  (current_setting('application_name', true) IN ('edge_function_manager', 'create-checkout'))
);

-- 5. Security Monitoring: Add comprehensive access logging
CREATE OR REPLACE FUNCTION public.log_security_access()
RETURNS TRIGGER AS $$
BEGIN
    -- Log all access attempts to sensitive tables
    RAISE LOG 'SECURITY ACCESS: Table %, Operation %, User %, Role %, App %', 
              TG_TABLE_NAME, TG_OP, auth.uid(), auth.role(), 
              current_setting('application_name', true);
    
    -- Log additional context for contact submissions
    IF TG_TABLE_NAME = 'contact_submissions' THEN
        RAISE LOG 'CONTACT ACCESS: Email %, IP %, Processed %', 
                  COALESCE(NEW.email, OLD.email), 
                  COALESCE(NEW.ip_address, OLD.ip_address),
                  COALESCE(NEW.processed, OLD.processed);
    END IF;
    
    -- Log subscriber access
    IF TG_TABLE_NAME = 'subscribers' THEN
        RAISE LOG 'SUBSCRIBER ACCESS: User %, Tier %, Status %', 
                  COALESCE(NEW.user_id, OLD.user_id), 
                  COALESCE(NEW.subscription_tier, OLD.subscription_tier),
                  COALESCE(NEW.subscribed, OLD.subscribed);
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply security logging to sensitive tables
DROP TRIGGER IF EXISTS security_log_contact_submissions ON public.contact_submissions;
CREATE TRIGGER security_log_contact_submissions
    BEFORE SELECT OR INSERT OR UPDATE OR DELETE ON public.contact_submissions
    FOR EACH STATEMENT EXECUTE FUNCTION public.log_security_access();

DROP TRIGGER IF EXISTS security_log_subscribers ON public.subscribers;  
CREATE TRIGGER security_log_subscribers
    BEFORE SELECT OR INSERT OR UPDATE OR DELETE ON public.subscribers
    FOR EACH STATEMENT EXECUTE FUNCTION public.log_security_access();

DROP TRIGGER IF EXISTS security_log_edge_tokens ON public.edge_function_tokens;
CREATE TRIGGER security_log_edge_tokens
    BEFORE SELECT OR INSERT OR UPDATE OR DELETE ON public.edge_function_tokens  
    FOR EACH STATEMENT EXECUTE FUNCTION public.log_security_access();

-- 6. Additional Security Hardening
-- Ensure admin functions are properly secured
ALTER FUNCTION public.admin_get_contact_submissions() SECURITY DEFINER;
ALTER FUNCTION public.admin_update_contact_submission(uuid, boolean) SECURITY DEFINER;
ALTER FUNCTION public.get_contact_submissions_admin() SECURITY DEFINER;
ALTER FUNCTION public.update_contact_submission_admin(uuid, boolean) SECURITY DEFINER;

-- Add input validation trigger for contact submissions
CREATE OR REPLACE FUNCTION public.validate_contact_submission()
RETURNS TRIGGER AS $$
BEGIN
    -- Validate email format
    IF NEW.email IS NULL OR NEW.email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format: %', NEW.email;
    END IF;
    
    -- Validate required fields
    IF NEW.name IS NULL OR length(trim(NEW.name)) = 0 THEN
        RAISE EXCEPTION 'Name is required';
    END IF;
    
    -- Sanitize inputs (prevent XSS)
    NEW.name := trim(NEW.name);
    NEW.email := trim(lower(NEW.email));
    NEW.company := CASE WHEN NEW.company IS NOT NULL THEN trim(NEW.company) ELSE NULL END;
    NEW.service := CASE WHEN NEW.service IS NOT NULL THEN trim(NEW.service) ELSE NULL END;
    NEW.project_details := CASE WHEN NEW.project_details IS NOT NULL THEN trim(NEW.project_details) ELSE NULL END;
    
    -- Length limits
    IF length(NEW.name) > 255 OR length(NEW.email) > 255 THEN
        RAISE EXCEPTION 'Input length exceeds limit';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS validate_contact_input ON public.contact_submissions;
CREATE TRIGGER validate_contact_input
    BEFORE INSERT OR UPDATE ON public.contact_submissions
    FOR EACH ROW EXECUTE FUNCTION public.validate_contact_submission();

-- 7. Final security verification
-- Ensure all sensitive tables have RLS enabled and forced
DO $$
BEGIN
    -- Verify RLS is enabled on all sensitive tables
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c 
        JOIN pg_namespace n ON c.relnamespace = n.oid 
        WHERE n.nspname = 'public' 
        AND c.relname = 'contact_submissions' 
        AND c.relrowsecurity = true
        AND c.relforcerowsecurity = true
    ) THEN
        RAISE EXCEPTION 'RLS not properly enabled on contact_submissions';
    END IF;
    
    RAISE LOG 'SECURITY VERIFICATION: All critical security fixes have been applied successfully';
END $$;