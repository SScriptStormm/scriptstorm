
## Fix Completed Pipeline Stage + Broken Download Button

🎉 Congrats on hitting 100%! There are two real bugs blocking the celebration. Verified against the DB — your "Grand Theft Auto 6 (GTA 6)" article has `status: completed`, `content_draft: present`, but `article_url: null`.

### Bug 1 — Stage 5 stays yellow when status is `completed`

**File:** `src/components/dashboard/ContentPipelineCard.tsx`

In `getProgress()`, completed status returns `step: 5`. The render loop then evaluates each stage as:
- `isCompleted = stage.step < currentStep` → step 5 is NOT less than 5 → false
- `isCurrent = stage.step === currentStep` → step 5 equals 5 → **true (amber/yellow)**

So "Ready for Download" never turns green. **Fix:** when status is `completed`, return `step: 6` so all 5 stages satisfy `stage.step < 6` and render green. The connector line between stage 4 and 5 will also turn emerald. The bottom progress bar already correctly shows 100% + success variant — no change needed there.

```ts
case 'completed': return { step: 6, progress: 100, message: 'Content ready for download!' };
```

### Bug 2 — Download button silently does nothing

**File:** `src/pages/Dashboard.tsx` (two spots: mobile card ~line 1104, desktop table ~line 1208)

Both buttons are wired as:
```tsx
onClick={() => article.article_url && window.open(article.article_url, '_blank')}
```

For your GTA 6 article, `article_url` is `null` (n8n stored the content in `content_draft` but never wrote the file URL). So the click is a silent no-op — looks broken.

**Fix:** make the button actually deliver the content the user has, with graceful fallback:

1. **Primary path:** if `article_url` is present → open it in a new tab (current behavior).
2. **Fallback path:** if `article_url` is null but `content_draft` exists → generate a `.txt` (or `.md`) blob from `content_draft` on the fly and trigger a browser download named after the article title. This means every completed article is downloadable, even when n8n didn't attach a hosted URL.
3. **Hard-disable state:** if neither exists → disable the button + tooltip "Content not yet available — please contact support."

The `articles` row already includes `content_draft` (the dashboard query selects `*`), so no schema or query changes are needed. Add a small helper `downloadArticle(article)` shared by both the mobile and desktop buttons to keep logic in one place.

### Optional quality improvement (recommend including)

Update the article type in `Dashboard.tsx` to include `content_draft: string | null` if it isn't already typed, so TypeScript surfaces the fallback path cleanly.

### Scope
- 2 files edited:
  - `src/components/dashboard/ContentPipelineCard.tsx` — 1-line change in `getProgress`
  - `src/pages/Dashboard.tsx` — add `downloadArticle` helper, wire both Download buttons to it, add disabled state when no content available
- No DB / RLS / edge function / n8n changes
- No memory updates needed

### Result
- Pipeline shows all 5 stages green ✅ when status is `completed` (matches the green progress bar)
- Download button immediately delivers your GTA 6 content as a `.txt` file from `content_draft`, and continues to open `article_url` for any future articles where n8n attaches a hosted file
