

# Add Time-of-Day Icon to Greeting

## Summary
Add an icon next to the greeting text that changes based on the time of day — a sun for morning, a cloud/sun for afternoon, and a moon/stars for evening. The greeting text logic already works correctly using the user's local time, so no changes are needed there.

## What Changes

### File: `src/pages/Dashboard.tsx`

**Step 1 — Update the `getGreeting` function** (lines 326-331) to also return an icon name:

```tsx
const getGreetingData = () => {
  const hour = new Date().getHours();
  if (hour < 12) return { text: 'Good morning', icon: 'sunrise' };
  if (hour < 18) return { text: 'Good afternoon', icon: 'sun' };
  return { text: 'Good evening', icon: 'moon' };
};
const greetingData = getGreetingData();
```

- Morning (before 12pm): `Sun` icon (Lucide's `Sun` — bright sunshine)
- Afternoon (12pm-6pm): `SunDim` icon (Lucide's `SunDim` — softer sun)
- Evening (after 6pm): `Moon` icon (Lucide's `Moon` — crescent moon)

**Step 2 — Update the greeting heading** (lines 642-645) to include the icon:

```tsx
<div className="flex items-center gap-2">
  {greetingData.icon === 'sunrise' && <Sun className="h-5 w-5 text-amber-400" />}
  {greetingData.icon === 'sun' && <SunDim className="h-5 w-5 text-orange-400" />}
  {greetingData.icon === 'moon' && <Moon className="h-5 w-5 text-blue-300" />}
  <h2 className="text-lg sm:text-xl font-bold text-white font-mono tracking-wide">
    {greetingData.text}
  </h2>
</div>
```

**Step 3 — Add imports** for `Sun`, `SunDim`, and `Moon` from `lucide-react` (add to existing import line).

## Notes
- `new Date().getHours()` already uses the user's local timezone automatically — no geolocation or extra APIs needed.
- The variable `timeGreeting` will be replaced by `greetingData.text` in the one place it's used.
