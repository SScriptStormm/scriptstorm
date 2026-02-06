

# Keep the Brighter Blue Permanently on the Account Status Ring

## The Problem
When switching browser tabs and returning, the blue ring briefly appears brighter and more vivid before settling into a duller shade. This happens because the browser re-composites the drop-shadow filter on tab focus, briefly rendering a more vibrant blue. The user wants that vibrant blue to be permanent.

## Why Previous Attempts Failed
- `stroke-primary` (53% lightness): Too dark/muted -- this is the "dull" state the user dislikes
- `stroke-primary-glow` (65% lightness): Too washed out -- higher lightness desaturates the blue, making it look gray

## Solution
Use a custom vivid blue color directly in the RadialProgress component's `primary` variant, bypassing both CSS variables. The target is approximately 60% lightness with full 83% saturation -- brighter than `primary` but not washed-out like `primary-glow`. This uses explicit HSL values in Tailwind's arbitrary value syntax so the exact color is locked in and cannot shift.

## Technical Changes

### File: `src/components/ui/RadialProgress.tsx`

Update the `primary` entry in the styles object (lines 46-51):

**Current:**
```tsx
primary: {
  stroke: "stroke-primary",
  glow: "drop-shadow-[0_0_16px_hsl(221_83%_53%/0.9)]",
  text: "text-primary",
  track: "stroke-primary/10"
},
```

**Updated:**
```tsx
primary: {
  stroke: "stroke-[hsl(221,83%,60%)]",
  glow: "drop-shadow-[0_0_16px_hsl(221_83%_53%/0.9)]",
  text: "text-[hsl(221,83%,60%)]",
  track: "stroke-[hsl(221,83%,60%)]/10"
},
```

### What changes:
- **Ring stroke and text**: Use `hsl(221, 83%, 60%)` -- same hue (221) and saturation (83%) as the original, but lightness bumped from 53% to 60%. This produces a brighter, more electric blue without the washed-out gray effect that 65% caused
- **Glow effect**: Kept at the current intense setting (16px radius, 0.9 opacity, 53% lightness) -- the slightly darker glow behind a brighter ring creates a natural depth effect
- **Track**: Updated to match the new color for consistency

### Why 60% lightness specifically:
- 53% (current `--primary`): The "dull" state the user sees after the tab-switch brightness fades
- 60% (proposed): The sweet spot -- visibly brighter, still saturated and vivid, matches the transient "bright flash"
- 65% (`--primary-glow`): Too light, desaturated, appeared gray

## Result
- The ring and "270" label will permanently display the brighter, vivid blue
- Same hue and saturation as the original -- just more luminous
- No more brightness flickering when switching tabs
- The glow aura remains intense, complementing the brighter ring
