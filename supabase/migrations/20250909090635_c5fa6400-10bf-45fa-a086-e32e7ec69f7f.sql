-- Create secure database function for contact form submissions
-- This function bypasses RLS to allow the edge function to insert data securely
CREATE OR REPLACE FUNCTION public.insert_contact_submission(
    p_name TEXT,
    p_email TEXT,
    p_company TEXT DEFAULT NULL,
    p_service TEXT DEFAULT NULL,
    p_project_details TEXT DEFAULT NULL,
    p_ip_address TEXT DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    submission_id UUID;
BEGIN
    -- Additional server-side validation
    IF p_name IS NULL OR length(trim(p_name)) = 0 THEN
        RAISE EXCEPTION 'Name is required';
    END IF;
    
    IF p_email IS NULL OR length(trim(p_email)) = 0 THEN
        RAISE EXCEPTION 'Email is required';
    END IF;
    
    -- Email format validation
    IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format';
    END IF;
    
    -- Length limits
    IF length(p_name) > 255 THEN
        RAISE EXCEPTION 'Name too long';
    END IF;
    
    IF length(p_email) > 255 THEN
        RAISE EXCEPTION 'Email too long';
    END IF;
    
    -- Insert the contact submission
    INSERT INTO public.contact_submissions (
        name, 
        email, 
        company, 
        service, 
        project_details, 
        ip_address, 
        user_agent,
        created_at,
        processed
    ) VALUES (
        trim(p_name),
        trim(lower(p_email)),
        CASE WHEN p_company IS NOT NULL AND length(trim(p_company)) > 0 THEN trim(p_company) ELSE NULL END,
        CASE WHEN p_service IS NOT NULL AND length(trim(p_service)) > 0 THEN trim(p_service) ELSE NULL END,
        CASE WHEN p_project_details IS NOT NULL AND length(trim(p_project_details)) > 0 THEN trim(p_project_details) ELSE NULL END,
        p_ip_address,
        p_user_agent,
        now(),
        false
    ) RETURNING id INTO submission_id;
    
    -- Log the successful submission
    RAISE LOG 'Contact submission created: ID %, Email %', submission_id, p_email;
    
    RETURN submission_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute permission to service role
GRANT EXECUTE ON FUNCTION public.insert_contact_submission TO service_role;

-- Revoke execute permission from other roles for security
REVOKE EXECUTE ON FUNCTION public.insert_contact_submission FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.insert_contact_submission FROM authenticated;