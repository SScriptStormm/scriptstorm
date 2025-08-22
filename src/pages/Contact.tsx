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
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-primary-glow transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono tracking-wide">Back to ScriptStorm</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Let's Create Something
            <span className="block text-primary-glow">Amazing Together</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Ready to transform your content strategy? Get in touch and let's discuss how ScriptStorm can help your brand succeed.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <Card className="bg-black/20 border-white/10 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                <p className="text-white/70">We'll get back to you within 24 hours</p>
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
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
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
                        className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your content needs..."
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50 resize-none"
                    />
                  </div>
                  <Button type="submit" variant="hero" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Get In Touch</h2>
                <p className="text-white/70 text-lg mb-8">
                  Ready to elevate your content game? We're here to help you create content that converts.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-black/20 border-white/10 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Mail className="h-6 w-6 text-primary-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Email Us</h3>
                        <p className="text-white/70">hello@scriptstorm.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <Clock className="h-6 w-6 text-primary-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Response Time</h3>
                        <p className="text-white/70">Within 24 hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 backdrop-blur-md">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/20 rounded-lg">
                        <MessageSquare className="h-6 w-6 text-primary-glow" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">Free Consultation</h3>
                        <p className="text-white/70">30-minute strategy call</p>
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