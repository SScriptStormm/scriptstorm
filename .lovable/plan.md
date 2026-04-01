

## Fix: Animate "Days Remaining" Number in Account Status Card

### Problem
The RadialProgress ring animates from 0 to the target value, but the center label showing days remaining (e.g. "217") appears instantly because it's passed as a static string via the `label` prop. When `label` is provided, RadialProgress displays it as-is instead of using its internal animated `displayValue`.

### Solution
Add a count-up animation state inside `AccountStatusCard` that animates the days remaining number from 0 to its final value, matching the ring animation timing.

### Changes

**File: `src/components/dashboard/AccountStatusCard.tsx`**

1. Import `useState` and `useEffect` from React
2. Add an animated counter that counts from 0 to `daysRemaining` over ~1 second (matching RadialProgress animation duration)
3. Pass the animated value as the `label` prop instead of the static `daysRemaining`

```tsx
const [displayDays, setDisplayDays] = useState(0);

useEffect(() => {
  const duration = 1000;
  const steps = 30;
  const increment = daysRemaining / steps;
  let current = 0;

  const timer = setInterval(() => {
    current += increment;
    if (current >= daysRemaining) {
      setDisplayDays(daysRemaining);
      clearInterval(timer);
    } else {
      setDisplayDays(Math.floor(current));
    }
  }, duration / steps);

  return () => clearInterval(timer);
}, [daysRemaining]);
```

Then change `label={`${daysRemaining}`}` to `label={`${displayDays}`}`.

### Scope
- Single file: `src/components/dashboard/AccountStatusCard.tsx`
- All layouts affected equally (consistent animation everywhere)

