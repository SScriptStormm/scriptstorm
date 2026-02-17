

# Option A: Ultra-Minimal Greeting + CTA Combo

## Summary
Merge the welcome strip and the "Submit New Content Brief" CTA into a single compact row. The greeting sits on the left, the CTA button sits on the right. This removes redundant stats (already shown in Production Summary) and the redundant tier badge (already in Account Status), while keeping the dashboard's primary action front and center.

## What Changes

### Remove
- The entire Smart Welcome Strip GlassCard (lines 650-704) -- greeting, tier badge, live stats, dominance notice
- The separate full-width "Submit New Content Brief" button block (lines 706-742)
- The helper variables that are no longer needed: `inProgressCount`, `pendingCount`, `completedThisMonth`, `tierBadgeVariant()`

### Keep
- `timeGreeting` variable (still used for the greeting)
- The Dominance tier notice moves into the new combined row (conditionally shown as a subtle line below)

### New: Single Combined Row

One GlassCard containing:
- **Left side**: Time-based greeting ("Good evening") + user email in smaller text
- **Right side**: The "Submit New Content Brief" CTA button (compact, not full-width)
- **Below (conditional)**: Dominance tier notice, only if applicable

On mobile, the greeting stacks above the CTA button.

## Visual Layout

```text
+---------------------------------------------------------------+
| [glow line]  Good evening              [ + Submit New Brief -> ] |
|              hello@scriptstorm.org                              |
+---------------------------------------------------------------+
```

## Technical Details

### File: `src/pages/Dashboard.tsx`

**Step 1 — Clean up unused variables** (around lines 322-340):
- Remove `inProgressCount`, `pendingCount`, `completedThisMonth` calculations
- Remove `tierBadgeVariant` function
- Keep `timeGreeting`

**Step 2 — Replace lines 650-742** (welcome strip + CTA block) with:

```tsx
<GlassCard className="mb-6 sm:mb-8 p-0 relative overflow-hidden" hover={false}>
  {/* Accent glow line */}
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-glow to-primary/50" />

  <div className="p-4 sm:p-5 pl-5 sm:pl-10">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      {/* Left: Greeting */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-white font-mono tracking-wide">
          {timeGreeting}
        </h2>
        <p className="text-white/40 font-mono text-xs sm:text-sm tracking-wide">
          {user?.email}
        </p>
      </div>

      {/* Right: CTA */}
      <button
        onClick={() => navigate('/content-brief')}
        className="group relative flex items-center gap-3 px-5 py-3 rounded-lg overflow-hidden
          border border-primary-glow/30 backdrop-blur-xl
          bg-gradient-to-r from-primary/15 to-primary-glow/10
          hover:border-primary-glow/60 hover:shadow-[0_0_30px_hsl(221_83%_53%/0.3)]
          transition-all duration-300 animate-glow-pulse-soft"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-glow/20 to-transparent animate-shimmer pointer-events-none" />
        <div className="relative flex items-center justify-center h-8 w-8 rounded-md bg-primary/20 border border-primary-glow/40 animate-scale-subtle">
          <Plus className="h-4 w-4 text-primary-glow" />
        </div>
        <span className="relative text-white font-mono text-sm sm:text-base font-semibold tracking-wide group-hover:text-primary-glow transition-colors duration-300">
          Submit New Brief
        </span>
        <ArrowRight className="relative h-4 w-4 text-primary-glow/50 group-hover:text-primary-glow group-hover:translate-x-1 transition-all duration-300" />
      </button>
    </div>

    {/* Dominance tier notice (conditional) */}
    {hasDominance && (
      <div className="mt-3 pt-3 border-t border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
          <p className="text-yellow-400/90 font-mono text-xs sm:text-sm">
            <strong>Dominance Tier:</strong> 12-hour delivery · Unlimited revisions · Priority support
          </p>
        </div>
      </div>
    )}
  </div>
</GlassCard>
```

### Unused imports to clean up
- Remove `Clock`, `AlertCircle`, `CheckCircle` if no longer used elsewhere in the file

### No new dependencies needed
Everything uses existing components and icons (`GlassCard`, `Plus`, `ArrowRight`, `HoloBadge` import can be removed if unused elsewhere).
