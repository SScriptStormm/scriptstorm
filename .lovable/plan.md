

## Fix: Restore Desktop Tab Layout and Fix Tablet/Mobile

### What Went Wrong
The previous change made tab labels hidden below `sm` (640px), which affected desktop appearance. The content projects table also shows at `md` (768px) on tablets where it's too cramped.

### Changes to `src/pages/Dashboard.tsx`

**1. Restore desktop tab text, hide only on mobile (<768px)**
- Change `hidden sm:inline` to `hidden md:inline` on all tab labels (PROJECTS, CALENDAR, RESEARCH, SUPPORT)
- Change `sm:mr-2` to `md:mr-2` on tab icons
- Change `sm:ml-2` / `hidden sm:inline-flex` on PRIORITY badge similarly
- This means: mobile shows icons only, tablet and desktop show full text

**2. Fix content projects table on tablet**
- Change the table breakpoint from `md:block` / `md:hidden` to `lg:block` / `lg:hidden`
- This means tablets (768px-1023px) get the mobile card layout instead of the squished table
- Desktop (1024px+) gets the full table as before

### Result
- Desktop: unchanged from original (full text labels, full table)
- Tablet: scrollable icon+text tabs, card-based project list instead of cramped table
- Mobile: icon-only tabs, card-based project list

