import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const handleGetStarted = () => {
    // Scroll to pricing section
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            SEO-Optimized Content for SaaS—
            <span className="block text-primary-glow">Delivered in 24 Hours</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Get 10x More Traffic Without Hiring Writers (50% Cheaper Than Agencies)
          </p>

          {/* Key Benefits */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "24-Hour Delivery",
              "SEO Optimized",
              "Money-Back Guarantee",
              "SaaS & eCommerce Focused"
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-primary-glow" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleGetStarted}
              className="text-lg px-8 py-4 h-auto"
            >
              Start Your 7-Day Trial - $0
            </Button>
            <Button 
              variant="ghost-white" 
              size="lg"
              className="text-lg px-8 py-4 h-auto"
            >
              View Samples
            </Button>
          </div>

          {/* Countdown Timer */}
          <div className="mt-8 max-w-md mx-auto">
            <CountdownTimer />
          </div>

          {/* Trust Badges */}
          <div className="mt-12 text-white/70">
            <p className="mb-6 text-sm">Used by</p>
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/20">
                <span className="text-white font-semibold">Shopify</span>
              </div>
              <div className="bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/20">
                <span className="text-white font-semibold">HubSpot</span>
              </div>
              <div className="bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/20">
                <span className="text-white font-semibold">Mailchimp</span>
              </div>
            </div>
            <div className="flex justify-center gap-8 text-sm">
              <span>⭐⭐⭐⭐⭐ 4.9/5 Rating</span>
              <span>🚀 10,000+ Articles Delivered</span>
              <span>⚡ 24hr Turnaround</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;