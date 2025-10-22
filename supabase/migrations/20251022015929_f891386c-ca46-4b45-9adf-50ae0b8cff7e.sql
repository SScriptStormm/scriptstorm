-- Add YouTube script fields to articles table
ALTER TABLE public.articles 
ADD COLUMN IF NOT EXISTS youtube_script BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS youtube_script_length INTEGER;