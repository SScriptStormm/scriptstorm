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
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute top-10 left-20 w-28 h-28 border border-primary-glow/20 rotate-45 animate-float" />
        <div className="absolute bottom-10 right-20 w-20 h-20 border border-primary-glow/15 rotate-12 animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-mono tracking-wider">
              <span className="bg-gradient-cyber bg-clip-text text-transparent">SIMPLE</span>,{" "}
              <span className="text-primary-glow animate-pulse-glow">TRANSPARENT</span> PRICING
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-mono tracking-wide">
              &gt; EVERYTHING YOU NEED TO SCALE YOUR CONTENT MARKETING_<br/>
              [ NO HIDDEN FEES • NO CONTRACTS • CANCEL ANYTIME ]
            </p>
          </div>

          {/* Main $497 Plan - Most Popular */}
          <div className="max-w-md mx-auto mb-12 relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-cyber opacity-40 rounded-lg blur-lg group-hover:opacity-60 transition-all duration-500" />
              <Card className="relative bg-black/40 backdrop-blur-md border-3 border-primary-glow/60 shadow-cyber hover:shadow-hologram transition-all duration-500 animate-hologram-flicker overflow-visible">
                {/* Most Popular Badge */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-cyber opacity-50 rounded-full blur-sm" />
                    <div className="relative bg-primary-glow text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-1 font-mono tracking-wider shadow-glow animate-pulse-glow">
                      <Crown className="h-4 w-4" />
                      [ MOST POPULAR ]
                    </div>
                  </div>
                </div>

                <CardHeader className="text-center pt-16 pb-8">
                  <CardTitle className="text-2xl font-bold mb-4 text-white font-mono tracking-wider">
                    🔥 10 SEO ARTICLES
                  </CardTitle>
                  
                  {/* Pricing with strikethrough and tooltip */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-lg line-through text-white/40 font-mono">$600</span>
                    <span className="text-4xl font-bold text-primary-glow animate-pulse-glow font-mono">$497</span>
                    <span className="text-lg text-white/70 font-mono">/month</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-white/50 hover:text-primary-glow cursor-help transition-colors duration-300" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-black/80 backdrop-blur-md border border-primary-glow/30 text-white font-mono">
                        <p>[ SAVE $103 vs BUYING INDIVIDUALLY ]</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <CardDescription className="text-lg mb-6 text-primary-glow font-semibold font-mono tracking-wide">
                    &gt; SAVE $103 COMPARED TO PER-ARTICLE PRICING_
                  </CardDescription>
                  
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-cyber opacity-40 rounded-lg blur-sm group-hover:opacity-60 transition-all duration-300" />
                    <Button 
                      className="relative w-full text-xl py-6 h-auto bg-primary-glow hover:bg-primary text-black hover:text-white font-bold font-mono tracking-wider shadow-cyber hover:shadow-hologram transition-all duration-500 border-2 border-primary-glow/50 hover:border-primary-glow"
                      size="lg" 
                      onClick={() => handleStripeCheckout('SEO Blog Subscription')}
                    >
                      [ START 7-DAY TRIAL - $0 ]
                    </Button>
                  </div>
                  
                  <p className="text-sm text-white/60 mt-4 font-mono tracking-wide">
                    ✨ 7-DAY FREE TRIAL • CANCEL ANYTIME • MONEY-BACK GUARANTEE
                  </p>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Other Services Dropdown */}
          <div className="text-center mb-16">
            <div className="relative group inline-block">
              <div className="absolute inset-0 bg-gradient-neural opacity-30 rounded-lg blur-sm group-hover:opacity-50 transition-all duration-300" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="relative px-6 py-3 text-lg bg-black/40 backdrop-blur-md border-2 border-primary-glow/40 text-white hover:text-primary-glow hover:border-primary-glow/70 font-mono tracking-wider shadow-neural hover:shadow-hologram transition-all duration-300">
                    [ OTHER SERVICES ]
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 p-4 bg-black/90 backdrop-blur-md border border-primary-glow/30 shadow-cyber z-50">
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-neural opacity-20 rounded-lg blur-sm group-hover:opacity-40 transition-all duration-300" />
                      <div className="relative p-4 border border-primary-glow/30 rounded-lg bg-black/30 backdrop-blur-sm hover:border-primary-glow/60 transition-all duration-300">
                        <h4 className="text-lg font-bold mb-2 text-primary-glow font-mono tracking-wide">[ SOCIAL MEDIA PACKAGE ]</h4>
                        <p className="text-xl font-bold mb-2 text-white font-mono">$300/MONTH</p>
                        <p className="text-sm text-white/70 mb-3 font-mono">&gt; 50 SOCIAL POSTS • SAVE 10%_</p>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-cyber opacity-30 rounded blur-sm group-hover:opacity-50 transition-all duration-300" />
                          <Button 
                            className="relative w-full bg-primary hover:bg-primary-glow text-white hover:text-black font-mono tracking-wider shadow-neural hover:shadow-hologram transition-all duration-300"
                            size="sm"
                            onClick={() => handleStripeCheckout('Social Media Package')}
                          >
                            [ START SOCIAL PACKAGE ]
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-neural opacity-20 rounded-lg blur-sm group-hover:opacity-40 transition-all duration-300" />
                      <div className="relative p-4 border border-primary-glow/30 rounded-lg bg-black/30 backdrop-blur-sm hover:border-primary-glow/60 transition-all duration-300">
                        <h4 className="text-lg font-bold mb-2 text-primary-glow font-mono tracking-wide">[ PRODUCT DESCRIPTION PACKAGE ]</h4>
                        <p className="text-xl font-bold mb-2 text-white font-mono">$400/MONTH</p>
                        <p className="text-sm text-white/70 mb-3 font-mono">&gt; 100 DESCRIPTIONS • SAVE 20%_</p>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-gradient-cyber opacity-30 rounded blur-sm group-hover:opacity-50 transition-all duration-300" />
                          <Button 
                            className="relative w-full bg-primary hover:bg-primary-glow text-white hover:text-black font-mono tracking-wider shadow-neural hover:shadow-hologram transition-all duration-300"
                            size="sm"
                            onClick={() => handleStripeCheckout('Product Description Package')}
                          >
                            [ START PRODUCT PACKAGE ]
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Add-Ons Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white font-mono tracking-wider">
                [ <span className="text-primary-glow animate-pulse-glow">ADD-ONS</span> ]
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-neural opacity-20 rounded-lg blur-sm group-hover:opacity-40 transition-all duration-300" />
                <Card className={`relative p-6 border-2 transition-all duration-300 bg-black/40 backdrop-blur-md shadow-neural hover:shadow-hologram ${seoSelected ? 'border-primary-glow bg-primary-glow/10' : 'border-primary-glow/30 hover:border-primary-glow/60'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Checkbox 
                      id="seo-addon" 
                      checked={seoSelected}
                      onCheckedChange={(checked) => setSeoSelected(checked as boolean)}
                      className="data-[state=checked]:bg-primary-glow data-[state=checked]:border-primary-glow border-primary-glow/50"
                    />
                    <label htmlFor="seo-addon" className="text-lg font-semibold cursor-pointer text-white font-mono tracking-wide">
                      <strong>[ +SEO POWER-UP ]</strong> <span className="text-primary-glow">($197)</span>
                    </label>
                  </div>
                  <p className="text-base text-primary-glow font-semibold ml-8 mb-2 font-mono tracking-wide">
                    &gt; 3X MORE TRAFFIC GUARANTEED_
                  </p>
                  <p className="text-sm text-white/70 ml-8 font-mono">
                    [ KEYWORD RESEARCH • SURFERSEO INTEGRATION • RANKING REPORTS ]
                  </p>
                </Card>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-neural opacity-20 rounded-lg blur-sm group-hover:opacity-40 transition-all duration-300" />
                <Card className={`relative p-6 border-2 transition-all duration-300 bg-black/40 backdrop-blur-md shadow-neural hover:shadow-hologram ${editingSelected ? 'border-primary-glow bg-primary-glow/10' : 'border-primary-glow/30 hover:border-primary-glow/60'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <Checkbox 
                      id="editing-addon" 
                      checked={editingSelected}
                      onCheckedChange={(checked) => setEditingSelected(checked as boolean)}
                      className="data-[state=checked]:bg-primary-glow data-[state=checked]:border-primary-glow border-primary-glow/50"
                    />
                    <label htmlFor="editing-addon" className="text-lg font-semibold cursor-pointer text-white font-mono tracking-wide">
                      <strong>[ +HUMAN POLISH ]</strong> <span className="text-primary-glow">($147)</span>
                    </label>
                  </div>
                  <p className="text-base text-primary-glow font-semibold ml-8 mb-2 font-mono tracking-wide">
                    &gt; SOUND LIKE A NATIVE SPEAKER_
                  </p>
                  <p className="text-sm text-white/70 ml-8 font-mono">
                    [ HUMAN POLISH FOR US/UK/EU/ASIA MARKETS 🇺🇸🇬🇧🇪🇺🇭🇰🇲🇽 ]
                  </p>
                </Card>
              </div>
            </div>

            {/* Bundle Hint */}
            <div className="text-center mb-8">
              <div className="relative group inline-block">
                <div className="absolute inset-0 bg-gradient-cyber opacity-30 rounded-lg blur-sm group-hover:opacity-50 transition-all duration-300" />
                <Card className="relative p-4 bg-black/40 backdrop-blur-md border-2 border-primary-glow/40 inline-block shadow-neural hover:shadow-hologram transition-all duration-300">
                  <p className="text-lg font-semibold text-white font-mono tracking-wide">
                    [ GET BOTH → <span className="text-primary-glow animate-pulse-glow">EMAIL US FOR CUSTOM PRICING</span> ]
                  </p>
                </Card>
              </div>
            </div>

            {/* Real-Time Pricing Display */}
            <div className="sticky bottom-4 md:relative md:bottom-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber opacity-40 rounded-lg blur-lg group-hover:opacity-60 transition-all duration-500" />
                <Card className="relative p-6 bg-black/40 backdrop-blur-md border-2 border-primary-glow/50 shadow-cyber hover:shadow-hologram transition-all duration-500 animate-hologram-flicker">
                  <div className="text-center">
                    <div className="text-lg text-white/70 mb-2 font-mono tracking-wide">[ YOUR MONTHLY TOTAL ]</div>
                    <div className="text-4xl font-bold text-primary-glow mb-4 font-mono animate-pulse-glow">
                      ${calculateTotal().toLocaleString()}
                    </div>
                    <div className="text-sm text-white/60 mb-4 space-y-1 font-mono">
                      <div>&gt; BASE PLAN: ${BASE_PRICE}_</div>
                      {seoSelected && <div>&gt; + SEO OPTIMIZATION: ${SEO_PRICE}_</div>}
                      {editingSelected && <div>&gt; + NATIVE EDITING: ${EDITING_PRICE}_</div>}
                    </div>
                    
                    {error && (
                      <div className="flex items-center justify-center gap-2 text-red-400 mb-4 font-mono">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">[ {error} ]</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setError("")}
                          className="ml-2 bg-black/50 border-red-400/50 text-red-400 hover:text-white hover:border-red-400"
                        >
                          [ TRY AGAIN ]
                        </Button>
                      </div>
                    )}
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-cyber opacity-40 rounded-lg blur-sm group-hover:opacity-60 transition-all duration-300" />
                      <Button 
                        className="relative w-full text-xl py-6 h-auto bg-primary hover:bg-primary-glow text-white hover:text-black font-bold disabled:opacity-50 font-mono tracking-wider shadow-cyber hover:shadow-hologram transition-all duration-500 border-2 border-primary-glow/50 hover:border-primary-glow"
                        size="lg" 
                        onClick={() => handleStripeCheckout('Premium SEO Package')}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            [ PROCESSING... ]
                          </>
                        ) : (
                          `[ SUBSCRIBE NOW - $${calculateTotal()}/MONTH ]`
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
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
