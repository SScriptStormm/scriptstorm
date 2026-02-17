

# Remove Badge Blinking and Add Inactive Status Support

## Summary
Three changes:
1. Remove the `animate-pulse-glow` blinking from the "ACTIVE" HoloBadge in the Account Status widget (the green dot is sufficient)
2. Remove the `animate-pulse` blinking from the "AI Writing" icon in the Content Pipeline (the amber dot is sufficient) 
3. Add inactive/expired subscription handling: show a red "INACTIVE" badge (with glowing red dot) when the subscription is no longer active, in both the Dashboard Account Status card and the Account Settings page

## Technical Changes

### 1. `src/components/ui/HoloBadge.tsx`
- No changes needed here -- the `"danger"` variant already supports a red pulsing dot (line 128: `bg-rose-400`). We just need to use `variant="danger"` with `pulse` in the consuming components.

### 2. `src/components/dashboard/AccountStatusCard.tsx`
- **Remove badge blinking**: Remove the `pulse` prop from the ACTIVE HoloBadge (line 69) so only the green dot glows without the whole badge pulsing
- **Add inactive state**: Use `isSubscribed` prop (already passed) to conditionally render:
  - Active: `<HoloBadge variant="active" size="sm">` with a pulse dot (green) -- keep `pulse` for the dot indicator but remove `animate-pulse-glow` class override. Actually, looking at the code more carefully, `pulse` adds both the dot AND `animate-pulse-glow`. The user wants the dot but NOT the badge-level pulsing glow. So we need to keep `pulse` (for the dot) but override the `animate-pulse-glow` by not applying it. The simplest fix: just keep `pulse` as-is since the green dot IS the pulse indicator. The "blue blinks" the user mentions is likely the `animate-pulse-glow` class. We should pass `animated={false}` to disable the glow shadow, while keeping `pulse` for the dot.
  - Inactive: `<HoloBadge variant="danger" pulse size="sm">INACTIVE</HoloBadge>` with red styling and glowing red dot

### 3. `src/components/dashboard/ContentPipelineCard.tsx`
- **Remove icon blinking**: On line 104, remove `animate-pulse` from the current stage icon class. The amber circle border and color are sufficient visual indicators.

### 4. `src/pages/AccountSettings.tsx`
- **Add inactive state**: Use the `subscribed` field from subscriber data to conditionally show:
  - Active: green dot + "Active" badge (current behavior, but ensure the green dot does not have `animate-pulse` on the dot itself -- actually the user said the green glowing dot is fine, so keep it)
  - Inactive: red dot with `animate-pulse` + "Inactive" HoloBadge with `variant="danger"`

### Specific Line Changes

**AccountStatusCard.tsx (line 69)**:
```tsx
// Before
<HoloBadge variant="active" pulse size="sm">ACTIVE</HoloBadge>

// After - conditionally render active/inactive
{isSubscribed ? (
  <HoloBadge variant="active" pulse animated={false} size="sm">ACTIVE</HoloBadge>
) : (
  <HoloBadge variant="danger" pulse size="sm">INACTIVE</HoloBadge>
)}
```
Setting `animated={false}` removes the glow shadow (`animate-pulse-glow`) from the badge while keeping the pulse dot.

**ContentPipelineCard.tsx (line 104)**:
```tsx
// Before
<Icon className={`h-4 w-4 ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-amber-400 animate-pulse' : 'text-white/40'}`} />

// After - remove animate-pulse
<Icon className={`h-4 w-4 ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-amber-400' : 'text-white/40'}`} />
```

**AccountSettings.tsx (lines 313-318)** -- use subscriber's `subscribed` field:
```tsx
// Before
<div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
<span>Status</span>
<HoloBadge variant="success" size="sm">Active</HoloBadge>

// After
{subscriber?.subscribed ? (
  <>
    <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
    <span>Status</span>
    <HoloBadge variant="success" size="sm">Active</HoloBadge>
  </>
) : (
  <>
    <div className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
    <span>Status</span>
    <HoloBadge variant="danger" size="sm">Inactive</HoloBadge>
  </>
)}
```

