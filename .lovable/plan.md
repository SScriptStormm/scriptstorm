

## Connect Live Stripe Secret Key

### What needs to happen
Update the `STRIPE_SECRET_KEY` secret in Supabase with your new live key (`sk_live_51OjakOH0X...`).

### Steps
1. **Update the secret** using the secrets management tool to set `STRIPE_SECRET_KEY` to your provided live key
2. **Update the `create-checkout` edge function** with live-mode Price IDs (the current ones are test-mode IDs based on naming convention)
3. **Verify** the `customer-portal` edge function also uses `STRIPE_SECRET_KEY` (it should already work with the updated secret)

### Important note
The current `create-checkout` function contains **test-mode Price IDs** (e.g., `price_1SZEevH0XahPXnwCMlxyP8FE`). These will **not work** with a live secret key. You will need to provide the corresponding **live-mode Price IDs** from your Stripe Dashboard, or I can update them once you share them.

### Security
- The key will be stored securely as a Supabase secret, never in the codebase
- Edge functions access it via `Deno.env.get("STRIPE_SECRET_KEY")` at runtime

