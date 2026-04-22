

## Align Support Tab Design with Dashboard Pattern

The Support tab (`PrioritySupport.tsx`) doesn't match sibling dashboard tabs (Research Reports, Content Calendar). It's using oversized padding, heavy buttons, mismatched hover behavior, and the wrong GlassCard config.

### Issues found
| Element | Current (Support tab) | Dashboard standard |
|---|---|---|
| Outer GlassCard | `glow` only — whole card scales on hover | `glow hover={false}` — non-interactive containers don't scale |
| Inner blocks | `p-6`, no hover state | `p-4`, `hover:bg-white/[0.08] hover:border-white/[0.15] transition-all` |
| Section headings | `text-base sm:text-lg` | `text-sm` |
| Icon badges | Large 48px circular bg-primary-glow/20 with 2px border | Small inline icon `text-primary-glow` |
| Buttons | Heavy: `bg-primary border-2 border-primary-glow/50 shadow-cyber` | Subtle: `bg-primary/20 text-primary-glow border border-primary-glow/50 hover:bg-primary/30` |

### Changes to `src/components/dashboard/PrioritySupport.tsx`

1. **Outer card** — add `hover={false}` so it stops scaling/glowing on hover (per UI affordance rule for non-interactive containers).

2. **AI Assistant block** — reduce to `p-4`, add hover transition matching siblings, drop the oversized 48px icon badge in favor of a small inline `Bot` icon next to the heading (like ContentCalendar's event icon pattern). Heading down to `text-sm`. Convert LAUNCH AI CHAT button to the subtle download-style: `bg-primary/20 text-primary-glow border border-primary-glow/50 hover:bg-primary/30 hover:border-primary-glow font-mono text-xs`.

3. **Human Support block** — same treatment: `p-4`, hover transition, inline `Users` icon, `text-sm` heading. Response-time table stays but switches to inner `p-3` rows for tighter density.

4. **Contact Action block** — reduce to `p-4`, hover transition. Convert SUBMIT A SUPPORT REQUEST button to the same subtle style as the AI button. Keep it full-width.

5. **Footer block** — keep as-is (already matches the muted footer pattern), just confirm `p-4` padding.

6. Keep all copy, tier-highlight logic, mailto handler, and Dominance priority note unchanged.

### Result
The Support tab will visually match Research Reports and Content Calendar: same card chrome, same inner-block padding, same hover behavior, same button weight, same typography scale. No structural or functional changes.

### Scope
- 1 file edited (`PrioritySupport.tsx`)
- No memory updates needed (existing `unified-glassmorphism-pattern`, `ui-affordance-hover-logic`, and `enterprise-support-portal` memories already cover this — this change brings the file into compliance)
- No DB, edge functions, or routing changes

