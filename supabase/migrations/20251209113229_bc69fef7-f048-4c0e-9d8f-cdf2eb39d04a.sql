-- Enable pg_net extension (available by default in Supabase)
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Update the notify_n8n_new_article function to use pg_net
CREATE OR REPLACE FUNCTION public.notify_n8n_new_article()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  PERFORM net.http_post(
    url := 'https://scriptstorm.app.n8n.cloud/webhook/new-article',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := json_build_object(
      'id', NEW.id,
      'title', NEW.title,
      'status', NEW.status,
      'user_id', NEW.user_id,
      'created_at', NEW.created_at
    )::jsonb
  );
  RETURN NEW;
END;
$function$;