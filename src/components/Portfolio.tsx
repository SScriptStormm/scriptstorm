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

  const testimonials = [
    {
      quote: "The content quality exceeded our expectations. Our organic traffic tripled within 3 months.",
      author: "Sarah Chen",
      position: "Marketing Director",
      company: "TechFlow AI",
      avatar: "SC"
    },
    {
      quote: "Fast delivery without compromising quality. Our product launch was a massive success.",
      author: "Mike Rodriguez",
      position: "E-commerce Manager", 
      company: "EcoStyle Store",
      avatar: "MR"
    },
    {
      quote: "Professional, strategic content that positioned us as industry leaders. Highly recommended.",
      author: "David Park",
      position: "CEO",
      company: "InvestSmart Pro", 
      avatar: "DP"
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
              <span className="text-sm font-medium text-primary">Success Stories</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground font-mono tracking-wide">
            Portfolio & <span className="text-primary">Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real results from real clients. See how our done-for-you content services 
            drive measurable business growth across industries.
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

        {/* Testimonials Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground font-mono tracking-wide">
              What Our Clients Say
            </h3>
            <p className="text-muted-foreground">Hear directly from business owners who've seen real results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-neural opacity-10 rounded-xl blur-lg group-hover:opacity-20 transition-all duration-500" />
                
                <Card className="relative p-6 bg-white/95 backdrop-blur-sm border-2 border-primary-glow/40 hover:border-primary-glow/80 shadow-neural hover:shadow-hologram transition-all duration-500">
                  <CardContent className="p-0">
                    <blockquote className="text-foreground mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-background font-bold text-sm">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{testimonial.author}</div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.position} at {testimonial.company}
                        </div>
                      </div>
                    </div>
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
              >
                Get Your Free Consultation
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