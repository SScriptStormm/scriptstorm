

## Important Context

The checkout page and customer portal pages you're seeing are **hosted by Stripe** — their appearance (text color, font, background, feature listing) is controlled in your **Stripe Dashboard**, not in our codebase. Our code only redirects users to Stripe's hosted pages.

### What needs to change (all in Stripe Dashboard):

**1. Checkout Page Branding (Colors/Font)**
- Go to **Stripe Dashboard → Settings → Branding** (or Settings → Checkout)
- Update your brand color to match your blue (`#3B82F6` or similar)
- Upload your logo
- Adjust accent colors and font settings so text is readable against the blue background

**2. Customer Portal Branding**
- Go to **Stripe Dashboard → Settings → Billing → Customer Portal → Branding**
- Same brand color and logo settings apply here

**3. Feature Listing on Checkout**
The product description shown on checkout comes from the **Product description field** in Stripe. Currently it's one long string. To make it a clean vertical list:
- Go to **Stripe Dashboard → Products** → click each product (Starter, Growth, Scale, Authority, Dominance)
- Edit the **Description** field
- Use line breaks to list features vertically:

```text
✓ 25 SEO Blog Articles (2,000-3,000 words)
✓ 75 Social & Video Content Pieces
✓ 25 Product/Service Descriptions
✓ 24-Hour Orchestrated Delivery
✓ 2 Revision Rounds
✓ Advanced Competitor & Keyword Analysis
✓ Plagiarism & AI Scan Guarantee
✓ Efficient Support Portal
```

### Recommendation on listing format

The vertical list with checkmarks is significantly better for conversion. Here's why:
- **Scannable** — clients can instantly see what they're paying for
- **Perceived value** — each line item feels like a distinct deliverable
- **Reduces friction** — at checkout, clarity = confidence = fewer abandoned carts

Keep descriptions short on checkout (just the deliverable + quantity). Save the detailed explanations for your pricing page, which already does this well.

### No code changes needed
This is entirely a Stripe Dashboard configuration task.

