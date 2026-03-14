

## Two Fixes

### 1. Mobile tab buttons (PROJECTS/CALENDAR/RESEARCH/SUPPORT) overlapping screen edges
The four tabs use `px-4` padding and `w-full` which causes them to overflow on small screens. Fix: reduce padding to `px-2 sm:px-4` and reduce icon margin/text size on mobile so they fit within the viewport.

**File:** `src/pages/Dashboard.tsx` (lines 721-744)
- On the TabsList: add `overflow-x-auto` as a safety net
- On each TabsTrigger: change `px-4 py-2` to `px-2 py-1.5 sm:px-4 sm:py-2` and add `text-xs sm:text-sm`
- On icons inside triggers: change `mr-2` to `mr-1 sm:mr-2`

### 2. Desktop search bar — extend to align with start of "Delivery" column
The table has 6 columns: Project Title, Type, Status, Delivery, Revisions, Actions. The search bar currently uses `lg:w-72`. To stretch it exactly to the "D" in "Delivery", use `flex-1` so it fills all remaining space in the row (the filter buttons take their natural width, search fills the rest). This naturally aligns the search bar's right edge with the Delivery column area.

**File:** `src/pages/Dashboard.tsx` (line 940)
- Change `w-48 lg:w-72` to `w-48 lg:flex-1` so the search expands to fill available space on desktop

