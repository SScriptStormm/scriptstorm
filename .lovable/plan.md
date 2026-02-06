
# Fix Account Status Ring: Brightness and Color Mismatch

## Problems
1. The ring is too dim and hard to see against the dark background
2. The "270" number color (bright blue) does not match the ring color (darker blue)

## Root Cause
In `RadialProgress.tsx`, the `primary` variant uses two different shades of blue:
- **Ring stroke**: `stroke-primary` which resolves to `hsl(221 83% 53%)` -- darker
- **Label text**: `text-primary-glow` which resolves to `hsl(221 83% 65%)` -- brighter

The glow effect is also weak: only 8px radius at 0.6 opacity.

## Solution
Update the `primary` variant styles in `RadialProgress.tsx` so the ring, label, and glow all use the same brighter blue and the glow is more visible.

## Technical Changes

### File: `src/components/ui/RadialProgress.tsx`

Update the `primary` entry in the `styles` object inside `getVariantStyles`:

**Before:**
```tsx
primary: {
  stroke: "stroke-primary",
  glow: "drop-shadow-[0_0_8px_hsl(221_83%_53%/0.6)]",
  text: "text-primary-glow",
  track: "stroke-primary/10"
},
```

**After:**
```tsx
primary: {
  stroke: "stroke-primary-glow",
  glow: "drop-shadow-[0_0_12px_hsl(221_83%_65%/0.8)]",
  text: "text-primary-glow",
  track: "stroke-primary-glow/15"
},
```

### What this changes:
- **Ring stroke**: switches from `stroke-primary` (53% lightness) to `stroke-primary-glow` (65% lightness) -- brighter, matching the label
- **Glow**: increases radius from 8px to 12px and opacity from 0.6 to 0.8 -- more visible
- **Glow color**: updated to match the brighter `primary-glow` hue (`65%` lightness)
- **Track**: uses `stroke-primary-glow/15` instead of `stroke-primary/10` -- slightly more visible background track
- **Label text**: unchanged (`text-primary-glow`) -- already the correct bright blue

## Result

| Element | Before | After |
|---------|--------|-------|
| Ring color | Dark blue (53% lightness) | Bright blue (65% lightness) |
| Label "270" color | Bright blue (65% lightness) | Bright blue (65% lightness) -- matches ring |
| Glow intensity | 8px, 0.6 opacity | 12px, 0.8 opacity -- more visible |
| Track ring | Very faint (10% opacity) | Slightly visible (15% opacity) |

This is a single-line change in one file that fixes both the dimness and color mismatch issues.
