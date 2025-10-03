-- Drop all existing restrictive policies that are causing conflicts
DROP POLICY IF EXISTS "contact_submissions_service_role_access" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_admin_only" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_deny_non_admins" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_block_anonymous" ON public.contact_submissions;

-- Create PERMISSIVE policies for service role (for edge function submissions)
-- These allow the service role to manage contact submissions via edge functions
CREATE POLICY "contact_submissions_service_role_select"
ON public.contact_submissions
FOR SELECT
TO service_role
USING (current_setting('application_name', true) IN ('edge_function_manager', 'submit-contact'));

CREATE POLICY "contact_submissions_service_role_insert"
ON public.contact_submissions
FOR INSERT
TO service_role
WITH CHECK (current_setting('application_name', true) IN ('edge_function_manager', 'submit-contact'));

CREATE POLICY "contact_submissions_service_role_update"
ON public.contact_submissions
FOR UPDATE
TO service_role
USING (current_setting('application_name', true) IN ('edge_function_manager', 'submit-contact'));

CREATE POLICY "contact_submissions_service_role_delete"
ON public.contact_submissions
FOR DELETE
TO service_role
USING (current_setting('application_name', true) IN ('edge_function_manager', 'submit-contact'));

-- Create PERMISSIVE policies for admins
-- These allow authenticated admin users to manage all contact submissions
CREATE POLICY "contact_submissions_admin_select"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.current_user_is_admin());

CREATE POLICY "contact_submissions_admin_insert"
ON public.contact_submissions
FOR INSERT
TO authenticated
WITH CHECK (public.current_user_is_admin());

CREATE POLICY "contact_submissions_admin_update"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.current_user_is_admin());

CREATE POLICY "contact_submissions_admin_delete"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.current_user_is_admin());