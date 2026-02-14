

# Add Automation Tagline to "Our Core Content Services" Section

## Overview
Add a subtitle line beneath the "Our Core Content Services" heading to reinforce ScriptStorm's core value proposition of speed, automation, and quality.

## Change

### File: `src/components/Services.tsx` (lines 150-154)

**Current:**
```
<div className="text-center mb-12">
  <h3 className="text-3xl font-bold mb-2 text-foreground font-mono tracking-wide">
    Our Core Content Services
  </h3>
</div>
```

**Updated:**
```
<div className="text-center mb-12">
  <h3 className="text-3xl font-bold mb-4 text-foreground font-mono tracking-wide">
    Our Core Content Services
  </h3>
  <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
    All content is fully automated through our proprietary AI workflow -- no human intervention, no delays, just consistent quality.
  </p>
</div>
```

A paragraph is added below the heading using the same styling pattern already used in the "Strategic Content Scaling" and "Content That Converts" sub-headers (text-lg, text-muted-foreground, max-w-3xl, leading-relaxed). The heading's bottom margin is adjusted from mb-2 to mb-4 for balanced spacing.

## Scope
- 1 file, minor addition
- No structural or logic changes

