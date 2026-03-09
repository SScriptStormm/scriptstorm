

## Shrink Mobile Tab Container Width

The `TabsList` currently has `w-full` on mobile, stretching it across the entire screen. To make it shorter (narrower), replace `w-full` with `w-auto` on mobile so it only takes the width of its contents.

### Change in `src/pages/Dashboard.tsx` (line 722)

Replace `w-full justify-center` with `w-auto mx-auto` so the container shrinks to fit the 4 icons and auto-centers via margin instead of stretching full-width:

```
- w-full justify-center sm:w-auto sm:justify-start
+ w-auto mx-auto justify-center sm:mx-0 sm:justify-start
```

This keeps the tabs centered on mobile but removes the full-width stretch. Desktop/tablet layout is unchanged.

