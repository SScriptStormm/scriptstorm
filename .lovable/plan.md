

# Remove "Manage Subscription" from Account Dropdown

## Summary
Remove the redundant "Manage Subscription" dropdown menu item from the dashboard header, since Account Settings already covers subscription and billing in full.

## What Changes

### File: `src/components/dashboard/DashboardHeader.tsx`

Remove the "Manage Subscription" `DropdownMenuItem` (lines 79-85) that opens a Stripe billing link. This leaves the dropdown with three clean items: Dashboard, Account Settings, and Logout.

Also remove the `CreditCard` icon from the `lucide-react` import since it will no longer be used.

