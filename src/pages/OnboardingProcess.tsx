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
      title: "Submit Content Brief (Instantly)",
      duration: "Instant",
      icon: MessageSquare,
      color: "#3498DB",
      description: "Submit your brief, and our system instantly:",
      details: [
        "Complete the brief form in your Client Dashboard",
        "Automated workflow triggers instantly upon submission",
        "24-hour countdown begins immediately"
      ]
    },
    {
      number: "02",
      title: "AI Research & Strategy",
      duration: "2-4 hours",
      icon: Search,
      color: "#2ECC71",
      description: "Our system autonomously:",
      details: [
        "Conducts data-driven keyword research",
        "Generates SEO-optimized content outlines",
        "Maps high-impact topics to your business goals"
      ]
    },
    {
      number: "03",
      title: "AI Content Creation",
      duration: "12-18 hours",
      icon: PenTool,
      color: "#9B59B6",
      description: "Industry-trained AI drafts:",
      details: [
        "Conversion-focused content tailored to your brand",
        "SEO-optimized structure with headers/keywords",
        "Multiple drafts to ensure quality foundations"
      ]
    },
    {
      number: "04",
      title: "AI Quality Control & Delivery",
      duration: "2-4 hours",
      icon: CheckCircle,
      color: "#E67E22",
      description: "Every piece undergoes:",
      details: [
        "Plagiarism and AI-detection screening",
        "SEO scoring and readability checks",
        "Instant delivery to your client dashboard"
      ]
    },
    {
      number: "05",
      title: "Dashboard & Support",
      duration: "Ongoing",
      icon: Rocket,
      color: "#E74C3C",
      description: "Your content, managed in one place:",
      details: [
        "Real-Time Tracking: See the status of every request in your dedicated client dashboard",
        "Streamlined Revisions: Submit revision requests directly through your dashboard for lightning-fast, AI-assisted tweaks",
        "Instant Access: Download all approved, ready-to-publish files with one click"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-primary-glow/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="text-xl md:text-2xl font-bold text-primary font-mono flex-shrink-0">
              ScriptStorm
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-6 text-xs sm:text-sm md:text-base flex-wrap justify-end">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                Home
              </Link>
              <Link to="/why-choose-us" className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap">
                Why Choose Us
              </Link>
              <Link to="/onboarding-process" className="text-primary font-medium whitespace-nowrap">
                Our Process
              </Link>
              <a 
                href="/#pricing"
                className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
              >
                Pricing
              </a>
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
            🚀 How Our <span className="text-primary">AI Process</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A fully automated system delivering publish-ready content in 24 hours—powered by enterprise-grade AI.
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
        {/* Dotted crosshatch background */}
        <div className="absolute left-1/2 -translate-x-1/2 w-screen top-0 bottom-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--primary-glow)/0.03)_2px,hsl(var(--primary-glow)/0.03)_4px)] pointer-events-none" />
        <div className="absolute left-1/2 -translate-x-1/2 w-screen top-0 bottom-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,hsl(var(--primary-glow)/0.03)_2px,hsl(var(--primary-glow)/0.03)_4px)] pointer-events-none" />
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
                      <Card className="relative p-8 border-2 bg-gradient-to-br from-black/5 via-primary/5 to-black/10 backdrop-blur-md transition-all duration-500 overflow-hidden" style={{ borderColor: `${step.color}99`, boxShadow: `0 0 50px -10px ${step.color}80, inset 0 0 30px -10px ${step.color}1a` }}>
                        {/* Animated circuit lines */}
                        <div className="absolute top-0 left-0 w-full h-1 opacity-50 animate-pulse" style={{ backgroundImage: `linear-gradient(to right, transparent, ${step.color}, transparent)` }} />
                        <div className="absolute bottom-0 left-0 w-full h-1 opacity-50 animate-pulse" style={{ backgroundImage: `linear-gradient(to right, transparent, ${step.color}, transparent)`, animationDelay: '1s' }} />
                        {/* Corner accents */}
                        <div className="absolute top-0 left-0 w-14 h-14 border-t-2 border-l-2 opacity-60" style={{ borderColor: step.color }} />
                        <div className="absolute top-0 right-0 w-14 h-14 border-t-2 border-r-2 opacity-60" style={{ borderColor: step.color }} />
                        <div className="absolute bottom-0 left-0 w-14 h-14 border-b-2 border-l-2 opacity-60" style={{ borderColor: step.color }} />
                        <div className="absolute bottom-0 right-0 w-14 h-14 border-b-2 border-r-2 opacity-60" style={{ borderColor: step.color }} />
                        
                        <div className="text-center relative z-10">
                          <div 
                            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-hologram"
                            style={{ backgroundColor: step.color }}
                          >
                            <Icon className="h-12 w-12 text-white" style={{ filter: `drop-shadow(0 0 10px white)` }} />
                          </div>
                          <h4 className="text-xl font-bold mb-3 font-mono">{step.title}</h4>
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
            Why Our <span className="text-primary">AI Process</span> Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, color: "#3498DB", title: "AI-Powered Precision", desc: "Advanced AI algorithms ensure consistent, high-quality output without human error or delays." },
              { icon: Target, color: "#2ECC71", title: "Data-Driven Results", desc: "Real-time data research combined with AI optimization ensures maximum impact and up-to-date accuracy on your business goals and conversions." },
              { icon: Zap, color: "#9B59B6", title: "Lightning Fast AI", desc: "Fully automated AI process delivers professional results in a fraction of typical timeframes with zero delays." },
            ].map((item, idx) => {
              const BenefitIcon = item.icon;
              return (
                <Card key={idx} className="relative text-center p-8 border-2 bg-gradient-to-br from-black/5 via-primary/5 to-black/10 backdrop-blur-md transition-all duration-500 overflow-hidden" style={{ borderColor: `${item.color}99`, boxShadow: `0 0 50px -10px ${item.color}80, inset 0 0 30px -10px ${item.color}1a` }}>
                  {/* Circuit lines */}
                  <div className="absolute top-0 left-0 w-full h-1 opacity-50 animate-pulse" style={{ backgroundImage: `linear-gradient(to right, transparent, ${item.color}, transparent)` }} />
                  <div className="absolute bottom-0 left-0 w-full h-1 opacity-50 animate-pulse" style={{ backgroundImage: `linear-gradient(to right, transparent, ${item.color}, transparent)`, animationDelay: '1s' }} />
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 opacity-60" style={{ borderColor: item.color }} />
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 opacity-60" style={{ borderColor: item.color }} />
                  <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 opacity-60" style={{ borderColor: item.color }} />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 opacity-60" style={{ borderColor: item.color }} />
                  <div className="relative z-10">
                    <BenefitIcon className="h-16 w-16 mx-auto mb-6" style={{ color: item.color, filter: `drop-shadow(0 0 15px ${item.color}80)` }} />
                    <h3 className="text-xl font-bold mb-4 font-mono">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-15" />
        {/* Dotted crosshatch background */}
        <div className="absolute left-1/2 -translate-x-1/2 w-screen top-0 bottom-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--primary-glow)/0.03)_2px,hsl(var(--primary-glow)/0.03)_4px)] pointer-events-none" />
        <div className="absolute left-1/2 -translate-x-1/2 w-screen top-0 bottom-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,hsl(var(--primary-glow)/0.03)_2px,hsl(var(--primary-glow)/0.03)_4px)] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
            Common <span className="text-[#3498DB]">Questions</span> About Our AI Process
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { color: "#3498DB", q: "What if I need revisions?", a: "We offer AI-assisted revisions based on your plan: Starter (1 round), Growth (2 rounds), Scale (2 rounds), Authority (3 rounds), Dominance (unlimited, under our Fair Use policy). Simply submit your request through your client dashboard—our system will process and deliver the refined content within a few hours." },
              { color: "#2ECC71", q: "How does AI ensure the content matches my brand?", a: "During the initial brief submission, our AI analyzes your brand voice, style, and any existing content you provide in your dashboard. This allows it to generate new content that maintains perfect consistency with your established tone and guidelines." },
              { color: "#9B59B6", q: "What if I'm not satisfied with the AI-generated content?", a: "We offer a 100% satisfaction guarantee. If a piece of content doesn't meet your expectations after using your included revisions, we'll rewrite it or provide a prorated refund. We are confident in the quality our automated system delivers." },
              { color: "#E67E22", q: "Can your AI handle urgent requests?", a: "Our standard automated turnaround is a guaranteed 24 hours. For clients needing even faster delivery, our Dominance package includes a guaranteed 12-hour turnaround for all content." },
            ].map((item, idx) => (
              <Card key={idx} className="relative p-6 border-2 border-primary-glow/40 bg-gradient-to-br from-black/5 via-primary/5 to-black/10 backdrop-blur-md shadow-neural hover:shadow-cyber transition-all duration-300 overflow-hidden">
                {/* Circuit lines */}
                <div className="absolute top-0 left-0 w-full h-0.5 opacity-40 animate-pulse" style={{ backgroundImage: `linear-gradient(to right, transparent, ${item.color}, transparent)` }} />
                <div className="absolute bottom-0 left-0 w-full h-0.5 opacity-40 animate-pulse" style={{ backgroundImage: `linear-gradient(to right, transparent, ${item.color}, transparent)`, animationDelay: '1s' }} />
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 opacity-50" style={{ borderColor: item.color }} />
                <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 opacity-50" style={{ borderColor: item.color }} />
                <div className="relative z-10">
                  <h3 className="text-lg font-bold mb-3 font-mono" style={{ color: item.color, filter: `drop-shadow(0 0 10px ${item.color}60)` }}>{item.q}</h3>
                  <p className="text-muted-foreground">{item.a}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Light Background Effects matching hero */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-25" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-glow) / 0.1) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating geometric elements */}
        <div className="absolute top-10 left-10 w-16 h-16 border-2 border-primary-glow/25 rotate-45 animate-float shadow-cyber" />
        <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-primary-glow/20 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '3s' }} />
        
        {/* Scanning lines - both at top */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-30" />
          <div className="absolute top-2 h-px w-full bg-gradient-cyber animate-scan-line opacity-25" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-8 w-8 text-[#F39C12] fill-current mx-1" />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono text-foreground">Ready to Experience <span className="text-primary">AI Content</span>?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Join businesses transforming their content marketing with our fully automated AI process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#pricing">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 font-semibold shadow-cyber hover:shadow-hologram transition-all duration-300">
                Start your First Draft
              </Button>
            </Link>
            <Link to="/why-choose-us">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 px-8 py-4 font-semibold hover:shadow-neural transition-all duration-300">
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