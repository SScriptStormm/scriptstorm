
-- 1. Enable RLS on projects table and restrict to service_role only
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "projects_deny_anonymous" ON public.projects;
DROP POLICY IF EXISTS "projects_deny_authenticated" ON public.projects;
DROP POLICY IF EXISTS "projects_service_role_only" ON public.projects;

CREATE POLICY "projects_deny_anonymous"
ON public.projects AS RESTRICTIVE
FOR ALL TO anon
USING (false) WITH CHECK (false);

CREATE POLICY "projects_deny_authenticated"
ON public.projects AS RESTRICTIVE
FOR ALL TO authenticated
USING (false) WITH CHECK (false);

CREATE POLICY "projects_service_role_only"
ON public.projects
FOR ALL TO service_role
USING (true) WITH CHECK (true);

REVOKE ALL ON public.projects FROM anon, authenticated;

-- 2. Prevent privilege escalation on user_roles
DROP POLICY IF EXISTS "non_admins_cannot_modify_roles" ON public.user_roles;
CREATE POLICY "non_admins_cannot_modify_roles"
ON public.user_roles AS RESTRICTIVE
FOR ALL TO authenticated
USING (public.current_user_is_admin())
WITH CHECK (public.current_user_is_admin());

-- 3. Remove misleading contact_submissions insert policy (service_role bypasses RLS anyway)
DROP POLICY IF EXISTS "edge_function_can_insert_contacts" ON public.contact_submissions;

-- 4. Revoke execute on admin-only/internal SECURITY DEFINER functions from anon and authenticated
REVOKE EXECUTE ON FUNCTION public.get_contact_submissions_admin() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_get_contact_submissions() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_update_contact_submission(uuid, boolean) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_contact_submission_admin(uuid, boolean) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_edge_function_request(text, text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_subscription_rate_limit(uuid, text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.notify_n8n_new_article() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_contact_access() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_security_access() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_contact_submission() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_subscriber_email_ownership() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.validate_article_word_count() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.set_article_delivery_deadline() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.set_article_revisions_allowed() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.increment_usage_counter() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;
