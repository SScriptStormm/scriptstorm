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
      <div className="relative z-10 w-full px-6 sm:px-8 md:px-12 lg:px-6 pt-6 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-5 md:mb-6 xl:mb-7 leading-tight">
            ScriptStorm: <span className="text-primary-glow">Your Hands-Free Content Engine</span>
          </h1>

          
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-7 md:mb-8 xl:mb-9 text-white/90 max-w-4xl mx-auto leading-relaxed">
            Get Scalable, SEO-Optimized Articles from Our Automated Team. No Hiring, No Management. Just Consistent Output That Ranks.
          </p>

          {/* Key Benefits - AI Enhanced */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-7 mb-8 sm:mb-9 md:mb-10 xl:mb-11">
            {[
              "24-Hour Delivery",
              "SEO Optimized",
              "Money-Back Guarantee",
              "SaaS & eCommerce Focused"
            ].map((benefit, index) => (
              <div key={benefit} className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber opacity-30 rounded-full blur-sm group-hover:blur-none transition-all duration-300" />
                <div 
                  className="relative flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 bg-black/40 px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 py-2 sm:py-2 md:py-2.5 lg:py-3 xl:py-3.5 rounded-full backdrop-blur-md border border-primary-glow/40 shadow-neural hover:shadow-cyber transition-all duration-300 hover:border-primary-glow/70 animate-hologram-flicker"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <CheckCircle className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 xl:h-5 xl:w-5 text-primary-glow flex-shrink-0" fill="none" />
                  <span className="font-medium font-mono tracking-wide text-xs sm:text-xs md:text-sm xl:text-sm whitespace-nowrap">{benefit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-7 justify-center">
            <div className="relative group w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-cyber rounded-lg blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleGetStarted}
                className="relative w-full sm:w-auto text-sm sm:text-base md:text-base lg:text-lg xl:text-lg px-6 sm:px-6 md:px-7 lg:px-8 xl:px-9 py-3 sm:py-3.5 md:py-3.5 lg:py-4 xl:py-4 h-auto shadow-cyber hover:shadow-hologram transition-all duration-500 border-2 border-primary-glow/50 hover:border-primary-glow animate-pulse-glow font-mono tracking-wide"
              >
                🚀 START YOUR FIRST DRAFT
              </Button>
            </div>
            <div className="relative group w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-neural rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500" />
              <Button 
                variant="ghost-white" 
                size="lg"
                onClick={() => window.location.href = '/why-choose-us'}
                className="relative w-full sm:w-auto text-sm sm:text-base md:text-base lg:text-lg xl:text-lg px-6 sm:px-6 md:px-7 lg:px-8 xl:px-9 py-3 sm:py-3.5 md:py-3.5 lg:py-4 xl:py-4 h-auto bg-black/30 backdrop-blur-md border-2 border-white/30 hover:border-white/60 shadow-neural hover:shadow-hologram transition-all duration-500 font-mono tracking-wide"
              >
                WHY CHOOSE US
              </Button>
            </div>
            <div className="relative group w-full sm:w-auto">
              <div className="absolute inset-0 bg-gradient-neural rounded-lg blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500" />
              <Button 
                variant="ghost-white" 
                size="lg"
                onClick={() => window.location.href = '/auth'}
                className="relative w-full sm:w-auto text-sm sm:text-base md:text-base lg:text-lg xl:text-lg px-6 sm:px-6 md:px-7 lg:px-8 xl:px-9 py-3 sm:py-3.5 md:py-3.5 lg:py-4 xl:py-4 h-auto bg-black/30 backdrop-blur-md border-2 border-white/30 hover:border-white/60 shadow-neural hover:shadow-hologram transition-all duration-500 font-mono tracking-wide"
              >
                CLIENT LOGIN
              </Button>
            </div>
          </div>


          {/* Trust Indicators - AI Enhanced */}
          <div className="mt-8 sm:mt-12 md:mt-16 xl:mt-18 text-white/70 px-2 sm:px-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-8 xl:gap-9 text-[9px] sm:text-xs md:text-sm xl:text-sm font-mono tracking-wide sm:tracking-widest">
              <div className="flex items-center gap-1 sm:gap-2 xl:gap-2.5 px-2 sm:px-3 md:px-4 xl:px-5 py-1.5 sm:py-2 xl:py-2.5 bg-black/20 rounded-lg border border-primary-glow/20 backdrop-blur-sm">
                <span className="text-primary-glow text-xs sm:text-sm xl:text-base">🚀</span>
                <span className="whitespace-nowrap">STOP WAITING. START PUBLISHING.</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 xl:gap-2.5 px-2 sm:px-3 md:px-4 xl:px-5 py-1.5 sm:py-2 xl:py-2.5 bg-black/20 rounded-lg border border-primary-glow/20 backdrop-blur-sm">
                <span className="text-primary-glow text-xs sm:text-sm xl:text-base">🤖</span>
                <span className="whitespace-nowrap">AUTOMATED WORKFLOW</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 xl:gap-2.5 px-2 sm:px-3 md:px-4 xl:px-5 py-1.5 sm:py-2 xl:py-2.5 bg-black/20 rounded-lg border border-primary-glow/20 backdrop-blur-sm">
                <span className="text-primary-glow text-xs sm:text-sm xl:text-base">▲</span>
                <span className="whitespace-nowrap">24HR TURNAROUND</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;