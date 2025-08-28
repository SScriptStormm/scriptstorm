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
  const [expandedTier, setExpandedTier] = useState<string | null>(null);
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
            Professional AI-powered content that drives results. No tools to learn, no hassle - just high-quality, SEO-optimized content delivered by a seamless automation engine.
          </p>
          <p className="text-sm text-muted-foreground italic">
            ⚡ Powered by a sophisticated AI workflow—orchestrated for rankings and structured for conversions.
          </p>
        </div>

        {/* Service Packages */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 items-start">
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
              <CardDescription className="text-base font-medium">Perfect for small businesses and testing the service.</CardDescription>
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
                  <span className="text-sm font-medium">24-hour orchestrated delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">1 round of AI-assisted revisions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Standard Keyword Research</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Plagiarism & AI Scan Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Streamlined onboarding</span>
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
              <CardDescription className="text-base font-medium">Best value for established companies.</CardDescription>
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
                  <span className="text-sm font-medium">24-hour orchestrated delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">2 rounds of AI-assisted revisions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Advanced Keyword Research</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">AI-Generated Content Calendar</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Plagiarism & AI Scan Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#2ECC71] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Streamlined onboarding & support</span>
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
        </div>

        {/* Enterprise Packages Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-[#9B59B6] mb-4">
            ⚡ Enterprise Packages
          </h3>
          <p className="text-lg text-muted-foreground">
            For large-scale, professionally managed content pipelines.
          </p>
        </div>

        {/* Enterprise Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Scale Package */}
          <Card className="relative shadow-neural border-2 border-[#9B59B6]/40 hover:border-[#9B59B6]/80 bg-gradient-to-br from-white/95 to-[#9B59B6]/5 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(155,89,182,0.3)] hover:scale-105">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-[#9B59B6] mb-2">
                Scale
              </CardTitle>
              <div className="text-4xl font-bold text-foreground mb-2">$1,297<span className="text-lg text-muted-foreground"> USD/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#9B59B6] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">25 AI-generated SEO articles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#9B59B6] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">75 AI-generated social media posts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#9B59B6] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">25 AI-generated product descriptions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#9B59B6] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">24-Hour Orchestrated Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#9B59B6] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">2 Rounds of AI-Assisted Revisions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#9B59B6] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Advanced Keyword & Competitor Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#9B59B6] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Plagiarism & AI Scan Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#9B59B6] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Standard Support Portal</span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpandedTier(expandedTier === 'scale' ? null : 'scale')}
                className="mt-3 text-[#9B59B6] hover:bg-[#9B59B6]/10"
              >
                {expandedTier === 'scale' ? 'Hide details' : 'View details'}
              </Button>

              {expandedTier === 'scale' && (
                <div className="mt-4 pt-4 border-t border-[#9B59B6]/20 text-sm text-muted-foreground space-y-2 animate-fade-in">
                  <div className="space-y-2">
                    <div>• <strong>24-Hour Orchestrated Delivery:</strong> Our automated workflow ensures your content is researched, written, checked, and delivered in a seamless 24-hour cycle.</div>
                    <div>• <strong>2 Rounds of AI-Assisted Revisions:</strong> Provide feedback, and we'll expertly guide the AI to refine the content for perfect brand alignment.</div>
                    <div>• <strong>Advanced Keyword & Competitor Analysis:</strong> We use Frase.io to analyze competitors and identify the exact topics you need to rank higher.</div>
                    <div>• <strong>Standard Support Portal:</strong> Submit requests through your Gumloop portal for organized, efficient, and tracked responses.</div>
                  </div>
                </div>
              )}

              <Button 
                onClick={() => handleCheckout('scale-enterprise')}
                disabled={loadingStates['scale-enterprise']}
                className="w-full bg-gradient-to-r from-[#9B59B6] to-[#8E44AD] hover:from-[#8E44AD] hover:to-[#7D3C98] text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingStates['scale-enterprise'] ? "Processing..." : "🚀 Start My 24-Hour Draft"}
              </Button>
            </CardContent>
          </Card>

          {/* Authority Package */}
          <Card className="relative shadow-hologram border-2 border-[#E91E63]/50 hover:border-[#E91E63]/80 bg-gradient-to-br from-white/95 to-[#E91E63]/5 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(233,30,99,0.4)] hover:scale-105 overflow-visible">
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl border-2 border-white/20 animate-pulse">
                <Star className="h-4 w-4" />
                BEST VALUE
              </div>
            </div>
            
            <CardHeader className="text-center pt-8 pb-4">
              <CardTitle className="text-2xl font-bold text-[#E91E63] mb-2">
                Authority
              </CardTitle>
              <div className="text-4xl font-bold text-foreground mb-2">$1,797<span className="text-lg text-muted-foreground"> USD/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">30 AI-generated SEO articles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">90 AI-generated social media posts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">30 AI-generated product descriptions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">24-Hour Orchestrated Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">3 Rounds of AI-Assisted Revisions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Strategic Keyword & Topic Mapping</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Competitor Gap Analysis</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Plagiarism & AI Scan Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#E91E63] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Priority Support Portal</span>
                </div>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpandedTier(expandedTier === 'authority' ? null : 'authority')}
                className="mt-3 text-[#E91E63] hover:bg-[#E91E63]/10"
              >
                {expandedTier === 'authority' ? 'Hide details' : 'View details'}
              </Button>

              {expandedTier === 'authority' && (
                <div className="mt-4 pt-4 border-t border-[#E91E63]/20 text-sm text-muted-foreground space-y-2 animate-fade-in">
                  <div className="space-y-2">
                    <div>• <strong>24-Hour Orchestrated Delivery:</strong> Experience the reliability of our automated system, delivering strategic content without missing a deadline.</div>
                    <div>• <strong>3 Rounds of AI-Assisted Revisions:</strong> Enjoy greater flexibility to perfect tone, structure, and messaging with a seamless feedback process.</div>
                    <div>• <strong>Competitor Gap Analysis:</strong> We provide an actionable report on specific weaknesses in your competitors' strategies, giving you a roadmap to outrank them.</div>
                    <div>• <strong>Priority Support Portal:</strong> Get faster, prioritized responses within your portal, ensuring your high-volume needs are met promptly.</div>
                  </div>
                </div>
              )}

              <Button 
                onClick={() => handleCheckout('authority-enterprise')}
                disabled={loadingStates['authority-enterprise']}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#C2185B] hover:from-[#C2185B] hover:to-[#AD1457] text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingStates['authority-enterprise'] ? "Processing..." : "🚀 Start My 24-Hour Draft"}
              </Button>
            </CardContent>
          </Card>

          {/* Dominance Package */}
          <Card className="relative shadow-neural border-2 border-[#FF9800]/40 hover:border-[#FF9800]/80 bg-gradient-to-br from-white/95 to-[#FF9800]/5 backdrop-blur-sm transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,152,0,0.3)] hover:scale-105 overflow-visible">
            {/* Early Adopter Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="bg-gradient-to-r from-[#FF9800] to-[#F57C00] text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl border-2 border-white/20">
                Early Adopter
              </div>
            </div>
            
            <CardHeader className="text-center pt-8 pb-4">
              <CardTitle className="text-2xl font-bold text-[#FF9800] mb-2">
                Dominance
              </CardTitle>
              <div className="text-4xl font-bold text-foreground mb-2">$2,997<span className="text-lg text-muted-foreground"> USD/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">50 AI-generated SEO articles</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">150 AI-generated social media posts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Unlimited product descriptions*</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">12-Hour Orchestrated Delivery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Unlimited AI-Assisted Revisions*</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Enterprise Keyword Intelligence</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">AI-Driven Performance Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Plagiarism & AI Scan Guarantee</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Market Dominance Roadmap</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Priority Support Portal</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#FF9800] rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">Dedicated Client Workspace</span>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground italic">
                *Fair Use policy applies
              </p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setExpandedTier(expandedTier === 'dominance' ? null : 'dominance')}
                className="mt-3 text-[#FF9800] hover:bg-[#FF9800]/10"
              >
                {expandedTier === 'dominance' ? 'Hide details' : 'View details'}
              </Button>

              {expandedTier === 'dominance' && (
                <div className="mt-4 pt-4 border-t border-[#FF9800]/20 text-sm text-muted-foreground space-y-2 animate-fade-in">
                  <div className="space-y-2">
                    <div>• <strong>12-Hour Orchestrated Delivery:</strong> Your content is prioritized through our automated system for the fastest possible turnaround, giving you a competitive edge.</div>
                    <div>• <strong>Unlimited AI-Assisted Revisions:</strong> We work with you iteratively within our AI-driven workflow to achieve perfection, ensuring 100% on-brand results.</div>
                    <div>• <strong>Market Dominance Roadmap:</strong> A comprehensive, data-backed content strategy built from competitor analysis, designed to establish you as the undisputed authority.</div>
                    <div>• <strong>AI-Driven Performance Dashboard:</strong> Get clear, actionable insights and performance reports based on your content's impact.</div>
                    <div>• <strong>Dedicated Client Workspace:</strong> Your centralized hub for all content requests, assets, and history—a single source of truth for your strategy.</div>
                    <div>• <strong>Priority Support Portal:</strong> Your requests are fast-tracked, guaranteeing the rapid response time a venture of your scale requires.</div>
                  </div>
                </div>
              )}

              <Button 
                onClick={() => handleCheckout('dominance-enterprise')}
                disabled={loadingStates['dominance-enterprise']}
                className="w-full bg-gradient-to-r from-[#FF9800] to-[#F57C00] hover:from-[#F57C00] hover:to-[#E65100] text-white font-bold py-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingStates['dominance-enterprise'] ? "Processing..." : "🚀 Start My 24-Hour Draft"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Enterprise Comparison Chart */}
        <div className="mb-16 p-8 bg-gradient-to-r from-white/80 to-[#9B59B6]/5 rounded-2xl border-2 border-[#9B59B6]/20">
          <h4 className="text-2xl font-bold text-[#9B59B6] mb-6 text-center">📊 Enterprise Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#9B59B6]/20">
                  <th className="text-left py-4 px-4 font-bold text-[#9B59B6]">Feature</th>
                  <th className="text-center py-4 px-4 font-bold">Scale</th>
                  <th className="text-center py-4 px-4 font-bold">Authority</th>
                  <th className="text-center py-4 px-4 font-bold">Dominance</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-[#9B59B6]/10">
                  <td className="py-3 px-4 text-muted-foreground">📝 Articles</td>
                  <td className="py-3 px-4 text-center">25</td>
                  <td className="py-3 px-4 text-center">30</td>
                  <td className="py-3 px-4 text-center">50</td>
                </tr>
                <tr className="border-b border-[#9B59B6]/10">
                  <td className="py-3 px-4 text-muted-foreground">🚀 Delivery</td>
                  <td className="py-3 px-4 text-center">24h</td>
                  <td className="py-3 px-4 text-center">24h</td>
                  <td className="py-3 px-4 text-center">12h</td>
                </tr>
                <tr className="border-b border-[#9B59B6]/10">
                  <td className="py-3 px-4 text-muted-foreground">✏️ Revisions</td>
                  <td className="py-3 px-4 text-center">2</td>
                  <td className="py-3 px-4 text-center">3</td>
                  <td className="py-3 px-4 text-center">Unlimited (Fair Use)</td>
                </tr>
                <tr className="border-b border-[#9B59B6]/10">
                  <td className="py-3 px-4 text-muted-foreground">🎯 Research</td>
                  <td className="py-3 px-4 text-center">Advanced</td>
                  <td className="py-3 px-4 text-center">Strategic</td>
                  <td className="py-3 px-4 text-center">Expert</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-muted-foreground">👤 Support</td>
                  <td className="py-3 px-4 text-center">Standard</td>
                  <td className="py-3 px-4 text-center">Priority</td>
                  <td className="py-3 px-4 text-center">Priority + Dedicated Workspace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="text-center bg-gradient-to-r from-[#9B59B6]/10 to-[#E91E63]/10 rounded-2xl p-8 border-2 border-[#9B59B6]/20">
          <h4 className="text-2xl font-bold mb-4 text-foreground">Ready to Get Started?</h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button 
              onClick={() => handleCheckout('starter')}
              className="bg-gradient-to-r from-[#9B59B6] to-[#E91E63] hover:from-[#E91E63] hover:to-[#9B59B6] text-white font-bold py-3 px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              🚀 Start My 24-Hour Draft
            </Button>
            <Button 
              variant="outline" 
              onClick={handleEmailClick}
              className="border-[#9B59B6] text-[#9B59B6] hover:bg-[#9B59B6]/10"
            >
              Email Us Directly
            </Button>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Friction-free workflow: All communication happens over email so you can focus on growth—no meetings, no delays.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            💬 Response within 24 hours • 📋 Custom proposal • ✅ No obligation
          </p>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="mt-20">
            <ContactForm />
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;