-- FIX CONFLICTING RLS POLICIES
-- Remove the conflicting "no access" policies since RLS denies by default
-- Keep only the specific service role policies

-- 1. Contact Submissions - Remove blocking policies, keep only service role access
DROP POLICY IF EXISTS "contact_submissions_no_select" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_no_insert" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_no_update" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_submissions_no_delete" ON public.contact_submissions;

-- Keep only the service role policy (RLS blocks all others by default)

-- 2. Edge Function Tokens - Remove blocking policy
DROP POLICY IF EXISTS "edge_tokens_no_access" ON public.edge_function_tokens;

-- Keep only the service role policy

-- 3. Subscription Rate Limits - Remove blocking policy  
DROP POLICY IF EXISTS "rate_limits_no_access" ON public.subscription_rate_limits;

-- Keep only the service role policy

-- 4. Ensure all tables have RLS properly enabled
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.edge_function_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- 5. Add proper documentation comments to remaining policies
COMMENT ON POLICY "contact_submissions_service_only" ON public.contact_submissions 
IS 'Only service role can access contact submissions - used by admin panel and edge functions';

COMMENT ON POLICY "edge_tokens_service_only" ON public.edge_function_tokens 
IS 'Only service role can manage edge function tokens - internal security system';

COMMENT ON POLICY "rate_limits_service_only" ON public.subscription_rate_limits 
IS 'Only service role can manage rate limits - internal rate limiting system';

COMMENT ON POLICY "subscribers_service_only" ON public.subscribers 
IS 'Only service role can manage subscriber data - used by subscription edge functions';

-- 6. Verify no regular users can access sensitive tables directly
-- (RLS with no matching policies will deny access by default)