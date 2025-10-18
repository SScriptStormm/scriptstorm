import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Target, Zap, Award, Database, Clock, CheckCircle } from "lucide-react";

const AboutUs = () => {
  const powers = [
    {
      icon: <Award className="h-6 w-6" />,
      title: "Expert-Level AI Training",
      description: "Our systems are calibrated with industry-leading data to deliver content that sounds like you."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Seamless Automation",
      description: "A refined, multi-step process ensures quality and consistency, every single time."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Rapid Turnaround",
      description: "Get publish-ready content delivered on a predictable schedule, so you can stop waiting and start growing."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Client-Obsessed Results",
      description: "Every piece of content has one goal: to drive measurable outcomes for your business."
    }
  ];

  const values = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Speed & Automation",
      description: "We reject drawn-out processes. Our AI-powered workflow is engineered for one thing: delivering professional results in 24 hours or less, every time."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Results-Driven Content",
      description: "Every piece of content is engineered for performance. From keyword research to structure, our system is optimized to drive traffic, engagement, and conversions."
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Guaranteed Quality",
      description: "We don't compromise. Every piece of content must pass our rigorous automated checks for originality, SEO, and readability before it ever reaches you."
    }
  ];

  const differences = [
    {
      title: "Unmatched Consistency",
      description: "Our AI produces on-brand content every time."
    },
    {
      title: "Transparent Pricing", 
      description: "No bloated retainers, just predictable monthly plans."
    },
    {
      title: "Scalability",
      description: "Ramp your content volume up or down instantly, without meetings or headaches."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-glow transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono tracking-wide">Back to ScriptStorm</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
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
        
        <div className="relative z-10">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary text-white border-0 px-4 py-2 text-sm font-medium">
            ABOUT SCRIPTSTORM
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
            We're Automating
            <span className="block text-primary bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Content Creation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            ScriptStorm is a powerful, AI-driven content engine. We deliver high-quality, SEO-optimized content in record time—without the traditional agency overhead. Our fully automated system is built for founders and marketers who value speed, consistency, and results.
          </p>
        </div>
        </div>
      </section>

      {/* What Powers ScriptStorm Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">What Powers ScriptStorm</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {powers.map((power, index) => (
              <Card key={index} className="bg-white border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {power.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{power.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{power.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12">Our Mission</h2>
            <p className="text-2xl text-muted-foreground leading-relaxed mb-16 font-light">
              We believe that scaling content shouldn't be a slow, expensive, or unpredictable process. Traditional agencies are bogged down by human bottlenecks. That's why we built ScriptStorm—a seamless automated system that delivers publish-ready content at the push of a button, making consistent, high-quality content accessible for every growing business.
            </p>
            
            <Card className="bg-white border-2 border-primary/20 shadow-2xl">
              <CardContent className="p-12">
                <blockquote className="text-3xl text-foreground font-light italic mb-8 leading-relaxed">
                  "The traditional content model is broken. You're forced to choose between slow, expensive agencies and the unpredictable rollercoaster of freelancers. We built ScriptStorm to end that compromise. Our automated system is engineered for one thing: to deliver publish-ready, high-performing content with the reliability of clockwork. No excuses, no delays, no surprises."
                </blockquote>
                <cite className="text-primary font-semibold text-lg">— The ScriptStorm Founder</cite>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-16">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {values.map((value, index) => (
                <Card key={index} className="bg-white border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-10 text-center">
                    <div className="flex justify-center mb-8">
                      <div className="p-6 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        {value.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-6">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Difference Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-primary-glow/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-8">Our Difference: The Engine, Not Just The Writers</h2>
            <p className="text-xl text-muted-foreground text-center mb-16 leading-relaxed">
              ScriptStorm isn't a team of freelance writers. It's a sophisticated AI assembly line fine-tuned for marketing content. While others rely on inconsistent human output, we offer:
            </p>
            <div className="space-y-8">
              {differences.map((difference, index) => (
                <Card key={index} className="bg-white border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-foreground mb-4">{difference.title}</h3>
                        <p className="text-muted-foreground text-lg leading-relaxed">{difference.description}</p>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary-glow shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                Ready to Experience the Difference?
              </h2>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Join the forward-thinking brands that are leveraging AI to outpace their competition.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/contact">
                  <button className="bg-white text-primary hover:bg-gray-50 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get Started Today
                  </button>
                </Link>
                <Link to="/onboarding-process">
                  <button className="border-2 border-white text-white hover:bg-white hover:text-primary px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300">
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