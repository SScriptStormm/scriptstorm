-- FIX 1: SECURE CONTACT SUBMISSIONS
-- Remove the overly permissive service insert policy
DROP POLICY IF EXISTS "contact_submissions_service_insert" ON public.contact_submissions;

-- Create a secure edge function authentication system
-- Create a table to track valid edge function tokens
CREATE TABLE IF NOT EXISTS public.edge_function_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    function_name TEXT NOT NULL UNIQUE,
    token_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    last_used TIMESTAMPTZ,
    active BOOLEAN DEFAULT true
);

-- Enable RLS on edge function tokens
ALTER TABLE public.edge_function_tokens ENABLE ROW LEVEL SECURITY;

-- Only service role can manage edge function tokens
CREATE POLICY "edge_tokens_service_only" 
ON public.edge_function_tokens 
FOR ALL 
TO service_role
USING (true)
WITH CHECK (true);

-- Create function to validate edge function requests
CREATE OR REPLACE FUNCTION public.validate_edge_function_request(func_name TEXT, provided_token TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    stored_hash TEXT;
    is_active BOOLEAN;
BEGIN
    -- Check if the function token exists and is active
    SELECT token_hash, active INTO stored_hash, is_active
    FROM public.edge_function_tokens 
    WHERE function_name = func_name;
    
    -- Return false if token not found or inactive
    IF stored_hash IS NULL OR NOT is_active THEN
        RETURN false;
    END IF;
    
    -- Validate the provided token against stored hash
    -- In production, use proper cryptographic comparison
    IF encode(digest(provided_token, 'sha256'), 'hex') = stored_hash THEN
        -- Update last_used timestamp
        UPDATE public.edge_function_tokens 
        SET last_used = now() 
        WHERE function_name = func_name;
        RETURN true;
    END IF;
    
    RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create secure contact submissions insert policy
CREATE POLICY "contact_submissions_secure_insert" 
ON public.contact_submissions 
FOR INSERT 
TO service_role
WITH CHECK (
    -- Only allow if request comes from validated edge function
    current_setting('request.jwt.claims', true)::json->>'function_name' = 'submit-contact'
);