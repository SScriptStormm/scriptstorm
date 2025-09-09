-- CRITICAL SECURITY FIX: Remove overly permissive INSERT policy
-- The current policy allows ANY public user to insert contact submissions
-- This should only be allowed via the secure edge function

-- Drop the problematic public INSERT policy
DROP POLICY IF EXISTS "contact_submissions_insert" ON public.contact_submissions;

-- Create a more restrictive INSERT policy that only allows service role
-- (The edge function uses service role key to bypass RLS securely)
CREATE POLICY "contact_submissions_service_insert" 
ON public.contact_submissions 
FOR INSERT 
TO service_role
WITH CHECK (true);

-- Add additional security: Ensure RLS is enabled (double-check)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Add a monitoring policy to log access attempts (optional security measure)
-- Create a trigger to log unauthorized access attempts
CREATE OR REPLACE FUNCTION public.log_contact_access()
RETURNS TRIGGER AS $$
BEGIN
    -- Log any unexpected access patterns
    RAISE LOG 'Contact submission access: User %, Role %, Operation %', 
              auth.uid(), auth.role(), TG_OP;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply trigger to contact_submissions table
CREATE TRIGGER contact_access_log
    BEFORE SELECT OR INSERT OR UPDATE OR DELETE ON public.contact_submissions
    FOR EACH ROW EXECUTE FUNCTION public.log_contact_access();

-- Ensure admin function is working correctly
-- Test the admin function (this should work for valid admins)
SELECT public.current_user_is_admin() AS admin_check;