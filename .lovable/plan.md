

## Fix Production Summary Layout and Pagination Text Wrapping

Two issues on mobile (390px viewport):

### 1. Production Summary Status Grid
The status indicators (Completed, In Progress, In Review, Pending) use `flex flex-wrap gap-8` with dividers, causing a messy 2+2 wrap on narrow screens. Fix: change to a `grid grid-cols-2 lg:grid-cols-4` layout, remove the divider elements, and reduce gap so all four fit cleanly in a 2x2 grid on mobile and 4-across on desktop.

**File:** `src/components/dashboard/ContentQueueCard.tsx` (lines 100-135)
- Replace `flex flex-wrap items-center justify-center gap-8` with `grid grid-cols-2 lg:grid-cols-4 gap-4`
- Remove the 4 divider `<div className="w-px h-10 bg-white/10" />` elements
- Each stat cell becomes a self-contained block

### 2. Pagination "Page X of Y" Text Wrapping
The text "Page 1 of 2" wraps because the span doesn't prevent wrapping. 

**File:** `src/pages/Dashboard.tsx` (line 1266)
- Add `whitespace-nowrap` to the span's className so "Page 1 of 2" stays on one line

