## Goal
Send you the full user-visible text of the **Dashboard**, **Submit Content Brief**, **Account Settings**, and **Package Details** pages — with all tier-specific variations called out (Starter, Growth, Scale, Authority, Dominance).

## Approach
1. Run a local extraction script against:
   - `src/pages/Dashboard.tsx` + all `src/components/dashboard/*.tsx`
   - `src/pages/ContentBrief.tsx` (Submit Content Brief)
   - `src/pages/AccountSettings.tsx`
   - `src/pages/PackageDetails.tsx`
2. For each page, produce one section per tier showing the exact copy that tier sees (quotas, labels, deliverables, revision counts, SLAs, badges, gating messages).
3. Save the bundle to `/mnt/documents/scriptstorm-app-pages-by-tier.md` AND paste it inline in chat, split across messages if needed.

## Format per page
```
### [Page Name]
Shared text (headers, labels, buttons, toasts)

#### Starter tier view
...tier-conditional copy...

#### Growth tier view
...

#### Scale / Authority / Dominance tier views
...
```

## Notes
- No code or design changes — pure text extraction.
- Tier differences will come from the tier-mapping logic already in `PackageFeaturesWidget`, `QuotaUsageWidget`, `PackageDetails`, and `AccountSettings`.
- If the result exceeds one chat message, I'll paste it in 2 parts.