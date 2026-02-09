

# Make the "Submit New Content Brief" Button Stand Out More

## Goal
Keep the exact same design (glassmorphic card, gradient overlays, icon, text, arrow) but add subtle always-on visual effects that draw the eye and encourage clicks -- without changing colors, layout, or structure.

## What Changes

Three enhancements layered onto the existing button:

### 1. Always-on Pulsing Glow Border
Currently, the border only glows brighter on hover. Adding a gentle, continuous pulsing glow around the button makes it stand out at first glance, even before the user interacts with it. This uses the existing `glow-pulse-soft` animation already defined in the project.

### 2. Continuous Shimmer Sweep
Currently, the shimmer overlay only sweeps across on hover. Adding a slower, always-running shimmer creates a premium "living" effect that catches the eye as clients scan the dashboard. This reuses the existing `shimmer` keyframe already in the Tailwind config.

### 3. Subtle Icon Pulse
The Plus (+) icon inside the glowing container will get a gentle breathing animation (`scale-subtle`), drawing attention to the action point. This animation already exists in the Tailwind config.

## Visual Impact
- The button will gently glow and shimmer at all times, making it the most eye-catching element on the dashboard
- On hover, the existing effects (brighter border, scale-up, faster shimmer) still kick in for satisfying feedback
- No new colors, fonts, or layout changes -- purely additive animation enhancements

## Technical Details

### File: `src/pages/Dashboard.tsx` (lines 651-687)

**Change 1 -- Add pulsing glow to the button element (line 655):**
Add `animate-glow-pulse-soft` to the button's className so the border glow pulses continuously.

**Change 2 -- Make the shimmer always-on (line 664):**
Replace the hover-triggered shimmer (`translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700`) with a continuous shimmer animation using `animate-shimmer` that runs on a loop.

**Change 3 -- Add breathing animation to the Plus icon container (line 669):**
Add `animate-scale-subtle` to the icon wrapper div so the Plus icon gently scales up and down.

All three animations (`glow-pulse-soft`, `shimmer`, `scale-subtle`) are already defined in `tailwind.config.ts` -- no config changes needed.
