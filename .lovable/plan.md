

## Upgrade Production Summary Period Filter

### What Changes
Replace the hardcoded 3-option period filter (This Month, Last Month, All Time) in `ContentQueueCard` with a dynamic month list derived from the article data — matching the same pattern used in the Content Projects filter.

### File: `src/components/dashboard/ContentQueueCard.tsx`

1. **Remove** the `Period` type, `getPeriodLabel`, and `filterByPeriod` helpers (the hardcoded this_month/last_month/all_time logic)

2. **Add** dynamic month extraction helpers (reusing the same pattern from Dashboard.tsx):
   - `getMonthYear(dateString)` — extracts `YYYY-MM` from a date
   - `getMonthLabel(monthYear)` — formats to "March 2026" using `formatMonthYear` from `dateUtils`
   - Compute `availableMonths` from article data, sorted reverse chronologically
   - Default selected value: current month's `YYYY-MM` string

3. **Update the Select dropdown** to list all available months with article counts, plus an "All Time" option at the bottom — same style as the Content Projects month filter

4. **Update filtering logic** to filter by the selected `YYYY-MM` value, or show everything for `"all_time"`

5. **Update the section heading** to show the selected month name dynamically (e.g., "March 2026 Status" or "All Time Status")

### No changes to mobile layout or visual styling — only the filter options and data logic.

