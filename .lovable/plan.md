
# Fix "Show Latest" Button Logic in Content Pipeline

## The Issue
When you click on the latest project (e.g., "Testing n8n") in the PROJECTS tab, the Content Pipeline widget shows:
- "Viewing: Testing n8n" indicator
- "Show Latest" button

This is confusing because the displayed project **is already the latest one** - clicking "Show Latest" would just show the same project.

## Root Cause
The current logic in `ContentPipelineCard` shows the selection indicator whenever `selectedId` is truthy:

```tsx
{selectedId && article && (
  <div>
    Viewing: {article.title}
    <Button>Show Latest</Button>
  </div>
)}
```

It doesn't check whether the selected project is the same as the default "latest" project.

## Solution
Update the Dashboard to pass `selectedId` as `null` when the selected project matches the latest project of the current month. This way:
- The "Show Latest" button only appears when viewing a **different** project
- The project remains highlighted in the PROJECTS table (the underlying state is unchanged)
- The label correctly says "Latest Project" instead of "Selected Project"

## Technical Changes

### File: `src/pages/Dashboard.tsx`

1. **Add a check** to determine if the selected project is already the latest one:
```tsx
const latestArticleId = currentMonthPipelineArticles[0]?.id;
const isSelectingLatest = selectedPipelineArticleId === latestArticleId;
```

2. **Update the `ContentPipelineCard` prop** to pass `null` when the selected project is the latest:
```tsx
<ContentPipelineCard
  article={displayedPipelineArticle}
  articlesCount={articles.length}
  selectedId={isSelectingLatest ? null : selectedPipelineArticleId}
  onClearSelection={() => setSelectedPipelineArticleId(null)}
/>
```

## Result

| Scenario | Before | After |
|----------|--------|-------|
| Click latest project | Shows "Viewing: [title]" + "Show Latest" button | Shows "Latest Project" label, no button |
| Click older project | Shows "Viewing: [title]" + "Show Latest" button | Same (correct behavior) |
| No project selected | Shows "Latest Project" label | Same (correct behavior) |

## Summary
This is a small but important UX improvement - the "Show Latest" button will only appear when it actually does something meaningful.
