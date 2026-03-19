

## Fix: Content Type Misclassification (youtube_script overriding content_type)

### Problem
The `youtube_script` boolean flag takes priority over the actual `content_type` field everywhere in the code. A product description with `youtube_script=true` incorrectly displays as "YouTube" and appears in both YouTube and Product filters.

### Root Cause
- `getContentTypeInfo()` checks `youtube_script` first (line 378), before looking at `content_type`
- The product_description filter (line 404) doesn't exclude `youtube_script=true` items, but YouTube filter catches them too

### Fix (in `src/pages/Dashboard.tsx`)

**1. Fix `getContentTypeInfo` (lines 377-393):** Check `content_type` first. Only fall back to YouTube if the content_type is NOT already a specific type (blog/social/product). The `youtube_script` flag should only determine the type when the content_type is generic or missing.

```
if (article.content_type === 'product_description') → Product Desc
if (article.content_type === 'social_media'|'social_media_post') → Social Post  
if (article.youtube_script && (!article.content_type || article.content_type === 'article' || article.content_type === 'blog_article')) → YouTube Script
default → Blog Article
```

**2. Fix content type filters (lines 400-405):** Update the YouTube filter to only match items where youtube_script is true AND content_type is not product_description or social_media. Update product_description filter to not care about youtube_script flag.

```
youtube_script filter: a.youtube_script && (!a.content_type || a.content_type === 'article' || a.content_type === 'blog_article')
product_description filter: a.content_type === 'product_description'  (no youtube_script check needed)
```

**3. Fix ContentQueueCard (lines ~70-73 in ContentQueueCard.tsx):** Same logic applies to the Production Summary card's YouTube Scripts count — only count items where youtube_script is true AND content_type is not already product_description or social_media.

