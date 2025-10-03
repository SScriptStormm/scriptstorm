-- Fix contact_submissions RLS policies to ensure proper access control
-- Drop the overly restrictive deny_anonymous policy
DROP POLICY IF EXISTS "contact_submissions_deny_anonymous" ON public.contact_submissions;

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS "contact_submissions_service_role_only" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_admin_access" ON public.contact_submissions;

-- Create a proper policy for service role access (for edge functions)
CREATE POLICY "contact_submissions_service_role_access"
ON public.contact_submissions
FOR ALL
TO service_role
USING (
  current_setting('application_name', true) = ANY (
    ARRAY['edge_function_manager', 'submit-contact']
  )
)
WITH CHECK (
  current_setting('application_name', true) = ANY (
    ARRAY['edge_function_manager', 'submit-contact']
  )
);

-- Create a policy for admin access using the security definer function
CREATE POLICY "contact_submissions_admin_only"
ON public.contact_submissions
FOR ALL
TO authenticated
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

-- Explicitly deny all other authenticated users (non-admins)
CREATE POLICY "contact_submissions_deny_non_admins"
ON public.contact_submissions
FOR ALL
TO authenticated
USING (NOT public.current_user_is_admin())
WITH CHECK (false);

-- Deny anonymous access completely
CREATE POLICY "contact_submissions_block_anonymous"
ON public.contact_submissions
FOR ALL
TO anon
USING (false)
WITH CHECK (false);