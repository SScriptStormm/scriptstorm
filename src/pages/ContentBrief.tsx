import { MultiStepContentBriefForm } from "@/components/MultiStepContentBriefForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";

const ContentBrief = () => {
  return (
    <div className="min-h-screen bg-gradient-hero bg-fixed relative">
      {/* Subtle dark overlay */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none" />
      
      {/* Minimal floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl" />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute top-40 left-10 w-16 h-16 border-2 border-primary-glow/40 rotate-45 animate-float shadow-cyber" />
      <div className="absolute top-60 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />

      {/* Streamlined header */}
      <header className="relative z-10 border-b border-white/10 bg-black/30 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={scriptStormLogo} 
                alt="ScriptStorm" 
                className="w-10 h-10 rounded-lg" 
              />
              <span className="text-lg font-bold text-white font-mono">SCRIPTSTORM</span>
            </div>
            
            <Link to="/dashboard">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content - no duplicate hero card */}
      <div className="relative z-10 py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList className="text-white/60 text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-white/30" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Submit Content Brief</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <MultiStepContentBriefForm />
        </div>
      </div>
    </div>
  );
};

export default ContentBrief;
