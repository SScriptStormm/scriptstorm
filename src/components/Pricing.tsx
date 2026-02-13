import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Crown, Mail, Phone, Calendar, FileText, Package, Clock, RefreshCw, Search, Shield, Headphones, Instagram } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ContactForm from "./ContactForm";
import EnterprisePackageCard from "./EnterprisePackageCard";
const getFeatureIcon = (feature: string) => {
  const lowerFeature = feature.toLowerCase();

  // Articles/Blog Content
  if (lowerFeature.includes('blog articles') || lowerFeature.includes('foundational') || lowerFeature.includes('authority-building')) {
    return <FileText className="h-3 w-3 text-white" />;
  }
  // Social Media / Video Content
  if (lowerFeature.includes('social media') || lowerFeature.includes('social & video')) {
    return <Instagram className="h-3 w-3 text-white" />;
  }
  // Product Descriptions
  if (lowerFeature.includes('product') || lowerFeature.includes('descriptions')) {
    return <Package className="h-3 w-3 text-white" />;
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
  // Calendar
  if (lowerFeature.includes('calendar') || lowerFeature.includes('automated')) {
    return <Calendar className="h-3 w-3 text-white" />;
  }

  // Default fallback
  return <Instagram className="h-3 w-3 text-white" />;
};
const Pricing = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});
  const [isAnnual, setIsAnnual] = useState(false);
  const {
    toast
  } = useToast();
  const handleContactClick = () => {
    setShowContactForm(true);
    // Scroll to contact form
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };
  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@scriptstorm.io?subject=Content%20Services%20Inquiry';
  };
  const handleCheckout = async (packageType: string, selectedAddOns = {}) => {
    if (loadingStates[packageType]) return;
    setLoadingStates(prev => ({
      ...prev,
      [packageType]: true
    }));

    // Map enterprise package IDs to backend expected format
    const packageMap = {
      'scale': 'starter-enterprise',
      'authority': 'growth-enterprise',
      'dominance': 'authority-enterprise'
    };
    const backendPackageType = packageMap[packageType] || packageType;
    const billingType = isAnnual ? 'annual' : 'monthly';
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke('create-checkout', {
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
          duration: 3000
        });

        // Detect mobile devices and tablets and handle redirect appropriately
        const isMobileOrTablet = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|tablet|ipad/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1; // Detect iPad Pro on iOS 13+

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
        variant: "destructive"
      });
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        [packageType]: false
      }));
    }
  };
  const packages = [{
    id: 'starter',
    name: 'Starter Package',
    monthly: {
      price: '$297',
      period: 'USD / month'
    },
    annual: {
      price: '$2,850',
      period: 'USD / year',
      monthlyEquivalent: '$238',
      savings: '$714'
    },
    description: 'Ideal for small businesses and founders who need to establish a consistent online presence and start attracting traffic.',
    monthlyDescription: 'Ideal for small businesses and founders who need to establish a consistent online presence and start attracting traffic.',
    annualDescription: 'Ideal for small businesses and founders ready to build a consistent, traffic-driving content foundation.',
    icon: '🚀',
    color: '#3498DB',
    sectionHeader: 'Your Monthly Content Package Includes:',
    annualSectionHeader: 'Your Annual Content Package Includes:',
    features: ['5 SEO Blog Articles (1,500-2,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', '15 Social Media Posts: Engaging posts tailored for LinkedIn, X (Twitter), and Instagram to drive discussion and promote your articles.', '5 Product/Service Descriptions: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.', '24-Hour Orchestrated Delivery: A relentless, daily content production cycle that keeps you constantly ahead of the competition.', "1 Revision Round: We fine-tune your content to ensure it meets your expectations.", 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.', 'Standard Keyword Research: We target relevant keywords to ensure your content gets found.'],
    annualFeatures: ['5 SEO Blog Articles (1,500-2,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', '15 Social Media Posts: Engaging posts tailored for LinkedIn, X (Twitter), and Instagram to drive discussion and promote your articles.', '5 Product/Service Descriptions: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.', '24-Hour Orchestrated Delivery: A relentless, daily content production cycle that keeps you constantly ahead of the competition.', '1 Revision Round: We fine-tune your content to ensure it meets your expectations.', 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.', 'Standard Keyword Research: We target relevant keywords to ensure your content gets found.']
  }, {
    id: 'growth',
    name: 'Growth Package',
    monthly: {
      price: '$597',
      period: 'USD / month'
    },
    annual: {
      price: '$5,730',
      period: 'USD / year',
      monthlyEquivalent: '$478',
      savings: '$1,434'
    },
    description: 'The ultimate package for established companies looking to scale their content output, dominate their niche, and generate qualified leads.',
    monthlyDescription: 'The ultimate package for established companies looking to scale their content output, dominate their niche, and generate qualified leads.',
    annualDescription: 'The ultimate package for established companies scaling their authority and dominating their niche with a relentless content engine.',
    icon: '🔥',
    color: '#2ECC71',
    popular: true,
    sectionHeader: 'Your Monthly Content Package Includes:',
    annualSectionHeader: 'Your Annual Content Package Includes:',
features: ['10 SEO Blog Articles (1,500-2,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', 'Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences.', '30 Social & Video Content: A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority.', "10 Product/Service Descriptions: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.", '24-Hour Orchestrated Delivery: A relentless, daily content production cycle that keeps you constantly ahead of the competition.', '2 Revision Rounds: Get your content perfected faster with our prioritized revision process.', "Advanced Keyword & Competitor Research: We don't just find keywords; we find gaps in your competitors' strategies to help you win.", 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.'],
    annualFeatures: ['10 SEO Blog Articles (1,500-2,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', 'Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences.', '30 Social & Video Content: A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority.', "10 Product/Service Descriptions: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.", '24-Hour Orchestrated Delivery: A relentless, daily content production cycle that keeps you constantly ahead of the competition.', '2 Revision Rounds: Get your content perfected faster with our prioritized revision process.', "Advanced Keyword & Competitor Research: We don't just find keywords; we find gaps in your competitors' strategies to help you win.", 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.']
  }];
  const enterprisePackages = [{
    id: 'scale',
    name: 'SCALE',
    monthly: {
      price: '$1,297',
      period: 'USD / month'
    },
    annual: {
      price: '$12,450',
      period: 'USD / year',
      monthlyEquivalent: '$1,038',
      savings: '$3,114'
    },
    color: '#8B5CF6',
features: ['25 SEO Blog Articles (2,000-3,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', '75 Social & Video Content: A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority.', 'Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences.', '25 Product/Service Descriptions: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.', '24-Hour Orchestrated Delivery: A relentless, daily content production cycle that keeps you constantly ahead of the competition.', '2 Revision Rounds: Refine content to perfection with our dedicated revision process.', 'Advanced Competitor & Keyword Analysis: AI-powered analysis that identifies competitor content gaps and keyword opportunities.', 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.', 'Efficient Support Portal: Streamlined communication for seamless project management.'],
    annualFeatures: ['25 SEO Blog Articles (2,000-3,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', '75 Social & Video Content: A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority.', 'Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences.', '25 Product/Service Descriptions: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.', '24-Hour Orchestrated Delivery: A relentless, daily content production cycle that keeps you constantly ahead of the competition.', '2 Revision Rounds: Refine content to perfection with our dedicated revision process.', 'Advanced Competitor & Keyword Analysis: AI-powered analysis that identifies competitor content gaps and keyword opportunities.', 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.', 'Efficient Support Portal: Streamlined communication for seamless project management.'],
    note: 'Fully Automated Workflow • No Meetings • No Delays',
    details: 'For established businesses ready to dominate their niche and outpace competitors with relentless, high-volume content.'
  }, {
    id: 'authority',
    name: 'AUTHORITY',
    monthly: {
      price: '$1,797',
      period: 'USD / month'
    },
    annual: {
      price: '$17,250',
      period: 'USD / year',
      monthlyEquivalent: '$1,438',
      savings: '$4,314'
    },
    color: '#E74C3C',
    badge: 'BEST VALUE',
features: ['30 Industry-Leading SEO Blog Articles (2,000-3,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', '90 Social & Video Content: A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority.', '30 Product/Service Descriptions: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.', '24-Hour Orchestrated Delivery: A relentless, daily content production cycle that keeps you constantly ahead of the competition.', '3 Revision Rounds: Enhanced revision cycles for complex, enterprise-level content.', 'Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences.', 'Strategic Keyword Insights: AI-powered research that uncovers high-potential topics and search terms aligned with your market.', 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.', 'Priority Support Portal: Faster response times and dedicated handling for mission-critical projects.'],
    annualFeatures: ['30 Industry-Leading SEO Blog Articles (2,000-3,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', '90 Social & Video Content: A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority.', '30 Product/Service Descriptions: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.', '24-Hour Orchestrated Delivery: A relentless, daily content production cycle that keeps you constantly ahead of the competition.', '3 Revision Rounds: Enhanced revision cycles for complex, enterprise-level content.', 'Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences.', 'Strategic Keyword Insights: AI-powered research that uncovers high-potential topics and search terms aligned with your market.', 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.', 'Priority Support Portal: Faster response times and dedicated handling for mission-critical projects.'],
    note: 'Fully Automated Workflow • No Meetings • No Delays',
    details: 'For industry players who need to become the undisputed thought leader and control the market narrative.'
  }, {
    id: 'dominance',
    name: 'DOMINANCE',
    monthly: {
      price: '$2,997',
      period: 'USD / month'
    },
    annual: {
      price: '$28,770',
      period: 'USD / year',
      monthlyEquivalent: '$2,398',
      savings: '$7,194'
    },
    color: '#F59E0B',
features: ['50 Unbeatable Cornerstone SEO Blog Articles (2,000-5,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', '150 Social & Video Content: A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority.', 'Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences.', 'Unlimited Product/Service Descriptions*: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.', '12-Hour Lightning Delivery: The fastest content turnaround on the market, giving you an insurmountable speed advantage.', 'Unlimited Revisions*: Perfection, on demand.', 'Enterprise Keyword Intelligence: Proprietary insights that uncover untapped market opportunities and predict trends.', 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.', 'Priority Support Portal & Dedicated Client Workspace: A white-glove experience for your enterprise team.'],
    annualFeatures: ['50 Unbeatable Cornerstone SEO Blog Articles (2,000-5,000 words each): Deeply-researched, SEO-optimized content designed to attract organic traffic and establish your expertise.', '150 Social & Video Content: A multi-platform mix of posts for LinkedIn, X, and Instagram, plus YouTube video script outlines to drive traffic and build authority.', 'Automated Content Scheduling: Your approved content is automatically scheduled and published based on your calendar preferences.', 'Unlimited Product/Service Descriptions*: Compelling, conversion-optimized copy that highlights benefits and drives sales for your key offerings.', '12-Hour Lightning Delivery: The fastest content turnaround on the market, giving you an insurmountable speed advantage.', 'Unlimited Revisions*: Perfection, on demand.', 'Enterprise Keyword Intelligence: Proprietary insights that uncover untapped market opportunities and predict trends.', 'Plagiarism & AI Scan Guarantee: Every piece is guaranteed original and passes the latest AI detection benchmarks.', 'Priority Support Portal & Dedicated Client Workspace: A white-glove experience for your enterprise team.'],
    note: '*Fair Use policy applies. Unlimited revisions within the scope of the project and brand guidelines.',
    details: 'The ultimate content weapon for enterprises that accept nothing less than total market leadership.'
  }];
  return <section id="pricing" className="relative py-20 bg-gradient-to-br from-white via-white/95 to-muted/50 overflow-hidden">
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
      <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{
      animationDelay: '2s'
    }} />
      <div className="absolute bottom-40 left-20 w-10 h-10 border-2 border-primary-glow/35 rotate-45 animate-float shadow-cyber" style={{
      animationDelay: '4s'
    }} />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Done-For-You <span className="text-primary">Content Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Professional, automated content that drives results. No tools to learn, no hassle - just high-quality, SEO-optimized content delivered by a seamless automation engine.
          </p>
          <p className="text-muted-foreground mb-8">
            ⚡ Powered by a sophisticated, automated workflow—orchestrated for rankings and structured for conversions.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 p-1 bg-muted/30 rounded-xl border w-fit mx-auto mb-8">
            <button onClick={() => setIsAnnual(false)} className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${!isAnnual ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
              Monthly Billing
            </button>
            <button onClick={() => setIsAnnual(true)} className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${isAnnual ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}>
              Annual Billing
              <Badge className="bg-green-600 text-white text-xs">Save 20%</Badge>
            </button>
          </div>
        </div>

        {/* Main Packages */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-20 max-w-4xl mx-auto items-stretch">
          {packages.map(pkg => <Card key={pkg.id} className={`relative border-2 hover:scale-105 transition-all duration-300 h-full flex flex-col ${pkg.popular ? 'shadow-lg mt-6 md:mt-0' : ''}`} style={{
          borderColor: pkg.color
        }}>
              {pkg.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="px-4 py-2 text-sm font-bold text-white" style={{
              backgroundColor: pkg.color
            }}>
                    <Crown className="h-4 w-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>}
              
              <CardHeader className={`text-center ${pkg.popular ? 'pt-6 md:pt-8' : 'pt-3 md:pt-6'} pb-2 md:pb-6`}>
                <div className="text-3xl md:text-4xl mb-2 md:mb-4">{pkg.icon}</div>
                <CardTitle className="text-xl md:text-2xl font-bold mb-1 md:mb-2" style={{
              color: pkg.color
            }}>
                  {pkg.name}
                </CardTitle>
                <div className="mb-2 md:mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-foreground">
                    {isAnnual ? pkg.annual.price : pkg.monthly.price}
                  </span>
                  <span className="text-base md:text-lg font-semibold text-foreground ml-1">USD</span>
                  <span className="text-muted-foreground ml-2 text-sm md:text-base font-semibold">
                    {isAnnual ? '/ year' : '/ month'}
                  </span>
                </div>
                {isAnnual && <div className="mb-2 md:mb-4 p-2 md:p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-lg border-3 border-green-500 dark:border-green-400 shadow-xl ring-2 ring-green-300 dark:ring-green-600">
                    <p className="text-base md:text-lg text-green-800 dark:text-green-200 font-extrabold mb-0.5 md:mb-1">
                      🎉 Get 2 Months Free & Save {pkg.annual.savings}
                    </p>
                    <p className="text-xs md:text-sm text-green-700 dark:text-green-300 font-bold">
                      Equivalent to {pkg.annual.monthlyEquivalent}/month
                    </p>
                  </div>}
                <CardDescription className="text-sm md:text-base">{isAnnual ? pkg.annualDescription : pkg.monthlyDescription}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-2 md:space-y-6 p-3 md:p-6 pb-2 flex-1 flex flex-col">
                <div className="mb-1 md:mb-3">
                  <p className="font-semibold text-foreground text-xs md:text-sm mb-1 md:mb-2">
                    {isAnnual ? pkg.annualSectionHeader : pkg.sectionHeader}
                  </p>
                </div>
                <div className={`${pkg.id === 'starter' && isAnnual ? 'space-y-6 md:space-y-14 lg:space-y-14' : pkg.id === 'starter' ? 'space-y-6 md:space-y-10 lg:space-y-10' : 'space-y-3 md:space-y-7 lg:space-y-7'} flex-1`}>
                  {(isAnnual ? pkg.annualFeatures : pkg.features).map((feature, index) => {
                const [title, ...rest] = feature.split(':');
                const description = rest.join(':');
                return <div key={index} className="flex items-start gap-2 md:gap-3">
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{
                    backgroundColor: pkg.color
                  }}>
                          {getFeatureIcon(feature)}
                        </div>
                        <span className="text-xs md:text-sm leading-relaxed">
                          <strong>{title}</strong>{description ? `:${description}` : ''}
                        </span>
                      </div>;
              })}
                </div>
                
                <Button onClick={() => handleCheckout(pkg.id)} disabled={loadingStates[pkg.id]} className="w-full font-bold py-2 md:py-3 px-4 md:px-6 text-sm md:text-base transition-all duration-300" style={{
              background: `linear-gradient(135deg, ${pkg.color}, ${pkg.color}dd)`,
              color: 'white'
            }}>
                  {loadingStates[pkg.id] ? "Processing..." : isAnnual ? "💎 Start Saving & Get My 24-Hour Draft" : "🚀 Start My 24-Hour Draft"}
                </Button>
                
                {['starter', 'growth', 'scale', 'authority', 'dominance'].includes(pkg.id) && <a href="https://docs.google.com/document/d/11oF_e-yAGsdnYLenzUswEZtOaWbIb_04uFQWGuPS4pk/edit?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-center text-primary hover:underline font-semibold block mt-1 md:mt-3">
                    📄 See a Sample Article
                  </a>}
                
                <p className="text-xs md:text-sm text-center font-semibold text-foreground mt-1 md:mt-2">
                  👉 Get your first draft in &lt;5 minutes. No calls.
                </p>
                
                <p className="text-[10px] md:text-xs text-muted-foreground text-center italic mt-0.5 md:mt-1 mb-0">
                  Fully Automated Workflow • No Meetings • No Delays
                </p>
              </CardContent>
            </Card>)}
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 lg:gap-8 mb-16 max-w-7xl mx-auto items-start">
          {enterprisePackages.map(pkg => <EnterprisePackageCard key={pkg.id} pkg={pkg} onCheckout={handleCheckout} loadingStates={loadingStates} isAnnual={isAnnual} />)}
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
                  <td className="py-2 px-2">📱 Social & Video Content</td>
                  <td className="py-2 px-2 text-center">75</td>
                  <td className="py-2 px-2 text-center">90</td>
                  <td className="py-2 px-2 text-center">150</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-2">🛍️ Product/Service Descriptions</td>
                  <td className="py-2 px-2 text-center">25</td>
                  <td className="py-2 px-2 text-center">30</td>
                  <td className="py-2 px-2 text-center">Unlimited*</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-2">📅 Automated Content Scheduling</td>
                  <td className="py-2 px-2 text-center">✅</td>
                  <td className="py-2 px-2 text-center">✅</td>
                  <td className="py-2 px-2 text-center">✅</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 px-2">🎯 Research</td>
                  <td className="py-2 px-2 text-center">Advanced</td>
                  <td className="py-2 px-2 text-center">Keyword Insights</td>
                  <td className="py-2 px-2 text-center">Enterprise</td>
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
          <div className="flex flex-col items-center gap-2 mb-6">
            <Button onClick={() => document.getElementById('pricing')?.scrollIntoView({
            behavior: 'smooth'
          })} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8">
              🚀 Start My 24-Hour Draft
            </Button>
            <p className="text-sm font-semibold text-foreground">
              👉 Get your first draft in &lt;5 minutes. No calls.
            </p>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Friction-free workflow: All communication happens over email so you can focus on growth—no meetings, no delays.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            💬 Response within 24 hours • 📋 Custom proposal • ✅ No obligation
          </p>
        </div>

        {showContactForm && <div className="mt-16">
            <ContactForm />
          </div>}
      </div>
    </section>;
};
export default Pricing;