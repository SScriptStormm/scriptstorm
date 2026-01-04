import { MultiStepContentBriefForm } from "@/components/MultiStepContentBriefForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const ContentBrief = () => {
  return (
    <div className="min-h-screen bg-gradient-hero bg-fixed relative overflow-hidden py-6 sm:py-8 md:py-12 px-4">
      {/* Global dark scrim for readability */}
      <div className="fixed inset-0 bg-black/25 pointer-events-none" />
      
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container mx-auto relative z-10">
        <Breadcrumb className="mb-4 sm:mb-6">
          <BreadcrumbList className="text-white/90 text-sm sm:text-base">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard" className="text-white/90 hover:text-white">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white/60" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-white">Submit Content Brief</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 font-mono tracking-tight">Submit Content Brief</h1>
          <p className="text-white/60 font-mono text-sm sm:text-base">Complete the form step-by-step to submit your content request</p>
        </div>

        <MultiStepContentBriefForm />
      </div>
    </div>
  );
};

export default ContentBrief;
