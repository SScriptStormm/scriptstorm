-- Fix remaining security linter warnings: Function Search Path Mutable

-- Fix search_path for security functions that were flagged by the linter
ALTER FUNCTION public.log_security_access() SET search_path = public;
ALTER FUNCTION public.validate_contact_submission() SET search_path = public;