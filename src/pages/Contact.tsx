import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Clock, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic Multi-Layer Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient with multiple colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-secondary/10" />
        
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-40 animate-pulse" />
        
        {/* Neural network animation */}
        <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-25" />
        
        {/* Dynamic scanning lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-glow to-transparent animate-bounce opacity-60" style={{ animationDelay: '0s', animationDuration: '4s' }} />
          <div className="absolute top-32 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent animate-bounce opacity-40" style={{ animationDelay: '1s', animationDuration: '6s' }} />
          <div className="absolute bottom-32 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-glow to-transparent animate-bounce opacity-50" style={{ animationDelay: '2s', animationDuration: '5s' }} />
        </div>
        
        {/* Enhanced grid pattern with multiple layers */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, hsl(var(--primary-glow) / 0.2) 1px, transparent 0),
            radial-gradient(circle at 25px 25px, hsl(var(--accent) / 0.1) 1px, transparent 0)
          `,
          backgroundSize: '50px 50px, 100px 100px'
        }} />
        
        {/* Animated particle dots */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-75" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-1/3 w-1 h-1 bg-accent rounded-full animate-ping opacity-60" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-80" style={{ animationDelay: '2s' }} />
          <div className="absolute top-60 left-2/3 w-1 h-1 bg-accent rounded-full animate-ping opacity-65" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-70" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Complex floating geometric elements */}
        <div className="absolute top-16 left-8 w-20 h-20 border-2 border-primary-glow/40 rotate-45 animate-float shadow-cyber backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, hsl(var(--primary-glow) / 0.1), transparent)' }} />
        <div className="absolute top-32 right-16 w-16 h-16 border-2 border-accent/30 rotate-12 animate-float shadow-cyber backdrop-blur-sm" style={{ animationDelay: '1s', background: 'linear-gradient(45deg, hsl(var(--accent) / 0.1), transparent)' }} />
        <div className="absolute bottom-40 left-16 w-12 h-12 border-2 border-primary-glow/50 rotate-45 animate-float shadow-cyber backdrop-blur-sm" style={{ animationDelay: '2s', background: 'radial-gradient(circle, hsl(var(--primary-glow) / 0.15), transparent)' }} />
        <div className="absolute top-1/3 right-8 w-10 h-10 border-2 border-accent/25 rotate-45 animate-float shadow-cyber backdrop-blur-sm" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-16 right-32 w-18 h-18 border-2 border-primary-glow/35 rotate-12 animate-float shadow-cyber backdrop-blur-sm" style={{ animationDelay: '4s' }} />
        <div className="absolute top-48 left-1/3 w-8 h-8 border border-accent/40 rounded-full animate-float shadow-cyber" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-64 right-1/3 w-6 h-6 border border-primary-glow/30 rounded-full animate-float shadow-cyber" style={{ animationDelay: '2.5s' }} />
        
        {/* Hexagonal patterns */}
        <div className="absolute top-24 right-24 w-12 h-12 border border-primary-glow/20 rotate-30 animate-float" style={{ 
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          animationDelay: '1.5s'
        }} />
        <div className="absolute bottom-48 left-32 w-10 h-10 border border-accent/25 rotate-45 animate-float" style={{ 
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          animationDelay: '3.5s'
        }} />
        
        {/* Glowing orbs */}
        <div className="absolute top-72 left-24 w-4 h-4 bg-primary-glow/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-24 right-48 w-3 h-3 bg-accent/30 rounded-full blur-sm animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Have Questions Before
            <span className="block text-primary-glow">You Start?</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to elevate your content game? We're here to answer your questions.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Have Questions Before You Start?</CardTitle>
                <p className="text-muted-foreground">Send us a message. We'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Ask your questions or tell us about your content goals"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Get In Touch</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Ready to elevate your content game? We're here to answer your questions.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Mail className="h-6 w-6 text-primary-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email Us</h3>
                        <p className="text-muted-foreground">hello@scriptstorm.org</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Clock className="h-6 w-6 text-primary-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Response Time</h3>
                        <p className="text-muted-foreground">Within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-primary-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email-Only Workflow</h3>
                        <p className="text-muted-foreground">No meetings, no delays</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;