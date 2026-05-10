import { useState, useEffect } from "react";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { HoloBadge } from "@/components/ui/HoloBadge";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { Zap, Crown, RefreshCw } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";


interface AccountStatusCardProps {
  subscriptionTier: string;
  subscriptionEnd: string | null;
  isSubscribed: boolean;
  billingCycle?: string | null;
}

const tierVariants: Record<string, "starter" | "growth" | "scale" | "authority" | "dominance"> = {
  starter: "starter",
  growth: "growth",
  scale: "scale",
  authority: "authority",
  dominance: "dominance"
};

const tierEmojis: Record<string, string> = {
  starter: "🚀",
  growth: "🔥",
  scale: "⚡",
  authority: "👑",
  dominance: "💎"
};

export const AccountStatusCard = ({ subscriptionTier, subscriptionEnd, isSubscribed, billingCycle }: AccountStatusCardProps) => {
  const tier = subscriptionTier.toLowerCase();
  const variant = tierVariants[tier] || "starter";
  const emoji = tierEmojis[tier] || "🚀";
  
  // Determine if subscription is active (subscribed AND not expired)
  const isActive = isSubscribed && (!subscriptionEnd || new Date(subscriptionEnd).getTime() > Date.now());

  // Calculate days remaining
  const daysRemaining = subscriptionEnd 
    ? Math.max(0, Math.floor((new Date(subscriptionEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  // Prefer the explicit billing_cycle from Stripe; fall back to a days-remaining heuristic for legacy rows.
  const isAnnual = billingCycle
    ? billingCycle.toLowerCase() === "annual"
    : daysRemaining >= 180;
  const cycleTotal = isAnnual ? 365 : 30;
  const daysInCycle = Math.min(daysRemaining, cycleTotal);
  const cycleProgress = (daysInCycle / cycleTotal) * 100;

  const [displayDays, setDisplayDays] = useState(0);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const increment = daysRemaining / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= daysRemaining) {
        setDisplayDays(daysRemaining);
        clearInterval(timer);
      } else {
        setDisplayDays(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [daysRemaining]);

  return (
    <GlassCard variant={variant} glow hover={false}>
      <GlassCardHeader className="pb-2">
        <GlassCardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary-glow" />
          ACCOUNT STATUS
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="pt-4">
        <div className="flex items-start gap-6">
          {/* Radial Progress */}
          <div className="flex-shrink-0">
            <RadialProgress
              value={cycleProgress}
              max={100}
              variant="primary"
              size="lg"
              label={`${displayDays}`}
              sublabel="days left"
            />
          </div>
          
          {/* Status Info */}
          <div className="flex-1 space-y-4">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              {isActive ? (
                <HoloBadge variant="active" pulse animated={false} size="sm">
                  ACTIVE
                </HoloBadge>
              ) : (
                <HoloBadge variant="danger" pulse animated={false} size="sm">
                  INACTIVE
                </HoloBadge>
              )}
            </div>
            
            {/* Plan */}
            <div className="space-y-1">
              <span className="text-white/60 font-mono text-xs uppercase tracking-wider">Current Plan</span>
              <div className="flex items-center gap-2 flex-wrap">
                <HoloBadge variant={variant} size="md" animated>
                  {emoji} {subscriptionTier ? subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1) : 'Starter'}
                </HoloBadge>
                {subscriptionEnd && (
                  <HoloBadge variant={isAnnual ? "premium" : "danger"} size="sm" animated>
                    {isAnnual
                      ? <Crown className="h-3 w-3 mr-1" />
                      : <RefreshCw className="h-3 w-3 mr-1" />}
                    {isAnnual ? 'ANNUAL' : 'MONTHLY'}
                  </HoloBadge>
                )}
              </div>
            </div>
            
            {/* Renewal Date */}
            {subscriptionEnd && (
              <div className="space-y-1">
                <span className="text-white/60 font-mono text-xs uppercase tracking-wider">Renews On</span>
                <p className="text-white font-mono text-sm">
                  {formatDate(subscriptionEnd)}
                </p>
              </div>
            )}
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};
