

## Update Article Status Lifecycle

Two changes are needed to align the database and dashboard code to the lifecycle: `pending` → `in_progress` → `review` → `completed`.

### 1. Database Migration
- Drop the existing `articles_status_check` constraint (currently allows `pending`, `in_progress`, `completed`, `published`)
- Add a new check constraint allowing only: `pending`, `in_progress`, `review`, `completed`
- Update any articles currently set to `published` (if any exist) to `completed`

### 2. Code — `ContentPipelineCard.tsx`
- No changes needed. The `getProgress` function already maps all four statuses correctly (`pending` → 20%, `in_progress` → 60%, `review` → 80%, `completed` → 100%) with appropriate messages.

### Technical Details

**SQL Migration:**
```sql
-- Migrate any 'published' articles to 'completed'
UPDATE articles SET status = 'completed' WHERE status = 'published';

-- Replace the check constraint
ALTER TABLE articles DROP CONSTRAINT articles_status_check;
ALTER TABLE articles ADD CONSTRAINT articles_status_check 
  CHECK (status IN ('pending', 'in_progress', 'review', 'completed'));
```

