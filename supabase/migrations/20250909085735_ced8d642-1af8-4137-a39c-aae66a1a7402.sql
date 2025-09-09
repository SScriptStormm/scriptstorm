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

-- Ensure RLS is enabled (double-check)
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Add monitoring function for security logging
CREATE OR REPLACE FUNCTION public.log_contact_access()
RETURNS TRIGGER AS $$
BEGIN
    -- Log access patterns for security monitoring
    RAISE LOG 'Contact submission access: User %, Role %, Operation %', 
              auth.uid(), auth.role(), TG_OP;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply monitoring triggers
CREATE TRIGGER contact_insert_log
    AFTER INSERT ON public.contact_submissions
    FOR EACH ROW EXECUTE FUNCTION public.log_contact_access();

CREATE TRIGGER contact_select_log  
    AFTER UPDATE ON public.contact_submissions
    FOR EACH ROW EXECUTE FUNCTION public.log_contact_access();