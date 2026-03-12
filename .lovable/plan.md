

## Darken Left Floating Square Slightly

In `src/pages/Dashboard.tsx` line 577, reduce the left square's border opacity from `/40` to `/33` — slightly darker than its current `/40` but still lighter than the right square's `/25`.

```
- border-primary-glow/40
+ border-primary-glow/33
```

