
# Fix Pagination Button Hover on Selected State

## Issue
When a page number button is selected (active), hovering over it changes it from the subtle glassmorphic blue (`bg-primary/20`) to a brighter blue. The selected state should remain visually stable regardless of hover.

## Change

### File: `src/pages/Dashboard.tsx` (line 1261)

Update the active page button's className to explicitly lock hover styles to match the selected state:

- Current: `'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_10px_hsl(221_83%_53%/0.3)]'`
- Updated: `'bg-primary/20 hover:bg-primary/20 text-white border border-primary-glow/60 hover:border-primary-glow/60 shadow-[0_0_10px_hsl(221_83%_53%/0.3)] hover:text-white'`

This pins the hover background, border, and text color to exactly match the resting selected state, so there is no visual change on hover. This follows the same pattern already used for dashboard filter buttons (per the project's existing style convention).
