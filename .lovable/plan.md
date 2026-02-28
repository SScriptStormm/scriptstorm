

## Update Stripe Product Descriptions to Vertical Format

The Stripe checkout page pulls feature text from the **Product description** stored in Stripe. We'll update the `create-checkout` edge function to programmatically set each product's description with line-break-separated features before creating the checkout session.

### Changes to `supabase/functions/create-checkout/index.ts`

1. Add a feature description map for each package, with features separated by `\n` and prefixed with `✓`:

```
starter:
✓ 5 SEO Blog Articles (1,500–2,000 words)
✓ 15 Social Media Posts
✓ 5 Product/Service Descriptions
✓ 24-Hour Orchestrated Delivery
✓ 1 Revision Round
✓ Standard Keyword Research
✓ Plagiarism & AI Scan Guarantee
```

(Similar vertical lists for Growth, Scale, Authority, Dominance — matching features from Pricing.tsx)

2. After selecting the `priceId`, call `stripe.prices.retrieve(priceId)` to get the `product` ID, then call `stripe.products.update(productId, { description })` with the vertical feature list.

3. This adds two quick Stripe API calls per checkout but is idempotent (same data each time), so it keeps descriptions permanently in sync with the codebase.

### No frontend changes needed
The checkout page will automatically render the updated multi-line description.

