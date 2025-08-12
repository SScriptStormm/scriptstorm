
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Crown, Mail, Phone, Calendar } from "lucide-react";
import ContactForm from "./ContactForm";

const Pricing = () => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedEnterprise, setSelectedEnterprise] = useState<'starter' | 'growth' | 'authority' | null>('growth');
  const [expandedTier, setExpandedTier] = useState<'starter' | 'growth' | 'authority' | null>(null);
  const [showStarterDetails, setShowStarterDetails] = useState(false);
  const [showGrowthDetails, setShowGrowthDetails] = useState(false);
  const [showEnterpriseComparison, setShowEnterpriseComparison] = useState(false);

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
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Starter Package */}
          <Card className="relative shadow-neural border-2 border-[#3498DB]/40 hover:border-[#3498DB]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 hover:shadow-cyber">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold mb-2">
                🚀 Starter Package
              </CardTitle>
              <div className="text-3xl font-bold text-foreground mb-2">$297<span className="text-lg text-muted-foreground">/month</span></div>
              <CardDescription className="text-base">Perfect for small businesses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStarterDetails((v) => !v)}
                >
                  {showStarterDetails ? 'Hide details' : 'View details'}
                </Button>
                {showStarterDetails && (
                  <div className="mt-2 space-y-2 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">5 AI-generated SEO articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">Keyword research included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">48-hour delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">1 revision round</span>
                    </div>
                  </div>
                )}
              </div>
              <Button 
                onClick={handleContactClick}
                className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white font-semibold"
              >
                Get Custom Quote
              </Button>
              <p className="mt-2 text-xs text-muted-foreground italic">Friction-free workflow: All communication happens over email so you can focus on growth—no meetings, no delays.</p>
            </CardContent>
          </Card>

          {/* Growth Package - Most Popular */}
          <Card className="relative shadow-hologram border-2 border-[#2ECC71]/50 hover:border-[#2ECC71]/80 bg-white/95 backdrop-blur-sm transition-all duration-500 hover:shadow-cyber overflow-visible">
            {/* Most Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-[#2ECC71] text-white px-6 py-3 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg border-2 border-white/20">
                <Crown className="h-4 w-4" />
                Most Popular
              </div>
            </div>

            <CardHeader className="text-center pt-12">
              <CardTitle className="text-xl font-bold mb-2">
                🔥 Growth Package
              </CardTitle>
              <div className="text-3xl font-bold text-foreground mb-2">$597<span className="text-lg text-muted-foreground">/month</span></div>
              <CardDescription className="text-base">Best value for growing companies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGrowthDetails((v) => !v)}
                >
                  {showGrowthDetails ? 'Hide details' : 'View details'}
                </Button>
                {showGrowthDetails && (
                  <div className="mt-2 space-y-2 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">10 AI-generated SEO articles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">Advanced keyword research</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">24-hour delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">2 revision rounds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#2ECC71]" />
                      <span className="text-sm">Content calendar included</span>
                    </div>
                  </div>
                )}
              </div>
              <Button 
                onClick={handleContactClick}
                className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-white font-semibold"
              >
                Get Custom Quote
              </Button>
              <p className="mt-2 text-xs text-muted-foreground italic">Friction-free workflow: All communication happens over email so you can focus on growth—no meetings, no delays.</p>
            </CardContent>
          </Card>

          {/* Enterprise Packages */}
          <Card className="relative shadow-neural border-2 border-[#9B59B6]/40 hover:border-[#9B59B6]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 hover:shadow-cyber">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold mb-2">
                ⚡ Enterprise Packages
              </CardTitle>
              <CardDescription className="text-base">For large-scale content needs</CardDescription>
              <p className="mt-2 text-xs text-muted-foreground italic">Friction-free workflow: All communication happens over email so you can focus on growth—no meetings, no delays.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {/* Starter Enterprise */}
                <div
                  role="radio"
                  aria-checked={selectedEnterprise === 'starter'}
                  tabIndex={0}
                  onClick={() => { setSelectedEnterprise('starter'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedEnterprise('starter'); } }}
                  className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedEnterprise === 'starter' ? 'ring-2 ring-primary bg-primary/5 shadow-cyber animate-enter border-primary/40' : 'border-muted-foreground/20 hover-scale'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">Starter Enterprise — 20 articles</span>
                    <span className="text-lg font-bold text-primary">$1,297/month</span>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setExpandedTier(expandedTier === 'starter' ? null : 'starter'); }}>
                      {expandedTier === 'starter' ? 'Hide details' : 'View details'}
                    </Button>
                  </div>
                  {expandedTier === 'starter' && (
                    <div className="mt-3 text-xs text-muted-foreground space-y-2 animate-fade-in">
                      <div><strong>For:</strong> Startups needing SEO content at scale</div>
                      <div className="mt-1 font-semibold">Includes:</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>20 x <strong>high-quality AI articles</strong> (2,000+ words)</li>
                        <li><strong>SaaS-optimized structures</strong> (how-to’s, comparisons, guides)</li>
                        <li><strong>3 strategic keyword clusters</strong></li>
                        <li><strong>48-hour standard delivery</strong></li>
                        <li><strong>1 revision round per article</strong></li>
                        <li>✉️ <strong>Email-only workflow</strong></li>
                        <li className="text-[#E67E22] font-medium">✸ Limited capacity (max 10 clients/month)</li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Growth Tier */}
                <div
                  role="radio"
                  aria-checked={selectedEnterprise === 'growth'}
                  tabIndex={0}
                  onClick={() => { setSelectedEnterprise('growth'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedEnterprise('growth'); } }}
                  className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedEnterprise === 'growth' ? 'ring-2 ring-primary bg-primary/5 shadow-cyber animate-enter border-primary/40' : 'border-muted-foreground/20 hover-scale'} bg-muted/30`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">Growth Tier — 30 articles <span className="ml-2 text-[#2ECC71] font-bold">⭐ BEST VALUE</span></span>
                    <span className="text-lg font-bold text-primary">$1,797/month</span>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setExpandedTier(expandedTier === 'growth' ? null : 'growth'); }}>
                      {expandedTier === 'growth' ? 'Hide details' : 'View details'}
                    </Button>
                  </div>
                  {expandedTier === 'growth' && (
                    <div className="mt-3 text-xs text-muted-foreground space-y-2 animate-fade-in">
                      <div><strong>For:</strong> Scaling SaaS/eCommerce brands</div>
                      <div className="mt-1 font-semibold">Includes everything in Starter, PLUS:</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>10 extra AI articles</strong> (30 total → $59.90/article)</li>
                        <li><strong>24-hour priority delivery</strong></li>
                        <li><strong>Competitor content analysis</strong> (identify gaps)</li>
                        <li><strong>2 revision rounds per article</strong></li>
                        <li className="text-[#2ECC71] font-medium">✸ <strong>Free</strong> $297 social media add-on (limited-time)</li>
                        <li>✉️ <strong>Email-only workflow</strong></li>
                      </ul>
                    </div>
                  )}
                </div>

                {/* Authority Tier */}
                <div
                  role="radio"
                  aria-checked={selectedEnterprise === 'authority'}
                  tabIndex={0}
                  onClick={() => { setSelectedEnterprise('authority'); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedEnterprise('authority'); } }}
                  className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedEnterprise === 'authority' ? 'ring-2 ring-primary bg-primary/5 shadow-cyber animate-enter border-primary/40' : 'border-muted-foreground/20 hover-scale'} bg-muted/20`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">Authority Tier — 50 articles</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">$2,997/month</span>
                      <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 text-primary px-2.5 py-0.5 text-[11px] font-medium tracking-wide">Early adopter pricing</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setExpandedTier(expandedTier === 'authority' ? null : 'authority'); }}>
                      {expandedTier === 'authority' ? 'Hide details' : 'View details'}
                    </Button>
                  </div>
                  {expandedTier === 'authority' && (
                    <div className="mt-3 text-xs text-muted-foreground space-y-2 animate-fade-in">
                      <div><strong>For:</strong> Established brands dominating search</div>
                      <div className="mt-1 font-semibold">Includes everything in Growth Tier, PLUS:</div>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>20 extra AI articles</strong> (50 total → $59.94/article)</li>
                        <li><strong>12-hour rush delivery</strong> (for urgent needs)</li>
                        <li><strong>Unlimited revisions</strong></li>
                        <li><strong>Dedicated strategist</strong> (email support)</li>
                        <li><strong>Monthly performance report</strong> (traffic/ranking insights)</li>
                        <li>✉️ <strong>Email-only workflow</strong></li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Comparison (Enterprise) */}
              <div className="mt-2 flex justify-end">
                <Button variant="outline" size="sm" onClick={() => setShowEnterpriseComparison((v) => !v)}>
                  {showEnterpriseComparison ? 'Hide comparison' : 'View comparison'}
                </Button>
              </div>
              {showEnterpriseComparison && (
                <div className="mt-2">
                  <h5 className="text-sm font-semibold mb-2">Quick Comparison</h5>
                  <div role="table" className="grid grid-cols-4 gap-3 text-xs">
                    <div className="font-semibold">Feature</div>
                    <div className="font-semibold">20 Articles</div>
                    <div className="font-semibold">30 Articles</div>
                    <div className="font-semibold">50 Articles</div>

                    <div className="border-t pt-2 text-muted-foreground">Speed</div>
                    <div className="border-t pt-2">48-hour</div>
                    <div className="border-t pt-2">24-hour</div>
                    <div className="border-t pt-2">12-hour</div>

                    <div className="border-t pt-2 text-muted-foreground">Revisions</div>
                    <div className="border-t pt-2">1</div>
                    <div className="border-t pt-2">2</div>
                    <div className="border-t pt-2">Unlimited</div>

                    <div className="border-t pt-2 text-muted-foreground">Support</div>
                    <div className="border-t pt-2">✉️ Email</div>
                    <div className="border-t pt-2">✉️ Email + Gap Analysis</div>
                    <div className="border-t pt-2">✉️ VIP Email + Analytics</div>
                  </div>
                </div>
              )}

              <div className="pt-2 space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-[#2ECC71]" />
                  <span>Dedicated content manager</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-[#2ECC71]" />
                  <span>Performance reporting</span>
                </div>
              </div>
              
              <Button 
                onClick={handleContactClick}
                className="w-full bg-[#9B59B6] hover:bg-[#8E44AD] text-white font-semibold"
              >
                Get Custom Quote
              </Button>
              <p className="mt-2 text-xs text-muted-foreground italic">Friction-free workflow: All communication happens over email so you can focus on growth—no meetings, no delays.</p>
            </CardContent>

          </Card>
        </div>


        {/* Additional Services */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Additional Services
            </h3>
            <p className="text-muted-foreground">Extend your content marketing with these specialized AI services</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-2 border-[#E67E22]/40 hover:border-[#E67E22]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
              <div className="text-center">
                <h4 className="text-lg font-bold mb-2 text-[#E67E22]">AI Social Media Package</h4>
                <p className="text-2xl font-bold mb-2">$297<span className="text-sm text-muted-foreground">/month</span></p>
                <p className="text-sm text-muted-foreground mb-4">30 AI posts • Captions • Hashtags</p>
                <Button 
                  onClick={handleContactClick}
                  className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white"
                >
                  Get Quote
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 border-2 border-[#E74C3C]/40 hover:border-[#E74C3C]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
              <div className="text-center">
                <h4 className="text-lg font-bold mb-2 text-[#E74C3C]">AI Product Descriptions</h4>
                <p className="text-2xl font-bold mb-2">$5<span className="text-sm text-muted-foreground">/each</span></p>
                <p className="text-sm text-muted-foreground mb-4">SEO-optimized • Converting copy</p>
                <Button 
                  onClick={handleContactClick}
                  className="w-full bg-[#E74C3C] hover:bg-[#C0392B] text-white"
                >
                  Get Quote
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Contact Options */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold mb-8 text-foreground">Ready to Get Started?</h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button 
              onClick={handleContactClick}
              className="flex items-center gap-2 bg-[#3498DB] hover:bg-[#2980B9] text-white px-6 py-3 text-lg"
              size="lg"
            >
              <Mail className="h-5 w-5" />
              Get Free Consultation
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
                  <span>On-Time Delivery</span>
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
