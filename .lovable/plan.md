

## Fix: Mobile/Tablet "View Brief Details" Button Hover Style

### Problem
The mobile/tablet "View Brief Details" button uses `variant="ghost"` which applies a default bright blue hover background (`hover:bg-accent`). The desktop version already overrides this with `hover:bg-primary-glow/10`, but the mobile/tablet version does not.

### Solution
Add `hover:bg-primary-glow/10` to the mobile/tablet button's className (line 1099) to match the subtle glow hover used on the desktop version. No changes to the desktop layout.

### Change
**File:** `src/pages/Dashboard.tsx`, line 1099

Add `hover:bg-primary-glow/10` to the existing className string on the mobile/tablet View Brief Details button.

