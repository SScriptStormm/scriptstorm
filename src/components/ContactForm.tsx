import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      service: formData.get('service'),
      message: formData.get('message'),
    };

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-[#2ECC71]/50 shadow-hologram">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-[#2ECC71] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
            <p className="text-muted-foreground">
              Your message has been sent successfully. We'll review your requirements and get back to you within 24 hours with a custom proposal.
            </p>
          </div>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-[#3498DB]/50 hover:border-[#3498DB]"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-[#3498DB]/50 shadow-hologram">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-foreground">
          Get Your Free Consultation
        </CardTitle>
        <CardDescription className="text-lg">
          Tell us about your content needs and we'll create a custom proposal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-foreground font-semibold">Full Name *</Label>
              <Input 
                id="name" 
                name="name"
                required 
                className="mt-1 border-[#3498DB]/30 focus:border-[#3498DB]"
                placeholder="John Smith"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-foreground font-semibold">Email Address *</Label>
              <Input 
                id="email" 
                name="email"
                type="email" 
                required 
                className="mt-1 border-[#3498DB]/30 focus:border-[#3498DB]"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="company" className="text-foreground font-semibold">Company Name *</Label>
            <Input 
              id="company" 
              name="company"
              required 
              className="mt-1 border-[#3498DB]/30 focus:border-[#3498DB]"
              placeholder="Your Company Inc."
            />
          </div>

          <div>
            <Label htmlFor="service" className="text-foreground font-semibold">Service Needed *</Label>
            <Select name="service" required>
              <SelectTrigger className="mt-1 border-[#3498DB]/30 focus:border-[#3498DB]">
                <SelectValue placeholder="Select the service you need" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seo-articles">SEO Blog Articles</SelectItem>
                <SelectItem value="product-descriptions">Product Descriptions</SelectItem>
                <SelectItem value="social-media">Social Media Content</SelectItem>
                <SelectItem value="website-copy">Website Copy</SelectItem>
                <SelectItem value="email-campaigns">Email Campaigns</SelectItem>
                <SelectItem value="custom-package">Custom Package</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message" className="text-foreground font-semibold">Project Details *</Label>
            <Textarea 
              id="message" 
              name="message"
              required 
              rows={4}
              className="mt-1 border-[#3498DB]/30 focus:border-[#3498DB]"
              placeholder="Tell us about your content goals, target audience, and any specific requirements..."
            />
          </div>

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full text-lg py-6 h-auto bg-[#3498DB] hover:bg-[#2980B9] text-white font-bold shadow-lg"
            size="lg"
          >
            {isSubmitting ? "Sending..." : "Get Free Consultation"}
          </Button>
        </form>

        <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <Mail className="h-4 w-4 text-[#3498DB]" />
            <span>24hr Response</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4 text-[#3498DB]" />
            <span>Custom Proposal</span>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-[#3498DB]" />
            <span>No Obligation</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactForm;