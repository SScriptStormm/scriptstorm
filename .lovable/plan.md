

## Unified Enterprise Support Portal

Rewrite `src/components/dashboard/PrioritySupport.tsx` so all three enterprise tiers (Scale, Authority, Dominance) see the **same portal layout**. The only tier-specific element is the highlighted response time row.

### File: `src/components/dashboard/PrioritySupport.tsx` (full rewrite)

Replace the current `getTierConfig` tier-branching logic with a single unified layout. Keep the `subscriptionTier` prop — used only to highlight the user's row in the response time table and to flag Dominance's priority queue note.

**Layout structure (top to bottom):**

1. **Header**
   - Title: `ENTERPRISE SUPPORT CENTER` (icon: MessageSquare)
   - Subtitle below title: `24/7 AI assistance + priority human response based on your plan.`
   - No tier badge in the header.

2. **AI Assistant Card** (glass panel, Bot icon)
   - Heading: `24/7 AI Assistant`
   - Description: `Instant answers to common questions: password reset, project status, billing, revisions, and more.`
   - Button: `LAUNCH AI CHAT` — for now shows a toast "AI Assistant coming soon" (placeholder for n8n/Gumloop integration).

3. **Human Support Card** (glass panel, Users icon)
   - Heading: `Human Support Team`
   - Description: `For complex issues not resolved by AI. Response times vary by plan:`
   - **Response time table** with 3 rows (Scale / Authority / Dominance). The user's current tier row is highlighted with `bg-primary-glow/10` and a left border accent. Other rows render at lower opacity.
     - Scale → Within 12 business hours
     - Authority → Within 6 business hours
     - Dominance → Within 2–4 business hours
   - Footnote below table: `Business hours: Monday–Friday, 9 AM – 6 PM HKT (Hong Kong Time)`

4. **Contact Action Block**
   - Button: `SUBMIT A SUPPORT REQUEST` — opens mailto to `support@scriptstorm.org` with subject `Enterprise Support Request – {Tier}` and a body template using `userEmail` (no "I/me/founder" wording, uses "our support team").
   - For Dominance only, small note below the button: `★ Priority queue — your request is flagged for fastest response.`

5. **Footer line**
   - `Support Email: support@scriptstorm.org`

### Removed from current component

- All "Dedicated account manager", "Quarterly strategy sessions", "Unlimited strategic consultations", "Private workspace / client success workspace" copy.
- Tier-specific headers ("EFFICIENT SUPPORT PORTAL", "PRIORITY SUPPORT PORTAL", "PRIORITY SUPPORT + DEDICATED WORKSPACE").
- Tier-specific badge pills (SCALE ACCESS / PRIORITY ACCESS / VIP ACCESS).
- Any "white-glove", "founder", "I will" phrasing.

### No changes needed in `src/pages/Dashboard.tsx`

Already passes `subscriptionTier` and gates the tab on `hasScale` from the previous round.

### Memory update

Update `mem://features/contact-support-functionality-status` (or add a new memory) to record:
- Enterprise Support Portal is now a unified UI for Scale/Authority/Dominance.
- Tier only changes the highlighted response time row (12h / 6h / 2–4h business hours, HKT).
- "Launch AI Chat" is a placeholder pending n8n integration.
- No mention of dedicated managers, strategy sessions, or workspaces in Phase 1.

### Scope

- 1 component rewritten (`PrioritySupport.tsx`)
- 1 memory file updated
- No DB, no edge functions, no routing changes

