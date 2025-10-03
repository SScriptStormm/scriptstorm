-- Add explicit RESTRICTIVE policies to deny unauthorized access
-- These work alongside the existing PERMISSIVE policies to create a defense-in-depth approach

-- Block ALL anonymous (unauthenticated) access
CREATE POLICY "contact_submissions_block_anonymous"
ON public.contact_submissions
AS RESTRICTIVE
FOR ALL
TO anon
USING (false);

-- Block authenticated users who are NOT admins
CREATE POLICY "contact_submissions_restrict_non_admins"
ON public.contact_submissions
AS RESTRICTIVE
FOR ALL
TO authenticated
USING (public.current_user_is_admin());

-- Add logging for security monitoring
COMMENT ON POLICY "contact_submissions_block_anonymous" ON public.contact_submissions IS 
'RESTRICTIVE policy: Explicitly denies all anonymous access to prevent data exposure';

COMMENT ON POLICY "contact_submissions_restrict_non_admins" ON public.contact_submissions IS 
'RESTRICTIVE policy: Only allows authenticated users who are admins, denies all others';