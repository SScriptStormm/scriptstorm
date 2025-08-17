-- Fix security vulnerability: Restrict article creation to authenticated users only for their own user_id
DROP POLICY IF EXISTS "insert_articles" ON public.articles;

CREATE POLICY "Users can create their own articles" 
ON public.articles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);