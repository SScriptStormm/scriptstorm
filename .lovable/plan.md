
# Brighten Account Status Ring and Match Label Color

## The Problem
The Account Status radial progress ring appears dim compared to its "270" label because they use different shades of the same blue:
- Ring stroke: `stroke-primary` = `hsl(221 83% 53%)` (darker)
- Label text: `text-primary-glow` = `hsl(221 83% 65%)` (brighter)

This creates a visual mismatch where the number looks brighter than the ring it sits inside.

## Solution
Update the `primary` variant in the `RadialProgress` component to use the brighter `primary-glow` color for everything -- the ring stroke, the glow effect, and the track. The label already uses `text-primary-glow`, so they will naturally match.

## Technical Changes

### File: `src/components/ui/RadialProgress.tsx`

Update the `primary` entry in the styles object (lines 46-51):

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
  track: "stroke-primary-glow/10"
},
```

### What changes:
- **Ring stroke**: `stroke-primary` (53% lightness) to `stroke-primary-glow` (65% lightness) -- brighter ring, same blue hue
- **Glow effect**: Increased radius from 8px to 12px, increased opacity from 0.6 to 0.8, and updated the HSL lightness to 65% to match -- more vivid, visible glow
- **Track**: Updated to use `primary-glow` for consistency
- **Text**: Already uses `text-primary-glow` -- no change needed, it will now match the ring perfectly

## Result
- The ring and the "270" label will be the same bright blue color
- The ring will appear noticeably brighter with a more vivid glow
- The hue stays exactly the same (blue, hsl 221)
- Only the Account Status and any other widget using `variant="primary"` are affected
