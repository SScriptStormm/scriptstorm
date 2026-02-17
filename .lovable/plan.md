

# Temporarily Show Inactive Badge

## Summary
To preview the inactive badge styling, we'll temporarily force both the Account Status widget and the Account Settings page to show the "INACTIVE" state, regardless of actual subscription status.

## Changes

### 1. `src/components/dashboard/AccountStatusCard.tsx` (line 69)
Force the inactive branch by changing the condition:
```
Before: {isSubscribed ? (
After:  {false ? (
```

### 2. `src/pages/AccountSettings.tsx` (lines 315 and 318)
Force the inactive branch by overriding the subscriber check:
```
Line 315 - Before: subscriber?.subscribed ? 'bg-emerald-400' : 'bg-rose-400'
Line 315 - After:  false ? 'bg-emerald-400' : 'bg-rose-400'

Line 318 - Before: {subscriber?.subscribed ? (
Line 318 - After:  {false ? (
```

## Important
These are temporary changes just for visual preview. Once you've seen how the inactive badges look, let me know and I'll revert them back to the proper conditional logic.
