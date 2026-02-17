

# Fix: Scanning Lines Positioned Outside Their Container

## Problem
The last edit accidentally placed the scanning lines **after** both closing `</div>` tags at lines 415-416, putting them outside the dotted background wrapper (line 82) that has `position: relative`. Without a relative parent, `absolute bottom-0` has no effect and the lines are invisible.

## Current (broken) structure:
```
<div className="relative ...">        <!-- line 82, wrapper -->
  <div className="relative">           <!-- line 88, content -->
    ...content...
  </div>                               <!-- line 415, closes content -->
</div>                                 <!-- line 416, closes wrapper -->
<!-- Scanning lines are HERE - OUTSIDE the wrapper! -->
<div className="absolute bottom-0 ...">
```

## Fix in `src/pages/WhyChooseUs.tsx`

Swap lines 415-416 with lines 417-421 so the scanning lines come **before** the wrapper's closing `</div>`:

```
<div className="relative ...">        <!-- line 82, wrapper -->
  <div className="relative">           <!-- line 88, content -->
    ...content...
  </div>                               <!-- closes content div -->
  <!-- Scanning lines HERE - inside the wrapper -->
  <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
    <div className="absolute bottom-0 h-px w-full bg-gradient-neural animate-scan-line opacity-30" />
    <div className="absolute bottom-2 h-px w-full bg-gradient-cyber animate-scan-line opacity-25" style={{ animationDelay: '2s' }} />
  </div>
</div>                                 <!-- closes wrapper -->
```

This is a single reorder of existing lines (415-421) in the file. No new code needed.
