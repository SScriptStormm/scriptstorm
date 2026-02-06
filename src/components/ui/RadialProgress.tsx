import * as React from "react";
import { cn } from "@/lib/utils";

type RadialProgressVariant = "primary" | "success" | "warning" | "danger" | "tier";

interface RadialProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  variant?: RadialProgressVariant;
  size?: "sm" | "md" | "lg" | "xl";
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
  sublabel?: string;
  animated?: boolean;
  icon?: React.ReactNode;
}

const getVariantStyles = (variant: RadialProgressVariant, percentage: number) => {
  if (variant === "tier") {
    if (percentage >= 90) {
      return {
        stroke: "stroke-rose-500",
        glow: "drop-shadow-[0_0_8px_hsl(0_84%_55%/0.6)]",
        text: "text-rose-400",
        track: "stroke-rose-500/10"
      };
    } else if (percentage >= 75) {
      return {
        stroke: "stroke-amber-500",
        glow: "drop-shadow-[0_0_8px_hsl(45_93%_55%/0.6)]",
        text: "text-amber-400",
        track: "stroke-amber-500/10"
      };
    } else {
      return {
        stroke: "stroke-emerald-500",
        glow: "drop-shadow-[0_0_8px_hsl(160_84%_45%/0.6)]",
        text: "text-emerald-400",
        track: "stroke-emerald-500/10"
      };
    }
  }

  const styles = {
    primary: {
      stroke: "stroke-[hsl(221,83%,60%)]",
      glow: "drop-shadow-[0_0_8px_hsl(221_83%_60%/0.6)]",
      text: "text-[hsl(221,83%,60%)]",
      track: "stroke-[hsl(221,83%,60%)]/20"
    },
    success: {
      stroke: "stroke-emerald-500",
      glow: "drop-shadow-[0_0_8px_hsl(160_84%_45%/0.6)]",
      text: "text-emerald-400",
      track: "stroke-emerald-500/10"
    },
    warning: {
      stroke: "stroke-amber-500",
      glow: "drop-shadow-[0_0_8px_hsl(45_93%_55%/0.6)]",
      text: "text-amber-400",
      track: "stroke-amber-500/10"
    },
    danger: {
      stroke: "stroke-rose-500",
      glow: "drop-shadow-[0_0_8px_hsl(0_84%_55%/0.6)]",
      text: "text-rose-400",
      track: "stroke-rose-500/10"
    }
  };

  return styles[variant];
};

const sizeConfig = {
  sm: { size: 60, strokeWidth: 4, labelSize: "text-sm", sublabelSize: "text-xs" },
  md: { size: 80, strokeWidth: 6, labelSize: "text-lg", sublabelSize: "text-xs" },
  lg: { size: 120, strokeWidth: 8, labelSize: "text-2xl", sublabelSize: "text-sm" },
  xl: { size: 160, strokeWidth: 10, labelSize: "text-3xl", sublabelSize: "text-base" }
};

const RadialProgress = React.forwardRef<HTMLDivElement, RadialProgressProps>(
  ({ 
    className, 
    value, 
    max = 100, 
    variant = "primary", 
    size = "md",
    strokeWidth: customStrokeWidth,
    showLabel = true,
    label,
    sublabel,
    animated = true,
    icon,
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const percentage = Math.min((value / max) * 100, 100);
    const config = sizeConfig[size];
    const strokeWidth = customStrokeWidth || config.strokeWidth;
    const radius = (config.size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const styles = getVariantStyles(variant, percentage);
    
    React.useEffect(() => {
      if (!animated) {
        setDisplayValue(percentage);
        return;
      }
      
      const duration = 1000;
      const steps = 30;
      const increment = percentage / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= percentage) {
          setDisplayValue(percentage);
          clearInterval(timer);
        } else {
          setDisplayValue(current);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, [percentage, animated]);

    const strokeDashoffset = circumference - (displayValue / 100) * circumference;

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex items-center justify-center", className)}
        style={{ width: config.size, height: config.size }}
        {...props}
      >
        <svg
          className={cn("transform -rotate-90", animated && styles.glow)}
          width={config.size}
          height={config.size}
        >
          {/* Track */}
          <circle
            className={cn("transition-colors", styles.track)}
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={config.size / 2}
            cy={config.size / 2}
          />
          
          {/* Progress */}
          <circle
            className={cn(
              "transition-all duration-500 ease-out",
              styles.stroke
            )}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={config.size / 2}
            cy={config.size / 2}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset
            }}
          />
        </svg>
        
        {/* Center content */}
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {icon ? (
              <span className={cn("mb-0.5", styles.text)}>
                {icon}
              </span>
            ) : null}
            <span className={cn(
              "font-mono font-bold",
              config.labelSize,
              styles.text
            )}>
              {label ?? `${Math.round(displayValue)}%`}
            </span>
            {sublabel && (
              <span className={cn(
                "font-mono text-white/50 uppercase tracking-wider",
                config.sublabelSize
              )}>
                {sublabel}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
);

RadialProgress.displayName = "RadialProgress";

export { RadialProgress };
