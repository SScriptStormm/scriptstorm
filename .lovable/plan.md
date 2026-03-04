

## Three Fixes: Scrollbar Consistency, Dashboard Text Readability, Back Button Brightness

### 1. Scrollbar — Force Dark Track + Blue Thumb Globally

The current scrollbar CSS in `src/index.css` uses `!important` and should work, but the issue is that the `--background` CSS variable is white (`0 0% 100%`) in light mode. On the production domain, if the page briefly renders without the gradient background, the browser's native scrollbar shows white.

**Fix:** Add `html` and `body` explicit dark scrollbar overrides at the top level, and add `color-scheme: dark` to force the browser's native scrollbar to default to dark mode even before CSS loads.

**File: `src/index.css`**
- In the `html, body` block (line 130), add `color-scheme: dark;` — this tells the browser to render native UI elements (including scrollbars) in dark mode universally.

### 2. Dashboard Text — Final Readability Pass

The previous changes bumped `/30` and `/40` to `/50` and `/60`. After review, these values are now appropriate. The remaining `/40` instances in inactive pipeline icons (`text-white/40`) are intentional to show disabled state. No further text changes needed — the current state is readable.

### 3. Back to Dashboard Button — Too Dim

The button uses `bg-primary/10` and `text-primary-glow` with `border-primary-glow/40`. The issue is `bg-primary/10` is extremely translucent and `text-primary-glow` alone isn't bright enough against the dark overlay.

**File: `src/pages/AccountSettings.tsx` (line 279)**
Change the button className:
- `bg-primary/10` → `bg-primary/20` (double the background opacity)
- `text-primary-glow` → `text-white` (white text is universally readable)
- `border-primary-glow/40` → `border-primary-glow/60` (stronger border)
- Add `shadow-[0_0_15px_hsl(221_83%_53%/0.2)]` for a subtle default glow

New className:
```
mb-6 bg-primary/20 backdrop-blur-sm text-white border border-primary-glow/60 hover:border-primary-glow hover:bg-primary/30 hover:shadow-[0_0_20px_hsl(221_83%_53%/0.4)] shadow-[0_0_15px_hsl(221_83%_53%/0.2)] font-mono text-xs sm:text-sm transition-all duration-300 gap-2
```

### Summary
- **1 line** in `src/index.css`: add `color-scheme: dark;`
- **1 line** in `src/pages/AccountSettings.tsx`: brighten the back button
- Dashboard text is already at acceptable readability after the previous round of fixes

