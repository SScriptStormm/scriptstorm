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
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Services Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Content That <span className="text-primary">Converts</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Specialized content services designed specifically for SaaS and eCommerce businesses 
            that need to scale their content marketing efforts.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth border-0 bg-card">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  {service.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Guarantees */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-2 text-foreground">Our Promise to You</h3>
          <p className="text-muted-foreground">Why thousands of businesses trust us with their content</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit group-hover:bg-primary/20 transition-smooth">
                {guarantee.icon}
              </div>
              <h4 className="text-xl font-semibold mb-2">{guarantee.title}</h4>
              <p className="text-muted-foreground">{guarantee.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;