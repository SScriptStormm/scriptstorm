

## Fix Dashboard Tablet and Mobile Layout

### Problems Identified
1. **Tablet**: The tab bar (PROJECTS, CALENDAR, RESEARCH, SUPPORT) is crammed into one row without scrolling, causing tabs to squish together.
2. **Mobile**: Same issue, worse -- the SUPPORT tab gets pushed off-screen entirely because the TabsList has no horizontal scroll or wrapping.
3. **Support tab mismatch**: The trigger renders for `hasScale` (Scale+) but the TabsContent only renders for `hasAuthority` (Authority+). This means Scale-tier users see a tab that shows nothing. This should be aligned.

### Solution

**File: `src/pages/Dashboard.tsx`**

1. **Make TabsList horizontally scrollable** on all screen sizes:
   - Add `w-full overflow-x-auto` to the TabsList
   - Add `flex-shrink-0` to each TabsTrigger so they don't compress
   - Add `min-w-max` to ensure the list doesn't wrap awkwardly

2. **Use shorter labels on mobile** for space efficiency:
   - Show icon-only on small screens (`sm:` prefix for text labels)
   - e.g., on mobile: just the icon; on tablet+: icon + "PROJECTS"

3. **Fix Support tab visibility mismatch** (line 739 vs 1306):
   - Align the trigger condition (`hasScale`) with the content condition (`hasAuthority`) -- both should use `hasScale` since Scale+ users should see support, or both `hasAuthority` if it's truly Authority-only. Will match them to `hasScale` since the trigger already uses it.

### Technical Details

- **TabsList** (line 722): Add `w-full overflow-x-auto scrollbar-hide` classes
- **Each TabsTrigger** (lines 723-745): Add `flex-shrink-0` and use responsive text: `<span className="hidden sm:inline">PROJECTS</span>` pattern
- **Support TabsContent** (line 1306): Change `hasAuthority` to `hasScale` to match the trigger condition

