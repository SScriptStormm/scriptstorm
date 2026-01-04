import * as React from "react";
import { cn } from "@/lib/utils";

type HoloBadgeVariant = "default" | "starter" | "growth" | "scale" | "authority" | "dominance" | "success" | "warning" | "danger" | "active" | "inactive";

interface HoloBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: HoloBadgeVariant;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<HoloBadgeVariant, { bg: string; border: string; text: string; glow: string }> = {
  default: {
    bg: "bg-primary/20",
    border: "border-primary-glow/50",
    text: "text-primary-glow",
    glow: "shadow-[0_0_15px_hsl(221_83%_53%/0.3)]"
  },
  starter: {
    bg: "bg-blue-500/20",
    border: "border-blue-400/50",
    text: "text-blue-300",
    glow: "shadow-[0_0_15px_hsl(210_100%_60%/0.3)]"
  },
  growth: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-400/50",
    text: "text-emerald-300",
    glow: "shadow-[0_0_15px_hsl(160_84%_45%/0.3)]"
  },
  scale: {
    bg: "bg-purple-500/20",
    border: "border-purple-400/50",
    text: "text-purple-300",
    glow: "shadow-[0_0_15px_hsl(270_70%_55%/0.3)]"
  },
  authority: {
    bg: "bg-orange-500/20",
    border: "border-orange-400/50",
    text: "text-orange-300",
    glow: "shadow-[0_0_15px_hsl(25_95%_55%/0.3)]"
  },
  dominance: {
    bg: "bg-gradient-to-r from-amber-500/30 to-rose-500/20",
    border: "border-amber-400/60",
    text: "text-amber-200",
    glow: "shadow-[0_0_20px_hsl(45_93%_55%/0.4)]"
  },
  success: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-400/50",
    text: "text-emerald-300",
    glow: "shadow-[0_0_15px_hsl(160_84%_45%/0.3)]"
  },
  warning: {
    bg: "bg-amber-500/20",
    border: "border-amber-400/50",
    text: "text-amber-300",
    glow: "shadow-[0_0_15px_hsl(45_93%_55%/0.3)]"
  },
  danger: {
    bg: "bg-rose-500/20",
    border: "border-rose-400/50",
    text: "text-rose-300",
    glow: "shadow-[0_0_15px_hsl(0_84%_55%/0.3)]"
  },
  active: {
    bg: "bg-emerald-500/20",
    border: "border-emerald-400/50",
    text: "text-emerald-300",
    glow: "shadow-[0_0_15px_hsl(160_84%_45%/0.3)]"
  },
  inactive: {
    bg: "bg-gray-500/20",
    border: "border-gray-400/50",
    text: "text-gray-400",
    glow: ""
  }
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-sm px-3 py-1",
  lg: "text-base px-4 py-1.5"
};

const HoloBadge = React.forwardRef<HTMLSpanElement, HoloBadgeProps>(
  ({ className, variant = "default", size = "md", animated = true, pulse = false, icon, children, ...props }, ref) => {
    const styles = variantStyles[variant];
    
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 font-mono font-medium rounded-full border backdrop-blur-sm",
          styles.bg,
          styles.border,
          styles.text,
          animated && styles.glow,
          sizeStyles[size],
          animated && "transition-all duration-300",
          pulse && "animate-pulse-glow",
          className
        )}
        {...props}
      >
        {/* Shimmer overlay for holographic effect */}
        {animated && variant === "dominance" && (
          <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <span className="absolute inset-0 animate-holographic-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%]" />
          </span>
        )}
        
        {/* Pulse indicator */}
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              variant === "active" ? "bg-emerald-400" : 
              variant === "danger" ? "bg-rose-400" : "bg-primary-glow"
            )} />
            <span className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              variant === "active" ? "bg-emerald-400" : 
              variant === "danger" ? "bg-rose-400" : "bg-primary-glow"
            )} />
          </span>
        )}
        
        {icon && <span className="shrink-0">{icon}</span>}
        
        <span className="relative">{children}</span>
      </span>
    );
  }
);

HoloBadge.displayName = "HoloBadge";

export { HoloBadge };
