
Goal: fix the mobile Account Status countdown so the number + “days left” no longer collides with/looks misaligned inside the circle, while keeping tablet/desktop unchanged.

Implementation plan:
1. Update `src/components/dashboard/AccountStatusCard.tsx`
   - Change mobile radial size back to `md` (`size={isMobile ? "md" : "lg"}`) so the center text has enough room.
   - Keep desktop/tablet behavior exactly as-is (`lg` remains unchanged).

2. Improve compact text rendering in `src/components/ui/RadialProgress.tsx`
   - Tighten and center center-stack typography so multi-word sublabels render cleanly:
     - add centered text alignment for label/sublabel
     - use tighter line-height for compact sizes
   - Slightly reduce `sm` sublabel typography so long sublabels are less likely to break awkwardly.

3. Guard desktop/tablet layout
   - Scope the behavioral change to mobile via `useIsMobile` in `AccountStatusCard` only.
   - Do not alter widget grid/layout/breakpoints in `Dashboard`.

Technical details:
- Root cause is the combination of a compact circle (`sm`) plus a two-word sublabel (“days left”) with wide tracking, which can wrap/shift and appear to overlap the ring area on narrow mobile widths.
- Returning to `md` for this specific widget and tightening RadialProgress text alignment/line-height resolves the visual collision without affecting desktop/tablet card dimensions.
- Monthly Usage widget remains unchanged.

Validation checklist:
- Mobile (393x609): number and “days left” sit cleanly inside the ring, no overlap/cutoff.
- Tablet/Desktop: card sizes, spacing, and radial sizing remain visually identical to current behavior.
