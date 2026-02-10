
# Fix Project Row Hover and Vertical Border Styling

## Issues
1. **White hover fade**: When hovering over project rows, a dim white background (`hover:bg-white/[0.05]`) appears, which looks washed out and inconsistent with the premium blue theme.
2. **Missing vertical borders**: In the unselected state, the left and right edges of each row have `border-transparent`, making rows look like they have no defined boundaries -- giving a "copy-pasted" appearance.

## Changes

### File: `src/pages/Dashboard.tsx`

**1. Replace white hover with subtle blue hover** (line 1120)
- Change `hover:bg-white/[0.05]` to `hover:bg-primary/[0.06]` so the hover uses the brand blue tint instead of a flat white wash.

**2. Add subtle vertical borders on both ends** (lines 1130 and 1185)
- Change the unselected `border-transparent` on the first cell (`border-l-2`) to `border-white/[0.08]` so there is always a faint visible left edge.
- Same for the last cell (`border-r-2`) -- change its unselected state from `border-transparent` to `border-white/[0.08]`.

This gives every row a clean, defined boundary on both sides while keeping the selected state's brighter blue border unchanged.
