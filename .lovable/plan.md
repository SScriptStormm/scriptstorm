Update support hours copy and add timezone note.

## Changes

**1. `src/components/dashboard/PrioritySupport.tsx`**
- Change "Business hours: Monday–Friday, 9 AM – 6 PM HKT (Hong Kong Time)" → "Business hours: Monday–Friday, 6 AM – 3 PM HKT (Hong Kong Time)"
- Add note below business hours: "For clients outside Asia, please expect responses within your next business day. Our AI assistant is always available for instant help."

**2. `src/pages/Support.tsx`**
- Same business-hours text update and same timezone note added (if the string appears there too — will verify on implementation).
