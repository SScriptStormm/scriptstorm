-- Replace overly permissive service role policies with least-privilege policies
-- following the principle: each edge function gets ONLY the minimum permissions it needs

-- Drop the existing broad service role policies
DROP POLICY IF EXISTS "contact_submissions_service_role_select" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_service_role_insert" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_service_role_update" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_service_role_delete" ON public.contact_submissions;

-- Create restrictive policy: submit-contact function can ONLY INSERT new submissions
-- This prevents the contact form from reading existing customer data
CREATE POLICY "contact_submissions_submit_insert_only"
ON public.contact_submissions
FOR INSERT
TO service_role
WITH CHECK (current_setting('application_name', true) = 'submit-contact');

-- Create restrictive policy: edge_function_manager can read for admin operations
-- This is used for admin dashboards viewing contact submissions
CREATE POLICY "contact_submissions_admin_function_select"
ON public.contact_submissions
FOR SELECT
TO service_role
USING (current_setting('application_name', true) = 'edge_function_manager');

-- Create restrictive policy: edge_function_manager can update for admin operations
-- This allows marking submissions as processed
CREATE POLICY "contact_submissions_admin_function_update"
ON public.contact_submissions
FOR UPDATE
TO service_role
USING (current_setting('application_name', true) = 'edge_function_manager');

-- Add security documentation
COMMENT ON POLICY "contact_submissions_submit_insert_only" ON public.contact_submissions IS 
'LEAST PRIVILEGE: Contact form can only insert new submissions, cannot read existing customer data';

COMMENT ON POLICY "contact_submissions_admin_function_select" ON public.contact_submissions IS 
'ADMIN ONLY: Edge function manager can read submissions for admin dashboards';

COMMENT ON POLICY "contact_submissions_admin_function_update" ON public.contact_submissions IS 
'ADMIN ONLY: Edge function manager can update submissions (e.g., mark as processed)';