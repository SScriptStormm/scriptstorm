

# Fix Tablet Layout and Extend Search Bar

## Problem
On tablet screens (768px-1024px), the content type filter buttons and inline search bar are crammed together on one row, making everything look squished. The search bar also needs to be wider (extending to align with the "Delivery" column) and the magnifying glass icon needs better alignment with the placeholder text.

## Changes

### 1. Fix tablet squishing -- stack filters and search on tablet, inline on large screens
Currently, the content type buttons and search share a row starting at `md` (768px). On tablet this is too tight. The fix:
- On tablet (`md`), the search bar will be full-width on its own row below the content type buttons (similar to mobile but visible)
- On large screens (`lg`, 1024px+), the search bar moves inline with the content type buttons as intended
- This gives tablet users breathing room while keeping the compact desktop layout

### 2. Extend the search bar width
On large desktop screens, increase the search bar width from `lg:w-56` to a larger value (approximately `lg:w-72`) so it stretches further left, aligning closer to the start of the "Delivery" column header.

### 3. Align the magnifying glass icon with placeholder text
Adjust the icon's left padding (`left-2.5`) and the input's `pl-7` so the magnifying glass sits neatly beside the "S" in "Search titles...". This means slightly increasing the icon's left offset and the input's left padding to create proper visual alignment.

## Technical Details

### File: `src/pages/Dashboard.tsx`

**Search bar container (line 946):**
- Change from `hidden md:block flex-shrink-0 w-48 lg:w-56` to `hidden lg:block flex-shrink-0 w-72` -- only show inline on `lg+` and make it wider

**Search input (line 953):**
- Adjust `pl-7` to `pl-8` and the Search icon `left-2.5` to `left-3` for proper icon-to-text alignment

**Mobile-only search (line 785):**
- Change from `md:hidden` to `lg:hidden` so it shows as full-width on both mobile AND tablet, only hiding on large screens where it appears inline

These are small class name changes -- no logic or structural changes needed.
