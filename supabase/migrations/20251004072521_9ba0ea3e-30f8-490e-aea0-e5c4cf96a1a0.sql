-- Add explicit DENY policies for contact_submissions table to prevent unauthorized access

-- Deny all access to anonymous users
CREATE POLICY "contact_deny_anonymous_all"
ON public.contact_submissions
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Deny all access to authenticated non-admin users
CREATE POLICY "contact_deny_authenticated_non_admin"
ON public.contact_submissions
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (
  -- Deny unless user is admin
  NOT (
    auth.uid() IS NOT NULL 
    AND public.current_user_is_admin()
  )
)
WITH CHECK (
  -- Deny unless user is admin
  NOT (
    auth.uid() IS NOT NULL 
    AND public.current_user_is_admin()
  )
);