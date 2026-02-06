
# Fix: Keep the Original Vivid Blue, Brighten Via Glow

## The Problem
The last change replaced the ring's vivid blue (`hsl(221 83% 53%)`) with a lighter blue (`hsl(221 83% 65%)`). Higher lightness washes out the color, making it appear grayish rather than brighter. The user wants the original punchy blue kept, with the ring appearing more vivid/glowing, and the "270" label matching the ring color.

## What "Brighter" Means Here
- NOT higher lightness (which washes out the color)
- YES more intense glow effect (the glowing aura around the ring)
- The ring and text should both use the same vivid blue

## Solution
Revert the stroke and text back to the original `primary` color (the vivid blue at 53% lightness), and amplify the drop-shadow glow to make it visually "brighter" without changing the actual color. The text will also use `text-primary` so it matches the ring exactly.

## Technical Changes

### File: `src/components/ui/RadialProgress.tsx`

Update the `primary` entry in the styles object (lines 46-51):

**Current (washed out):**
```tsx
primary: {
  stroke: "stroke-primary-glow",
  glow: "drop-shadow-[0_0_12px_hsl(221_83%_65%/0.8)]",
  text: "text-primary-glow",
  track: "stroke-primary-glow/10"
},
```

**Updated (vivid blue with intense glow):**
```tsx
primary: {
  stroke: "stroke-primary",
  glow: "drop-shadow-[0_0_16px_hsl(221_83%_53%/0.9)]",
  text: "text-primary",
  track: "stroke-primary/10"
},
```

### What changes and why:
- **Ring stroke**: Back to `stroke-primary` -- the original vivid blue at 53% lightness, not the washed-out 65%
- **Text**: Changed to `text-primary` -- now the "270" label is the exact same color as the ring
- **Glow effect**: Increased radius from 12px to 16px, increased opacity from 0.8 to 0.9, using the same 53% lightness blue -- this makes the ring appear brighter/more radiant without changing the actual blue color
- **Track**: Back to `stroke-primary/10` for consistency

## Result
- The ring stays the same vivid, saturated blue it was originally
- The "270" text now matches the ring color exactly
- The glow effect is stronger, making the whole ring appear brighter and more vivid
- No gray, no washed-out appearance
