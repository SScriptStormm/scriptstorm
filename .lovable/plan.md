## Add Dark Blue Background to Left Floating Square on Auth Page

The right square appears darker because the `shadow-cyber` glow pools inside its smaller area, giving it a visible blue fill. The left square is larger so the glow is more spread out and its interior looks empty/transparent.

**Fix**: Add a semi-transparent dark blue background to the left square to visually match.

**Change in `src/pages/Auth.tsx` line 228:**

```tsx
// Before
<div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/45 rotate-45 animate-float shadow-cyber" />

// After
<div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/45 rotate-45 animate-float shadow-cyber bg-primary-glow/5" />
```

This adds a subtle dark blue tint (`bg-primary-glow/5`) to the left square's interior, making it look more consistent with the right square's appearance.

Also change opacity of the left square to 45%