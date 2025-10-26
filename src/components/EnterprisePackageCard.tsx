import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, Star, FileText, Share2, Package, Clock, 
  RefreshCw, Search, Shield, Headphones, TrendingUp, 
  BarChart3, Map, Infinity
} from "lucide-react";

interface EnterprisePackage {
  id: string;
  name: string;
  monthly: {
    price: string;
    period: string;
  };
  annual: {
    price: string;
    period: string;
    monthlyEquivalent: string;
    savings: string;
  };
  color: string;
  badge?: string;
  features: string[];
  annualFeatures?: string[];
  note?: string;
  details?: string;
}

interface EnterprisePackageCardProps {
  pkg: EnterprisePackage;
  onCheckout: (packageId: string) => void;
  loadingStates: {[key: string]: boolean};
  isAnnual: boolean;
}

const getFeatureIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase();
  
  // Articles/Blog Content
  if (lowerFeature.includes('blog articles') || lowerFeature.includes('assets') || lowerFeature.includes('content pieces')) {
    return <FileText className="h-3 w-3 text-white" />;
  }
  // Social Media
  if (lowerFeature.includes('social media')) {
    return <Share2 className="h-3 w-3 text-white" />;
  }
  // Product Descriptions
  if (lowerFeature.includes('product') || lowerFeature.includes('service pages')) {
    return <Package className="h-3 w-3 text-white" />;
  }
  // Delivery Time
  if (lowerFeature.includes('delivery') || lowerFeature.includes('hour') || lowerFeature.includes('turnaround')) {
    return <Clock className="h-3 w-3 text-white" />;
  }
  // Revisions
  if (lowerFeature.includes('revision')) {
    return <RefreshCw className="h-3 w-3 text-white" />;
  }
  // Keyword Research
  if (lowerFeature.includes('keyword') || lowerFeature.includes('competitor')) {
    return <Search className="h-3 w-3 text-white" />;
  }
  // Guarantees
  if (lowerFeature.includes('guarantee') || lowerFeature.includes('plagiarism') || lowerFeature.includes('scan')) {
    return <Shield className="h-3 w-3 text-white" />;
  }
  // Support
  if (lowerFeature.includes('support') || lowerFeature.includes('portal') || lowerFeature.includes('manager')) {
    return <Headphones className="h-3 w-3 text-white" />;
  }
  // Performance/Dashboard
  if (lowerFeature.includes('dashboard') || lowerFeature.includes('performance') || lowerFeature.includes('analytics')) {
    return <BarChart3 className="h-3 w-3 text-white" />;
  }
  // Strategy/Roadmap
  if (lowerFeature.includes('roadmap') || lowerFeature.includes('mapping') || lowerFeature.includes('strategy')) {
    return <Map className="h-3 w-3 text-white" />;
  }
  // Enterprise Intelligence
  if (lowerFeature.includes('intelligence') || lowerFeature.includes('insights') || lowerFeature.includes('optimization')) {
    return <TrendingUp className="h-3 w-3 text-white" />;
  }
  // Unlimited features
  if (lowerFeature.includes('unlimited') || lowerFeature.includes('white-glove')) {
    return <Infinity className="h-3 w-3 text-white" />;
  }
  
  // Default fallback
  return <CheckCircle className="h-2.5 w-2.5 text-white" />;
};

