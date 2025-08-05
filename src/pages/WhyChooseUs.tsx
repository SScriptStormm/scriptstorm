import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Award, Shield, Users, Target } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
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
        <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Why Choose <span className="text-[#3498DB]">ScriptStorm</span>?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            While others offer tools that require your time and expertise, we deliver 
            professional content that drives results—without any effort on your part.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Comparison Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Done-For-You vs DIY Tools</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* DIY Tools */}
              <Card className="border-2 border-red-200 bg-red-50/50">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-red-600">❌ DIY Tools (Jasper, Copy.ai, etc.)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-sm">Requires hours of prompting and editing</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-sm">Generic, robotic-sounding content</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-sm">No SEO strategy or keyword research</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-sm">Monthly subscription costs add up</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-sm">Steep learning curve to get good results</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-sm">No guarantees on quality or results</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ScriptStorm */}
              <Card className="border-2 border-[#2ECC71] bg-[#2ECC71]/5">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-[#2ECC71]">✅ ScriptStorm Done-For-You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-sm">Professional content delivered in 24 hours</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#2ECC71] mt-0.5" />
                      <span className="text-sm">Human-written, engaging, conversion-focused</span>
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
            <h2 className="text-3xl font-bold text-center mb-12">Our Key Advantages</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center p-6 border-2 border-[#3498DB]/30 hover:border-[#3498DB]/60 transition-all duration-300">
                <Clock className="h-12 w-12 text-[#3498DB] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Lightning Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Get professional content in 24 hours, not 24 days. We understand that time is money in business.
                </p>
              </Card>

              <Card className="text-center p-6 border-2 border-[#2ECC71]/30 hover:border-[#2ECC71]/60 transition-all duration-300">
                <Award className="h-12 w-12 text-[#2ECC71] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Expert Team</h3>
                <p className="text-muted-foreground">
                  Our writers specialize in SaaS and eCommerce content, with proven track records of driving conversions.
                </p>
              </Card>

              <Card className="text-center p-6 border-2 border-[#9B59B6]/30 hover:border-[#9B59B6]/60 transition-all duration-300">
                <Shield className="h-12 w-12 text-[#9B59B6] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Risk-Free Guarantee</h3>
                <p className="text-muted-foreground">
                  Not satisfied? We'll revise until you're happy or provide a full refund. Your success is our priority.
                </p>
              </Card>

              <Card className="text-center p-6 border-2 border-[#E67E22]/30 hover:border-[#E67E22]/60 transition-all duration-300">
                <Users className="h-12 w-12 text-[#E67E22] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Direct access to your content manager. No chatbots, no tickets—just real human support when you need it.
                </p>
              </Card>

              <Card className="text-center p-6 border-2 border-[#E74C3C]/30 hover:border-[#E74C3C]/60 transition-all duration-300">
                <Target className="h-12 w-12 text-[#E74C3C] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Results-Driven</h3>
                <p className="text-muted-foreground">
                  Every piece is crafted to drive traffic, engage readers, and convert visitors into customers.
                </p>
              </Card>

              <Card className="text-center p-6 border-2 border-[#3498DB]/30 hover:border-[#3498DB]/60 transition-all duration-300">
                <CheckCircle className="h-12 w-12 text-[#3498DB] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Complete SEO Package</h3>
                <p className="text-muted-foreground">
                  Keyword research, meta tags, headers, internal linking—everything needed for search engine success.
                </p>
              </Card>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mb-20">
            <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-[#3498DB]/10 to-[#2ECC71]/10 border-2 border-[#3498DB]/30">
              <blockquote className="text-xl italic text-center mb-6">
                "We tried Jasper and Copy.ai for months, spending hours editing generic content. 
                ScriptStorm delivered better results in 24 hours than we achieved in 6 months of DIY attempts. 
                It's not even close."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-muted-foreground">Marketing Director, TechFlow SaaS</p>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to See the Difference?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stop wasting time with DIY tools. Get professional content that actually converts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#pricing">
                <Button size="lg" className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-8 py-4">
                  Get Free Consultation
                </Button>
              </Link>
              <Link to="/onboarding-process">
                <Button variant="outline" size="lg" className="px-8 py-4 border-[#3498DB]/50 hover:border-[#3498DB]">
                  Learn Our Process
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;