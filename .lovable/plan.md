

## Fix: Remove Hover Effect from Research Reports Card

The `GlassCard` component defaults `hover` to `true`, causing a scale-up effect on hover. The `ResearchReports` component doesn't pass `hover={false}` like the other dashboard widgets do.

### File to Update

**`src/components/dashboard/ResearchReports.tsx`** — Add `hover={false}` to both `GlassCard` instances (the empty state card around line 92 and the reports list card around line 103).

