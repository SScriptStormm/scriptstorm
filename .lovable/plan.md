

# Production Summary Filter + Color Fix

## 1. Fix Content Breakdown Colors

**Problem:** YouTube Scripts and Product Descriptions both show white numbers because they use `variant="default"` in AnimatedStat.

**Fix in `AnimatedStat.tsx`:**
- Add a new `"purple"` variant with `text-purple-400` and matching glow

**Fix in `ContentQueueCard.tsx`:**
- YouTube Scripts: change `variant="default"` to `variant="danger"` (rose-colored, matching its rose icon)
- Product Descriptions: change `variant="default"` to `variant="purple"` (matching its purple icon)

## 2. Add Period Selector to Production Summary Widget

**Add a self-contained dropdown** in the widget header that lets the client switch between:
- **This Month** (default)
- **Last Month**
- **All Time**

### Technical Details

**`ContentQueueCard.tsx` changes:**
- Add local state for the selected period (`this_month` | `last_month` | `all_time`)
- Add a small Select dropdown next to the title
- Accept the full `articles` array as prop (all articles, not pre-filtered)
- Filter articles internally based on the selected period using `created_at`
- Update the Article interface to include `created_at`
- Rename section label from "This Month's Status" to dynamically reflect the selection (e.g., "Last Month's Status" or "All Time Status")

**`Dashboard.tsx` changes:**
- Revert passing `articlesThisMonth` back to passing all `articles` so the widget can filter internally based on the dropdown selection

**Visual layout:**
The dropdown sits inline with the title in the card header, styled to match the glass/neon theme using the existing Select component with custom dark styling.

```text
+--------------------------------------------------+
| [icon] PRODUCTION SUMMARY    [This Month v]      |
+--------------------------------------------------+
| Completion Rate: 8/12 (67%)                      |
| ...                                              |
```

