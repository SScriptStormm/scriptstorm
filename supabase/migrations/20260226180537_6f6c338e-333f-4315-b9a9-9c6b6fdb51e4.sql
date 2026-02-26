-- Migrate any 'published' articles to 'completed'
UPDATE articles SET status = 'completed' WHERE status = 'published';

-- Replace the check constraint
ALTER TABLE articles DROP CONSTRAINT articles_status_check;
ALTER TABLE articles ADD CONSTRAINT articles_status_check 
  CHECK (status IN ('pending', 'in_progress', 'review', 'completed'));