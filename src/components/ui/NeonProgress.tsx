import * as React from "react";
import { cn } from "@/lib/utils";

type NeonProgressVariant = "primary" | "success" | "warning" | "danger" | "tier";

interface NeonProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: NeonProgressVariant;
  showLabel?: boolean;
  labelPosition?: "inside" | "outside";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  glowIntensity?: "low" | "medium" | "high";
}

const getVariantStyles = (variant: NeonProgressVariant, percentage: number) => {
  // Auto-determine color based on percentage if tier variant
  if (variant === "tier") {
    if (percentage >= 90) {
      return {
        track: "bg-rose-500/10",
        fill: "bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600",
        glow: "shadow-[0_0_20px_hsl(0_84%_55%/0.5)]",
        text: "text-rose-400"
      };
    } else if (percentage >= 75) {
      return {
        track: "bg-amber-500/10",
        fill: "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500",
        glow: "shadow-[0_0_20px_hsl(45_93%_55%/0.5)]",
        text: "text-amber-400"
      };
    } else {
      return {
        track: "bg-emerald-500/10",
        fill: "bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500",
        glow: "shadow-[0_0_20px_hsl(160_84%_45%/0.5)]",
        text: "text-emerald-400"
      };
    }
  }

  const styles = {
    primary: {
      track: "bg-primary/10",
      fill: "bg-gradient-to-r from-primary via-primary-glow to-primary",
      glow: "shadow-[0_0_20px_hsl(221_83%_53%/0.5)]",
      text: "text-primary-glow"
    },
    success: {
      track: "bg-emerald-500/10",
      fill: "bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500",
      glow: "shadow-[0_0_20px_hsl(160_84%_45%/0.5)]",
      text: "text-emerald-400"
    },
    warning: {
      track: "bg-amber-500/10",
      fill: "bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500",
      glow: "shadow-[0_0_20px_hsl(45_93%_55%/0.5)]",
      text: "text-amber-400"
    },
    danger: {
      track: "bg-rose-500/10",
      fill: "bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600",
      glow: "shadow-[0_0_20px_hsl(0_84%_55%/0.5)]",
      text: "text-rose-400"
    }
  };

  return styles[variant];
};

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-4"
};

const NeonProgress = React.forwardRef<HTMLDivElement, NeonProgressProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    variant = "primary", 
    showLabel = false,
    labelPosition = "outside",
    size = "md",
    animated = true,
    glowIntensity = "medium",
    ...props 
  }, ref) => {
    const percentage = Math.min((value / max) * 100, 100);
    const styles = getVariantStyles(variant, percentage);
    
    const glowOpacity = {
      low: "opacity-30",
      medium: "opacity-50",
      high: "opacity-70"
    };

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        {/* Label outside */}
        {showLabel && labelPosition === "outside" && (
          <div className="flex justify-between items-center mb-2">
            <span className={cn("text-xs font-mono", styles.text)}>
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        
        {/* Track */}
        <div 
          className={cn(
            "relative w-full rounded-full overflow-hidden",
            styles.track,
            sizeStyles[size]
          )}
        >
          {/* Fill with shimmer */}
          <div
            className={cn(
              "h-full rounded-full relative transition-all duration-500 ease-out",
              styles.fill,
              animated && styles.glow
            )}
            style={{ width: `${percentage}%` }}
          >
            {/* Shimmer overlay */}
            {animated && (
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div 
                  className={cn(
                    "absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]",
                    "bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  )}
                />
              </div>
            )}
            
            {/* Inner glow */}
            <div className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-b from-white/30 to-transparent",
              glowOpacity[glowIntensity]
            )} />
            
            {/* Label inside */}
            {showLabel && labelPosition === "inside" && size === "lg" && (
              <span className="absolute inset-0 flex items-center justify-center text-xs font-mono text-white font-bold">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        </div>
        
        {/* Glow effect underneath */}
        {animated && (
          <div 
            className={cn(
              "absolute bottom-0 h-1 rounded-full blur-md -z-10 transition-all duration-500",
              styles.fill,
              glowOpacity[glowIntensity]
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    );
  }
);

NeonProgress.displayName = "NeonProgress";

export { NeonProgress };
