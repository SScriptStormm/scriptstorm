

## Slightly Increase Filter Button Sizes (Desktop Only)

All filter buttons (status row: All, Completed, In Progress, Pending, In Review; content type row: All Types, Blogs, Social, YouTube, Products) currently use `h-8 sm:h-7` and `px-2` with `text-xs`.

### Changes in `src/pages/Dashboard.tsx`

For desktop only, bump the height and padding using `lg:` breakpoint modifiers while keeping `sm:` and base sizes untouched:

**Current:** `px-2 h-8 sm:h-7` + `text-xs`
**New:** `px-2 h-8 sm:h-7 lg:h-8 lg:px-3` + `text-xs`

This adds `lg:h-8` (restores 32px on desktop instead of 28px from `sm:h-7`) and `lg:px-3` (slightly more horizontal padding on desktop). Mobile/tablet remain identical.

**Lines to update** (11 buttons total):
- Status filters: lines 832, 844, 856, 868, 880
- Content type filters: lines 897, 909, 922, 935, 948

Each line changes from:
`px-2 h-8 sm:h-7` → `px-2 h-8 sm:h-7 lg:h-8 lg:px-3`

