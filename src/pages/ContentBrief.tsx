import { MultiStepContentBriefForm } from "@/components/MultiStepContentBriefForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap } from "lucide-react";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard";

const ContentBrief = () => {
  return (
    <div className="min-h-screen bg-gradient-hero bg-fixed relative overflow-hidden">
      {/* Subtle dark overlay */}
      <div className="fixed inset-0 bg-black/15 pointer-events-none" />
      
      {/* Animated neural network overlay */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, hsl(var(--primary-glow)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating geometric elements - vibrant and animated */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Rotating geometric shapes */}
        <div className="absolute top-32 right-20 w-16 h-16 border border-primary-glow/20 rotate-45 animate-float" />
        <div className="absolute bottom-40 left-20 w-12 h-12 border border-primary-glow/15 rotate-12 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-1/4 w-10 h-10 border border-primary-glow/10 -rotate-12 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header with branding */}
      <header className="relative z-10 border-b border-primary-glow/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src={scriptStormLogo} 
                alt="ScriptStorm" 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-cyber border border-primary-glow/30 hover:border-primary-glow/60 transition-all duration-300" 
              />
              <div>
                <h1 className="text-base sm:text-lg font-bold text-white font-mono tracking-wide">
                  SCRIPTSTORM
                </h1>
                <p className="text-primary-glow/80 text-xs font-mono tracking-widest">
                  CONTENT BRIEF
                </p>
              </div>
            </div>
            
            <Link to="/dashboard">
              <Button 
                variant="ghost" 
                size="sm"
                className="bg-white/[0.05] backdrop-blur-sm text-white/80 border border-white/10 hover:bg-white/[0.1] hover:border-white/20 hover:text-white font-mono text-xs sm:text-sm transition-all duration-300"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="relative z-10 py-6 sm:py-8 md:py-10 px-4">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6 sm:mb-8">
            <BreadcrumbList className="text-white/70 text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard" className="text-white/70 hover:text-primary-glow transition-colors">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/40" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-glow">Submit Content Brief</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Hero Title Card */}
          <GlassCard variant="default" className="mb-8 sm:mb-10 bg-black/30 backdrop-blur-xl border-white/10 overflow-hidden">
            {/* Accent glow line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-glow to-transparent opacity-60" />
            
            <GlassCardContent className="py-6 sm:py-8 text-center relative">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/20 border border-primary-glow/30 shadow-[0_0_30px_hsl(221_83%_53%/0.3)]">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-primary-glow" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 font-mono tracking-tight">
                    Submit Content Brief
                  </h2>
                  <p className="text-white/50 font-mono text-sm sm:text-base max-w-lg mx-auto">
                    Complete the form step-by-step to submit your content request
                  </p>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>

          <MultiStepContentBriefForm />
        </div>
      </div>
    </div>
  );
};

export default ContentBrief;
