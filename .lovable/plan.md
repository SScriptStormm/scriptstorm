

## Brighten Support Tab Buttons for Readability

The "LAUNCH AI CHAT" and "SUBMIT A SUPPORT REQUEST" buttons currently use a low-contrast translucent style (`bg-primary/20` + `text-primary-glow`) that blends into the glass background and is hard to read.

### Changes to `src/components/dashboard/PrioritySupport.tsx`

Both buttons (`LAUNCH AI CHAT` and `SUBMIT A SUPPORT REQUEST`) — replace the current dim styling:

- **From:** `bg-primary/20 text-primary-glow border border-primary-glow/50 hover:bg-primary/30 hover:border-primary-glow font-mono text-xs`
- **To:** `bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-semibold`

This gives the buttons:
- Solid primary blue background (high contrast against glass)
- Pure white text (maximum legibility)
- Full-strength `primary-glow` border (no opacity modifier — respects `tailwind-color-constraints` memory)
- Glow shadow on hover for clear interactive affordance
- Semibold weight to match other dashboard CTAs

Layout, sizing (`size="sm"`), icons, copy, and handlers all unchanged. Only the two button class strings are touched.

### Result
Both action buttons become clearly readable and visually prominent while keeping the dashboard's neon-futuristic aesthetic intact.

### Scope
- 1 file edited (`PrioritySupport.tsx`) — 2 className swaps
- No memory updates, no DB, no edge functions, no routing changes

