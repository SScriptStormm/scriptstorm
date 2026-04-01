

## Fix: Blank Production Summary Filter When No Articles Exist for Current Month

### Problem
The `selectedMonth` state initializes to the current month (e.g. `2026-04`), but `availableMonths` is built only from months that have articles. When no articles exist for the current month, the current month value isn't in the dropdown options, so the `Select` component shows a blank value.

### Solution
Ensure the current month is always included in the `availableMonths` list, even if it has 0 articles.

### Change
**File: `src/components/dashboard/ContentQueueCard.tsx`**, inside the `availableMonths` `useMemo` (lines 40-49):

After building the month map from articles, check if the current month is present. If not, add it with a count of 0. This ensures the dropdown always has the current month as an option and the select displays correctly.

```tsx
const availableMonths = useMemo(() => {
  const monthSet = new Map<string, number>();
  articles.forEach(a => {
    const my = getMonthYear(a.created_at);
    monthSet.set(my, (monthSet.get(my) || 0) + 1);
  });
  // Always include current month
  const current = getCurrentMonthYear();
  if (!monthSet.has(current)) {
    monthSet.set(current, 0);
  }
  return Array.from(monthSet.entries())
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([value, count]) => ({ value, label: getMonthLabel(value), count }));
}, [articles]);
```

### Scope
- Single file change
- All layouts affected equally

