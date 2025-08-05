import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Clock, Users, Zap, Target } from "lucide-react";

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      number: 1,
      title: "Free Consultation Call",
      description: "30-minute strategy session to understand your business goals and content needs",
      duration: "30 minutes",
      icon: <Users className="h-6 w-6" />,
      details: [
        "Analyze your current content strategy",
        "Identify growth opportunities", 
        "Define your target audience",
        "Set measurable content goals"
      ]
    },
    {
      number: 2,
      title: "Custom Strategy & Quote",
      description: "Receive a tailored content plan with transparent pricing based on your specific needs",
      duration: "24 hours",
      icon: <Target className="h-6 w-6" />,
      details: [
        "Detailed content roadmap",
        "Custom pricing proposal",
        "Timeline and deliverables",
        "Success metrics definition"
      ]
    },
    {
      number: 3,
      title: "Project Kickoff",
      description: "Quick onboarding process to gather brand guidelines and content requirements",
      duration: "48 hours",
      icon: <Zap className="h-6 w-6" />,
      details: [
        "Brand guidelines review",
        "Content brief submission",
        "Team introductions",
        "Communication preferences"
      ]
    },
    {
      number: 4,
      title: "Content Delivery",
      description: "Receive your first high-quality content pieces and begin seeing results",
      duration: "24-72 hours",
      icon: <CheckCircle className="h-6 w-6" />,
      details: [
        "Professional content delivery",
        "Quality review process",
        "Feedback and revisions",
        "Performance tracking setup"
      ]
    }
  ];

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-15" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rotate-45 rounded-lg"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 border border-accent/10 rotate-12 rounded-lg"></div>
      
      {/* Connection lines between steps */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="absolute top-1/2 left-1/4 w-1/2 h-px bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block p-1 rounded-full bg-gradient-primary mb-6 shadow-glow">
            <div className="bg-background rounded-full px-6 py-2">
              <span className="text-sm font-medium text-primary">Simple Process</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            How We <span className="text-primary">Onboard</span> New Clients
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From consultation to content delivery in just a few days. Our streamlined process 
            ensures you get exactly what your business needs.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Step connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 w-8 h-px bg-gradient-to-r from-primary/50 to-transparent"></div>
              )}
              
              {/* Holographic background */}
              <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-2xl blur-lg group-hover:opacity-20 transition-all duration-500" />
              
              <Card className={`relative shadow-neural hover:shadow-hologram transition-all duration-500 border-2 bg-white/95 backdrop-blur-sm group-hover:bg-white h-full ${
                currentStep === index 
                  ? 'border-primary/80 bg-primary/5 shadow-glow' 
                  : 'border-primary-glow/40 hover:border-primary-glow/80'
              }`}>
                <CardHeader className="text-center pb-4">
                  {/* Step number and icon */}
                  <div className="relative mx-auto mb-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-background font-bold text-lg shadow-glow group-hover:shadow-elegant transition-shadow duration-300">
                      {step.number}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-primary/30 flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl font-bold font-mono tracking-wide text-foreground group-hover:text-primary transition-all duration-500">
                    {step.title}
                  </CardTitle>
                  
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Clock className="h-4 w-4 text-primary" />
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {step.duration}
                    </Badge>
                  </div>
                  
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-all duration-300">
                    {step.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-all duration-300">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Interactive Timeline */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 shadow-glow">
            <CardContent className="p-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground">Your Timeline</h3>
                <Badge className="bg-primary text-background">
                  Total: 5-7 days
                </Badge>
              </div>
              
              {/* Progress bar */}
              <div className="relative mb-6">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-primary transition-all duration-1000 ease-out"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2">
                  {steps.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        index <= currentStep 
                          ? 'bg-primary shadow-glow' 
                          : 'bg-muted hover:bg-muted-foreground/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  From initial consultation to first content delivery, we move fast while maintaining quality.
                </p>
                <Button 
                  className="bg-primary hover:bg-primary-dark text-background font-bold px-8 py-3"
                  size="lg"
                >
                  Start Your Free Consultation Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="text-2xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Successful Projects</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="text-2xl font-bold text-primary mb-2">24hr</div>
              <div className="text-muted-foreground">Average Delivery</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
              <div className="text-2xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnboardingFlow;