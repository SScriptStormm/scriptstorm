import * as React from "react";
import { cn } from "@/lib/utils";

export type GlassCardVariant = "default" | "starter" | "growth" | "scale" | "authority" | "dominance" | "success" | "warning" | "danger";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassCardVariant;
  glow?: boolean;
  hover?: boolean;
  borderGlow?: boolean;
}

const variantStyles: Record<GlassCardVariant, { border: string; glow: string; accent: string }> = {
  default: {
    border: "border-primary-glow/20",
    glow: "shadow-[0_0_30px_hsl(221_83%_53%/0.15)]",
    accent: "from-primary/10 to-transparent"
  },
  starter: {
    border: "border-blue-400/30",
    glow: "shadow-[0_0_30px_hsl(210_100%_60%/0.2)]",
    accent: "from-blue-500/15 to-transparent"
  },
  growth: {
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_30px_hsl(160_84%_45%/0.2)]",
    accent: "from-emerald-500/15 to-transparent"
  },
  scale: {
    border: "border-purple-400/30",
    glow: "shadow-[0_0_30px_hsl(270_70%_55%/0.2)]",
    accent: "from-purple-500/15 to-transparent"
  },
  authority: {
    border: "border-orange-400/30",
    glow: "shadow-[0_0_30px_hsl(25_95%_55%/0.2)]",
    accent: "from-orange-500/15 to-transparent"
  },
  dominance: {
    border: "border-amber-400/40",
    glow: "shadow-[0_0_40px_hsl(45_93%_55%/0.25)]",
    accent: "from-amber-500/20 via-rose-500/10 to-transparent"
  },
  success: {
    border: "border-emerald-400/30",
    glow: "shadow-[0_0_30px_hsl(160_84%_45%/0.2)]",
    accent: "from-emerald-500/15 to-transparent"
  },
  warning: {
    border: "border-amber-400/30",
    glow: "shadow-[0_0_30px_hsl(45_93%_55%/0.2)]",
    accent: "from-amber-500/15 to-transparent"
  },
  danger: {
    border: "border-rose-400/30",
    glow: "shadow-[0_0_30px_hsl(0_84%_55%/0.2)]",
    accent: "from-rose-500/15 to-transparent"
  }
};

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", glow = false, hover = true, borderGlow = false, children, ...props }, ref) => {
    const styles = variantStyles[variant];
    
    return (
      <div
        ref={ref}
        className={cn(
          // Base glass effect
          "relative rounded-xl border backdrop-blur-xl",
          "bg-gradient-to-br from-white/[0.08] to-white/[0.02]",
          // Border styling
          styles.border,
          // Glow effect
          glow && styles.glow,
          // Hover effects
          hover && [
            "transition-all duration-300 ease-out",
            "hover:scale-[1.01] hover:border-primary-glow/40",
            "hover:shadow-[0_0_40px_hsl(221_83%_53%/0.2)]",
            "hover:bg-gradient-to-br hover:from-white/[0.12] hover:to-white/[0.04]"
          ],
          // Border glow animation
          borderGlow && "animate-pulse-glow",
          className
        )}
        {...props}
      >
        {/* Gradient accent overlay */}
        <div className={cn(
          "absolute inset-0 rounded-xl bg-gradient-to-br opacity-50 pointer-events-none",
          styles.accent
        )} />
        
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-transparent to-white/[0.05] pointer-events-none" />
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

interface GlassCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCardHeader = React.forwardRef<HTMLDivElement, GlassCardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-4 pb-3 sm:p-6 sm:pb-4", className)}
      {...props}
    />
  )
);
GlassCardHeader.displayName = "GlassCardHeader";

interface GlassCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const GlassCardTitle = React.forwardRef<HTMLHeadingElement, GlassCardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight text-white font-mono",
        className
      )}
      {...props}
    />
  )
);
GlassCardTitle.displayName = "GlassCardTitle";

interface GlassCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const GlassCardDescription = React.forwardRef<HTMLParagraphElement, GlassCardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-white/60", className)}
      {...props}
    />
  )
);
GlassCardDescription.displayName = "GlassCardDescription";

interface GlassCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCardContent = React.forwardRef<HTMLDivElement, GlassCardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
GlassCardContent.displayName = "GlassCardContent";

interface GlassCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const GlassCardFooter = React.forwardRef<HTMLDivElement, GlassCardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
GlassCardFooter.displayName = "GlassCardFooter";

export { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent, GlassCardFooter };
