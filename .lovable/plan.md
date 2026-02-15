

# Update Quality Control Description in Content Pipeline

## Overview
Update the Quality Control stage description in the Content Pipeline widget from "Human review and optimization" to "Automated plagiarism & AI detection scan" to accurately reflect that Originality.ai handles this step automatically.

## Technical Details

### File: `src/components/dashboard/ContentPipelineCard.tsx` (line 30)

**Current:**
```
{ name: 'Quality Control', icon: Eye, emoji: '🔍', desc: 'Human review and optimization', step: 4 },
```

**Updated:**
```
{ name: 'Quality Control', icon: Eye, emoji: '🔍', desc: 'Automated plagiarism & AI detection scan', step: 4 },
```

## Scope
- 1 file, 1 line change -- swapping a description string
