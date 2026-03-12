

## Fix Auth Page Floating Squares to Match Dashboard

The opacity values are actually identical (`/45` and `/25`), but the **positioning** differs, which makes them look different due to the background gradients at different page positions.

| Property | Auth (current) | Dashboard | Auth (fixed) |
|----------|---------------|-----------|-------------|
| Left square top | `top-20` | `top-40` | `top-40` |
| Right square top | `top-40` | `top-60` | `top-60` |

### Change
Update `src/pages/Auth.tsx` lines 228-229:
- Left square: `top-20` → `top-40`
- Right square: `top-40` → `top-60`

This aligns with the consistent pattern used across Dashboard, Content Brief, Account Settings, and Package Details pages.

