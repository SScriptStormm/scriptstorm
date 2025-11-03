import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Share2, Package } from "lucide-react";

interface QuotaUsageWidgetProps {
  subscriptionTier: string;
  articlesUsed: number;
  socialPostsUsed: number;
  productDescUsed: number;
}

export const QuotaUsageWidget = ({
  subscriptionTier,
  articlesUsed,
  socialPostsUsed,
  productDescUsed,
}: QuotaUsageWidgetProps) => {
  const getQuotaLimits = () => {
    switch (subscriptionTier) {
      case "starter":
        return { articles: 5, social: 15, products: 5 };
      case "growth":
        return { articles: 10, social: 30, products: 10 };
      case "scale":
        return { articles: 25, social: 75, products: 25 };
      case "authority":
        return { articles: 30, social: 90, products: 30 };
      case "dominance":
        return { articles: 50, social: 150, products: 999999 };
      default:
        return { articles: 5, social: 15, products: 5 };
    }
  };

  const limits = getQuotaLimits();
  const articlePercentage = Math.min((articlesUsed / limits.articles) * 100, 100);
  const socialPercentage = Math.min((socialPostsUsed / limits.social) * 100, 100);
  const productPercentage = limits.products === 999999 ? 0 : Math.min((productDescUsed / limits.products) * 100, 100);

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-destructive";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <Card className="p-6 bg-black/30 backdrop-blur-xl border-primary-glow/30">
      <h3 className="text-lg font-bold text-white mb-4 font-mono tracking-wide">MONTHLY USAGE</h3>
      
      <div className="space-y-4">
        {/* Articles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Articles</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              {articlesUsed}/{limits.articles === 999999 ? "∞" : limits.articles}
            </span>
          </div>
          <Progress value={articlePercentage} className="h-2" indicatorClassName={getProgressColor(articlePercentage)} />
        </div>

        {/* Social Media Posts */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Social Posts</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              {socialPostsUsed}/{limits.social === 999999 ? "∞" : limits.social}
            </span>
          </div>
          <Progress value={socialPercentage} className="h-2" indicatorClassName={getProgressColor(socialPercentage)} />
        </div>

        {/* Product Descriptions */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">Product Descriptions</span>
            </div>
            <span className="text-sm font-mono text-muted-foreground">
              {productDescUsed}/{limits.products === 999999 ? "∞" : limits.products}
            </span>
          </div>
          {limits.products === 999999 ? (
            <div className="text-xs text-muted-foreground font-mono">Unlimited</div>
          ) : (
            <Progress value={productPercentage} className="h-2" indicatorClassName={getProgressColor(productPercentage)} />
          )}
        </div>
      </div>

      {(articlePercentage >= 90 || socialPercentage >= 90 || (productPercentage >= 90 && limits.products !== 999999)) && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p className="text-xs text-destructive font-mono">
            You're approaching your monthly limit. Consider upgrading your plan.
          </p>
        </div>
      )}
    </Card>
  );
};
