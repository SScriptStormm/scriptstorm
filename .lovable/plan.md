
# Fix: "billing.stripe.com refused to connect"

## Root Cause

The edge function is working correctly — confirmed by:
- Edge function logs showing "Portal session created" with a valid URL
- Network request returning HTTP 200 with `{"url":"https://billing.stripe.com/p/session/..."}`

The error is caused by how the redirect is handled in the frontend.

The current code in `AccountSettings.tsx` line 165:
```typescript
window.location.href = data.url;
```

This redirects the **current browser window context**. When the app is running inside an iframe (Lovable preview, or any embedded context), `window.location.href` navigates the iframe itself — not the top-level browser window. Stripe's billing portal returns the HTTP header `X-Frame-Options: DENY`, which tells the browser: "I refuse to be displayed inside an iframe." The browser honours this and shows "refused to connect."

Even on the production domain (`scriptstorm.org`), using `window.location.href` to navigate to Stripe is problematic — it navigates away from the page entirely, which is a poor user experience. The industry-standard pattern is to open the Stripe portal in a **new tab** using `window.open`.

## The Fix

### File: `src/pages/AccountSettings.tsx`

Change line 165 from:
```typescript
window.location.href = data.url;
```

To:
```typescript
window.open(data.url, '_blank', 'noopener,noreferrer');
```

This opens the Stripe Customer Portal in a new browser tab. The `noopener,noreferrer` flags are a security best practice — they prevent the new tab from being able to access or manipulate the original tab.

### Why this works

- `window.open(..., '_blank')` opens a new top-level browser tab — not inside the iframe
- Stripe's `X-Frame-Options: DENY` header only applies to iframes, not new tabs
- The return URL (`https://scriptstorm.org/account-settings`) will close the portal and send the user back to Account Settings
- Works in both preview mode and production

### No other changes needed

- The edge function is correct and deployed
- The Stripe Secret Key is properly configured
- The return URL is correctly formatted
- The portal session creation is working

## Files Changed

```text
src/pages/AccountSettings.tsx  ← Change window.location.href to window.open(_blank)
```
