import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";

const Hero = () => {
  const handleGetStarted = () => {
    // Scroll to pricing section
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse" />
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary-glow/30 rotate-45 animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 border border-primary-glow/20 rotate-12 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 border border-primary-glow/25 rotate-45 animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-30" />
      </div>
      
      {/* Background Image with AI overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-85" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            ScriptStorm: Done-For-You SEO Content—
            <span className="block text-primary-glow">Delivered in 24 Hours</span>
          </h1>

          {/* Client Logos - Futuristic */}
          <div className="mb-8">
            <p className="text-white/60 text-sm mb-4 font-mono tracking-wide">TRUSTED BY LEADING SAAS BRANDS</p>
            <div className="flex justify-center items-center gap-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber opacity-20 rounded-lg blur-sm group-hover:blur-none transition-all duration-500" />
                <div className="relative bg-black/30 px-6 py-3 rounded-lg backdrop-blur-md border border-primary-glow/30 shadow-neural hover:shadow-hologram transition-all duration-500 hover:border-primary-glow/60">
                  <span className="text-white font-semibold font-mono tracking-wider">SHOPIFY</span>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber opacity-20 rounded-lg blur-sm group-hover:blur-none transition-all duration-500" />
                <div className="relative bg-black/30 px-6 py-3 rounded-lg backdrop-blur-md border border-primary-glow/30 shadow-neural hover:shadow-hologram transition-all duration-500 hover:border-primary-glow/60">
                  <span className="text-white font-semibold font-mono tracking-wider">HUBSPOT</span>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber opacity-20 rounded-lg blur-sm group-hover:blur-none transition-all duration-500" />
                <div className="relative bg-black/30 px-6 py-3 rounded-lg backdrop-blur-md border border-primary-glow/30 shadow-neural hover:shadow-hologram transition-all duration-500 hover:border-primary-glow/60">
                  <span className="text-white font-semibold font-mono tracking-wider">MAILCHIMP</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Professional Content Creation Service - No Tools, No Hassle, Just Results
          </p>

          {/* Key Benefits - AI Enhanced */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              "24-Hour Delivery",
              "SEO Optimized",
              "Money-Back Guarantee",
              "SaaS & eCommerce Focused"
            ].map((benefit, index) => (
              <div key={benefit} className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber opacity-30 rounded-full blur-sm group-hover:blur-none transition-all duration-300" />
                <div 
                  className="relative flex items-center gap-2 bg-black/40 px-6 py-3 rounded-full backdrop-blur-md border border-primary-glow/40 shadow-neural hover:shadow-cyber transition-all duration-300 hover:border-primary-glow/70 animate-hologram-flicker"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <CheckCircle className="h-5 w-5 text-primary-glow animate-pulse-glow" />
                  <span className="font-medium font-mono tracking-wide text-sm">{benefit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-cyber rounded-lg blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleGetStarted}
                className="relative text-lg px-8 py-4 h-auto shadow-cyber hover:shadow-hologram transition-all duration-500 border-2 border-primary-glow/50 hover:border-primary-glow animate-pulse-glow font-mono tracking-wide"
              >
                START FREE TRIAL
              </Button>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-neural rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500" />
              <Button 
                variant="ghost-white" 
                size="lg"
                className="relative text-lg px-8 py-4 h-auto bg-black/30 backdrop-blur-md border-2 border-white/30 hover:border-white/60 shadow-neural hover:shadow-hologram transition-all duration-500 font-mono tracking-wide"
              >
                VIEW OUR WORK
              </Button>
            </div>
          </div>


          {/* Trust Indicators - AI Enhanced */}
          <div className="mt-16 text-white/70">
            <div className="flex justify-center gap-8 text-sm font-mono tracking-widest">
              <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg border border-primary-glow/20 backdrop-blur-sm">
                <span className="text-primary-glow">★★★★★</span>
                <span>4.9/5 RATING</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg border border-primary-glow/20 backdrop-blur-sm">
                <span className="text-primary-glow">█</span>
                <span>10,000+ DELIVERED</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg border border-primary-glow/20 backdrop-blur-sm">
                <span className="text-primary-glow">▲</span>
                <span>24HR TURNAROUND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;