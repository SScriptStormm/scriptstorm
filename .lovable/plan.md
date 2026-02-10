

# Move Mobile/Tablet Search Bar to Content Type Filter Area

## Problem
The mobile/tablet search bar was incorrectly placed above the month filter (line 785). It should stay alongside the content type buttons -- just shown as full-width on its own row on mobile/tablet, and inline on desktop.

## Changes

### File: `src/pages/Dashboard.tsx`

**1. Remove the misplaced mobile/tablet search bar (lines 785-802)**
Delete the entire `lg:hidden` search input block that currently sits above the month filter.

**2. Add the mobile/tablet search bar below the content type buttons (after line 963)**
Insert a full-width search input inside the content type filter area, right after the desktop inline search `</div>`. This new block will use `lg:hidden` so it only shows on mobile and tablet, appearing as a full-width row below the content type buttons.

This way:
- On mobile and tablet: search bar appears as a full-width row directly below the content type filter buttons
- On desktop (`lg+`): the inline search bar stays to the right of the content type buttons (unchanged)

No logic changes -- just moving the search bar's position in the DOM.
