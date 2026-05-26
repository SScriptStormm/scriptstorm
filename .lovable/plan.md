# Fix the Download button — frontend only, n8n untouched

## Root cause (recap)
The most recent completed brief has `article_url = null` and `content_draft = ""` (empty string). The button's disabled rule is `!article.article_url && !article.content_draft`, and `!""` is `true`, so the button greys out. n8n flips the row to `completed` without writing any deliverable yet.

## Approach
Keep n8n exactly as it is. Fix everything in `src/pages/Dashboard.tsx`:

1. **Always enable the Download button when `status === 'completed'`.** Remove the empty-content disable.
2. **Upgrade `handleDownload` with a smart fallback chain:**
   - If `article_url` exists → open it in a new tab (current behaviour).
   - Else if `content_draft` has real text → download it as `<title>.txt` (current behaviour).
   - Else → generate a clean `<title>-brief.txt` on the fly containing the brief metadata already in the row (title, content type, target keywords, target audience, tone, word count, key points, notes, submitted/updated timestamps, status). This guarantees the user always gets a file when the pipeline says "completed".
3. **Toast feedback** stays the same — success toast on download, with a clarifying message when the fallback brief is used (e.g. "Downloaded brief summary — full content will replace this file once delivered").

## Files touched
- `src/pages/Dashboard.tsx` only
  - `handleDownload` function (~L520): add the metadata-fallback branch.
  - Two Download buttons (~L1142 grid card, ~L1246 list row): change `disabled` to `disabled={article.status !== 'completed'}`.

## Out of scope (per your ask)
- No changes to n8n.
- No DB migrations, no triggers, no row backfill.
- No changes to `ContentPipelineCard` or any other component.

That's it — one file, three small edits, button works for every completed brief from now on.
