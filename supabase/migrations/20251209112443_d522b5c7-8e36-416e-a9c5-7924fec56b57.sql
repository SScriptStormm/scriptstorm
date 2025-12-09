-- Create trigger to automatically notify n8n when a new article is inserted
CREATE TRIGGER trigger_notify_n8n_on_article_insert
  AFTER INSERT ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_n8n_new_article();