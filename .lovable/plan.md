

## Remove "billing" mentions from two copy strings

Two tiny copy edits to stop directing billing questions through the AI Assistant and the generic support form (billing has its own channel: billing@scriptstorm.org).

### File 1: `src/components/dashboard/PrioritySupport.tsx`

In the AI Assistant card description, change:
- From: `Instant answers to common questions: password reset, project status, billing, revisions, and more.`
- To: `Instant answers to common questions: password reset, project status, revisions, and more.`

### File 2: `src/pages/Support.tsx`

In the support form's Subject input placeholder, change:
- From: `Subject (e.g., Revision Request, Billing Question, Technical Issue)`
- To: `Subject (e.g., Revision Request, Technical Issue)`

### Scope
- 2 string edits in 2 files
- No memory updates needed (existing memories already document billing@ as a separate channel)
- No DB, edge functions, or routing changes

