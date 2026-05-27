## Generate a ScriptStorm Site Bundle for Kimi

I'll produce a single markdown file containing all public-facing content of ScriptStorm, structured so Kimi (or any LLM) can ingest it in one paste/upload.

### What the bundle will include

1. **Site overview** — name, tagline, mission, target users, value proposition.
2. **Brand & positioning** — 100% automated AI workflow messaging, tone, differentiators.
3. **Pages content** (extracted from current source):
   - Landing/Home (hero, features, social proof, CTAs)
   - Pricing (all 5 tiers: Starter, Growth, Scale, Authority, Dominance — monthly & annual prices, features, deliverables, revision rounds, capacity)
   - FAQ / Help Center
   - Support / Enterprise Support Center (response times, channels)
   - Auth pages (Login, Reset)
   - Dashboard features summary (Projects, Pipeline, Calendar, Quota, Account)
4. **Service deliverables** — Articles, Social Posts, YouTube Scripts, Product descriptions, word counts per content type.
5. **Content workflow** — n8n automation pipeline stages (20/60/80/100%), AI research → drafting → plagiarism/AI detection → completion.
6. **Tech & integrations** — Stripe billing, Supabase backend, AI stack messaging.
7. **Contact info** — hello@scriptstorm.org, support response times (12h/6h/2–4h HKT by tier).
8. **URLs** — scriptstorm.org, sitemap reference.

### How I'll build it

- Script: `scripts/generate-site-bundle.ts` that reads `src/pages/*`, `src/components/**`, marketing copy, pricing data, and FAQ content, then concatenates into one well-structured markdown file.
- Output: `/mnt/documents/scriptstorm-site-bundle.md` (delivered as a downloadable artifact).
- Also save a copy to `public/scriptstorm.md` so you can link Kimi directly to `https://scriptstorm.org/scriptstorm.md`.

### How you'll use it with Kimi

Two options after generation:
- **Upload**: download the .md file and attach it in Kimi.
- **Link**: paste `https://scriptstorm.org/scriptstorm.md` and ask Kimi to fetch it (works if Kimi has browsing).

### Out of scope

- No backend/source code dump (that's option 3).
- No screenshots (that's option 4).
- No private/admin/internal logic — only public-facing content.

Approve and I'll generate the bundle.