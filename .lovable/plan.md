

# Make the Account Status Ring Stand Out from the Background

## The Problem
The Account Status ring uses a blue color (`hsl(221, 83%, 60%)`) sitting inside a GlassCard that also has blue-tinted borders, glows, and gradient overlays. The ring's track (the unfilled circular path behind the progress arc) is set to only **10% opacity** of that same blue. Blue-on-blue at 10% opacity is essentially invisible -- the ring blends right into the card background like camouflage.

The Monthly Usage ring doesn't have this problem because its green/amber/red colors naturally contrast against the blue-tinted card.

## Solution
Increase the track opacity from 10% to 20%, so the full circular path is visible behind the progress arc. This makes the ring's shape clearly defined against the card background without changing any colors or the overall design language.

This is the same approach used across dashboard UIs -- a subtle but visible track circle that frames the progress arc and separates it from the background.

## Technical Change

### File: `src/components/ui/RadialProgress.tsx`

Update only the `track` value in the `primary` variant (line 50):

**Before:**
```tsx
track: "stroke-[hsl(221,83%,60%)]/10"
```

**After:**
```tsx
track: "stroke-[hsl(221,83%,60%)]/20"
```

### What this does:
- The track circle (the unfilled background ring) goes from 10% to 20% opacity
- This makes the full circular outline clearly visible against the dark glass card
- The progress arc, text, and glow all remain exactly the same
- The ring now has a defined shape that pops out from the background instead of blending in
- Single property change in one file

