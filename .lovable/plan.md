

## Darken the First Floating Square's Interior

**Line 577 in `src/pages/Dashboard.tsx`**

Add a subtle dark blue background fill to the first (left) floating square. Currently it has no `bg-` class — the visible blue comes from `border-primary-glow/40` and `shadow-cyber`. Adding `bg-primary/8` will darken the interior slightly without making it as dark as the second square.

```diff
- <div className="absolute top-40 left-10 w-16 h-16 border-2 border-primary-glow/40 rotate-45 animate-float shadow-cyber" />
+ <div className="absolute top-40 left-10 w-16 h-16 border-2 border-primary-glow/40 rotate-45 animate-float shadow-cyber bg-primary/[0.08]" />
```

Single class addition — no other files affected.

