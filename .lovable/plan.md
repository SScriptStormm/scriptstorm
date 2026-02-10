

# Fix: Reduce Desktop Search Bar Width to Stop Overlapping Content Type Buttons

## Problem
The desktop inline search bar (`w-72`) is too wide, causing it to overlap or squish the content type filter buttons (All Types, Blogs, Social, YouTube, Products) on the same row.

## Fix

### File: `src/pages/Dashboard.tsx`

**1. Reduce the desktop search bar width (line 926)**
Change `w-72` to `w-48` so it no longer crowds the content type buttons. This width should align approximately with the "Delivery" column below while leaving plenty of room for the buttons.

That's the only change -- one class name tweak from `w-72` to `w-48`.

