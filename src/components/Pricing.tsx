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
      <section id="pricing" className="py-20 bg-gradient-hero relative overflow-hidden">
        {/* AI Background Elements */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="absolute top-10 left-20 w-32 h-32 border border-accent/20 rotate-45 animate-float" />
        <div className="absolute bottom-10 right-20 w-24 h-24 border border-accent/15 rotate-12 animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-sans tracking-wide">
              <span className="text-accent">SIMPLE</span>,{" "}
              <span className="text-primary">TRANSPARENT</span> PRICING
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-sans leading-relaxed">
              Everything you need to scale your content marketing<br/>
              No hidden fees • No contracts • Cancel anytime
            </p>
          </div>

          {/* Main $497 Plan - Most Popular */}
          <div className="max-w-lg mx-auto mb-12 relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-accent/20 rounded-xl blur-md group-hover:bg-accent/30 transition-all duration-500" />
              <Card className="relative bg-card/95 backdrop-blur-sm border-2 border-accent/50 shadow-2xl hover:shadow-accent/20 transition-all duration-500 overflow-visible">
                {/* Most Popular Badge */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="bg-accent text-accent-foreground px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                    <Crown className="h-4 w-4" />
                    MOST POPULAR
                  </div>
                </div>

                <CardHeader className="text-center pt-16 pb-8">
                  <CardTitle className="text-3xl font-bold mb-4 text-foreground">
                    🔥 10 SEO Articles
                  </CardTitle>
                  
                  {/* Pricing with strikethrough and tooltip */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <span className="text-lg line-through text-muted-foreground">$600</span>
                    <span className="text-5xl font-bold text-primary">$497</span>
                    <span className="text-lg text-muted-foreground">/month</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-5 w-5 text-muted-foreground hover:text-primary cursor-help transition-colors duration-300" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-card border border-border text-foreground">
                        <p>Save $103 vs buying individually</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <CardDescription className="text-lg mb-6 text-accent font-semibold">
                    Save $103 compared to per-article pricing
                  </CardDescription>
                  
                  <Button 
                    className="w-full text-xl py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg" 
                    onClick={() => handleStripeCheckout('SEO Blog Subscription')}
                  >
                    START 7-DAY TRIAL - FREE
                  </Button>
                  
                  <p className="text-sm text-muted-foreground mt-4">
                    ✨ 7-day free trial • Cancel anytime • Money-back guarantee
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Other Services Dropdown */}
          <div className="text-center mb-16">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-8 py-3 text-lg bg-card/80 backdrop-blur-sm border-2 border-border text-foreground hover:text-primary hover:border-accent font-semibold">
                  OTHER SERVICES
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4 bg-card/95 backdrop-blur-md border border-border shadow-xl z-50">
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg bg-card hover:bg-accent/5 transition-all duration-300">
                    <h4 className="text-lg font-bold mb-2 text-accent">Social Media Package</h4>
                    <p className="text-2xl font-bold mb-2 text-foreground">$300/month</p>
                    <p className="text-sm text-muted-foreground mb-3">50 social posts • Save 10%</p>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="sm"
                      onClick={() => handleStripeCheckout('Social Media Package')}
                    >
                      START SOCIAL PACKAGE
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-border rounded-lg bg-card hover:bg-accent/5 transition-all duration-300">
                    <h4 className="text-lg font-bold mb-2 text-accent">Product Description Package</h4>
                    <p className="text-2xl font-bold mb-2 text-foreground">$400/month</p>
                    <p className="text-sm text-muted-foreground mb-3">100 descriptions • Save 20%</p>
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                      size="sm"
                      onClick={() => handleStripeCheckout('Product Description Package')}
                    >
                      START PRODUCT PACKAGE
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Add-Ons Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-6 text-white">
                <span className="text-accent">ADD-ONS</span>
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className={`p-6 border-2 transition-all duration-300 bg-card/90 backdrop-blur-sm ${seoSelected ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/60'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Checkbox 
                    id="seo-addon" 
                    checked={seoSelected}
                    onCheckedChange={(checked) => setSeoSelected(checked as boolean)}
                    className="data-[state=checked]:bg-accent data-[state=checked]:border-accent border-border"
                  />
                  <label htmlFor="seo-addon" className="text-lg font-semibold cursor-pointer text-foreground">
                    <strong>SEO Power-Up</strong> <span className="text-accent">($197)</span>
                  </label>
                </div>
                <p className="text-base text-accent font-semibold ml-8 mb-2">
                  3x more traffic guaranteed
                </p>
                <p className="text-sm text-muted-foreground ml-8">
                  Keyword research • SurferSEO integration • Ranking reports
                </p>
              </Card>

              <Card className={`p-6 border-2 transition-all duration-300 bg-card/90 backdrop-blur-sm ${editingSelected ? 'border-accent bg-accent/10' : 'border-border hover:border-accent/60'}`}>
                <div className="flex items-center gap-3 mb-4">
                  <Checkbox 
                    id="editing-addon" 
                    checked={editingSelected}
                    onCheckedChange={(checked) => setEditingSelected(checked as boolean)}
                    className="data-[state=checked]:bg-accent data-[state=checked]:border-accent border-border"
                  />
                  <label htmlFor="editing-addon" className="text-lg font-semibold cursor-pointer text-foreground">
                    <strong>Human Polish</strong> <span className="text-accent">($147)</span>
                  </label>
                </div>
                <p className="text-base text-accent font-semibold ml-8 mb-2">
                  Sound like a native speaker
                </p>
                <p className="text-sm text-muted-foreground ml-8">
                  Human polish for US/UK/EU/Asia markets 🇺🇸🇬🇧🇪🇺🇭🇰🇲🇽
                </p>
              </Card>
            </div>

            {/* Bundle Hint */}
            <div className="text-center mb-8">
              <Card className="p-4 bg-card/80 backdrop-blur-sm border-2 border-accent/40 inline-block">
                <p className="text-lg font-semibold text-foreground">
                  Get both → <span className="text-accent">Email us for custom pricing</span>
                </p>
              </Card>
            </div>

            {/* Real-Time Pricing Display */}
            <div className="sticky bottom-4 md:relative md:bottom-auto">
              <Card className="p-6 bg-card/95 backdrop-blur-sm border-2 border-accent/50 shadow-xl">
                <div className="text-center">
                  <div className="text-lg text-muted-foreground mb-2">Your Monthly Total</div>
                  <div className="text-4xl font-bold text-primary mb-4">
                    ${calculateTotal().toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4 space-y-1">
                    <div>Base plan: ${BASE_PRICE}</div>
                    {seoSelected && <div>+ SEO optimization: ${SEO_PRICE}</div>}
                    {editingSelected && <div>+ Native editing: ${EDITING_PRICE}</div>}
                  </div>
                  
                  {error && (
                    <div className="flex items-center justify-center gap-2 text-destructive mb-4">
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
                    className="w-full text-xl py-6 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300"
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
            <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 border-2 border-accent/30">
              <div className="text-center">
                <h4 className="text-xl font-bold mb-2 text-foreground">
                  ⚡ Yearly Deal: $4,970 USD/year (2 Months FREE)
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Save $994 USD vs paying monthly → 30-day guarantee
                </p>
                <Button 
                  className="w-full font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() => handleStripeCheckout('Annual Plan')}
                >
                  Get Annual Deal
                </Button>
              </div>
            </Card>
          </div>

          {/* Footnote */}
          <div className="text-center max-w-3xl mx-auto">
            <Card className="p-6 bg-card/80 backdrop-blur-sm">
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
            <Button variant="ghost" className="text-accent hover:text-accent/80">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
};

export default Pricing;
