

## Production Summary Readability Audit

### What I Found

The Production Summary card uses the `AnimatedStat` component for all numbers and labels. After reviewing both files, here is the source of the inconsistency:

**Labels (e.g., "Completed", "In Progress", "0 words")** — All use `text-white/50` via `AnimatedStat`. These are consistent with each other but on the faint side, especially under night light or low brightness.

**Colored number values** — Each variant uses a different hue: `text-emerald-400` (Completed), `text-amber-400` (In Progress), `text-purple-400` (In Review), `text-primary-glow` (Pending/Blog), `text-rose-400` (YT Scripts). These colors have inherently different perceived brightness to the human eye — amber and emerald appear brighter than purple and rose. This is why some stats look "brighter and dimmer than one another."

**Category name labels** (e.g., "Blog Articles", "Social Posts") in the Content Breakdown cards use `text-white/80`, which is fine.

### Proposed Fix

**File: `src/components/ui/AnimatedStat.tsx`**

Bump all variant label opacities from `text-white/50` to `text-white/60` for improved readability across all screen conditions. This affects every stat label in both the Status Overview and Content Breakdown sections uniformly — one change, six variants:

```
label: "text-white/50"  →  label: "text-white/60"
```

This applies to: `default`, `primary`, `success`, `warning`, `danger`, `purple` variants (lines 19, 25, 31, 37, 43, 49).

The colored number values (emerald, amber, purple, rose, blue) are intentionally different colors for branding and should stay as-is — their brightness difference is a natural property of those hues and helps with visual distinction.

