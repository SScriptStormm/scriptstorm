
## Fix: Pixel-Perfect Desktop Alignment for “View Brief Details” Under “Actions”

### What I will change
1. **Target only the desktop table block** in `src/pages/Dashboard.tsx` (the `hidden lg:block` section).
2. Apply a **tiny horizontal nudge (about 2px left)** specifically to the “View Brief Details” icon position in the desktop actions cell so its visual center sits directly under the center of the “Actions” header text.
3. Keep the current custom hover styling (`hover:bg-primary-glow/10`, border glow, text glow) unchanged since it already matches the dashboard aesthetic and avoids the default blue ghost hover.

### Implementation approach
- In the desktop row actions area (around current lines ~1202–1205), add a small desktop-only alignment offset to the info action placement (via wrapper or icon-level class) rather than broad layout changes.
- Keep the header and column structure intact to avoid side effects on completed rows (which include additional actions).
- Do **not** touch the mobile/tablet card layout block (around ~1090–1110).

### Technical details
- **File:** `src/pages/Dashboard.tsx`
- **Scope:** Desktop table action cell only (`lg:block` table path)
- **Likely class-level adjustment:** small left offset such as `mr-[2px]` on the icon-only placement path or `-translate-x-[2px]` on the info button in desktop context.
- **No changes** to:
  - mobile/tablet action button layout
  - pagination
  - hover color system beyond preserving existing custom classes

### Validation checklist
1. Desktop viewport: confirm the info button is visually centered directly below “Actions”.
2. Hover state: confirm no default bright-blue ghost background appears.
3. Tablet and mobile previews: confirm layout remains exactly as-is (no spacing or action button regressions).
