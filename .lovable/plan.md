

## Current State

All four tabs (PROJECTS, CALENDAR, RESEARCH, SUPPORT) have identical padding:
- **Mobile**: `px-2 py-1.5`
- **Desktop/Tablet (sm+)**: `px-4 py-2.5`

So CALENDAR and RESEARCH are not smaller than the others — they all share the same classes.

## Plan

Change the desktop/tablet horizontal padding for **CALENDAR** and **RESEARCH** tabs from `sm:px-4` to `sm:px-[50px]` (50px as requested). Leave mobile padding (`px-2 py-1.5`) unchanged. Leave PROJECTS and SUPPORT tabs unchanged.

**Files to edit**: `src/pages/Dashboard.tsx` (lines 727 and 732)
- CALENDAR tab: `sm:px-4` → `sm:px-[50px]`
- RESEARCH tab: `sm:px-4` → `sm:px-[50px]`

