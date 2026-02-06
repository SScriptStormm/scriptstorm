

# Fix Account Status Ring: Use Vivid Blue Instead of Washed-Out Grey-Blue

## The Problem
The previous fix changed both the ring and label to `primary-glow` (65% lightness), which looks washed-out and greyish rather than a clear, vibrant blue. The Monthly Usage ring below it looks vivid and punchy by comparison because it uses Tailwind's built-in saturated colors (like `emerald-500`).

## What You Want
- The ring should be a vivid, unmistakably **blue** color -- not grey or washed out
- The "270" label should match the ring color exactly
- The overall vibrancy should be comparable to the Monthly Usage ring below

## Root Cause
The CSS variable `--primary-glow` resolves to `hsl(221 83% 65%)`. At 65% lightness, this hue appears desaturated and pastel/greyish on dark backgrounds. It lacks the punch of Tailwind's built-in color palette (e.g., `blue-500` at `hsl(217 91% 60%)`).

## Solution
Switch the `primary` variant to use Tailwind's built-in `blue-500` color, which is a vivid, saturated blue that reads clearly as "blue" on dark backgrounds. This matches the vibrancy of the `emerald-500` used in the Monthly Usage ring's tier variant.

## Technical Changes

### File: `src/components/ui/RadialProgress.tsx`

Update the `primary` entry (lines 46-51):

**Before:**
```tsx
primary: {
  stroke: "stroke-primary-glow",
  glow: "drop-shadow-[0_0_12px_hsl(221_83%_65%/0.8)]",
  text: "text-primary-glow",
  track: "stroke-primary-glow/15"
},
```

**After:**
```tsx
primary: {
  stroke: "stroke-blue-500",
  glow: "drop-shadow-[0_0_12px_hsl(217_91%_60%/0.8)]",
  text: "text-blue-500",
  track: "stroke-blue-500/15"
},
```

## What This Changes

| Element | Before (washed out) | After (vivid) |
|---------|---------------------|---------------|
| Ring stroke | `primary-glow` -- greyish blue | `blue-500` -- vivid, saturated blue |
| Label "270" | `primary-glow` -- greyish blue | `blue-500` -- matches ring exactly |
| Glow color | Based on 65% lightness grey-blue | Based on `blue-500` hue -- vivid |
| Track | `primary-glow/15` | `blue-500/15` -- consistent |

Tailwind's `blue-500` is `hsl(217 91% 60%)` -- higher saturation (91% vs 83%) and a slightly different hue that reads as a clean, vivid blue. This is the same design approach used for the Monthly Usage ring's `emerald-500`.

