## Three Mobile/Desktop Layout Fixes

### 1. Reduce swipe length on mobile filter buttons

**File:** `src/pages/Dashboard.tsx`

The status filter buttons (lines 808-869) and content type filter buttons (lines 873-938) use `size="sm"` with default padding (`h-9 px-3`). On mobile, this creates a long horizontal scroll. Fix by reducing horizontal padding on these buttons with additional classes like `px-2 py-1 h-7` to make them more compact, reducing the total swipe distance.

- **Lines 808**: Add smaller gap: change `flex gap-2` to `flex gap-1.5`
- **Lines 813-868**: Add `px-2 h-7` to each status filter button className
- **Lines 873**: Change `flex gap-2` to `flex gap-1.5`  
- **Lines 878-937**: Add `px-2 h-7` to each content type filter button className

This only affects the buttons themselves and won't change desktop/tablet since the buttons are already compact there.

### 2. Center the PROJECTS/CALENDAR/RESEARCH/SUPPORT tabs on mobile only

**File:** `src/pages/Dashboard.tsx` (line 721)

Currently the `TabsList` has `w-auto justify-start`. To center the tabs between the content pipeline card and "YOUR CONTENT PROJECTS" on mobile without affecting desktop/tablet:

- Change `w-auto justify-start` to `w-full justify-center sm:w-auto sm:justify-start`

This makes the tab bar full-width and centered on mobile, but retains the current left-aligned auto-width behavior on tablet/desktop.

### 3. Extend desktop search bar to align with "Delivery" column

**File:** `src/pages/Dashboard.tsx` (line 940)

Currently the desktop search bar is `w-48 lg:w-56`. To extend it further left to align with the start of the "Delivery" column header:

- Change `w-48 lg:w-56` to `w-48 lg:w-72` (or use `flex-1` with a `max-w` if needed)

Since this div already has `hidden lg:block`, mobile and tablet are unaffected.