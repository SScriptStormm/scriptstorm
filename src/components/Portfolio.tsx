import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Eye, TrendingUp, Calendar, Target } from "lucide-react";

const Portfolio = () => {
  const portfolioItems = [
    {
      title: "SaaS Landing Page Optimization",
      category: "Blog Content",
      client: "TechFlow AI",
      industry: "SaaS",
      results: "+287% organic traffic",
      description: "Complete content overhaul for AI automation platform, focusing on conversion-driven blog posts and landing page copy.",
      metrics: [
        { label: "Organic Traffic", value: "+287%", icon: <TrendingUp className="h-4 w-4" /> },
        { label: "Time on Page", value: "+156%", icon: <Eye className="h-4 w-4" /> },
        { label: "Conversion Rate", value: "+94%", icon: <Target className="h-4 w-4" /> }
      ],
      tags: ["SEO Blog", "Landing Pages", "SaaS"],
      deliveryTime: "48 hours"
    },
    {
      title: "E-commerce Product Launch",
      category: "Email Campaign",
      client: "EcoStyle Store",
      industry: "E-commerce",
      results: "$127k in sales",
      description: "Multi-channel product launch campaign including email sequences, social media content, and product descriptions.",
      metrics: [
        { label: "Revenue Generated", value: "$127k", icon: <TrendingUp className="h-4 w-4" /> },
        { label: "Email Open Rate", value: "34.2%", icon: <Eye className="h-4 w-4" /> },
        { label: "Click-Through Rate", value: "8.7%", icon: <Target className="h-4 w-4" /> }
      ],
      tags: ["Email Marketing", "Product Launch", "E-commerce"],
      deliveryTime: "24 hours"
    },
    {
      title: "FinTech Authority Building",
      category: "Content Series",
      client: "InvestSmart Pro",
      industry: "FinTech",
      results: "+450% social engagement",
      description: "Thought leadership content series positioning the client as an industry expert through LinkedIn articles and whitepapers.",
      metrics: [
        { label: "Social Engagement", value: "+450%", icon: <TrendingUp className="h-4 w-4" /> },
        { label: "Lead Generation", value: "+203%", icon: <Eye className="h-4 w-4" /> },
        { label: "Brand Mentions", value: "+312%", icon: <Target className="h-4 w-4" /> }
      ],
      tags: ["LinkedIn Content", "Thought Leadership", "FinTech"],
      deliveryTime: "72 hours"
    }
  ];

  const whyChooseUs = [
    {
      title: "Industry Expertise",
      description: "Specialized knowledge in SaaS and E-commerce content that converts visitors into customers.",
      icon: "🎯"
    },
    {
      title: "Fast Turnaround", 
      description: "Professional-quality content delivered in 24-72 hours, not weeks.",
      icon: "⚡"
    },
    {
      title: "SEO-First Approach",
      description: "Every piece is optimized for search engines using proven SEO strategies and tools.",
      icon: "📈"
    },
    {
      title: "Satisfaction Guarantee",
      description: "Unlimited revisions until you're completely happy with the results.",
      icon: "✅"
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-muted/30 via-background to-muted/50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-15" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-glow) / 0.1) 1px, transparent 0)`,
        backgroundSize: '80px 80px'
      }} />
      
      {/* Floating elements */}
      <div className="absolute top-32 left-16 w-20 h-20 border-2 border-primary-glow/25 rotate-45 animate-float shadow-cyber" />
      <div className="absolute bottom-32 right-16 w-16 h-16 border-2 border-primary-glow/20 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '3s' }} />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Portfolio Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-1 rounded-full bg-gradient-primary mb-6 shadow-glow">
            <div className="bg-background rounded-full px-6 py-2">
              <span className="text-sm font-medium text-primary">Our Approach</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-mono tracking-wide">
            Why Choose <span className="text-primary">Our Service</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Professional content creation designed specifically for SaaS and E-commerce businesses 
            that need to scale their marketing efforts.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {portfolioItems.map((item, index) => (
            <div key={index} className="relative group">
              {/* Holographic background */}
              <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-2xl blur-lg group-hover:opacity-20 transition-all duration-500" />
              
              <Card className="relative shadow-neural hover:shadow-hologram transition-all duration-500 border-2 border-primary-glow/40 hover:border-primary-glow/80 bg-white/95 backdrop-blur-sm group-hover:bg-white h-full">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {item.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {item.deliveryTime}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold font-mono tracking-wide text-foreground group-hover:text-primary transition-all duration-500">
                    {item.title}
                  </CardTitle>
                  
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </CardDescription>
                  
                  <div className="flex items-center gap-2 mt-4">
                    <Badge variant="outline" className="text-xs">{item.client}</Badge>
                    <Badge variant="outline" className="text-xs">{item.industry}</Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Key Result */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-700 font-bold">
                      <TrendingUp className="h-4 w-4" />
                      {item.results}
                    </div>
                  </div>
                  
                  {/* Metrics */}
                  <div className="space-y-2">
                    {item.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-muted last:border-0">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {metric.icon}
                          {metric.label}
                        </div>
                        <span className="font-semibold text-primary">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground font-mono tracking-wide">
              Why Choose Our Service
            </h3>
            <p className="text-muted-foreground">The benefits of working with content experts who understand your industry</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((benefit, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-neural opacity-10 rounded-xl blur-lg group-hover:opacity-20 transition-all duration-500" />
                
                <Card className="relative p-6 bg-white/95 backdrop-blur-sm border-2 border-primary-glow/40 hover:border-primary-glow/80 shadow-neural hover:shadow-hologram transition-all duration-500 text-center h-full">
                  <CardContent className="p-0">
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h4 className="font-bold text-foreground mb-3 text-lg">{benefit.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 shadow-glow inline-block">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ready to See Similar Results?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Join hundreds of successful businesses who trust us with their content marketing.
              </p>
              <Button 
                className="bg-primary hover:bg-primary-dark text-background font-bold px-8 py-3"
                size="lg"
                onClick={() => window.open('mailto:hello@aicontentag.com?subject=Free Consultation Request&body=Hi, I\'d like to schedule a free consultation to discuss my content needs and see how you can help my business.', '_blank')}
              >
                📧 Email for Free Consultation
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;