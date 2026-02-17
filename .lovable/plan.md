
# Revert Temporary Changes and Add Proper Active/Inactive Detection

## Summary
Revert the hardcoded `false` values back to real conditional logic, and enhance the detection to also check if the subscription end date has passed (expired), not just the `subscribed` boolean flag.

## Changes

### 1. `src/components/dashboard/AccountStatusCard.tsx` (line 69)

Revert `{false ?` back to proper logic. Instead of just checking `isSubscribed`, also check if the subscription hasn't expired by comparing `subscriptionEnd` against the current date:

```tsx
// Line 69: Change {false ? back to real logic
// Also account for expiration: active only if subscribed AND not expired
const isActive = isSubscribed && (!subscriptionEnd || new Date(subscriptionEnd).getTime() > Date.now());
```

Then the badge conditional becomes:
```tsx
{isActive ? (
  <HoloBadge variant="active" pulse animated={false} size="sm">
    ACTIVE
  </HoloBadge>
) : (
  <HoloBadge variant="danger" pulse animated={false} size="sm">
    INACTIVE
  </HoloBadge>
)}
```

The `isActive` variable will be computed near the top of the component (around line 34) so it can be reused.

### 2. `src/pages/AccountSettings.tsx` (lines 315 and 318)

Revert both `false` values back to real logic, but similarly check for expiration:

```tsx
// Compute once using subscriber data
const isActive = subscriber?.subscribed && 
  (!subscriber?.subscription_end || new Date(subscriber.subscription_end).getTime() > Date.now());
```

Line 315:
```tsx
<div className={`h-2 w-2 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-rose-400'} animate-pulse`} />
```

Line 318:
```tsx
{isActive ? (
  <HoloBadge variant="success" size="sm">Active</HoloBadge>
) : (
  <HoloBadge variant="danger" size="sm">Inactive</HoloBadge>
)}
```

## How It Works

The system will show "INACTIVE" when either:
- The `subscribed` field is `false` in the database
- The `subscription_end` date has passed (expired subscription)

Otherwise it shows "ACTIVE" with the green pulsing dot.
