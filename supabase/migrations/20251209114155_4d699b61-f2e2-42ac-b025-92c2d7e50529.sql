-- Update the notify_n8n_new_article function to use correct webhook URL
CREATE OR REPLACE FUNCTION public.notify_n8n_new_article()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
BEGIN
  PERFORM net.http_post(
    url := 'https://scriptstorm.app.n8n.cloud/webhook/content-brief',
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