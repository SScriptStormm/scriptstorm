

## Make Auth Page Squares Consistent with Dashboard

Two differences found (keeping positions the same):

1. **Left square**: Auth has `bg-primary-glow/5` — Dashboard does not. Remove it from Auth.
2. **Right square**: Already matches.

**Change in `src/pages/Auth.tsx` line 228:**
Remove `bg-primary-glow/5` from the left square so it matches the Dashboard's styling exactly.

