
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Crown, Mail, Phone, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ContactForm from "./ContactForm";

const Pricing = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState<'starter' | 'growth' | 'authority' | null>('starter');
  const [expandedTier, setExpandedTier] = useState<'enterprise-starter' | 'enterprise-growth' | 'enterprise-authority' | null>(null);
  const [showEnterpriseComparison, setShowEnterpriseComparison] = useState(false);
  const [showMoreEnterprise, setShowMoreEnterprise] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const { toast } = useToast();

  const handleContactClick = () => {
    setShowContactForm(true);
    // Scroll to contact form
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@scriptstorm.io?subject=Content%20Services%20Inquiry';
  };

  const handleCheckout = async (packageType: string, selectedAddOns = {}) => {
    if (loadingStates[packageType]) return;
    
    setLoadingStates(prev => ({ ...prev, [packageType]: true }));
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { packageType, selectedAddOns }
      });

      if (error) throw error;

      if (data?.url) {
        // Show urgency message before redirect
        toast({
          title: "🚀 Redirecting to Checkout",
          description: "Complete your order in the next 10 minutes to lock in 24-hour delivery for your first draft!",
          duration: 3000,
        });
        
        // Open checkout in new tab after short delay
        setTimeout(() => {
          window.open(data.url, '_blank');
        }, 1000);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Error",
        description: "Unable to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoadingStates(prev => ({ ...prev, [packageType]: false }));
    }
  };

  return (
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
            Done-For-You <span className="text-[#3498DB]">Content Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            Professional AI-generated content that drives results. 
            No tools to learn, no hassle - just high-quality content delivered.
          </p>
          <p className="text-sm text-muted-foreground italic">
            ⚡ Powered by our proprietary AI content engine—optimized for rankings and conversions. No tools to learn, just results.
          </p>
        </div>

        {/* Service Packages */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 items-start">
          {/* Starter Package */}
          <Card className="relative shadow-neural border-2 border-[#3498DB]/40 hover:border-[#3498DB]/80 bg-gradient-to-br from-white/95 to-[#3498DB]/5 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(52,152,219,0.3)] hover:scale-105 h-fit">
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#3498DB] to-[#2980B9] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🚀</span>
              </div>
            </div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-[#3498DB] mb-2">
                Starter Package
              </CardTitle>
              <div className="text-4xl font-bold text-foreground mb-2">$297<span className="text-lg text-muted-foreground"> USD/month</span></div>
              <CardDescription className="text-base font-medium">Perfect for small businesses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">5 AI-generated SEO articles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Keyword research included</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">24-hour delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">1 revision round</span>
                </div>
                 <div className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                     <CheckCircle className="h-4 w-4 text-white" />
                   </div>
                   <span className="text-sm font-medium">15 social media posts</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                     <CheckCircle className="h-4 w-4 text-white" />
                   </div>
                   <span className="text-sm font-medium">5 product descriptions</span>
                 </div>
              </div>
              <Button 
                onClick={() => handleCheckout('starter')}
                disabled={loadingStates['starter']}
                className="w-full bg-gradient-to-r from-[#3498DB] to-[#2980B9] hover:from-[#2980B9] hover:to-[#1F618D] text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingStates['starter'] ? "Processing..." : "🚀 Start My 24-Hour Draft"}
              </Button>
              <p className="text-xs text-muted-foreground italic text-center">Email-only workflow • No meetings • No delays</p>
            </CardContent>
          </Card>

          {/* Growth Package - Most Popular */}
          <Card className="relative shadow-hologram border-2 border-[#2ECC71]/50 hover:border-[#2ECC71]/80 bg-gradient-to-br from-white/95 to-[#2ECC71]/5 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(46,204,113,0.4)] hover:scale-105 overflow-visible h-fit">
            {/* Most Popular Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl border-2 border-white/20 animate-pulse">
                <Crown className="h-4 w-4" />
                Most Popular
              </div>
            </div>
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🔥</span>
              </div>
            </div>

            <CardHeader className="text-center pt-8 pb-4">
              <CardTitle className="text-2xl font-bold text-[#2ECC71] mb-2">
                Growth Package
              </CardTitle>
              <div className="text-4xl font-bold text-foreground mb-2">$597<span className="text-lg text-muted-foreground"> USD/month</span></div>
              <CardDescription className="text-base font-medium">Best value for growing companies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">10 AI-generated SEO articles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Advanced keyword research</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">24-hour delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">2 revision rounds</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Content calendar included</span>
                </div>
                 <div className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                     <CheckCircle className="h-4 w-4 text-white" />
                   </div>
                   <span className="text-sm font-medium">30 social media posts</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                     <CheckCircle className="h-4 w-4 text-white" />
                   </div>
                   <span className="text-sm font-medium">10 product descriptions</span>
                 </div>
              </div>
              <Button 
                onClick={() => handleCheckout('growth')}
                disabled={loadingStates['growth']}
                className="w-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingStates['growth'] ? "Processing..." : "🚀 Start My 24-Hour Draft"}
              </Button>
              <p className="text-xs text-muted-foreground italic text-center">Email-only workflow • No meetings • No delays</p>
            </CardContent>
          </Card>

          {/* Enterprise Packages */}
          <Card className="relative shadow-neural border-2 border-[#9B59B6]/40 hover:border-[#9B59B6]/80 bg-gradient-to-br from-white/95 to-[#9B59B6]/5 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(155,89,182,0.3)] hover:scale-105">
            <div className="absolute top-4 right-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9B59B6] to-[#8E44AD] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">⚡</span>
              </div>
            </div>
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-[#9B59B6] mb-2">
                Enterprise Packages
              </CardTitle>
              <CardDescription className="text-base font-medium">For large-scale content needs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Starter Enterprise - Always Visible */}
              <div
                role="radio"
                aria-checked={selectedEnterprise === 'starter'}
                tabIndex={0}
                onClick={() => { setSelectedEnterprise('starter'); }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedEnterprise('starter'); } }}
                className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${selectedEnterprise === 'starter' ? 'ring-2 ring-[#9B59B6] bg-[#9B59B6]/10 shadow-lg border-[#9B59B6]/60' : 'border-[#9B59B6]/30 hover:border-[#9B59B6]/50 hover:bg-[#9B59B6]/5'} bg-gradient-to-r from-white/80 to-[#9B59B6]/10`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-base text-[#9B59B6]">Scale</span>
                  <div className="text-right">
                    <div className="text-xl font-bold text-[#9B59B6]">$1,297</div>
                    <div className="text-xs text-muted-foreground">USD/month</div>
                  </div>
                </div>
                 <div className="text-sm space-y-1 mb-2">
                   <div className="text-muted-foreground font-medium">• 25 AI-generated SEO articles</div>
                   <div className="text-muted-foreground font-medium">• 75 social media posts</div>
                   <div className="text-muted-foreground font-medium">• 25 product descriptions</div>
                 </div>
                {expandedTier === 'enterprise-starter' && (
                  <div className="mt-4 pt-4 border-t border-[#9B59B6]/20 text-sm text-muted-foreground space-y-2 animate-fade-in">
                    <div className="space-y-2">
                      <div>• <strong>24-Hour Delivery:</strong> Get your content fast, without ever missing a beat.</div>
                      <div>• <strong>1 Revision Round:</strong> Perfect your content with a round of tweaks.</div>
                      <div>• <strong>Basic Keyword Research:</strong> We handle the initial research to target the right terms.</div>
                      <div>• <strong>Email Support:</strong> Get your questions answered directly via email.</div>
                    </div>
                  </div>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => { e.stopPropagation(); setExpandedTier(expandedTier === 'enterprise-starter' ? null : 'enterprise-starter'); }}
                  className="mt-3 text-[#9B59B6] hover:bg-[#9B59B6]/10"
                >
                  {expandedTier === 'enterprise-starter' ? 'Hide details' : 'View details'}
                </Button>
              </div>

              {/* See More Button */}
              {!showMoreEnterprise && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    console.log('Clicking See More Enterprise Options');
                    setShowMoreEnterprise(true);
                  }}
                  className="w-full border-[#9B59B6]/40 text-[#9B59B6] hover:bg-[#9B59B6]/10 hover:border-[#9B59B6]/60"
                >
                  See More Enterprise Options
                </Button>
              )}

              {/* Additional Enterprise Tiers - Hidden by default */}
              {showMoreEnterprise && (
                <div className="space-y-3 animate-fade-in">
                  {/* Growth Tier */}
                  <div
                    role="radio"
                    aria-checked={selectedEnterprise === 'growth'}
                    tabIndex={0}
                    onClick={() => { setSelectedEnterprise('growth'); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedEnterprise('growth'); } }}
                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${selectedEnterprise === 'growth' ? 'ring-2 ring-[#9B59B6] bg-[#9B59B6]/10 shadow-lg border-[#9B59B6]/60' : 'border-[#9B59B6]/30 hover:border-[#9B59B6]/50 hover:bg-[#9B59B6]/5'} bg-gradient-to-r from-white/80 to-[#2ECC71]/10`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-[#9B59B6]">Authority</span>
                        <Badge className="bg-[#2ECC71] text-white text-xs">BEST VALUE</Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#9B59B6]">$1,797</div>
                        <div className="text-xs text-muted-foreground">USD/month</div>
                      </div>
                    </div>
                     <div className="text-sm space-y-1 mb-2">
                       <div className="text-muted-foreground font-medium">• 30 AI-generated SEO articles</div>
                       <div className="text-muted-foreground font-medium">• 90 social media posts</div>
                       <div className="text-muted-foreground font-medium">• 30 product descriptions</div>
                     </div>
                    {expandedTier === 'enterprise-growth' && (
                      <div className="mt-4 pt-4 border-t border-[#9B59B6]/20 text-sm text-muted-foreground space-y-2 animate-fade-in">
                        <div className="space-y-2">
                          <div>• <strong>24-Hour Delivery:</strong> Reliable, rapid turnaround for all your content.</div>
                          <div>• <strong>2 Revision Rounds:</strong> Extra flexibility to ensure every piece is perfect for your brand.</div>
                          <div>• <strong>Advanced Keyword & Competitor Analysis:</strong> We find gaps in your competitors' strategies to give you an edge.</div>
                          <div>• <strong>Priority Support:</strong> Jump the queue with faster response times.</div>
                        </div>
                      </div>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); setExpandedTier(expandedTier === 'enterprise-growth' ? null : 'enterprise-growth'); }}
                      className="mt-3 text-[#9B59B6] hover:bg-[#9B59B6]/10"
                    >
                      {expandedTier === 'enterprise-growth' ? 'Hide details' : 'View details'}
                    </Button>
                  </div>

                  {/* Authority Tier */}
                  <div
                    role="radio"
                    aria-checked={selectedEnterprise === 'authority'}
                    tabIndex={0}
                    onClick={() => { setSelectedEnterprise('authority'); }}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedEnterprise('authority'); } }}
                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${selectedEnterprise === 'authority' ? 'ring-2 ring-[#9B59B6] bg-[#9B59B6]/10 shadow-lg border-[#9B59B6]/60' : 'border-[#9B59B6]/30 hover:border-[#9B59B6]/50 hover:bg-[#9B59B6]/5'} bg-gradient-to-r from-white/80 to-[#E67E22]/10`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-base text-[#9B59B6]">Dominance</span>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className="border-[#E67E22] text-[#E67E22] text-xs">Early Adopter</Badge>
                        <div className="text-xl font-bold text-[#9B59B6]">$2,997</div>
                        <div className="text-xs text-muted-foreground">USD/month</div>
                      </div>
                    </div>
                      <div className="text-sm space-y-1 mb-2">
                        <div className="text-muted-foreground font-medium">• 50 AI-generated SEO articles</div>
                        <div className="text-muted-foreground font-medium">• 150 social media posts</div>
                        <div className="text-muted-foreground font-medium">• Unlimited product descriptions*</div>
                      </div>
                      <p className="text-xs text-muted-foreground italic mt-2">
                        *Unlimited under fair use policy. Volume must align with business needs.
                      </p>
                    {expandedTier === 'enterprise-authority' && (
                      <div className="mt-4 pt-4 border-t border-[#9B59B6]/20 text-sm text-muted-foreground space-y-2 animate-fade-in">
                        <div className="space-y-2">
                          <div>• <strong>12-Hour Delivery:</strong> The fastest content delivery on the market. For leaders who move first.</div>
                          <div>• <strong>Unlimited Revisions (Fair Use):</strong> We don't stop until it's flawless. Total creative freedom.</div>
                          <div>• <strong>Expert Strategic Planning:</strong> A dedicated strategist aligns your content with your business goals.</div>
                          <div>• <strong>Performance Analytics Reports:</strong> Track ROI and content performance with clear, actionable data.</div>
                          <div>• <strong>Dedicated Account Manager:</strong> Your single point of contact for strategy and execution.</div>
                        </div>
                      </div>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={(e) => { e.stopPropagation(); setExpandedTier(expandedTier === 'enterprise-authority' ? null : 'enterprise-authority'); }}
                      className="mt-3 text-[#9B59B6] hover:bg-[#9B59B6]/10"
                    >
                      {expandedTier === 'enterprise-authority' ? 'Hide details' : 'View details'}
                    </Button>
                  </div>

                  {/* See Less Button */}
                  <Button 
                    variant="outline" 
                    onClick={() => setShowMoreEnterprise(false)}
                    className="w-full border-[#9B59B6]/40 text-[#9B59B6] hover:bg-[#9B59B6]/10 hover:border-[#9B59B6]/60"
                  >
                    See Less Enterprise Options
                  </Button>

                  {/* View Comparison Button */}
                  <Button 
                    variant="outline" 
                    onClick={() => setShowEnterpriseComparison((v) => !v)}
                    className="w-full border-[#9B59B6]/40 text-[#9B59B6] hover:bg-[#9B59B6]/10 hover:border-[#9B59B6]/60"
                  >
                    {showEnterpriseComparison ? 'Hide Comparison' : 'View Comparison'}
                  </Button>

                  {/* Enterprise Comparison Table */}
                  {showEnterpriseComparison && (
                    <div className="mt-4 p-4 bg-[#9B59B6]/5 rounded-xl animate-fade-in">
                      <h5 className="text-sm font-bold mb-3 text-[#9B59B6]">📊 Enterprise Comparison</h5>
                      <div className="grid grid-cols-4 gap-2 text-xs">
                        <div className="font-semibold text-[#9B59B6]">Feature</div>
                        <div className="font-semibold text-center">Scale</div>
                        <div className="font-semibold text-center">Authority</div>
                        <div className="font-semibold text-center">Dominance</div>
                        
                        <div className="py-2 text-muted-foreground">📝 Articles</div>
                        <div className="py-2 text-center">25</div>
                        <div className="py-2 text-center">30</div>
                        <div className="py-2 text-center">50</div>
                        
                        <div className="py-2 text-muted-foreground">🚀 Delivery</div>
                        <div className="py-2 text-center">24h</div>
                        <div className="py-2 text-center">24h</div>
                        <div className="py-2 text-center">12h</div>
                        
                        <div className="py-2 text-muted-foreground">✏️ Revisions</div>
                        <div className="py-2 text-center">1</div>
                        <div className="py-2 text-center">2</div>
                        <div className="py-2 text-center">Unlimited (Fair Use)</div>
                        
                        <div className="py-2 text-muted-foreground">🎯 Research</div>
                        <div className="py-2 text-center">Basic</div>
                        <div className="py-2 text-center">Advanced</div>
                        <div className="py-2 text-center">Expert</div>
                        
                        <div className="py-2 text-muted-foreground">👤 Support</div>
                        <div className="py-2 text-center">Email</div>
                        <div className="py-2 text-center">Priority</div>
                        <div className="py-2 text-center">Dedicated</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <Button 
                onClick={() => {
                  const packageMap = {
                    'starter': 'starter-enterprise',
                    'growth': 'growth-enterprise', 
                    'authority': 'authority-enterprise'
                  };
                  const packageName = packageMap[selectedEnterprise] || 'starter-enterprise';
                  handleCheckout(packageName);
                }}
                disabled={loadingStates[(() => {
                  const packageMap = {
                    'starter': 'starter-enterprise',
                    'growth': 'growth-enterprise', 
                    'authority': 'authority-enterprise'
                  };
                  return packageMap[selectedEnterprise] || 'starter-enterprise';
                })()]}
                className="w-full bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] hover:from-[#8E44AD] hover:to-[#7D3C98] text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingStates[(() => {
                  const packageMap = {
                    'starter': 'starter-enterprise',
                    'growth': 'growth-enterprise', 
                    'authority': 'authority-enterprise'
                  };
                  return packageMap[selectedEnterprise] || 'starter-enterprise';
                })()] ? "Processing..." : "🚀 Start My 24-Hour Draft"}
              </Button>
              <p className="text-xs text-muted-foreground italic text-center">Email-only workflow • No meetings • No delays</p>
            </CardContent>
          </Card>
        </div>



        {/* Contact Options */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8 text-foreground">Ready to Get Started?</h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button 
              onClick={() => handleCheckout('growth')}
              disabled={loadingStates['growth']}
              className="flex items-center gap-2 bg-[#3498DB] hover:bg-[#2980B9] text-white px-6 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              size="lg"
            >
              <Mail className="h-5 w-5" />
              {loadingStates['growth'] ? "Processing..." : "🚀 Start My 24-Hour Draft"}
            </Button>
            
            <Button 
              onClick={handleEmailClick}
              variant="outline"
              className="flex items-center gap-2 border-[#3498DB]/50 hover:border-[#3498DB] px-6 py-3 text-lg"
              size="lg"
            >
              <Phone className="h-5 w-5" />
              Email Us Directly
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4 italic">
            Friction-free workflow: All communication happens over email so you can focus on growth—no meetings, no delays.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            💬 Response within 24 hours • 📋 Custom proposal • ✅ No obligation
          </p>
        </div>

        {/* Contact Form */}
        {showContactForm && (
          <div id="contact-form" className="mb-16">
            <ContactForm />
          </div>
        )}

        {/* Guarantees */}
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 bg-gradient-to-r from-[#2ECC71]/10 to-[#3498DB]/10 border-2 border-[#2ECC71]/30">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-4 text-foreground">Our Guarantees</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                  <span>100% Original AI Content</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                  <span>100% Satisfaction Guarantee: Get a full refund or free rewrite if we miss the mark.</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                  <span>Guaranteed On-Time Delivery: Your content is always delivered in 24 hours (or 12 hours for Dominance), guaranteed.</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
