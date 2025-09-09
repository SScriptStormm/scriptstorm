-- Fix function security warning by setting proper search_path
CREATE OR REPLACE FUNCTION public.log_contact_access()
RETURNS TRIGGER AS $$
BEGIN
    -- Log access patterns for security monitoring
    RAISE LOG 'Contact submission access: User %, Role %, Operation %', 
              auth.uid(), auth.role(), TG_OP;
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;