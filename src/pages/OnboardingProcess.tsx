import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Search, 
  PenTool, 
  CheckCircle, 
  Rocket, 
  Clock,
  Users,
  Target,
  Zap,
  Shield,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      duration: "15-30 minutes",
      icon: MessageSquare,
      color: "#3498DB",
      description: "We learn about your business, target audience, and content goals.",
      details: [
        "Understand your brand voice and style",
        "Identify your target keywords and topics",
        "Set expectations and delivery timeline",
        "Answer any questions you have"
      ]
    },
    {
      number: "02",
      title: "Research & Planning",
      duration: "2-4 hours",
      icon: Search,
      color: "#2ECC71",
      description: "Our team conducts deep research and creates your content strategy.",
      details: [
        "Comprehensive keyword research",
        "Competitor content analysis",
        "Content outline and structure planning",
        "SEO optimization strategy"
      ]
    },
    {
      number: "03",
      title: "Content Creation",
      duration: "12-18 hours",
      icon: PenTool,
      color: "#9B59B6",
      description: "Expert writers craft your content with precision and expertise.",
      details: [
        "Professional writing by industry experts",
        "SEO optimization throughout",
        "Brand voice consistency",
        "Internal quality review"
      ]
    },
    {
      number: "04",
      title: "Review & Delivery",
      duration: "2-4 hours",
      icon: CheckCircle,
      color: "#E67E22",
      description: "Final review, polishing, and delivery of your completed content.",
      details: [
        "Final quality assurance check",
        "SEO optimization verification",
        "Formatted for easy publishing",
        "Delivered via your preferred method"
      ]
    },
    {
      number: "05",
      title: "Launch Support",
      duration: "Ongoing",
      icon: Rocket,
      color: "#E74C3C",
      description: "We help you publish and provide ongoing support for best results.",
      details: [
        "Publishing guidance and tips",
        "Performance monitoring advice",
        "Revision support if needed",
        "Strategy recommendations for future content"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-primary-glow/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary font-mono">
              ScriptStorm
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/why-choose-us" className="text-muted-foreground hover:text-primary transition-colors">
                Why Choose Us
              </Link>
              <Link to="/onboarding-process" className="text-primary font-medium">
                Our Process
              </Link>
              <Link to="/#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
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
        
        {/* Multiple scanning line effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-30" />
          <div className="absolute bottom-0 h-px w-full bg-gradient-cyber animate-scan-line opacity-25" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Particle effect overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-25" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-25" style={{ animationDelay: '5s' }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground font-mono tracking-wide">
            How We Onboard <span className="text-[#3498DB]">New Clients</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A transparent, proven process that takes you from inquiry to published content in just 24 hours.
          </p>
          <Badge className="bg-[#2ECC71] text-white px-6 py-3 text-lg font-semibold shadow-cyber">
            <Clock className="h-5 w-5 mr-2" />
            24-Hour Turnaround Guaranteed
          </Badge>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-15" />
        <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-25" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-30" style={{ animationDelay: '4s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative mb-20 last:mb-0">
                  {/* Timeline connector - removed to prevent text overlap */}
                  
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Step Info */}
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="flex items-center gap-6 mb-6">
                        <div className="relative">
                          <div 
                            className="w-20 h-20 rounded-full flex items-center justify-center shadow-cyber"
                            style={{ backgroundColor: step.color }}
                          >
                            <Icon className="h-10 w-10 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-[#F39C12] text-white text-sm font-bold px-3 py-1 rounded-full shadow-cyber">
                            {step.number}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-foreground font-mono">{step.title}</h3>
                          <Badge variant="outline" className="mt-2 border-primary-glow/50">
                            <Clock className="h-4 w-4 mr-2" />
                            {step.duration}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-lg text-muted-foreground mb-6 font-medium">{step.description}</p>
                      <ul className="space-y-3">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-1 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual Card */}
                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <Card className="relative p-8 border-2 border-primary-glow/40 hover:border-primary-glow/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                        {/* Decorative corner elements */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary-glow/30" />
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary-glow/30" />
                        
                        <div className="text-center relative z-10">
                          <div 
                            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-hologram"
                            style={{ backgroundColor: step.color }}
                          >
                            <Icon className="h-12 w-12 text-white" />
                          </div>
                          <h4 className="text-xl font-bold mb-3 font-mono">{step.title}</h4>
                          <p className="text-muted-foreground text-sm">{step.description}</p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3498DB]/5 to-[#2ECC71]/5" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            Why Our <span className="text-[#3498DB]">Process Works</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="relative text-center p-8 border-2 border-[#3498DB]/40 hover:border-[#3498DB]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
              <Users className="h-16 w-16 text-[#3498DB] mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Personal Attention</h3>
              <p className="text-muted-foreground">
                Every client gets dedicated attention from our expert team, not automated responses.
              </p>
            </Card>

            <Card className="relative text-center p-8 border-2 border-[#2ECC71]/40 hover:border-[#2ECC71]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
              <Target className="h-16 w-16 text-[#2ECC71] mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Results-Focused</h3>
              <p className="text-muted-foreground">
                We optimize every step for maximum impact on your business goals and conversions.
              </p>
            </Card>

            <Card className="relative text-center p-8 border-2 border-[#9B59B6]/40 hover:border-[#9B59B6]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
              <Zap className="h-16 w-16 text-[#9B59B6] mx-auto mb-6" />
              <h3 className="text-xl font-bold mb-4">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Our streamlined process delivers professional results in a fraction of typical timeframes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-15" />
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            Common <span className="text-[#3498DB]">Questions</span> About Our Process
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6 border-2 border-primary-glow/30 bg-white/95 backdrop-blur-sm shadow-neural hover:shadow-cyber transition-all duration-300">
              <h3 className="text-lg font-bold mb-3 text-[#3498DB]">What if I need revisions?</h3>
              <p className="text-muted-foreground">
                We include revision rounds in all packages. Most clients are thrilled with the first draft, 
                but we're happy to make adjustments to ensure 100% satisfaction.
              </p>
            </Card>

            <Card className="p-6 border-2 border-primary-glow/30 bg-white/95 backdrop-blur-sm shadow-neural hover:shadow-cyber transition-all duration-300">
              <h3 className="text-lg font-bold mb-3 text-[#2ECC71]">How do you ensure the content matches my brand?</h3>
              <p className="text-muted-foreground">
                During our discovery call, we deep-dive into your brand voice, style, and preferences. 
                We also review your existing content to ensure perfect consistency.
              </p>
            </Card>

            <Card className="p-6 border-2 border-primary-glow/30 bg-white/95 backdrop-blur-sm shadow-neural hover:shadow-cyber transition-all duration-300">
              <h3 className="text-lg font-bold mb-3 text-[#9B59B6]">What if I'm not satisfied with the final content?</h3>
              <p className="text-muted-foreground">
                We offer a 100% money-back guarantee. If you're not completely satisfied after revisions, 
                we'll provide a full refund. Your success is our top priority.
              </p>
            </Card>

            <Card className="p-6 border-2 border-primary-glow/30 bg-white/95 backdrop-blur-sm shadow-neural hover:shadow-cyber transition-all duration-300">
              <h3 className="text-lg font-bold mb-3 text-[#E67E22]">Can you handle urgent requests?</h3>
              <p className="text-muted-foreground">
                Yes! Our standard turnaround is 24-48 hours, but we can accommodate rush orders for urgent needs. 
                Contact us to discuss expedited delivery options.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 overflow-hidden">
        {/* AI Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3498DB] to-[#2ECC71] opacity-90" />
        <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-20" />
        
        {/* Scanning lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 h-px w-full bg-white/30 animate-scan-line" />
          <div className="absolute bottom-0 h-px w-full bg-white/20 animate-scan-line" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white/20 rotate-45 animate-float" />
        <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-white/15 rotate-12 animate-float" style={{ animationDelay: '3s' }} />
        
        <div className="container mx-auto px-4 text-center text-white relative z-10">
          <div className="flex items-center justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 text-[#F39C12] fill-current mx-1" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of satisfied clients who've transformed their content marketing with our proven process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#pricing">
              <Button size="lg" variant="secondary" className="bg-white text-[#3498DB] hover:bg-white/90 px-8 py-4 font-semibold shadow-cyber hover:shadow-hologram transition-all duration-300">
                Get Free Consultation
              </Button>
            </Link>
            <Link to="/why-choose-us">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 font-semibold hover:shadow-neural transition-all duration-300">
                Why Choose Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingProcess;