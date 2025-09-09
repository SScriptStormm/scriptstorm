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
    <div className="min-h-screen bg-gradient-to-br from-white via-white/95 to-muted/50 relative overflow-hidden">
      {/* AI Neural Network Background - Same as Pricing */}
      <div className="fixed inset-0 -z-10">
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