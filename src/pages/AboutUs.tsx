import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, Zap, Award, Users, TrendingUp, Clock } from "lucide-react";

const AboutUs = () => {
  const stats = [
    { label: "Content Pieces Delivered", value: "10,000+", icon: <TrendingUp className="h-6 w-6" /> },
    { label: "Happy Clients", value: "500+", icon: <Users className="h-6 w-6" /> },
    { label: "Average Delivery Time", value: "18 Hours", icon: <Clock className="h-6 w-6" /> },
    { label: "Client Retention Rate", value: "94%", icon: <Award className="h-6 w-6" /> }
  ];

  const values = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Speed & Efficiency",
      description: "We believe great content shouldn't take weeks. Our AI-powered workflow delivers professional results in 24 hours or less."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Results-Driven",
      description: "Every piece of content is crafted with conversion in mind. We focus on content that drives traffic, engagement, and sales."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality First",
      description: "We never compromise on quality. Every deliverable goes through our rigorous quality assurance process before reaching you."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "Content Strategy Lead",
      expertise: "10+ years in SaaS content marketing, formerly at HubSpot and Shopify"
    },
    {
      name: "Marcus Rodriguez",
      role: "SEO Specialist",
      expertise: "Expert in technical SEO and content optimization, helped 200+ brands rank #1"
    },
    {
      name: "Emily Watson",
      role: "AI Operations Director",
      expertise: "Machine learning engineer specializing in natural language processing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-primary-glow hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono tracking-wide">Back to ScriptStorm</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-primary/20 text-primary-glow border-primary-glow/50">
            ABOUT SCRIPTSTORM
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            We're Redefining
            <span className="block text-primary-glow">Content Creation</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            ScriptStorm combines the power of AI with human expertise to deliver premium content that converts. 
            We're not just another content agency—we're your strategic partner in growth.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-secondary/90 border-primary/30 shadow-glow text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/20 rounded-lg text-primary-glow">
                      {stat.icon}
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Our Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              We believe every brand deserves content that converts. Traditional content creation is slow, expensive, 
              and often inconsistent. That's why we built ScriptStorm—to democratize access to premium content 
              through the perfect blend of AI efficiency and human creativity.
            </p>
            
            <Card className="bg-secondary/90 border-primary/30 shadow-glow">
              <CardContent className="p-8">
                <blockquote className="text-2xl text-foreground font-light italic mb-6">
                  "Content is the atomic particle of all digital marketing. We're here to make sure yours converts."
                </blockquote>
                <cite className="text-muted-foreground">— ScriptStorm Founding Team</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-secondary/90 border-primary/30 shadow-glow">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-primary/20 rounded-lg text-primary-glow">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">Meet Our Experts</h2>
          <div className="space-y-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-secondary/90 border-primary/30 shadow-glow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2">{member.name}</h3>
                      <Badge className="mb-3 bg-primary/20 text-primary-glow border-primary-glow/50">
                        {member.role}
                      </Badge>
                      <p className="text-muted-foreground">{member.expertise}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-secondary/90 border-primary/30 shadow-glow max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Work With Us?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of successful brands who trust ScriptStorm with their content strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors shadow-glow">
                    Get Started Today
                  </button>
                </Link>
                <Link to="/onboarding-process">
                  <button className="border border-primary/30 text-foreground hover:bg-primary/10 px-8 py-4 rounded-lg font-semibold transition-colors">
                    Learn Our Process
                  </button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;