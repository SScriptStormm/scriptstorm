import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Clock, MessageSquare, Users } from "lucide-react";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    accountEmail: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here - should send to support@scriptstorm.org
    console.log("Support form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced Cyberpunk Background */}
      <div className="fixed inset-0 -z-10">
        {/* Multi-layer base gradients */}
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-secondary/8 to-accent/5" />
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-primary-glow/10" />
        
        {/* Animated mesh overlays */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-50 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-30" />
        
        {/* Digital rain effect with lines */}
        <div className="absolute inset-0">
          <div className="absolute top-8 left-1/4 w-0.5 h-32 bg-gradient-to-b from-primary-glow to-transparent animate-bounce opacity-40" style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-16 right-1/3 w-0.5 h-24 bg-gradient-to-b from-accent to-transparent animate-bounce opacity-50" style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute bottom-32 left-1/3 w-0.5 h-28 bg-gradient-to-t from-primary-glow to-transparent animate-bounce opacity-45" style={{ animationDelay: '2s', animationDuration: '3.5s' }} />
          <div className="absolute top-24 left-2/3 w-0.5 h-20 bg-gradient-to-b from-accent to-transparent animate-bounce opacity-35" style={{ animationDelay: '3s', animationDuration: '5s' }} />
        </div>
        
        {/* Enhanced grid with circuit patterns */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 2px 2px, hsl(var(--primary-glow) / 0.25) 2px, transparent 0),
            linear-gradient(90deg, hsl(var(--accent) / 0.05) 1px, transparent 1px),
            linear-gradient(0deg, hsl(var(--primary-glow) / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 120px 120px, 120px 120px'
        }} />
        
        {/* Floating circuit board elements */}
        <div className="absolute inset-0">
          <div className="absolute top-12 left-12 w-24 h-24 border-2 border-primary-glow/35 rotate-45 animate-float backdrop-blur-sm" style={{ 
            background: 'linear-gradient(135deg, hsl(var(--primary-glow) / 0.15), hsl(var(--accent) / 0.1))',
            boxShadow: '0 0 20px hsl(var(--primary-glow) / 0.3)'
          }} />
          <div className="absolute top-40 right-12 w-18 h-18 border-2 border-accent/40 rotate-12 animate-float backdrop-blur-sm" style={{ 
            animationDelay: '1s',
            background: 'conic-gradient(from 45deg, hsl(var(--accent) / 0.2), transparent, hsl(var(--primary-glow) / 0.1))'
          }} />
          <div className="absolute bottom-32 left-20 w-14 h-14 border-2 border-primary-glow/45 rotate-45 animate-float backdrop-blur-sm" style={{ 
            animationDelay: '2s',
            background: 'radial-gradient(circle at 30% 30%, hsl(var(--primary-glow) / 0.2), transparent)'
          }} />
          <div className="absolute top-1/2 right-16 w-12 h-12 border-2 border-accent/30 rotate-30 animate-float backdrop-blur-sm" style={{ 
            animationDelay: '3s',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
          }} />
          <div className="absolute bottom-20 right-24 w-20 h-20 border-2 border-primary-glow/40 rotate-12 animate-float backdrop-blur-sm" style={{ 
            animationDelay: '4s',
            background: 'linear-gradient(45deg, transparent, hsl(var(--primary-glow) / 0.1), transparent)'
          }} />
        </div>
        
        {/* Glowing connection nodes */}
        <div className="absolute top-32 left-32 w-2 h-2 bg-primary-glow rounded-full animate-ping shadow-glow" style={{ animationDelay: '0s' }} />
        <div className="absolute top-56 right-40 w-2 h-2 bg-accent rounded-full animate-ping shadow-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-40 left-40 w-2 h-2 bg-primary-glow rounded-full animate-ping shadow-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute top-2/3 left-1/2 w-2 h-2 bg-accent rounded-full animate-ping shadow-glow" style={{ animationDelay: '4.5s' }} />
        
        {/* Geometric maze patterns */}
        <div className="absolute top-20 right-32 w-16 h-16 border border-primary-glow/20 animate-float" style={{
          clipPath: 'polygon(0% 25%, 25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%)',
          animationDelay: '1.5s'
        }} />
        <div className="absolute bottom-56 left-48 w-12 h-12 border border-accent/25 animate-float" style={{
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
          animationDelay: '3.5s'
        }} />
        
        {/* Pulsing energy cores */}
        <div className="absolute top-80 left-16 w-6 h-6 bg-primary-glow/30 rounded-full blur-md animate-pulse shadow-glow" style={{ animationDelay: '0s', animationDuration: '2s' }} />
        <div className="absolute bottom-32 right-56 w-4 h-4 bg-accent/40 rounded-full blur-md animate-pulse shadow-glow" style={{ animationDelay: '1s', animationDuration: '3s' }} />
        <div className="absolute top-1/3 left-2/3 w-5 h-5 bg-primary-glow/25 rounded-full blur-md animate-pulse shadow-glow" style={{ animationDelay: '2s', animationDuration: '2.5s' }} />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/help-center" className="flex items-center gap-2 text-primary-glow hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono tracking-wide">Back to Help Center</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            ScriptStorm Customer
            <span className="block text-primary-glow animate-pulse">Support</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            For help with your active account, revisions, technical issues, or billing.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Support Form */}
            <Card className="bg-card/80 backdrop-blur-sm border-2 border-primary/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Get Help with Your Account</CardTitle>
                <p className="text-muted-foreground">Existing customer? We're here to help. We respond within 24 hours.</p>
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
                        placeholder="Your Contact Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="accountEmail"
                      type="email"
                      placeholder="Account Email (if different)"
                      value={formData.accountEmail}
                      onChange={handleChange}
                      className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject (e.g., Revision Request, Billing Question, Technical Issue)"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Describe your issue or question in detail..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="bg-background/50 border-primary/30 text-foreground placeholder:text-muted-foreground resize-none"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow">
                    Submit Support Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Support Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-6">Customer Support</h2>
                <p className="text-muted-foreground text-lg mb-8">
                  Already a ScriptStorm customer? We're here to help with any questions about your account or services.
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
                        <h3 className="font-semibold text-foreground">Customer Support Email</h3>
                        <p className="text-muted-foreground">support@scriptstorm.org</p>
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
                        <Users className="h-6 w-6 text-primary-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">For Existing Customers</h3>
                        <p className="text-muted-foreground">Account, billing, and content support</p>
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
                        <h3 className="font-semibold text-foreground">New to ScriptStorm?</h3>
                        <p className="text-muted-foreground">
                          <Link to="/contact" className="text-primary-glow hover:text-primary transition-colors">
                            Visit our Contact page
                          </Link> for pre-sales questions
                        </p>
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

export default Support;