

## Dashboard Text Readability Improvements

### Problems Found
1. `text-[10px]` used for badges and word counts in the desktop table — too small for comfortable reading
2. `text-white/50` and `text-white/40` used for secondary text — insufficient contrast on dark backgrounds
3. Gradient text on project titles fades to `white/70` at the end, making long titles harder to read
4. All text uses `font-mono` — monospace is less legible for body/descriptive text

### Proposed Fixes in `src/pages/Dashboard.tsx`

**1. Bump minimum font size from 10px to 11px**
- Lines 1156, 1166, 1176, 1196: Change `text-[10px]` to `text-[11px]` — small but meaningful improvement for badge and metadata text in the desktop table

**2. Raise low-opacity text from /50 to /60**
- Lines 1047, 1156, 1191, 1198: Change `text-white/50` to `text-white/60` for word counts, dashes, and secondary info
- This gives ~15% more contrast while keeping the visual hierarchy

**3. Strengthen gradient text on project titles**
- Lines 1044, 1153: Change `to-white/70` to `to-white/85` so the tail end of long titles remains readable

**4. Keep font-mono** — This is a deliberate design choice ("Command Center" aesthetic). Changing it would break the brand identity, so no change recommended here.

### No changes needed for
- Tab triggers and filter buttons: `text-xs` / `text-sm` is adequate at their current contrast levels
- Placeholder text (`text-white/30`): Standard for placeholder styling, not meant to be primary content

### Files to edit
- `src/pages/Dashboard.tsx` — ~8 line changes across the file

