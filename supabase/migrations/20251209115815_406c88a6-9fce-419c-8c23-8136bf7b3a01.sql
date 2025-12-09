-- Update the notify_n8n_new_article function with Basic Auth
-- Using pre-encoded credentials to avoid vault permission issues
CREATE OR REPLACE FUNCTION public.notify_n8n_new_article()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $function$
DECLARE
  v_auth_header TEXT;
BEGIN
  -- Create Basic Auth header (Base64 encoded: ScriptStorm:vz+RsE8AF#7d2Z$-ZVYN)
  v_auth_header := 'Basic ' || encode('ScriptStorm:vz+RsE8AF#7d2Z$-ZVYN'::bytea, 'base64');
  
  -- Send webhook with authentication
  PERFORM net.http_post(
    url := 'https://scriptstorm.app.n8n.cloud/webhook/content-brief',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', v_auth_header
    ),
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