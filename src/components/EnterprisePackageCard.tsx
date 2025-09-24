import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star } from "lucide-react";

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
  note?: string;
  details?: string;
}

interface EnterprisePackageCardProps {
  pkg: EnterprisePackage;
  onCheckout: (packageId: string) => void;
  loadingStates: {[key: string]: boolean};
  isAnnual: boolean;
}

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
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <p className="text-lg text-green-700 dark:text-green-300 font-bold mb-1">
              🎉 Get 2 Months Free!
            </p>
            <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
              Equivalent to {pkg.annual.monthlyEquivalent}/month
            </p>
            <p className="text-xs text-green-600 dark:text-green-400">
              💰 Save {pkg.annual.savings} annually
            </p>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6 relative">
        <div className="space-y-2">
          {/* Always show first 5 features */}
          {pkg.features.slice(0, 5).map((feature, index) => (
            <div 
              key={`${pkg.id}-base-${index}`} 
              className="flex items-center gap-2"
            >
              <div 
                className="w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: pkg.color }}
              >
                <CheckCircle className="h-2.5 w-2.5 text-white" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
          
          {/* Only show additional features when THIS specific package is expanded */}
          {isExpanded && pkg.features.length > 5 && (
            <>
              <div className="pt-2 border-t border-border" />
              {pkg.features.slice(5).map((feature, index) => (
                <div 
                  key={`${pkg.id}-expanded-${index + 5}`} 
                  className="flex items-center gap-2"
                >
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: pkg.color }}
                  >
                    <CheckCircle className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </>
          )}
        </div>

        {pkg.note && (
          <p className="text-xs text-muted-foreground italic">{pkg.note}</p>
        )}

        {pkg.details && isExpanded && (
          <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">{pkg.details}</p>
        )}

        {pkg.features.length > 5 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={toggleExpansion}
            className="text-xs w-full relative hover:bg-opacity-10"
            style={{ color: pkg.color, backgroundColor: 'transparent' }}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            {isExpanded ? 'Show Less' : `Show All ${pkg.features.length} Features`}
          </Button>
        )}
        
        <Button 
          onClick={() => onCheckout(pkg.id)}
          disabled={loadingStates[pkg.id]}
          className="w-full font-bold py-3 transition-all duration-300"
          style={{ 
            background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}dd)`,
            color: 'white'
          }}
        >
          {loadingStates[pkg.id] ? "Processing..." : 
            isAnnual ? `🚀 Start Annual Plan` : 
            pkg.id === 'dominance' ? "🚀 Start My 12-Hour Draft" : "🚀 Start My 24-Hour Draft"
          }
        </Button>
        
        <p className="text-xs text-muted-foreground text-center italic">
          Email-only workflow • No meetings • No delays
        </p>
      </CardContent>
    </Card>
  );
};

export default EnterprisePackageCard;