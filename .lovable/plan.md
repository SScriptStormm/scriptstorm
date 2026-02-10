

# Move Search Bar Inline with Content Type Filters

## What Changes
The search bar moves from its own full-width row above all filters down to sit on the **same row** as the content type buttons (All Types, Blogs, Social, YouTube, Products). It will appear on the right side of that row, aligned with where the "Delivery" and "Actions" table columns are below.

## Layout
On desktop, the content type filter row will become a flex row with:
- **Left side**: The content type buttons (All Types, Blogs, Social, YouTube, Products) — same as now
- **Right side**: A compact search input with the Search icon and X clear button

On mobile, the search bar will remain full-width above the filters (since there isn't enough horizontal space to share a row).

## Visual Style
- Smaller input height to match the filter button size
- Smaller placeholder text ("Search titles...")
- Same glassmorphic styling (bg-black/50, border-white/[0.15], font-mono)
- Search and X icons slightly smaller to match the compact size

## Technical Details

### File: `src/pages/Dashboard.tsx`

**1. Remove the standalone search input block** (lines 784-802) — the full-width search bar that currently sits above the month filter.

**2. Add the search input inside the content type filter row** (lines 878-943). Change that `<div>` from just holding buttons to a flex row with two groups:
- Left group: the existing content type buttons in their scrollable container
- Right group (hidden on mobile, visible on md+): the compact search input

**3. Add a mobile-only search input** above the filters (visible only on small screens) so mobile users still have easy access.

The search input will use the same `searchQuery` state and behavior — no logic changes needed, just a layout move.

