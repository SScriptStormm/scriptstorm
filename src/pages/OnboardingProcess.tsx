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
  FileText,
  Target,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const OnboardingProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      duration: "15-30 minutes",
      icon: MessageSquare,
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
            <Link to="/" className="text-2xl font-bold text-primary">
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
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            How We Onboard <span className="text-[#3498DB]">New Clients</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A transparent, proven process that takes you from inquiry to published content in just 24 hours.
          </p>
          <Badge className="bg-[#2ECC71] text-white px-4 py-2 text-lg">
            <Clock className="h-4 w-4 mr-2" />
            24-Hour Turnaround Guaranteed
          </Badge>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative mb-16 last:mb-0">
                  {/* Timeline connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-px h-20 bg-gradient-to-b from-[#3498DB] to-[#2ECC71] hidden md:block" />
                  )}
                  
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Step Info */}
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#3498DB] to-[#2ECC71] rounded-full flex items-center justify-center">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="absolute -top-2 -right-2 bg-[#E67E22] text-white text-xs font-bold px-2 py-1 rounded-full">
                            {step.number}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                          <Badge variant="outline" className="mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {step.duration}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Visual Card */}
                    <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                      <Card className="p-8 border-2 border-[#3498DB]/30 hover:border-[#3498DB]/60 transition-all duration-300 bg-gradient-to-br from-white to-[#3498DB]/5">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#3498DB] to-[#2ECC71] rounded-full flex items-center justify-center mx-auto mb-4">
                            <Icon className="h-10 w-10 text-white" />
                          </div>
                          <h4 className="text-xl font-bold mb-2">{step.title}</h4>
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
      <section className="py-16 bg-gradient-to-r from-[#3498DB]/5 to-[#2ECC71]/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Our Process Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6">
              <Users className="h-12 w-12 text-[#3498DB] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Personal Attention</h3>
              <p className="text-muted-foreground">
                Every client gets dedicated attention from our expert team, not automated responses.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Target className="h-12 w-12 text-[#2ECC71] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Results-Focused</h3>
              <p className="text-muted-foreground">
                We optimize every step for maximum impact on your business goals and conversions.
              </p>
            </Card>

            <Card className="text-center p-6">
              <Zap className="h-12 w-12 text-[#9B59B6] mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Our streamlined process delivers professional results in a fraction of typical timeframes.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Common Questions About Our Process</h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">What if I need revisions?</h3>
              <p className="text-muted-foreground">
                We include revision rounds in all packages. Most clients are thrilled with the first draft, 
                but we're happy to make adjustments to ensure 100% satisfaction.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">How do you ensure the content matches my brand?</h3>
              <p className="text-muted-foreground">
                During our discovery call, we deep-dive into your brand voice, style, and preferences. 
                We also review your existing content to ensure perfect consistency.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">What if I'm not satisfied with the final content?</h3>
              <p className="text-muted-foreground">
                We offer a 100% money-back guarantee. If you're not completely satisfied after revisions, 
                we'll provide a full refund. Your success is our top priority.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold mb-2">Can you handle urgent requests?</h3>
              <p className="text-muted-foreground">
                Yes! Our standard turnaround is 24-48 hours, but we can accommodate rush orders for urgent needs. 
                Contact us to discuss expedited delivery options.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#3498DB] to-[#2ECC71] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of satisfied clients who've transformed their content marketing with our proven process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#pricing">
              <Button size="lg" variant="secondary" className="bg-white text-[#3498DB] hover:bg-white/90 px-8 py-4">
                Get Free Consultation
              </Button>
            </Link>
            <Link to="/why-choose-us">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4">
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