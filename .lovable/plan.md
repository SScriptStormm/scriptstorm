

# Remove Completion Rate from Production Summary

## Summary
Remove the Completion Rate progress bar section from the Production Summary widget, since the status breakdown (Completed/In Progress/Pending) and the Monthly Usage widget already provide clearer, more useful information.

## Changes

### `src/components/dashboard/ContentQueueCard.tsx`

1. Remove the `completionRate` variable calculation (around line 57)
2. Remove the entire "Completion Rate" section (the `div` block with the `NeonProgress` bar, roughly lines 88-100)
3. Keep everything else intact: the period selector, status overview, and content breakdown sections

This is a straightforward removal with no impact on other components.

