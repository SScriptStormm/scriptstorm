import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Share2, Mail, Zap, Target, Shield } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "SEO Blog Articles",
      description: "Long-form, keyword-optimized content designed to rank on Google and drive targeted organic traffic.",
      features: [
        "Tiered Word Counts (as shown above)",
        "Strategic Keyword Research & Mapping",
        "Meta Tags & SEO Headers",
        "Internal Linking Strategy"
      ]
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Social Media Content",
      description: "Engaging, platform-specific posts that build your community and drive traffic back to your site.",
      features: [
        "Platform-Optimized Copy (LinkedIn, Twitter, Instagram)",
        "Hashtag Research",
        "Visual Content Ideas",
        "Built-in Engagement Hooks"
      ]
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Product Descriptions",
      description: "Compelling, conversion-focused copy that highlights benefits and drives sales.",
      features: [
        "Keyword-Optimized & Scannable",
        "Benefit-Focused Messaging",
        "Multiple Length Variations",
        "Strict Brand Voice Consistency"
      ]
    }
  ];

  const guarantees = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "24-Hour Orchestrated Delivery",
      description: "Get market-ready content delivered on a relentless production cycle. (*12-hour for Dominance*)"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "SEO-Optimized to Dominate",
      description: "Every piece is backed by advanced research and crafted to win search rankings."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Money-Back Guarantee",
      description: "We're confident you'll love our work. Not satisfied? Get a full refund."
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-white/95 to-muted/50 overflow-hidden">
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
      <div className="absolute top-60 right-40 w-8 h-8 border border-primary-glow/20 rotate-90 animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-60 right-10 w-14 h-14 border border-primary-glow/25 rotate-12 animate-float" style={{ animationDelay: '3s' }} />
      
      {/* Multiple scanning line effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-40" />
        <div className="absolute bottom-0 h-px w-full bg-gradient-cyber animate-scan-line opacity-30" style={{ animationDelay: '2s' }} />
        <div className="absolute left-0 w-px h-full bg-gradient-neural animate-scan-line opacity-25" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Particle effect overlay */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-40" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-35" style={{ animationDelay: '5s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Services Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-mono tracking-wide">
            Content That <span className="text-primary">Converts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            AI-powered content generation delivered through our orchestrated automation workflow—no tools to learn, no hassle, just results.
          </p>
        </div>

        {/* Strategic Content Scaling Section */}
        <div className="mb-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold mb-4 text-foreground font-mono tracking-wide">
              Strategic Content Scaling
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We deliver content engineered for impact, not just word count. Our tiered system ensures every piece is perfectly scoped for its purpose, from driving traffic to dominating your niche.
            </p>
          </div>

          {/* Pricing Table */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-lg blur-lg group-hover:opacity-20 transition-all duration-500" />
            <div className="relative overflow-x-auto bg-white/95 backdrop-blur-sm rounded-lg border-2 border-primary-glow/40 shadow-neural">
              <table className="w-full">
                <thead className="bg-gradient-cyber border-b-2 border-primary-glow/40">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground font-mono">Package Tier</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground font-mono">SEO Article Word Count</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground font-mono">Ideal For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-glow/20">
                  <tr className="hover:bg-primary-glow/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">🚀 Starter & Growth</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">1,500 - 2,000 words</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Building a consistent traffic foundation with high-quality, standard SEO articles.</td>
                  </tr>
                  <tr className="hover:bg-primary-glow/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">🔥 Scale & Authority</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">2,000 - 3,000 words</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Establishing authority with comprehensive, pillar content that crushes competitors.</td>
                  </tr>
                  <tr className="hover:bg-primary-glow/5 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">💎 Dominance</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">2,000 - 5,000+ words</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">Total market leadership with in-depth, cornerstone assets and reports.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Our Core Content Services Header */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-2 text-foreground font-mono tracking-wide">
            Our Core Content Services
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="relative group">
              {/* Holographic background */}
              <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-lg blur-lg group-hover:opacity-20 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-neural opacity-5 rounded-lg animate-neural-pulse" />
              
              <Card className="relative shadow-neural hover:shadow-hologram transition-all duration-500 border-2 border-primary-glow/40 hover:border-primary-glow/80 bg-white/95 backdrop-blur-sm group-hover:bg-white">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4 p-4 bg-gradient-cyber rounded-full w-fit shadow-cyber group-hover:shadow-hologram transition-all duration-500">
                    <div className="absolute inset-0 bg-primary-glow/30 rounded-full animate-pulse-glow" />
                    <div className="relative">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold font-mono tracking-wide text-foreground group-hover:text-primary transition-all duration-500">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-all duration-300">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-all duration-300">
                        <div className="h-2 w-2 bg-primary-glow rounded-full animate-pulse-glow shadow-cyber" />
                        <span className="font-mono tracking-wide">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Guarantees */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-neural opacity-20 rounded-lg blur-lg" />
            <h3 className="relative text-3xl font-bold mb-2 text-foreground font-mono tracking-wide">Our Promise to You</h3>
          </div>
          <p className="text-muted-foreground">Built for Results: The Modern Content Solution.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="relative text-center group">
              {/* Holographic background for guarantees */}
              <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-lg blur-lg group-hover:opacity-20 transition-all duration-500" />
              
              <div className="relative p-6 bg-white/95 backdrop-blur-sm rounded-lg border-2 border-primary-glow/40 hover:border-primary-glow/80 shadow-neural hover:shadow-hologram transition-all duration-500">
                <div className="relative mx-auto mb-4 p-4 bg-gradient-neural rounded-full w-fit shadow-cyber group-hover:shadow-hologram transition-all duration-500">
                  <div className="absolute inset-0 bg-primary-glow/30 rounded-full animate-pulse-glow" />
                  <div className="relative">
                    {guarantee.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2 font-mono tracking-wide text-foreground group-hover:text-primary transition-all duration-500">{guarantee.title}</h4>
                <p className="text-muted-foreground group-hover:text-foreground/80 transition-all duration-300">{guarantee.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;