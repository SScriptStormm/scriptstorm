

## Rebrand Content Pipeline Card: Green Container to Blue, Keep Green for Completed Steps

### Rationale
The green card border/glow implies "success" regardless of pipeline status. Switching the container to blue matches the dashboard's brand consistency while preserving green only where it semantically belongs — on completed stages.

### Changes (single file: `src/components/dashboard/ContentPipelineCard.tsx`)

**1. Change GlassCard variant from `"success"` to `"default"`**
- Line 42: `variant="success"` → `variant="default"`
- This switches the card border/glow from emerald to the standard blue

**2. Change the header icon color from emerald to blue**
- Line 45: `text-emerald-400` → `text-primary-glow` (or `text-blue-400`)

**3. Change the project info box border from emerald to blue**
- Line 73: `border-emerald-500/20` → `border-primary-glow/20`

**4. Keep all pipeline stage colors unchanged**
- Completed steps stay emerald green (checkmarks, text, connector lines)
- Current step stays amber
- Future steps stay muted white

This is a 3-line change in one file. No functional changes — purely visual refinement.

