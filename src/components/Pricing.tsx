import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle, Star, Crown, AlertCircle, Loader2, ChevronDown, Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Pricing = () => {
  const [seoSelected, setSeoSelected] = useState(false);
  const [editingSelected, setEditingSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const BASE_PRICE = 497;
  const SEO_PRICE = 197;
  const EDITING_PRICE = 147;
  
  const calculateTotal = () => {
    return BASE_PRICE + (seoSelected ? SEO_PRICE : 0) + (editingSelected ? EDITING_PRICE : 0);
  };

  const handleStripeCheckout = async (planType: string) => {
    setIsLoading(true);
    setError("");
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          planType, 
          selectedAddOns: {
            seo: seoSelected,
            editing: editingSelected
          }
        }
      });
      
      if (error) throw error;
      
      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError("⚠️ Please check card details");
      toast({
        title: "Payment Error",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <section id="pricing" className="relative py-20 bg-gradient-to-br from-background via-background/95 to-muted/50 overflow-hidden">
        {/* AI Neural Network Background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-25" />
        <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-15" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-glow) / 0.1) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary-glow/25 rotate-45 animate-float shadow-cyber" />
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-primary-glow/20 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" style={{ animationDelay: '4s' }} />
        <div className="absolute top-60 right-40 w-10 h-10 border border-primary-glow/15 rotate-90 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-60 right-10 w-18 h-18 border border-primary-glow/20 rotate-12 animate-float" style={{ animationDelay: '3s' }} />
        
        {/* Multiple scanning line effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-30" />
          <div className="absolute bottom-0 h-px w-full bg-gradient-cyber animate-scan-line opacity-25" style={{ animationDelay: '2s' }} />
          <div className="absolute right-0 w-px h-full bg-gradient-neural animate-scan-line opacity-20" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Particle effect overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-25" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-25" style={{ animationDelay: '5s' }} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-mono tracking-wide">
              Simple, Transparent <span className="text-[#3498DB]">Pricing</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to scale your content marketing. 
              No hidden fees, no contracts, cancel anytime.
            </p>
          </div>

          {/* Main $497 Plan - Most Popular */}
          <div className="max-w-md mx-auto mb-12 relative">
            {/* Holographic background for main card */}
            <div className="absolute inset-0 bg-gradient-cyber opacity-15 rounded-lg blur-lg animate-neural-pulse" />
            
            <Card className="relative shadow-hologram border-2 border-[#2ECC71]/50 hover:border-[#2ECC71]/80 bg-white/95 backdrop-blur-sm overflow-visible transition-all duration-500 hover:shadow-cyber">
              {/* Most Popular Badge */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="bg-[#2ECC71] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1 shadow-cyber border border-[#2ECC71]/50">
                  <Crown className="h-4 w-4" />
                  Most Popular
                </div>
              </div>

              <CardHeader className="text-center pt-12 pb-8">
                <CardTitle className="text-2xl font-bold mb-4">
                  🔥 10 SEO Articles
                </CardTitle>
                
                {/* Pricing with strikethrough and tooltip */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-lg line-through text-muted-foreground">$600</span>
                  <span className="text-3xl font-bold text-[#2ECC71]">$497</span>
                  <span className="text-lg text-muted-foreground">/month</span>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save $103 vs buying individually</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <CardDescription className="text-lg mb-6 text-[#2ECC71] font-semibold">
                  Save $103 compared to per-article pricing!
                </CardDescription>
                
                <Button 
                  className="w-full text-xl py-6 h-auto bg-[#2ECC71] hover:bg-[#27AE60] text-white font-bold"
                  size="lg" 
                  onClick={() => handleStripeCheckout('SEO Blog Subscription')}
                >
                  Start Your 7-Day Trial - $0
                </Button>
                
                <p className="text-sm text-muted-foreground mt-4">
                  ✨ 7-day free trial • Cancel anytime • Money-back guarantee
                </p>
              </CardHeader>
            </Card>
          </div>

          {/* Other Services Dropdown */}
          <div className="text-center mb-16">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-6 py-3 text-lg">
                  Other Services
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4 bg-white border border-gray-200 shadow-lg z-50">
                <div className="space-y-4">
                  <div className="p-4 border border-[#3498DB]/20 rounded-lg">
                    <h4 className="text-lg font-bold mb-2 text-[#3498DB]">Social Media Package</h4>
                    <p className="text-xl font-bold mb-2">$300/month</p>
                    <p className="text-sm text-muted-foreground mb-3">50 social posts • Save 10%</p>
                    <Button 
                      className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white"
                      size="sm"
                      onClick={() => handleStripeCheckout('Social Media Package')}
                    >
                      Start Social Package
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-[#3498DB]/20 rounded-lg">
                    <h4 className="text-lg font-bold mb-2 text-[#3498DB]">Product Description Package</h4>
                    <p className="text-xl font-bold mb-2">$400/month</p>
                    <p className="text-sm text-muted-foreground mb-3">100 descriptions • Save 20%</p>
                    <Button 
                      className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white"
                      size="sm"
                      onClick={() => handleStripeCheckout('Product Description Package')}
                    >
                      Start Product Package
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Add-Ons Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                Add-Ons
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-lg blur-sm group-hover:opacity-20 transition-all duration-500" />
                <Card className={`relative p-6 border-2 transition-all duration-500 shadow-neural hover:shadow-cyber bg-white/95 backdrop-blur-sm ${seoSelected ? 'border-[#3498DB]/80 bg-[#3498DB]/10 shadow-hologram' : 'border-[#3498DB]/40 hover:border-[#3498DB]/70'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Checkbox 
                      id="seo-addon" 
                      checked={seoSelected}
                      onCheckedChange={(checked) => setSeoSelected(checked as boolean)}
                      className="data-[state=checked]:bg-[#3498DB] data-[state=checked]:border-[#3498DB]"
                    />
                    <label htmlFor="seo-addon" className="text-lg font-semibold cursor-pointer font-mono tracking-wide">
                      <strong>+SEO Power-Up</strong> ($197)
                    </label>
                  </div>
                  <p className="text-base text-[#2ECC71] font-semibold ml-8 mb-2">
                    3x More Traffic Guaranteed
                  </p>
                  <div className="text-sm text-muted-foreground ml-8 font-mono space-y-1">
                    <div>• Advanced keyword research</div>
                    <div>• SurferSEO optimization</div>
                    <div>• Monthly ranking reports</div>
                  </div>
                </Card>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-neural opacity-10 rounded-lg blur-sm group-hover:opacity-20 transition-all duration-500" />
                <Card className={`relative p-6 border-2 transition-all duration-500 shadow-neural hover:shadow-cyber bg-white/95 backdrop-blur-sm ${editingSelected ? 'border-[#3498DB]/80 bg-[#3498DB]/10 shadow-hologram' : 'border-[#3498DB]/40 hover:border-[#3498DB]/70'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Checkbox 
                      id="editing-addon" 
                      checked={editingSelected}
                      onCheckedChange={(checked) => setEditingSelected(checked as boolean)}
                      className="data-[state=checked]:bg-[#3498DB] data-[state=checked]:border-[#3498DB]"
                    />
                    <label htmlFor="editing-addon" className="text-lg font-semibold cursor-pointer font-mono tracking-wide">
                      <strong>+Human Polish</strong> ($147)
                    </label>
                  </div>
                  <p className="text-base text-[#2ECC71] font-semibold ml-8 mb-2">
                    Sound Like a Native Speaker
                  </p>
                  <div className="text-sm text-muted-foreground ml-8 font-mono space-y-1">
                    <div>• Professional human editing</div>
                    <div>• Native speaker quality</div>
                    <div>• Multi-region optimization 🇺🇸🇬🇧🇪🇺🇭🇰🇲🇽</div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Bundle Hint */}
            <div className="text-center mb-8">
              <Card className="p-4 bg-gradient-to-r from-[#FFD700]/10 to-[#FFD700]/5 border border-[#FFD700]/30 inline-block">
                <p className="text-lg font-semibold text-foreground">
                  Get Both → <span className="text-[#3498DB]">Email us for custom pricing</span>
                </p>
              </Card>
            </div>

            {/* Real-Time Pricing Display */}
            <div className="sticky bottom-4 md:relative md:bottom-auto">
              <Card className="p-6 bg-gradient-to-r from-[#3498DB]/10 to-[#2ECC71]/10 border-2 border-[#3498DB]/30 shadow-lg">
                <div className="text-center">
                  <div className="text-lg text-muted-foreground mb-2">Your monthly total:</div>
                  <div className="text-3xl font-bold text-foreground mb-4">
                    ${calculateTotal().toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4 space-y-1">
                    <div>Base Plan: ${BASE_PRICE}</div>
                    {seoSelected && <div>+ SEO Optimization: ${SEO_PRICE}</div>}
                    {editingSelected && <div>+ Native Editing: ${EDITING_PRICE}</div>}
                  </div>
                  
                  {error && (
                    <div className="flex items-center justify-center gap-2 text-red-500 mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">{error}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setError("")}
                        className="ml-2"
                      >
                        Try Again
                      </Button>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full text-xl py-6 h-auto bg-[#3498DB] hover:bg-[#2980B9] text-white font-bold disabled:opacity-50"
                    size="lg" 
                    onClick={() => handleStripeCheckout('Premium SEO Package')}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Subscribe Now - $${calculateTotal()}/month`
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Annual Plan CTA */}
          <div className="max-w-md mx-auto mb-12">
            <Card className="p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-2 border-[#FFD700]/30">
              <div className="text-center">
                <h4 className="text-xl font-bold mb-2 text-foreground">
                  ⚡ YEARLY DEAL: $4,970 USD/year (2 Months FREE)
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Save $994 USD vs paying monthly → 30-day guarantee
                </p>
                <Button 
                  className="w-full font-bold text-black"
                  style={{ backgroundColor: '#FFD700', borderColor: '#FFD700' }}
                  onClick={() => handleStripeCheckout('Annual Plan')}
                >
                  Get Annual Deal
                </Button>
              </div>
            </Card>
          </div>

          {/* Footnote */}
          <div className="text-center max-w-3xl mx-auto">
            <Card className="p-6 bg-muted/30">
              <p className="text-sm text-muted-foreground">
                <strong>All subscriptions include:</strong> 24-hr delivery, 2 free revisions, and content calendar access. Cancel anytime.
              </p>
            </Card>
          </div>

          {/* Contact Sales */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground mb-4">
              Need a custom plan? Enterprise solutions available.
            </p>
            <Button variant="ghost" className="text-[#3498DB] hover:text-[#2980B9]">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Pricing;
