

## Re-add RadialProgress circle on mobile in MonthlyUsageCard

The radial progress circle is currently hidden on mobile (`hidden sm:block` on line 57). Change it to always show, but use a smaller size on mobile.

### Change in `src/components/dashboard/MonthlyUsageCard.tsx`
- Import `useIsMobile` hook
- Use it to conditionally set `size="md"` on mobile, `size="lg"` on desktop
- Remove `hidden sm:block` so the radial is always visible

Line 57: `hidden sm:block` → `block` (always visible)
Line 61: `size="lg"` → `size={isMobile ? "md" : "lg"}`

