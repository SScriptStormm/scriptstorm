

## Fix TIER_PRICES in Account Settings

The `TIER_PRICES` object in `src/pages/AccountSettings.tsx` (lines 50-56) is out of sync with the actual pricing defined in `Pricing.tsx`. Multiple prices are incorrect across both monthly and annual tiers.

### Change

Update the `TIER_PRICES` constant to match the Pricing section:

```
starter:   { monthly: 297,  annual: 2850  }   (was 2873)
growth:    { monthly: 597,  annual: 5730  }   (was 5767)
scale:     { monthly: 1297, annual: 12450 }   (was 997 / 9641)
authority: { monthly: 1797, annual: 17250 }   (was 1497 / 14471)
dominance: { monthly: 2997, annual: 28770 }   (was 28971)
```

Single file edit — `src/pages/AccountSettings.tsx`, lines 50-56.

