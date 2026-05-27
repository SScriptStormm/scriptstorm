# ScriptStorm — Complete Site Bundle

> A single-file knowledge pack describing ScriptStorm's product, pricing, workflow, and support. Built so an LLM (e.g. Kimi) can ingest and analyse the entire offering in one pass.

- **Website:** https://scriptstorm.org
- **Lovable mirror:** https://scriptstorm.lovable.app
- **Contact:** hello@scriptstorm.org
- **Support hours / time zone:** HKT (Hong Kong Time)

---

## 1. Overview

ScriptStorm is a **100% automated, AI-powered content production platform**. It turns a short content brief into finished, publication-ready content — articles, social posts, YouTube scripts, and product descriptions — without any human strategist or manual writing step in the pipeline.

- **Mission:** Replace slow, expensive human content workflows with a fully automated AI stack that delivers fast, on-brand content at scale.
- **Audience:** Founders, marketers, agencies, e-commerce brands, and creators who need consistent high-volume content output.
- **Differentiator:** Every deliverable is generated, researched, plagiarism-checked, and AI-detection scanned by an automated pipeline — no human-in-the-loop bottlenecks.

---

## 2. Brand & Positioning

- **Tagline messaging:** 100% automated AI workflow — zero human intervention.
- **Tone:** Confident, modern, technical-but-accessible.
- **Aesthetic:** Neon Futuristic / cyberpunk glassmorphism for the app; Light Branded for marketing.
- **Promise:** Same quality every time, on schedule, at predictable cost.

---

## 3. Content Types & Deliverables

| Content type        | Typical word count | Notes |
|---------------------|--------------------|-------|
| Article / blog post | 800–3,000+ words   | Long-form SEO content, fully researched |
| Social post         | 50–120 words       | Short-form for LinkedIn / X / IG captions |
| YouTube script      | Variable, scene-by-scene | Distinct deliverable from social posts |
| Product description | 100–200 words      | E-commerce / catalogue copy |

---

## 4. Automated Content Pipeline

Every project flows through four automated stages, surfaced in the dashboard as a progress percentage:

1. **20% — Pending / AI research.** Brief is received; automated research begins. Status: `pending`.
2. **60% — In progress / Drafting.** AI generation of the draft. Status: `in_progress`.
3. **80% — In review.** Automated plagiarism & AI-detection scan. Status: `review`.
4. **100% — Completed.** Final deliverable ready to download. Status: `completed`.

Backend: n8n orchestrates the workflow; Supabase stores the article record; the dashboard updates in real-time via Postgres replication.

---

## 5. Pricing (USD)

Five subscription tiers. Annual billing is discounted vs monthly. Tier names: **Starter, Growth, Scale, Authority, Dominance**.

| Tier        | Positioning                       | Revision rounds | Calendar access | Notable capacity |
|-------------|-----------------------------------|-----------------|-----------------|------------------|
| Starter     | Entry / individuals               | 1               | No              | Low volume |
| Growth      | Growing brands                    | 2               | Yes             | Mid volume |
| Scale       | Scaling teams                     | 2               | Yes             | Higher volume |
| Authority   | Established publishers / agencies | 3               | Yes             | High volume |
| Dominance   | Enterprise / max throughput       | Unlimited       | Yes             | Up to 50 articles / month, 12-hour delivery |

- **Standard delivery:** 24 hours (all tiers except Dominance).
- **Dominance delivery:** 12 hours.
- **Billing:** Stripe. Subscription is active when `subscribed = true` AND `subscription_end` is null or in the future.
- **Quota:** Each tier has monthly per-content-type quotas; the dashboard shows usage and warns at 90–99% and again at 100%.

