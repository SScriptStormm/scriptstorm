
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Award, Shield, Users, Target, Zap, Star } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
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
              <Link to="/why-choose-us" className="text-primary font-medium">
                Why Choose Us
              </Link>
              <Link to="/onboarding-process" className="text-muted-foreground hover:text-primary transition-colors">
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
        
        {/* Scanning line effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-30" />
          <div className="absolute bottom-0 h-px w-full bg-gradient-cyber animate-scan-line opacity-25" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground font-mono tracking-wide">
            Why Choose <span className="text-primary">ScriptStorm</span>?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            While others offer tools that require your time and expertise, we deliver 
            professional AI-generated content that drives results—without any effort on your part.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-15" />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-25" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Comparison Section */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
              Done-For-You vs <span className="text-[#E74C3C]">DIY Tools</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* The Old Way */}
              <Card className="border-2 border-[#E74C3C]/40 bg-white/95 backdrop-blur-sm shadow-neural hover:shadow-cyber transition-all duration-500">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#E74C3C] font-mono">❌ The Old Way (Freelancers, Agencies, or In-House)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-[#E74C3C] mt-1">•</span>
                      <span className="text-sm"><strong>Slow:</strong> Weeks of back-and-forth revisions</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#E74C3C] mt-1">•</span>
                      <span className="text-sm"><strong>Expensive:</strong> $100-$500/article for quality</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#E74C3C] mt-1">•</span>
                      <span className="text-sm"><strong>Unpredictable:</strong> Varies by writer's skill</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#E74C3C] mt-1">•</span>
                      <span className="text-sm"><strong>Hard to Scale:</strong> Need to hire more writers = more $$$</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#E74C3C] mt-1">•</span>
                      <span className="text-sm">Endless project management and coordination</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#E74C3C] mt-1">•</span>
                      <span className="text-sm">No guarantees on delivery times or quality</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ScriptStorm */}
              <Card className="border-2 border-[#2ECC71]/50 bg-white/95 backdrop-blur-sm shadow-hologram hover:shadow-cyber transition-all duration-500">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#2ECC71] font-mono">✅ ScriptStorm Done-For-You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-sm">Professional AI content delivered in 24 hours</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-sm">AI-generated, engaging, conversion-focused</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-sm">Full SEO optimization and keyword research included</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-sm">Pay-per-project pricing, no ongoing costs</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-sm">Zero effort required from you</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-sm">100% satisfaction and money-back guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
              Our Key <span className="text-[#3498DB]">Advantages</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="relative text-center p-6 border-2 border-[#3498DB]/40 hover:border-[#3498DB]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Clock className="h-12 w-12 text-[#3498DB] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Lightning Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Get professional AI content in 24 hours, not 24 days. We understand that time is money in business.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#2ECC71]/40 hover:border-[#2ECC71]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Award className="h-12 w-12 text-[#2ECC71] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">AI Automation Expert</h3>
                <p className="text-muted-foreground">
                  Advanced AI automation systems specialized in SaaS and eCommerce content, with proven track records of driving conversions.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#9B59B6]/40 hover:border-[#9B59B6]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Shield className="h-12 w-12 text-[#9B59B6] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Risk-Free Guarantee</h3>
                <p className="text-muted-foreground">
                  Not satisfied? We'll revise until you're happy or provide a full refund. Your success is our priority.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#E67E22]/40 hover:border-[#E67E22]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Users className="h-12 w-12 text-[#E67E22] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Direct access to your content manager. No chatbots, no tickets—just real human support when you need it.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#E74C3C]/40 hover:border-[#E74C3C]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Target className="h-12 w-12 text-[#E74C3C] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Results-Driven</h3>
                <p className="text-muted-foreground">
                  Every AI-generated piece is crafted to drive traffic, engage readers, and convert visitors into customers.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#3498DB]/40 hover:border-[#3498DB]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Zap className="h-12 w-12 text-[#3498DB] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Complete SEO Package</h3>
                <p className="text-muted-foreground">
                  Keyword research, meta tags, headers, internal linking—everything needed for search engine success.
                </p>
              </Card>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mb-20">
            <Card className="relative max-w-4xl mx-auto p-8 bg-gradient-to-r from-[#3498DB]/10 to-[#2ECC71]/10 border-2 border-[#3498DB]/40 shadow-hologram">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-[#3498DB]/30 rotate-45" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#2ECC71]/30 rotate-45" />
              
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-[#F39C12] fill-current" />
                ))}
              </div>
              <blockquote className="text-xl italic text-center mb-6 font-medium">
                "ScriptStorm's approach to AI content automation represents the future of content marketing. 
                Their friction-free email workflow eliminates the typical delays and complexity of traditional content agencies."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-lg">Coming Soon</p>
                <p className="text-muted-foreground">Real client testimonials after launch</p>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center relative">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-3xl" />
            <div className="relative z-10 py-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">
                Ready to See the <span className="text-[#3498DB]">Difference</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stop wasting time with DIY tools. Get professional AI content that actually converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#pricing">
                  <Button size="lg" className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-8 py-4 shadow-cyber hover:shadow-hologram transition-all duration-300">
                    Get Free Consultation
                  </Button>
                </Link>
                <Link to="/onboarding-process">
                  <Button variant="outline" size="lg" className="px-8 py-4 border-[#3498DB]/50 hover:border-[#3498DB] hover:shadow-neural transition-all duration-300">
                    Learn Our Process
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
