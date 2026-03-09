

## Fix Dashboard Tablet & Mobile Layout

### Changes to `src/pages/Dashboard.tsx`

**1. Remove scroll from TabsList, make tabs fit naturally**

Replace `overflow-x-auto scrollbar-hide` and `min-w-0` on the TabsList with `flex` layout that distributes tabs evenly. Remove `flex-shrink-0` from each TabsTrigger so they can size naturally. Reduce padding on triggers (`px-2 py-1.5 sm:px-3 sm:py-2`) so they fit comfortably at tablet widths without needing scroll.

**2. Always show text labels (remove hidden sm:inline)**

Since we're removing scroll, the tabs need to be compact but still readable. Change `<span className="hidden sm:inline">` to always-visible but use smaller text on mobile (`text-[10px] sm:text-xs`). This avoids icon-only tabs that are unclear.

**3. Fix "Your Content Projects" table on tablet**

The table currently shows at `md` (768px+) but it's too wide at that breakpoint with 6 columns. Change the breakpoint from `md` to `lg` (1024px):
- Card layout: `block lg:hidden` (shown on mobile + tablet)
- Table layout: `hidden lg:block` (shown on desktop only)

This way tablet users get the spacious card layout instead of the squished table.

