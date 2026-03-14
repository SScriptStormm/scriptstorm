import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { HoloBadge } from "@/components/ui/HoloBadge";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { Zap, Crown, RefreshCw } from "lucide-react";
import { formatDate } from "@/lib/dateUtils";


interface AccountStatusCardProps {
  subscriptionTier: string;
  subscriptionEnd: string | null;
  isSubscribed: boolean;
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

export const AccountStatusCard = ({ subscriptionTier, subscriptionEnd, isSubscribed }: AccountStatusCardProps) => {
  const tier = subscriptionTier.toLowerCase();
  const variant = tierVariants[tier] || "starter";
  const emoji = tierEmojis[tier] || "🚀";
  
  // Determine if subscription is active (subscribed AND not expired)
  const isActive = isSubscribed && (!subscriptionEnd || new Date(subscriptionEnd).getTime() > Date.now());

  // Calculate days remaining
  const daysRemaining = subscriptionEnd 
    ? Math.max(0, Math.floor((new Date(subscriptionEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;
  const isAnnual = daysRemaining > 180;
  const cycleTotal = isAnnual ? 365 : 30;
  const daysUsed = cycleTotal - (daysRemaining % cycleTotal);
  const cycleProgress = (daysUsed / cycleTotal) * 100;

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
              value={100 - cycleProgress}
              max={100}
              variant="primary"
              size="lg"
              label={`${daysRemaining}`}
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
