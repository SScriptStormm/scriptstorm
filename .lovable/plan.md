

## Fix: Tablet Project Table Squished + Mobile Support Tab Missing

### Problem 1: Tablet Layout Squished
The project table switches from cards to table at `md` (768px). On tablets (768–1024px), the 6-column table is too cramped. The card layout should extend up to `lg` (1024px).

### Problem 2: Mobile Support Tab Missing
All tab triggers show icon + full text at every screen size. On mobile, with 4+ tabs (Projects, Calendar, Research, Support), they overflow the `TabsList` and the Support tab gets pushed out of view. On mobile, tabs should show icons only; text appears at `md` (768px+).

### Files to Update

**`src/pages/Dashboard.tsx`**

1. **Tab triggers** (lines 723–745): Hide text labels on mobile using `hidden md:inline`. Change icon `mr-2` to `md:mr-2` so spacing only applies when text is visible. For the Support tab's PRIORITY badge, also hide it on mobile.

2. **TabsList** (line 722): Add `overflow-x-auto` to allow horizontal scrolling as a fallback.

3. **Card vs Table breakpoint** (lines 1005, 1099): Change `block md:hidden` → `block lg:hidden` and `hidden md:block` → `hidden lg:block` so tablets use the card layout instead of the squished table.

