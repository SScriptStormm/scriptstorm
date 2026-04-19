

## Clarify Contact, Support, and Dashboard AI Routing

Three small, non-structural edits to clarify support channels.

### File 1: `src/pages/Contact.tsx`

- Change form subtitle: `"We'll get back to you within 24 hours."` → `"We'll get back to you within 1-2 business days."`
- Update right column **Response Time** card value: `"Within 24 hours"` → `"Within 1-2 business days"`
- Add a new note block **above** the existing "Already a ScriptStorm client?" callout:
  - Light blue glass card, small font
  - Copy: `📌 For existing ScriptStorm clients, please use your dashboard's support portal or email support@scriptstorm.org.`

### File 2: `src/pages/Support.tsx`

- Add a banner **below the hero, above the form grid**:
  - Light blue background (`bg-primary/10`), subtle blue border, small text, full-width within container
  - Copy: `🔵 Already logged in? Use the AI Assistant in your dashboard for instant answers to common questions (password reset, status, billing, revisions).`
- Add a **new fourth Info Card** in the right column between "For Existing Customers" and "New to ScriptStorm?":
  - Icon: `Receipt` (lucide)
  - Heading: `Billing Questions`
  - Text: `For billing-specific issues, please email billing@scriptstorm.org directly.`
- No form structural change (mailto target is already conceptual `support@scriptstorm.org` — it's currently a placeholder logging to console; leave behavior as-is).

### File 3: `src/components/dashboard/PrioritySupport.tsx`

- Add a small footnote line below the AI Assistant card (inside the AI section, under the LAUNCH AI CHAT button):
  - Copy: `📧 Need human help? Use the 'Submit a Support Request' button below. For billing questions, email billing@scriptstorm.org.`
  - Style: muted text, small font, no border

### Memory updates

- Update `mem://features/contact-support-functionality-status` to record:
  - Contact page now promises 1-2 business days (solo founder honest SLA)
  - Support page directs logged-in users to dashboard AI Assistant
  - Billing routed to `billing@scriptstorm.org` as a separate channel
  - Dashboard AI Assistant footnote points users to billing@ for billing issues
- Update `mem://project/account-branding-transition` to add `support@scriptstorm.org` and `billing@scriptstorm.org` as the two additional official addresses (hello@ = pre-sales, support@ = existing clients, billing@ = billing).

### Scope
- 3 component files
- 2 memory updates
- No DB, no edge functions, no routing changes

