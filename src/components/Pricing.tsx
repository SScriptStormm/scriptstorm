import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Crown, Mail, Phone, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ContactForm from "./ContactForm";
import EnterprisePackageCard from "./EnterprisePackageCard";

const Pricing = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{[key: string]: boolean}>({});
  const [isAnnual, setIsAnnual] = useState(false);
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
    
    // Map enterprise package IDs to backend expected format
    const packageMap = {
      'scale': 'starter-enterprise',
      'authority': 'growth-enterprise', 
      'dominance': 'authority-enterprise'
    };
    
    const backendPackageType = packageMap[packageType] || packageType;
    const billingType = isAnnual ? 'annual' : 'monthly';
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          packageType: backendPackageType, 
          selectedAddOns,
          billing: billingType
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Show urgency message before redirect with package-specific delivery time
        const deliveryTime = backendPackageType === 'authority-enterprise' ? '12-hour' : '24-hour';
        const billingMessage = isAnnual ? 'your annual subscription' : 'your monthly plan';
        toast({
          title: "🚀 Redirecting to Checkout",
          description: `Complete ${billingMessage} in the next 10 minutes to lock in ${deliveryTime} delivery for your first draft!`,
          duration: 3000,
        });
        
        // Detect mobile devices and tablets and handle redirect appropriately
        const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|tablet|ipad/i.test(navigator.userAgent) 
          || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // Detect iPad Pro on iOS 13+
        
        if (isMobileOrTablet) {
          // On mobile/tablet, redirect in same tab immediately to avoid popup blockers
          window.location.href = data.url;
        } else {
          // On desktop, open in new tab with short delay
          setTimeout(() => {
            window.open(data.url, '_blank');
          }, 1000);
        }
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

  const packages = [
    {
      id: 'starter',
      name: 'Starter Package',
      monthly: {
        price: '$297',
        period: 'USD / month'
      },
      annual: {
        price: '$2,851',
        period: 'USD / year',
        monthlyEquivalent: '$238',
        savings: '$714'
      },
      description: 'Perfect for small businesses and testing the service.',
      icon: '🚀',
      color: '#3498DB',
      features: [
        { text: '5 AI-generated SEO articles', highlight: true },
        '24-hour Orchestrated delivery',
        '1 round of AI-assisted revisions',
        'Standard Keyword Research',
        'Plagiarism & AI Scan Guarantee',
        'Streamlined onboarding',
        '15 social media posts',
        '5 product descriptions'
      ]
    },
    {
      id: 'growth',
      name: 'Growth Package',
      monthly: {
        price: '$597',
        period: 'USD / month'
      },
      annual: {
        price: '$5,731',
        period: 'USD / year',
        monthlyEquivalent: '$478',
        savings: '$1,433'
      },
      description: 'Best value for established companies.',
      icon: '🔥',
      color: '#2ECC71',
      popular: true,
      features: [
        { text: '10 AI-generated SEO articles', highlight: true },
        '24-hour Orchestrated delivery',
        '2 rounds of AI-assisted revisions',
        'Advanced Keyword Research',
        'AI-Generated Content Calendar',
        'Plagiarism & AI Scan Guarantee',
        'Streamlined onboarding & support',
        '30 social media posts',
        '10 product descriptions'
      ]
    }
  ];

  const enterprisePackages = [
    {
      id: 'scale',
      name: 'Scale',
      monthly: {
        price: '$1,297',
        period: 'USD / month'
      },
      annual: {
        price: '$12,451',
        period: 'USD / year',
        monthlyEquivalent: '$1,038',
        savings: '$3,113'
      },
      color: '#9B59B6',
      features: [
        '25 AI-generated SEO articles',
        '75 social media posts',
        '25 product descriptions',
        '24-Hour Orchestrated Delivery',
        '2 Rounds of AI-Assisted Revisions',
        'Advanced Keyword & Competitor Analysis',
        'Plagiarism & AI Scan Guarantee',
        'Efficient Support Portal'
      ]
    },
    {
      id: 'authority',
      name: 'Authority',
      monthly: {
        price: '$1,797',
        period: 'USD / month'
      },
      annual: {
        price: '$17,251',
        period: 'USD / year',
        monthlyEquivalent: '$1,438',
        savings: '$4,313'
      },
      color: '#E74C3C',
      badge: 'BEST VALUE',
      features: [
        '30 AI-generated SEO articles',
        '90 social media posts',
        '30 product descriptions',
        '24-Hour Orchestrated Delivery',
        '3 Rounds of AI-Assisted Revisions',
        'Strategic Keyword & Topic Mapping',
        'Competitor Gap Analysis',
        'Plagiarism & AI Scan Guarantee',
        'Priority Support Portal'
      ]
    },
    {
      id: 'dominance',
      name: 'Dominance',
      monthly: {
        price: '$2,997',
        period: 'USD / month'
      },
      annual: {
        price: '$28,771',
        period: 'USD / year',
        monthlyEquivalent: '$2,398',
        savings: '$7,193'
      },
      color: '#F39C12',
      badge: 'Early Adopter',
      features: [
        '50 AI-generated SEO articles',
        '150 social media posts',
        'Unlimited product descriptions*',
        '12-Hour Orchestrated Delivery',
        'Unlimited AI-Assisted Revisions*',
        'Enterprise Keyword Intelligence',
        'AI-Driven Performance Dashboard',
        'Plagiarism & AI Scan Guarantee',
        'Market Dominance Roadmap',
        'Priority Support Portal',
        'Dedicated Client Workspace'
      ],
      note: '*Fair Use policy applies',
      details: 'Unlimited revisions within the scope of the project and brand guidelines.'
    }
  ];

  return (
    <section id="pricing" className="relative py-20 bg-gradient-to-br from-white via-white/95 to-muted/50 overflow-hidden">
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-20" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-glow) / 0.15) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" />
      <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-10 h-10 border-2 border-primary-glow/35 rotate-45 animate-float shadow-cyber" style={{ animationDelay: '4s' }} />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Done-For-You <span className="text-primary">Content Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Professional AI-powered content that drives results. No tools to learn, no hassle - just high-quality, SEO-optimized content delivered by a seamless automation engine.
          </p>
          <p className="text-muted-foreground mb-8">
            ⚡ Powered by a sophisticated AI workflow—orchestrated for rankings and structured for conversions.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 p-1 bg-muted/30 rounded-xl border w-fit mx-auto mb-8">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                !isAnnual 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                isAnnual 
                  ? 'bg-primary text-primary-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Annual Billing
              <Badge className="bg-green-600 text-white text-xs">Save 20%</Badge>
            </button>
          </div>
        </div>

        {/* Main Packages */}
        <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-4xl mx-auto">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`relative border-2 hover:scale-105 transition-all duration-300 ${
              pkg.popular ? 'shadow-lg' : ''
            }`} style={{
              borderColor: pkg.color
            }}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-4 py-2 text-sm font-bold text-white" style={{ backgroundColor: pkg.color }}>
                    <Crown className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className={`text-center ${pkg.popular ? 'pt-8' : 'pt-6'}`}>
                <div className="text-4xl mb-4">{pkg.icon}</div>
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
                    <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                      Equivalent to {pkg.annual.monthlyEquivalent}/month
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      💰 Save {pkg.annual.savings} annually
                    </p>
                  </div>
                )}
                <CardDescription className="text-base">{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: pkg.color }}
                      >
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                      <span className={`text-sm ${
                        typeof feature === 'object' && feature.highlight ? 'font-semibold' : ''
                      }`}>
                        {typeof feature === 'object' ? feature.text : feature}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleCheckout(pkg.id)}
                  disabled={loadingStates[pkg.id]}
                  className="w-full font-bold py-3 transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}dd)`,
                    color: 'white'
                  }}
                >
                  {loadingStates[pkg.id] ? "Processing..." : "🚀 Start My 24-Hour Draft"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center italic">
                  Email-only workflow • No meetings • No delays
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enterprise Packages */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            ⚡ Enterprise Packages
          </h3>
          <p className="text-lg text-muted-foreground">
            For large-scale, professionally managed content pipelines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto items-start">
          {enterprisePackages.map((pkg) => (
            <EnterprisePackageCard
              key={pkg.id}
              pkg={pkg}
              onCheckout={handleCheckout}
              loadingStates={loadingStates}
              isAnnual={isAnnual}
            />
          ))}
        </div>

        {/* Simple Comparison Table */}
        <div className="mb-16 p-6 bg-muted/30 rounded-xl border">
          <h4 className="text-xl font-bold text-center mb-6">📊 Enterprise Comparison</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-semibold">Feature</th>
                  <th className="text-center py-3 px-2 font-semibold">Scale</th>
                  <th className="text-center py-3 px-2 font-semibold">Authority</th>
                  <th className="text-center py-3 px-2 font-semibold">Dominance</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-2">📝 Articles</td>
                  <td className="py-2 px-2 text-center">25</td>
                  <td className="py-2 px-2 text-center">30</td>
                  <td className="py-2 px-2 text-center">50</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-2">🚀 Delivery</td>
                  <td className="py-2 px-2 text-center">24h</td>
                  <td className="py-2 px-2 text-center">24h</td>
                  <td className="py-2 px-2 text-center">12h</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-2">✏️ Revisions</td>
                  <td className="py-2 px-2 text-center">2</td>
                  <td className="py-2 px-2 text-center">3</td>
                  <td className="py-2 px-2 text-center">Unlimited</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-2">🎯 Research</td>
                  <td className="py-2 px-2 text-center">Advanced</td>
                  <td className="py-2 px-2 text-center">Strategic</td>
                  <td className="py-2 px-2 text-center">Expert</td>
                </tr>
                <tr>
                  <td className="py-2 px-2">👤 Support</td>
                  <td className="py-2 px-2 text-center">Efficient</td>
                  <td className="py-2 px-2 text-center">Priority</td>
                  <td className="py-2 px-2 text-center">Priority + Workspace</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border">
          <h4 className="text-2xl font-bold mb-4">Ready to Get Started?</h4>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button 
              onClick={() => handleCheckout('starter')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8"
            >
              🚀 Start My 24-Hour Draft
            </Button>
            <Button 
              variant="outline" 
              onClick={handleEmailClick}
              className="border-primary text-primary hover:bg-primary/10"
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

        {showContactForm && (
          <div className="mt-16">
            <ContactForm />
          </div>
        )}
      </div>
    </section>
  );
};

export default Pricing;