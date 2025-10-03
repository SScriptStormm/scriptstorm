-- Fix contact_submissions RLS policies to prevent unauthorized access
-- First, get a clean slate by dropping ALL policies
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'contact_submissions' 
        AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.contact_submissions', pol.policyname);
    END LOOP;
END $$;

-- Ensure RLS is enabled
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow admins (authenticated users with admin role) to SELECT
CREATE POLICY "admins_can_select_contacts"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.current_user_is_admin());

-- Policy 2: Allow admins to UPDATE (mark as processed)
CREATE POLICY "admins_can_update_contacts"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

-- Policy 3: Allow admins to DELETE
CREATE POLICY "admins_can_delete_contacts"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.current_user_is_admin());

-- Policy 4: Allow edge function to INSERT new submissions
-- This uses application_name check for the submit-contact edge function
CREATE POLICY "edge_function_can_insert_contacts"
ON public.contact_submissions
FOR INSERT
TO authenticated
WITH CHECK (
  auth.role() = 'service_role' 
  AND current_setting('application_name', true) = 'submit-contact'
);

-- Policy 5: Allow edge function manager to SELECT for processing
CREATE POLICY "edge_function_can_select_contacts"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (
  auth.role() = 'service_role' 
  AND current_setting('application_name', true) = 'edge_function_manager'
);

-- Policy 6: Allow edge function manager to UPDATE
CREATE POLICY "edge_function_can_update_contacts"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (
  auth.role() = 'service_role' 
  AND current_setting('application_name', true) = 'edge_function_manager'
)
WITH CHECK (
  auth.role() = 'service_role' 
  AND current_setting('application_name', true) = 'edge_function_manager'
);

-- Add comment documenting the security model
COMMENT ON TABLE public.contact_submissions IS 'Customer contact submissions - RESTRICTED ACCESS: Only admins and authorized edge functions can access this data. Contains PII (names, emails, company info).';
