

## Restore Desktop Tab Layout

Looking at the current code, the tabs now have `flex-shrink-0`, `overflow-x-auto`, and `hidden md:inline` classes that were added for mobile/tablet fixes. On desktop these shouldn't visually change much, but the `w-full` on TabsList and `flex-shrink-0` on triggers may be spreading tabs differently than the original layout.

### Changes to `src/pages/Dashboard.tsx`

1. **TabsList (line 722)**: Remove `w-full` and `min-w-0` so desktop tabs don't stretch. Keep `overflow-x-auto scrollbar-hide` only for small screens using responsive classes: add `md:overflow-visible` so desktop behaves as before.

2. **TabsTrigger (lines 723-744)**: Remove `flex-shrink-0` on `md:` and up so desktop tabs size naturally. Change classes to `flex-shrink-0 md:flex-shrink` on each trigger. Restore `px-4` as default (remove the `px-3 md:px-4` split — use `px-3 md:px-4` is fine, keep it). Make text always visible on desktop by keeping `hidden md:inline`.

3. **Badge (line 741)**: Keep `hidden md:inline-flex` so PRIORITY badge shows on tablet+ and desktop.

Essentially: mobile gets icon-only scrollable tabs, tablet gets icon+text scrollable tabs, desktop gets the original non-scrollable full-text tabs — all by adding `md:overflow-visible` and `md:flex-shrink` to undo the mobile-specific constraints at the `md` breakpoint.

