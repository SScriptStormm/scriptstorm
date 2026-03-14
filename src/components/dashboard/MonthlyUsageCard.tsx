import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { NeonProgress } from "@/components/ui/NeonProgress";
import { RadialProgress } from "@/components/ui/RadialProgress";
import { HoloBadge } from "@/components/ui/HoloBadge";
import { BarChart3, FileText, MessageSquare, Package, AlertTriangle } from "lucide-react";


interface MonthlyUsageCardProps {
  subscriptionTier: string;
  articlesUsed: number;
  socialPostsUsed: number;
  productDescUsed: number;
}

const getQuotaLimits = (tier: string) => {
  switch (tier.toLowerCase()) {
    case 'growth':
    case 'growth+':
      return { articles: 10, socialPosts: 30, productDesc: 10 };
    case 'scale':
      return { articles: 25, socialPosts: 75, productDesc: 25 };
    case 'authority':
      return { articles: 30, socialPosts: 90, productDesc: 30 };
    case 'dominance':
      return { articles: 50, socialPosts: 150, productDesc: 999999 };
    default: // starter
      return { articles: 5, socialPosts: 15, productDesc: 5 };
  }
};

export const MonthlyUsageCard = ({ subscriptionTier, articlesUsed, socialPostsUsed, productDescUsed }: MonthlyUsageCardProps) => {
  const limits = getQuotaLimits(subscriptionTier);
  
  const articlesPercent = (articlesUsed / limits.articles) * 100;
  const socialPercent = (socialPostsUsed / limits.socialPosts) * 100;
  const productPercent = limits.productDesc === 999999 ? 0 : (productDescUsed / limits.productDesc) * 100;
  
  // Overall usage for radial display
  const overallUsage = Math.round((articlesPercent + socialPercent + (limits.productDesc === 999999 ? 0 : productPercent)) / 3);
  
  const getWarningLevel = (percent: number) => {
    if (percent >= 90) return "danger";
    if (percent >= 75) return "warning";
    return null;
  };

  return (
    <GlassCard variant="default" glow hover={false}>
      <GlassCardHeader className="pb-2">
        <GlassCardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary-glow" />
          MONTHLY USAGE
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent className="pt-4">
        <div className="flex items-start gap-6">
          {/* Overall Usage Radial */}
           <div className="flex-shrink-0">
            <RadialProgress
              value={overallUsage}
              max={100}
              variant="tier"
              size="md"
              sublabel="used"
            />
          </div>
          
          {/* Usage Breakdown */}
          <div className="flex-1 space-y-5">
            {/* Articles */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary-glow" />
                  <span className="text-white/80 font-mono text-xs uppercase tracking-wide">Articles</span>
                </div>
                <span className="text-white font-mono text-sm font-bold">
                  {articlesUsed} / {limits.articles}
                </span>
              </div>
              <NeonProgress 
                value={articlesUsed} 
                max={limits.articles} 
                variant="tier" 
                size="sm"
                glowIntensity="high"
                animated={articlesUsed < limits.articles}
              />
              {getWarningLevel(articlesPercent) && (
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className={`h-3 w-3 ${getWarningLevel(articlesPercent) === 'danger' ? 'text-rose-400' : 'text-amber-400'}`} />
                  <span className={`font-mono text-xs ${getWarningLevel(articlesPercent) === 'danger' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {articlesPercent >= 100 ? 'Limit reached!' : `${Math.round(articlesPercent)}% used`}
                  </span>
                </div>
              )}
            </div>
            
            {/* Social Posts */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span className="text-white/80 font-mono text-xs uppercase tracking-wide">Social Posts</span>
                </div>
                <span className="text-white font-mono text-sm font-bold">
                  {socialPostsUsed} / {limits.socialPosts}
                </span>
              </div>
              <NeonProgress 
                value={socialPostsUsed} 
                max={limits.socialPosts} 
                variant="tier" 
                size="sm"
                glowIntensity="high"
                animated={socialPostsUsed < limits.socialPosts}
              />
              {getWarningLevel(socialPercent) && (
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className={`h-3 w-3 ${getWarningLevel(socialPercent) === 'danger' ? 'text-rose-400' : 'text-amber-400'}`} />
                  <span className={`font-mono text-xs ${getWarningLevel(socialPercent) === 'danger' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {socialPercent >= 100 ? 'Limit reached!' : `${Math.round(socialPercent)}% used`}
                  </span>
                </div>
              )}
            </div>
            
            {/* Product Descriptions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-purple-400" />
                  <span className="text-white/80 font-mono text-xs uppercase tracking-wide">Product Desc</span>
                </div>
                <span className="text-white font-mono text-sm font-bold">
                  {limits.productDesc === 999999 ? (
                    <HoloBadge variant="dominance" size="sm">∞ Unlimited</HoloBadge>
                  ) : (
                    `${productDescUsed} / ${limits.productDesc}`
                  )}
                </span>
              </div>
              {limits.productDesc !== 999999 && (
              <NeonProgress 
                value={productDescUsed} 
                max={limits.productDesc} 
                variant="tier" 
                size="sm"
                glowIntensity="high"
                animated={productDescUsed < limits.productDesc}
              />
              )}
              {limits.productDesc !== 999999 && getWarningLevel(productPercent) && (
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className={`h-3 w-3 ${getWarningLevel(productPercent) === 'danger' ? 'text-rose-400' : 'text-amber-400'}`} />
                  <span className={`font-mono text-xs ${getWarningLevel(productPercent) === 'danger' ? 'text-rose-400' : 'text-amber-400'}`}>
                    {productPercent >= 100 ? 'Limit reached!' : `${Math.round(productPercent)}% used`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};
