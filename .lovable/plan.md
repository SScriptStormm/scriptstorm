

## Fix Left Square Background to Dark Blue

**Problem:** `bg-primary-glow/10` doesn't work because Tailwind's opacity modifier requires a raw color format, but `primary.glow` is defined as a complete `hsl()` string. The opacity modifier silently fails, producing no visible blue tint.

**Fix in `src/pages/Auth.tsx` (line 228):**
Replace `bg-primary-glow/10` with `bg-primary/10` — the `primary` color is the same blue family (HSL 221 83% 53%) and its opacity modifier works correctly since all other classes use the same pattern.

```
border-2 border-primary-glow/60 bg-primary/10 rotate-45 animate-float shadow-cyber
```

