import * as React from "react";
import { cn } from "@/lib/utils";

interface AnimatedStatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "primary" | "purple";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const variantStyles = {
  default: {
    icon: "text-white/60",
    value: "text-white",
    label: "text-white/50",
    glow: ""
  },
  primary: {
    icon: "text-primary-glow",
    value: "text-primary-glow",
    label: "text-white/50",
    glow: "drop-shadow-[0_0_10px_hsl(221_83%_53%/0.5)]"
  },
  success: {
    icon: "text-emerald-400",
    value: "text-emerald-400",
    label: "text-white/50",
    glow: "drop-shadow-[0_0_10px_hsl(160_84%_45%/0.5)]"
  },
  warning: {
    icon: "text-amber-400",
    value: "text-amber-400",
    label: "text-white/50",
    glow: "drop-shadow-[0_0_10px_hsl(45_93%_55%/0.5)]"
  },
  danger: {
    icon: "text-rose-400",
    value: "text-rose-400",
    label: "text-white/50",
    glow: "drop-shadow-[0_0_10px_hsl(0_84%_55%/0.5)]"
  },
  purple: {
    icon: "text-purple-400",
    value: "text-purple-400",
    label: "text-white/50",
    glow: "drop-shadow-[0_0_10px_hsl(270_70%_55%/0.5)]"
  }
};

const sizeStyles = {
  sm: {
    value: "text-xl",
    label: "text-xs",
    icon: "w-4 h-4"
  },
  md: {
    value: "text-3xl",
    label: "text-sm",
    icon: "w-5 h-5"
  },
  lg: {
    value: "text-4xl",
    label: "text-base",
    icon: "w-6 h-6"
  }
};

const AnimatedStat = React.forwardRef<HTMLDivElement, AnimatedStatProps>(
  ({ 
    className, 
    value, 
    label, 
    suffix = "", 
    prefix = "",
    icon,
    variant = "default", 
    size = "md",
    animated = true,
    ...props 
  }, ref) => {
    const [displayValue, setDisplayValue] = React.useState(0);
    const styles = variantStyles[variant];
    const sizes = sizeStyles[size];
    
    React.useEffect(() => {
      if (!animated) {
        setDisplayValue(value);
        return;
      }
      
      const duration = 1000;
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, [value, animated]);

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-1",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          {icon && (
            <span className={cn(sizes.icon, styles.icon, animated && styles.glow)}>
              {icon}
            </span>
          )}
          <span className={cn(
            "font-mono font-bold tabular-nums tracking-tight",
            sizes.value,
            styles.value,
            animated && styles.glow
          )}>
            {prefix}{displayValue.toLocaleString()}{suffix}
          </span>
        </div>
        <span className={cn(
          "font-mono uppercase tracking-wider",
          sizes.label,
          styles.label
        )}>
          {label}
        </span>
      </div>
    );
  }
);

AnimatedStat.displayName = "AnimatedStat";

export { AnimatedStat };
