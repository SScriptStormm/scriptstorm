
## Problem

The AccountStatusCard uses `daysRemaining > 180` to detect annual billing. The test account (Scale tier) has exactly 180 days remaining, which fails this check, causing:
1. Badge shows "MONTHLY" instead of "ANNUAL"
2. Radial progress shows 0% (empty circle) because monthly cycle math produces cycleProgress=100%

## Fix

**File**: `src/components/dashboard/AccountStatusCard.tsx`

- Change `const isAnnual = daysRemaining > 180;` to `const isAnnual = daysRemaining >= 180;`

This single change fixes both issues: the badge will correctly show "ANNUAL" with the premium cyan+crown styling, and the radial progress will use a 365-day cycle, showing the correct remaining percentage with a visible arc.