const EnterprisePackageCard = ({ pkg, onCheckout, loadingStates, isAnnual }: EnterprisePackageCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(prev => !prev);
  };

  return (
    <Card className="relative border-0 hover:scale-105 transition-all duration-500 group" style={{
      background: `linear-gradient(135deg, ${pkg.color}08 0%, ${pkg.color}15 30%, ${pkg.color}08 100%)`,
      boxShadow: `0 20px 40px -10px ${pkg.color}30, 0 0 30px ${pkg.color}20, inset 0 1px 0 ${pkg.color}40`,
      border: `2px solid ${pkg.color}40`
    }}>
      {/* Badge positioned outside card to avoid overlay interference */}
      {pkg.badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-50">
          <Badge 
            className="px-4 py-2 text-sm font-bold text-white shadow-lg"
            style={{ backgroundColor: pkg.color }}
          >
            {pkg.badge === 'BEST VALUE' ? <Star className="h-4 w-4 mr-1" /> : null}
            {pkg.badge}
          </Badge>
        </div>
      )}
      
      {/* Premium glow effect with lower z-index */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" style={{
        background: `linear-gradient(135deg, ${pkg.color}10, ${pkg.color}05)`,
        boxShadow: `inset 0 0 20px ${pkg.color}20`,
        zIndex: -1
      }} />
      
      {/* Elegant top accent with lower z-index */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-lg pointer-events-none" style={{
        background: `linear-gradient(90deg, transparent 0%, ${pkg.color}80 20%, ${pkg.color} 50%, ${pkg.color}80 80%, transparent 100%)`,
        zIndex: -1
      }} />
      
      {/* Subtle corner highlights with lower z-index */}
      <div className="absolute top-2 left-2 w-8 h-8 rounded-full opacity-20 pointer-events-none" style={{ 
        background: `radial-gradient(circle, ${pkg.color}60, transparent)`,
        zIndex: -1
      }} />
      <div className="absolute top-2 right-2 w-8 h-8 rounded-full opacity-20 pointer-events-none" style={{ 
        background: `radial-gradient(circle, ${pkg.color}60, transparent)`,
        zIndex: -1
      }} />
      
      {/* Premium texture overlay with lowest z-index */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, ${pkg.color}40 1px, transparent 0)`,
        backgroundSize: '20px 20px',
        zIndex: -2
      }} />
      
      <CardHeader className={`text-center ${pkg.badge ? 'pt-10' : 'pt-6'} relative`}>
        <CardTitle className="text-2xl font-bold mb-2" style={{ color: pkg.color }}>
          {pkg.name}
        </CardTitle>
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">
            {isAnnual ? pkg.annual.price : pkg.monthly.price}
          </span>
          <span className="text-lg font-semibold text-foreground ml-1">USD</span>
          <span className="text-muted-foreground ml-2 font-semibold">
            {isAnnual ? '/ year' : '/ month'}
          </span>
        </div>
        {isAnnual && (
          <div className="mb-4 p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg border-3 border-green-500 dark:border-green-400 shadow-xl ring-2 ring-green-300 dark:ring-green-600">
            <p className="text-lg text-green-800 dark:text-green-200 font-extrabold mb-1">
              🎉 Get 2 Months Free & Save {pkg.annual.savings}
            </p>
            <p className="text-sm text-green-700 dark:text-green-300 font-bold">
              Equivalent to {pkg.annual.monthlyEquivalent}/month
            </p>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6 relative">
        <div className="space-y-2">
          {/* Get the correct feature list based on billing type */}
          {(() => {
            const displayFeatures = isAnnual && pkg.annualFeatures ? pkg.annualFeatures : pkg.features;
            
            return (
              <>
                {/* Always show first 5 features */}
                {displayFeatures.slice(0, 5).map((feature, index) => {
                  const [boldPart, ...restParts] = feature.split(':');
                  const restText = restParts.join(':');
                  
                  return (
                    <div 
                      key={`${pkg.id}-base-${index}`} 
                      className="flex items-start gap-2"
                    >
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: pkg.color }}
                      >
                        {getFeatureIcon(feature)}
                      </div>
                      <span className="text-sm">
                        {restText ? (
                          <>
                            <strong>{boldPart}</strong>:{restText}
                          </>
                        ) : (
                          boldPart
                        )}
                      </span>
                    </div>
                  );
                })}
                
                {/* Only show additional features when THIS specific package is expanded */}
                {isExpanded && displayFeatures.length > 5 && (
                  <>
                    <div className="pt-2 border-t border-border" />
                    {displayFeatures.slice(5).map((feature, index) => {
                      const [boldPart, ...restParts] = feature.split(':');
                      const restText = restParts.join(':');
                      
                      return (
                        <div 
                          key={`${pkg.id}-expanded-${index + 5}`} 
                          className="flex items-start gap-2"
                        >
                          <div 
                            className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: pkg.color }}
                          >
                            {getFeatureIcon(feature)}
                          </div>
                          <span className="text-sm">
                            {restText ? (
                              <>
                                <strong>{boldPart}</strong>:{restText}
                              </>
                            ) : (
                              boldPart
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            );
          })()}
        </div>

        {pkg.note && (
          <p className="text-xs text-muted-foreground italic">{pkg.note}</p>
        )}

        {pkg.details && isExpanded && (
          <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">{pkg.details}</p>
        )}

        {(() => {
          const displayFeatures = isAnnual && pkg.annualFeatures ? pkg.annualFeatures : pkg.features;
          return displayFeatures.length > 5 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleExpansion}
              className="text-xs w-full relative hover:bg-opacity-10"
              style={{ color: pkg.color, backgroundColor: 'transparent' }}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
            >
              {isExpanded ? 'Show Less' : 'View Full Feature Breakdown'}
            </Button>
          );
        })()}
        
        <Button 
          onClick={() => onCheckout(pkg.id)}
          disabled={loadingStates[pkg.id]}
          className="w-full font-bold py-3 px-6 transition-all duration-300"
          style={{ 
            background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}dd)`,
            color: 'white'
          }}
        >
          {loadingStates[pkg.id] ? "Processing..." : 
            (isAnnual ? (pkg.id === 'dominance' ? "💎 Start Saving & Get My 12-Hour Draft" : "💎 Start Saving & Get My 24-Hour Draft") : 
              pkg.id === 'dominance' ? "🚀 Start My 12-Hour Draft" : "🚀 Start My 24-Hour Draft"
            )
          }
        </Button>
        
        <a 
          href="https://docs.google.com/document/d/11oF_e-yAGsdnYLenzUswEZtOaWbIb_04uFQWGuPS4pk/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-center block hover:underline transition-all duration-200"
          style={{ color: pkg.color }}
        >
          📄 See a Sample Article
        </a>
        
        <p className="text-sm text-center font-semibold text-foreground mt-2">
          👉 Get your first draft in &lt;5 minutes. No calls.
        </p>
        
        <p className="text-xs text-muted-foreground text-center italic">
          Fully Automated Workflow • No Meetings • No Delays
        </p>
      </CardContent>
    </Card>
  );
};

export default EnterprisePackageCard;