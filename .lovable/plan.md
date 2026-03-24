

## Fix: Actions Column Alignment & Button Hover Style (Desktop Only)

### Problem 1: Info button misaligned with "Actions" header
The Actions header uses `text-right pr-2` and the td also uses `text-right pr-2` with `justify-end` on the flex container. The icon button's own padding creates a slight rightward offset.

**Fix in `src/pages/Dashboard.tsx`, line 1202-1203:**
- Add a small right margin to the flex container or adjust padding so the icon button centers under "Actions"
- Change `pr-2` on the td to `pr-3` to nudge content slightly left, matching the header's visual center

### Problem 2: Hover state looks out of place
The Info button uses `variant="ghost"` which applies the default shadcn ghost hover (`hover:bg-accent hover:text-accent-foreground`) — a solid blue/accent background that clashes with the glassmorphic design.

**Fix in `src/pages/Dashboard.tsx`, line 1204:**
- Replace `variant="ghost"` with `variant="ghost"` but override with explicit hover classes that match the dashboard aesthetic
- Change to: `className="h-8 w-8 text-primary-glow/70 hover:text-primary-glow border border-primary-glow/20 hover:border-primary-glow/50 hover:bg-primary-glow/10"` — adding `hover:bg-primary-glow/10` for a subtle glow tint instead of the default accent color
- Keep the existing border hover effects

### Scope
- Only affects the desktop table layout (lines ~1120-1220, inside the `hidden lg:block` section)
- Mobile/tablet card layout (lines ~1060-1110) remains untouched

