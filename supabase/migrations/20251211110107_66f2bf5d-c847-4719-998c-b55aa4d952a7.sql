-- Enable full row data capture for real-time updates
ALTER TABLE public.articles REPLICA IDENTITY FULL;

-- Add articles table to real-time broadcast publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.articles;