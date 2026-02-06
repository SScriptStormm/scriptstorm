

# Change Account Status Ring to Cyan/Teal

## What Changes
The Account Status radial progress ring switches from blue (`hsl(221, 83%, 50%)`) to a vibrant **cyan** color that naturally pops against the dark blue dashboard backgrounds and blue-tinted GlassCard containers.

## Why This Works
- Cyan sits on the opposite side of the color wheel from the deep blue backgrounds, creating strong visual contrast
- It reads as energetic and modern, fitting the dashboard's sci-fi/neon aesthetic
- It works against every tier variant of the GlassCard (starter/blue, growth/green, scale/purple, authority/orange, dominance/gold)

## Technical Change

### File: `src/components/ui/RadialProgress.tsx`

Update the `primary` variant styling (lines 46-51):

**Before:**
```tsx
primary: {
  stroke: "stroke-[hsl(221,83%,50%)]",
  glow: "drop-shadow-[0_0_8px_hsl(221_83%_50%/0.6)]",
  text: "text-[hsl(221,83%,50%)]",
  track: "stroke-[hsl(221,83%,50%)]/20"
},
```

**After:**
```tsx
primary: {
  stroke: "stroke-cyan-400",
  glow: "drop-shadow-[0_0_8px_hsl(190_95%_60%/0.6)]",
  text: "text-cyan-400",
  track: "stroke-cyan-400/20"
},
```

### What this does:
- **Stroke**: Changes the ring arc from blue to Tailwind's `cyan-400` (a vivid, bright cyan)
- **Glow**: Applies a matching cyan glow using `hsl(190, 95%, 60%)` at the same 8px/0.6 intensity as the Monthly Usage ring
- **Text**: The center number ("days left") switches to cyan to match the ring
- **Track**: The background circle uses 20% opacity cyan, providing a visible but subtle frame
- All sizing, animation, and layout stay exactly the same -- only the color palette changes
- This is a single variant update in one file; no other files are modified

