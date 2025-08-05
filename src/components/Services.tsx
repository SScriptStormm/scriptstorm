import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Share2, Mail, Zap, Target, Shield } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "SEO Blog Articles",
      description: "Long-form, keyword-optimized blog posts that rank on Google and drive organic traffic to your SaaS or eCommerce site.",
      features: ["2000-5000 words", "Keyword research included", "Meta tags & headers", "Internal linking strategy"]
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: "Social Media Content",
      description: "Engaging posts for LinkedIn, Twitter, Facebook, and Instagram that build your brand and drive conversions.",
      features: ["Platform-optimized content", "Hashtag research", "Visual content ideas", "Engagement hooks"]
    },
    {
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Email Copy",
      description: "High-converting email sequences, newsletters, and campaigns that nurture leads and boost sales.",
      features: ["Welcome sequences", "Product launches", "Newsletter content", "A/B test variations"]
    }
  ];

  const guarantees = [
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "24-Hour Delivery",
      description: "Fast turnaround without compromising quality. Get your content when you need it."
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "SEO Optimized",
      description: "Every piece is researched, keyword-optimized, and designed to rank on search engines."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Money-Back Guarantee",
      description: "Not satisfied? Get a full refund. We're confident you'll love our work."
    }
  ];

  return (
    <section className="relative py-20 bg-muted/30 overflow-hidden">
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-20" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-10" />
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border border-primary-glow/20 rotate-45 animate-float" />
      <div className="absolute top-40 right-20 w-12 h-12 border border-primary-glow/15 rotate-12 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-10 h-10 border border-primary-glow/25 rotate-45 animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-20" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Services Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-cyber opacity-30 rounded-lg blur-xl" />
            <h2 className="relative text-4xl md:text-5xl font-bold mb-6 text-foreground font-mono tracking-wide">
              Content That <span className="text-primary animate-pulse-glow">Converts</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Specialized content services designed specifically for SaaS and eCommerce businesses 
            that need to scale their content marketing efforts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="relative group">
              {/* Holographic background */}
              <div className="absolute inset-0 bg-gradient-cyber opacity-20 rounded-lg blur-sm group-hover:blur-none transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-neural opacity-10 rounded-lg animate-neural-pulse" />
              
              <Card className="relative shadow-neural hover:shadow-hologram transition-all duration-500 border border-primary-glow/30 hover:border-primary-glow/60 bg-black/30 backdrop-blur-md group-hover:bg-black/40">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4 p-4 bg-gradient-cyber rounded-full w-fit shadow-cyber group-hover:shadow-hologram transition-all duration-500">
                    <div className="absolute inset-0 bg-primary-glow/20 rounded-full animate-pulse-glow" />
                    <div className="relative">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold font-mono tracking-wide text-white group-hover:text-primary-glow transition-all duration-500">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-white/80">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-white/70 group-hover:text-white/90 transition-all duration-300">
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
          <p className="text-muted-foreground">Why thousands of businesses trust us with their content</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="relative text-center group">
              {/* Holographic background for guarantees */}
              <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-lg blur-sm group-hover:blur-none transition-all duration-500" />
              
              <div className="relative p-6 bg-black/20 backdrop-blur-sm rounded-lg border border-primary-glow/20 hover:border-primary-glow/40 shadow-neural hover:shadow-cyber transition-all duration-500">
                <div className="relative mx-auto mb-4 p-4 bg-gradient-neural rounded-full w-fit shadow-cyber group-hover:shadow-hologram transition-all duration-500">
                  <div className="absolute inset-0 bg-primary-glow/20 rounded-full animate-pulse-glow" />
                  <div className="relative">
                    {guarantee.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2 font-mono tracking-wide text-white group-hover:text-primary-glow transition-all duration-500">{guarantee.title}</h4>
                <p className="text-white/70 group-hover:text-white/90 transition-all duration-300">{guarantee.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;