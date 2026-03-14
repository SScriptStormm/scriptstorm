

## Match Account Status Card to Monthly Usage Card Size

Two simple changes to make both cards consistent, using `sm:` breakpoints so tablet/desktop stays identical:

### `src/components/dashboard/AccountStatusCard.tsx`
- **Line 49**: Remove `h-fit` from GlassCard → allows grid stretch to match sibling height
- **Line 71**: `space-y-4` → `space-y-3 sm:space-y-4` — tighter mobile spacing to match Monthly Usage

### `src/components/dashboard/MonthlyUsageCard.tsx`
- **Line 49 (GlassCard)**: Remove `h-fit` — same reason

Both cards already share the same RadialProgress responsive sizing (`md` on mobile, `lg` on desktop) and gap pattern (`gap-4 sm:gap-6`). Removing `h-fit` lets the grid's default `stretch` alignment equalize their heights on desktop/tablet. The `space-y-3` tweak only applies below 640px.