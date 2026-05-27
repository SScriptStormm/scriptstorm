## Complete ScriptStorm site text dump — all pages

The current `scriptstorm-full-site-text.md` covers Home, Why Choose Us, Onboarding, Contact, Support, Help Center, and Pricing/FAQ/Footer. It is missing the legal and About pages.

### What I'll add
Extend the local extraction script to also pull verbatim text from:
- `src/pages/AboutUs.tsx`
- `src/pages/TermsOfService.tsx`
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/RefundPolicy.tsx`
- `src/pages/ThankYou.tsx`
- `src/pages/NotFound.tsx`
- `src/pages/OnboardingProcess.tsx` (re-verify)
- `src/pages/PackageDetails.tsx`
- `src/components/Footer.tsx` (full link list)

### Output
Regenerate a single file with every public page concatenated under `## Page: <Name>` headers:
- `/mnt/documents/scriptstorm-full-site-text.md` (downloadable artifact)
- `public/scriptstorm-full.md` (live at `https://scriptstorm.org/scriptstorm-full.md` after publish)

### Delivery
After regenerating, paste the new/missing sections (About, Terms, Privacy, Refund, Thank You, 404, Package Details) inline in chat so you can copy them straight into Kimi alongside the parts already pasted.

Authenticated/in-app routes (Dashboard, Account Settings, Content Brief, Auth) are excluded since they are not public-facing marketing text.
