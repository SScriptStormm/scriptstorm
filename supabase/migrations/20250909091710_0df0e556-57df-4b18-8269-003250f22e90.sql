-- Final security enforcement - Force RLS on all sensitive tables
ALTER TABLE public.contact_submissions FORCE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers FORCE ROW LEVEL SECURITY; 
ALTER TABLE public.edge_function_tokens FORCE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_rate_limits FORCE ROW LEVEL SECURITY;

-- Ensure critical functions are properly secured
REVOKE ALL ON FUNCTION public.validate_edge_function_request FROM public;
REVOKE ALL ON FUNCTION public.check_subscription_rate_limit FROM public;
REVOKE ALL ON FUNCTION public.insert_contact_submission FROM public;