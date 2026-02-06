

# Remove the Account Status Ring's Background Track

## What We're Doing
Removing the faint circular outline (track) behind the Account Status progress ring to see how it looks without it. This is a quick visual test -- easy to revert if you prefer it with the outline.

## Technical Change

### File: `src/components/ui/RadialProgress.tsx`

The track circle is rendered using the `styles.track` class. Rather than removing the SVG element itself (which would require more changes), we'll make the track fully transparent by setting its opacity to 0.

**Current (line 49):**
```tsx
track: "stroke-[hsl(221,83%,60%)]/10"
```

**Updated:**
```tsx
track: "stroke-transparent"
```

This only affects the `primary` variant (used by Account Status). The Monthly Usage ring uses the `tier` variant, so its outline stays unchanged.

## Result
- The Account Status ring will show only the blue progress arc with its glow -- no background circle
- The Monthly Usage ring remains unchanged
- Easy to revert by changing back to the original track value

