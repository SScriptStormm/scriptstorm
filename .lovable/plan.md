

# Make Animations Equally Strong Regardless of Bar Fill Width

## The Root Cause

The shimmer animation sweeps across only the colored (filled) portion of the bar. A bar at 20% fill has much less visible area for the shimmer to sweep across compared to a bar at 60% fill. This makes the Social Posts bar look visually weaker than the Product Descriptions bar -- even though the animation settings are identical. The glow shadow also scales with fill width, compounding the effect.

## The Fix

Enhance the NeonProgress component so that animations feel equally strong regardless of how full the bar is. Three targeted changes:

1. **Brighter shimmer on high intensity** -- increase the white overlay from 30% to 50% opacity, so even a thin bar's shimmer is clearly visible
2. **Stronger box-shadow glow on high intensity** -- increase the glow spread from 20px to 30px so narrower bars radiate more visible light
3. **Add a pulsing glow animation** -- a subtle opacity pulse on the fill bar itself (cycling between 85% and 100% opacity) that is completely independent of bar width, making even narrow bars feel alive and vibrant

## Technical Details

### File: `src/components/ui/NeonProgress.tsx`

**1. Brighter shimmer for high glow intensity (~line 134)**

Change the shimmer gradient opacity based on `glowIntensity`:
- low/medium: keep `via-white/30` (current)
- high: use `via-white/50` (brighter highlight)

**2. Stronger shadow spread for high glow intensity (~lines 21-68)**

Update the `getVariantStyles` function to return two glow levels. When `glowIntensity` is "high", use a 30px spread and higher opacity shadow instead of 20px. For example, the emerald (green) variant goes from:
- `shadow-[0_0_20px_hsl(160_84%_45%/0.5)]`
to:
- `shadow-[0_0_30px_hsl(160_84%_45%/0.7)]`

This applies to all color variants (green, amber, rose, primary).

**3. Add a pulsing glow animation to the fill bar (~line 122-128)**

When `animated` is true and `glowIntensity` is "high", add an inline CSS animation to the fill bar that gently pulses its opacity:
```
animation: neon-bar-pulse 2s ease-in-out infinite
```
This keyframe cycles `opacity` between `0.85` and `1`, creating a subtle breathing effect that is completely independent of bar width. A new `@keyframes neon-bar-pulse` will be added either inline or via the Tailwind config.

### No changes needed to `MonthlyUsageCard.tsx`
All three bars already use `glowIntensity="high"`, so they will automatically pick up the enhanced effects from the component.

## What This Changes Visually
- The shimmer highlight on narrow bars becomes noticeably brighter
- The glow halo around all bars becomes larger and more prominent
- All three bars will gently pulse in brightness, creating a uniform "alive" feel
- A bar at 20% fill will now look just as vibrant as a bar at 60% fill
- No changes to colors, sizing, layout, or the stop-at-limit behavior

