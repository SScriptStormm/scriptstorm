

## Consistency Check: Support Tab vs Pricing Page

### Findings

**Pricing page promises (`src/components/Pricing.tsx`):**
- **Scale tier** → "Efficient Support Portal: Streamlined communication for seamless project management."
- **Authority tier** → "Priority Support Portal: Faster response times and dedicated handling for mission-critical projects."
- **Dominance tier** → "Priority Support Portal + Dedicated Client Success Workspace" (white-glove).

**Dashboard reality (`src/pages/Dashboard.tsx`):**
- Tab trigger shown for Scale, Authority, Dominance (`hasScale`).
- Tab content (`PrioritySupport` component) only renders for Authority, Dominance (`hasAuthority`).
- Result: **Scale users see an empty Support tab** — inconsistent with the "Efficient Support Portal" they were sold.

**`PrioritySupport` component itself** is hardcoded as "PRIORITY SUPPORT PORTAL" with Authority+ messaging (4-hour response, dedicated account manager, quarterly strategy sessions) — not appropriate for Scale tier either.

### Answer to Your Question
**No, it is not consistent.** Two specific gaps:

1. **Scale tier Support tab is empty** — pricing promises an "Efficient Support Portal" but the dashboard renders nothing.
2. **No tier-aware messaging** in `PrioritySupport.tsx` — it shows the same Authority-level copy regardless of tier, so even if we showed it to Scale users as-is, it would over-promise.

### Recommended Fix (for approval)

**File: `src/components/dashboard/PrioritySupport.tsx`**
- Accept a `subscriptionTier` prop.
- Render tier-specific copy:
  - **Scale** → "EFFICIENT SUPPORT PORTAL" header, no PRIORITY badge, copy: "Streamlined communication for seamless project management. Standard response times within 24 hours."
  - **Authority** → Current "PRIORITY SUPPORT PORTAL" with 4-hour response, dedicated account manager, quarterly strategy sessions (unchanged).
  - **Dominance** → "PRIORITY SUPPORT + DEDICATED WORKSPACE" header with the white-glove copy already alluded to in `PackageFeaturesWidget` (priority support + private client success workspace).
- Email subject line adapts: "Support Request" (Scale) vs "Priority Support Request" (Authority/Dominance).

**File: `src/pages/Dashboard.tsx`**
- Change line 1331 from `{hasAuthority && <TabsContent value="support">` to `{hasScale && <TabsContent value="support">`.
- Pass `subscriptionTier={subscriber?.subscription_tier}` to `<PrioritySupport />`.

### Scope
- 2 files
- Logic + copy tied to existing tier flags (`hasScale`, `hasAuthority`, `hasDominance`)
- All viewports affected equally

