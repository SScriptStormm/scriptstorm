import { MultiStepContentBriefForm } from "@/components/MultiStepContentBriefForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard";

const ContentBrief = () => {
  return (
    <div className="min-h-screen bg-gradient-hero bg-fixed relative overflow-hidden">
      {/* Dark overlay - stronger for professional feel */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none" />
      
      {/* Animated neural network overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, hsl(var(--primary-glow)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating geometric elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-primary/6 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-primary/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Rotating geometric shapes */}
        <div className="absolute top-32 right-20 w-20 h-20 border border-primary-glow/15 rotate-45 animate-float" />
        <div className="absolute bottom-40 left-20 w-14 h-14 border border-primary-glow/10 rotate-12 animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 right-1/4 w-12 h-12 border border-primary-glow/8 -rotate-12 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Header with branding */}
      <header className="relative z-10 border-b border-primary-glow/15 bg-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={scriptStormLogo} 
                alt="ScriptStorm" 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-cyber border border-primary-glow/30 hover:border-primary-glow/60 transition-all duration-300" 
              />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white font-mono tracking-wider">
                  SCRIPTSTORM
                </h1>
                <p className="text-primary-glow/70 text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase">
                  Content Submission Portal
                </p>
              </div>
            </div>
            
            <Link to="/dashboard">
              <Button 
                variant="ghost" 
                size="sm"
                className="bg-white/[0.03] backdrop-blur-sm text-white/70 border border-white/10 hover:bg-white/[0.08] hover:border-primary-glow/30 hover:text-white font-mono text-xs sm:text-sm transition-all duration-300"
              >
                <ArrowLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Dashboard
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
            <BreadcrumbList className="text-white/60 text-sm font-mono">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard" className="text-white/60 hover:text-primary-glow transition-colors">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary-glow">Content Brief</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Hero Card - Clean professional style */}
          <GlassCard variant="default" className="mb-8 sm:mb-10 bg-black/40 backdrop-blur-2xl border-white/[0.08] overflow-hidden">
            {/* Left accent glow line */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-glow via-primary to-primary-glow/20" />
            
            <GlassCardContent className="py-6 sm:py-8 pl-6 sm:pl-8 relative">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
              
              <div className="relative z-10">
                <p className="text-primary-glow/80 text-xs font-mono tracking-wider uppercase mb-2">
                  Content Submission Portal
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-white font-mono tracking-tight">
                  Submit Content Brief
                </h2>
                <p className="text-white/60 font-mono text-sm mt-2 max-w-lg">
                  Complete each step to submit your content request for production
                </p>
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
