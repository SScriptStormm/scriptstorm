

# Professional Content Type Organization for Dashboard

## Overview
Add content type identification and filtering to the PROJECTS tab so users can quickly identify and filter their blog articles, social media posts, YouTube scripts, and product descriptions.

## Changes

### 1. Add Content Type Filter Buttons
**Location:** Below the month filter, next to the status filter buttons

Add a new row of filter buttons for content types:
- **All Types** (default)
- **Blog Articles** (with FileText icon)
- **Social Posts** (with MessageSquare icon)  
- **YouTube Scripts** (with Video icon)
- **Product Descriptions** (with Package icon)

The styling will match the existing status filter buttons with the glassmorphic design pattern.

### 2. Add Content Type Column to Desktop Table
**Location:** New column between "Project Title" and "Status"

Add a "Type" column header and display content type badges for each project:
- **Blog Article** - Blue badge with FileText icon
- **Social Post** - Green badge with MessageSquare icon
- **YouTube Script** - Red badge with Video icon (distinguishes from regular social posts)
- **Product Description** - Purple badge with Package icon

### 3. Add Content Type Badge to Mobile Cards
**Location:** Below the project title on mobile card layout

Display a small, color-coded badge indicating the content type so mobile users can also quickly identify project types.

### 4. Filter Logic Enhancement
Update the filtering logic to support content type filtering:
- Add new state: `contentTypeFilter` with values: `'all'`, `'blog_article'`, `'social_media'`, `'youtube_script'`, `'product_description'`
- Chain the filter with existing month and status filters
- Reset pagination when content type filter changes

---

## Technical Details

### New State Variable
```typescript
const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
```

### Content Type Detection Logic
```typescript
const getContentTypeInfo = (article: Article) => {
  if (article.youtube_script) {
    return { label: 'YouTube Script', icon: Video, color: 'red' };
  }
  switch (article.content_type) {
    case 'blog_article':
    case 'article':
      return { label: 'Blog Article', icon: FileText, color: 'blue' };
    case 'social_media':
    case 'social_media_post':
      return { label: 'Social Post', icon: MessageSquare, color: 'green' };
    case 'product_description':
      return { label: 'Product Desc', icon: Package, color: 'purple' };
    default:
      return { label: 'Blog Article', icon: FileText, color: 'blue' };
  }
};
```

### Updated Filter Chain
```typescript
// Filter by month, then status, then content type
const monthFiltered = monthFilter === 'all_time' 
  ? articles 
  : articles.filter(a => getMonthYear(a.created_at) === monthFilter);

const statusFiltered = statusFilter === 'all' 
  ? monthFiltered 
  : monthFiltered.filter(a => a.status === statusFilter);

const filteredArticles = contentTypeFilter === 'all'
  ? statusFiltered
  : statusFiltered.filter(a => {
      if (contentTypeFilter === 'youtube_script') return a.youtube_script;
      if (contentTypeFilter === 'blog_article') return !a.youtube_script && (!a.content_type || a.content_type === 'article' || a.content_type === 'blog_article');
      if (contentTypeFilter === 'social_media') return !a.youtube_script && (a.content_type === 'social_media' || a.content_type === 'social_media_post');
      if (contentTypeFilter === 'product_description') return a.content_type === 'product_description';
      return true;
    });
```

### Files to Modify
1. **src/pages/Dashboard.tsx** - Add content type filter, update table/cards, add type column

### Design Consistency
- Badge colors will use the existing color palette (primary-glow, emerald, purple, etc.)
- Filter buttons will match the existing "dimmer blue" selected state pattern
- All styling will follow the established glassmorphic design system

