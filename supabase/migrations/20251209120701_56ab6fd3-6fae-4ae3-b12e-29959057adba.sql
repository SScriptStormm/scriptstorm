-- Remove duplicate trigger that causes double n8n webhook executions
DROP TRIGGER IF EXISTS articles_insert_trigger ON public.articles;