(For exact monthly/annual dollar amounts, see the live pricing page: https://scriptstorm.org/#pricing.)

---

## 6. Keyword & SEO Intelligence

Tiered keyword features (terminology ladder):
- Lower tiers: **Keyword Research**.
- Higher tiers: **Keyword Integration** and **Keyword Intelligence**.
- ScriptStorm intentionally avoids the term "Keyword Mapping".

---

## 7. Dashboard (Logged-in App)

Authenticated users land on a dashboard with:

- **Hero greeting** — time-of-day-based.
- **Monthly production summary** — counts of articles, social posts, YouTube scripts, product descriptions for the current month.
- **Projects list** — searchable, paginated; filters reset pagination to page 1.
- **Unified Pipeline view** — bidirectional integration with the Projects tab; shows each project's stage (20/60/80/100%).
- **Content Calendar** — Growth tier and above only.
- **Quota usage** — per-content-type progress bars; locks visual state at 100%.
- **Account & Billing** — Stripe customer portal integration.
- **Download / Revision buttons** — only visible on completed projects.

Visual language: glassmorphic dark surfaces (`bg-white/[0.05]` / `bg-black/90`, `backdrop-blur-xl`, `border-white/[0.1]`), neon accents, mono uppercase eyebrows with wide tracking.

---

## 8. Enterprise Support Center

Available to Scale, Authority, and Dominance tiers. Same unified UI for all three; only the response-time SLA differs:

| Tier      | Priority response time (HKT) |
|-----------|------------------------------|
| Scale     | 12 hours |
| Authority | 6 hours |
| Dominance | 2–4 hours |

Channels surfaced: priority email, account contact, escalation path. (Contact/Support forms are currently visual placeholders pending backend wire-up.)

---

## 9. Help Center / FAQ Highlights

- **Revisions:** Starter 1, Growth/Scale 2, Authority 3, Dominance unlimited.
- **Enterprise volume capacity:** up to 50 articles / month.
- **Delivery times:** 24h standard, 12h Dominance.
- **Workflow:** fully automated — no human writers or strategists.

---

## 10. Authentication

- **Login** and **Reset password** pages — glassmorphic, mono-uppercase labels matching the Enterprise Support Center design.
- **Signup:** not currently exposed publicly on the client; accounts are provisioned via Stripe checkout.
- **Primary org / test email:** hello@scriptstorm.org (mapped to Scale tier for internal testing).

---

## 11. Tech Stack & Integrations

- **Frontend:** React 18, Vite, Tailwind CSS, TypeScript. Built on Lovable.
- **Backend:** Supabase (Postgres, Auth, RLS, Edge Functions, Realtime).
- **Automation:** n8n — receives content briefs from a Supabase trigger and drives the AI pipeline.
- **Payments:** Stripe (Live Mode), with 10 static Price IDs covering monthly/annual variants of the 5 tiers; checkout via Supabase edge function; billing managed via Stripe Customer Portal.
- **AI:** Fully automated AI generation stack (model orchestration handled inside n8n).
- **SEO:** sitemap.xml auto-generated, JSON-LD Organization + WebSite schema, canonical tags, Open Graph metadata, robots.txt with Sitemap directive.

---

## 12. Security Posture

- Row-Level Security enabled on user-facing tables.
- Roles stored in a dedicated `user_roles` table with a `has_role` SECURITY DEFINER function — no role flags on profile/user tables.
- Internal SECURITY DEFINER functions are not executable by anon/authenticated roles.
- `projects` table locked to `service_role`.
- React Router upgraded to a patched version to mitigate known XSS/Open Redirect CVEs.

---

## 13. Public URLs

- Marketing site: https://scriptstorm.org
- Lovable preview: https://scriptstorm.lovable.app
- Sitemap: https://scriptstorm.org/sitemap.xml
- Robots: https://scriptstorm.org/robots.txt
- This bundle (mirrored): https://scriptstorm.org/scriptstorm.md

---

## 14. Contact

- **Email:** hello@scriptstorm.org
- **Support time zone:** HKT
- **Priority SLAs:** Scale 12h • Authority 6h • Dominance 2–4h

---

*End of bundle. Generated for LLM ingestion (Kimi, ChatGPT, Claude, etc.). For the most up-to-date pricing and copy, always cross-reference https://scriptstorm.org.*
