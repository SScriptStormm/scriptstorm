

## Fix Account Settings Portal Buttons

### Problem 1: All buttons loading simultaneously
The `portalLoading` state is a single boolean shared by all three buttons (Upgrade, Cancel, Update Payment). Clicking any one disables and shows "loading" on all of them.

**Fix:** Replace `const [portalLoading, setPortalLoading] = useState(false)` with `const [portalLoading, setPortalLoading] = useState<string | null>(null)` — store the `flowType` string (or a label) of the currently loading button. Each button checks `portalLoading === "its_flow_type"` for its loading text and `portalLoading !== null` only for `disabled`.

### Problem 2: Upgrade button fails
Edge function logs show: `"This subscription cannot be updated because the subscription update feature in the portal configuration is disabled."` — the Stripe Billing Portal configuration in the dashboard doesn't have subscription updates enabled, so passing `flow_data.type = "subscription_update"` fails.

**Fix:** Add a fallback in the `customer-portal` edge function: if creating a session with `flow_data` throws an error, retry without `flow_data` to open the generic portal instead of returning a 500 error. Also add `e.stopPropagation()` to button click handlers to prevent event bubbling.

### Changes

**`src/pages/AccountSettings.tsx`:**
- Change `portalLoading` from `boolean` to `string | null`
- Update `handleOpenPortal` to set `portalLoading` to the flowType string
- Each button: `disabled={portalLoading !== null}`, loading text only when `portalLoading === "its_type"`
- Add `e.stopPropagation()` to each button's onClick

**`supabase/functions/customer-portal/index.ts`:**
- Wrap `stripe.billingPortal.sessions.create(portalParams)` in a try/catch
- On failure when `flow_data` is set, retry without `flow_data` (fallback to generic portal)
- Log the fallback for debugging

