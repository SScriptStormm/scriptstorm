## Full ScriptStorm verbatim site text dump

Crawl every public page of https://scriptstorm.org (Home, Pricing, Help Center / FAQ, Support, Terms, Privacy, and any other linked public pages), extract the rendered text exactly as visitors see it, and deliver it three ways:

1. Posted inline in the chat for direct copy/paste into Kimi.
2. Saved to `public/scriptstorm-full.md` (live at https://scriptstorm.org/scriptstorm-full.md after next publish).
3. Saved as a Files-panel artifact `scriptstorm-full-site-text.md`.

### Method
- Use Firecrawl (`map` + `scrape`) to discover and fetch each public page in markdown. Firecrawl renders JS so it works with the React app.
- Exclude auth/in-app routes: `/auth`, `/dashboard`, `/account`, `/reset-password`, etc.
- Include legal pages (Terms, Privacy) per your request.
- Concatenate into one markdown file with each page as `## Page: <Title> — <URL>`.

### Prerequisite
Firecrawl connector must be linked to the project. If it isn't, I'll prompt you to connect it (one click) before crawling.