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
    <section className="py-20 bg-gradient-dark relative overflow-hidden">
      {/* AI Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute top-20 right-10 w-32 h-32 border border-primary-glow/20 rotate-45 animate-float" />
      <div className="absolute bottom-20 left-10 w-24 h-24 border border-primary-glow/15 rotate-12 animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Services Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-mono tracking-wider">
            <span className="bg-gradient-cyber bg-clip-text text-transparent">NEURAL</span> CONTENT THAT{" "}
            <span className="text-primary-glow animate-pulse-glow">CONVERTS</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-mono tracking-wide">
            &gt; SPECIALIZED AI-POWERED CONTENT SERVICES FOR{" "}
            <span className="text-primary-glow">SAAS</span> &{" "}
            <span className="text-primary-glow">ECOMMERCE</span> BUSINESSES_
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-cyber opacity-20 rounded-lg blur-lg group-hover:opacity-40 transition-all duration-500" />
              <Card className="relative bg-black/40 backdrop-blur-md border-2 border-primary-glow/30 hover:border-primary-glow/60 shadow-neural hover:shadow-cyber transition-all duration-500 animate-hologram-flicker" style={{ animationDelay: `${index * 0.3}s` }}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-gradient-cyber rounded-full w-fit shadow-glow animate-pulse-glow">
                    <div className="text-primary-glow">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-white font-mono tracking-wide">
                    {service.title.toUpperCase()}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed text-white/80 font-mono text-sm">
                    &gt; {service.description}_
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-white/70 font-mono">
                        <div className="h-2 w-2 bg-primary-glow rounded-full animate-pulse-glow" />
                        [ {feature} ]
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
          <h3 className="text-3xl font-bold mb-2 text-white font-mono tracking-wider">
            &gt; OUR <span className="text-primary-glow">PROMISE</span> TO YOU_
          </h3>
          <p className="text-white/70 font-mono tracking-wide">
            [ WHY THOUSANDS OF BUSINESSES TRUST US WITH THEIR CONTENT ]
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="text-center group relative">
              <div className="absolute inset-0 bg-gradient-neural opacity-20 rounded-lg blur-lg group-hover:opacity-40 transition-all duration-500" />
              <div className="relative bg-black/30 backdrop-blur-md border border-primary-glow/30 rounded-lg p-6 shadow-neural hover:shadow-hologram transition-all duration-500 hover:border-primary-glow/60">
                <div className="mx-auto mb-4 p-4 bg-gradient-cyber rounded-full w-fit shadow-glow animate-pulse-glow">
                  <div className="text-primary-glow">
                    {guarantee.icon}
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-2 text-white font-mono tracking-wide">
                  [ {guarantee.title.toUpperCase()} ]
                </h4>
                <p className="text-white/70 font-mono text-sm">
                  &gt; {guarantee.description}_
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;