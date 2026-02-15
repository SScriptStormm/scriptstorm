

# Fix Word Counts for Social Posts, YouTube Scripts, and Product Descriptions

## Problem
Currently, social posts always get `word_count = 100`, product descriptions always get `word_count = 150`, and YouTube scripts get whatever the social media default is instead of the client's chosen script length. The correct behavior:

| Content Type | Word Count Behavior |
|---|---|
| Social Post | Random between 50-120 |
| YouTube Script | Client's chosen script length (300-800 slider) |
| Product Description | Random between 100-200 |
| Blog Article | Client's chosen value (tier-based slider) |

## Changes

### File: `src/components/MultiStepContentBriefForm.tsx`

**1. Update Zod schema (line 30)**
- Change `word_count` min from `100` to `50` to allow social posts at the low end of their range

**2. Submission logic (around line 288)**
- Before inserting into the database, determine the correct `word_count`:
  - If `social_media` (non-YouTube): generate a random integer between 50 and 120
  - If `social_media` with `youtube_script = true`: use the `youtube_script_length` value (already set by the client via the 300-800 slider)
  - If `product_description`: generate a random integer between 100 and 200
  - If `blog_article`: use `data.word_count` as-is (already set by client)

**3. Keep DEFAULT_WORD_COUNTS as-is**
- The defaults are only used for the form field display, which doesn't matter for non-blog types since the word count field is hidden. The actual stored value will be computed at submission time.

### No database changes needed
The DB trigger `validate_article_word_count` already skips non-blog content types.

