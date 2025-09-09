-- Fix security warning: Function Search Path Mutable
-- Update the function to have a secure search_path

CREATE OR REPLACE FUNCTION public.validate_subscriber_email_ownership()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only validate for authenticated users (service role bypasses this)
  IF current_setting('role') != 'service_role' THEN
    -- Check if the email matches the authenticated user's email
    IF NEW.user_id = auth.uid() THEN
      -- Allow the operation - user is creating/updating their own record
      RETURN NEW;
    ELSE
      -- Prevent users from creating subscriptions with other user IDs
      RAISE EXCEPTION 'Cannot create subscription for different user';
    END IF;
  END IF;
  
  -- Service role operations are allowed (edge functions)
  RETURN NEW;
END;
$$;