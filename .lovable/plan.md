

## Make Left Square More Visible on Auth Page

The left floating square is nearly invisible because it only has a border with no fill, and the `shadow-cyber` glow blends into the Auth page's busy background effects.

**Changes to `src/pages/Auth.tsx` (line 228):**
- Add a semi-transparent background fill: `bg-primary-glow/10`
- Boost the border opacity from `/45` to `/60`
- This gives the square a visible tinted glass appearance while keeping the aesthetic consistent

**Before:**
```
border-2 border-primary-glow/45 rotate-45 animate-float shadow-cyber
```

**After:**
```
border-2 border-primary-glow/60 bg-primary-glow/10 rotate-45 animate-float shadow-cyber
```

