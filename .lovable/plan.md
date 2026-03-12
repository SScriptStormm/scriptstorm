

## Fix Floating Squares Visibility on Auth Page

The squares use `border-primary-glow` which is the same blue hue (221°) as the background gradient — they'll always blend in regardless of opacity.

**Fix in `src/pages/Auth.tsx` lines 228-229:**

- Left square: Change to `border-cyan-300/50` with a `bg-cyan-400/10` fill and increase border width to `border-[3px]` — gives it a distinctly lighter, more visible cyan tone against the dark blue background
- Right square: Change to `border-cyan-300/20` with `bg-cyan-400/5` fill for subtle but visible contrast

Cyan (hue ~180°) contrasts well against the blue (hue 221°) background while staying on-brand with the cyber/tech aesthetic.

