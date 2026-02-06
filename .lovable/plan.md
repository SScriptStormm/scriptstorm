

# Match Account Status Ring Style to Monthly Usage Ring

## What Changes
The Account Status ring currently has a much stronger glow effect (16px radius, 0.9 opacity) compared to the Monthly Usage ring (8px radius, 0.6 opacity). This makes them look visually different beyond just color. The fix is to dial back the `primary` variant's glow to match the `tier` variant's glow intensity.

## Technical Change

### File: `src/components/ui/RadialProgress.tsx`

Update the `primary` variant glow to use the same 8px radius and 0.6 opacity that the `tier` variant uses:

**Before:**
```tsx
primary: {
  stroke: "stroke-[hsl(221,83%,60%)]",
  glow: "drop-shadow-[0_0_16px_hsl(221_83%_53%/0.9)]",
  text: "text-[hsl(221,83%,60%)]",
  track: "stroke-[hsl(221,83%,60%)]/10"
},
```

**After:**
```tsx
primary: {
  stroke: "stroke-[hsl(221,83%,60%)]",
  glow: "drop-shadow-[0_0_8px_hsl(221_83%_60%/0.6)]",
  text: "text-[hsl(221,83%,60%)]",
  track: "stroke-[hsl(221,83%,60%)]/10"
},
```

### What this does:
- **Glow radius**: 16px down to 8px (matches `tier` variant)
- **Glow opacity**: 0.9 down to 0.6 (matches `tier` variant)
- **Glow color**: Updated to use the same 60% lightness blue as the ring itself (so the glow matches the stroke, just like the `tier` variants where the glow color matches their stroke color)
- **Everything else stays the same**: color, size, stroke width, labels, animation

This is a single line change in one file. The ring color remains the vivid blue -- only the glow intensity is brought in line with the Monthly Usage ring.
