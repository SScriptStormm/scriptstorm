import { MultiStepContentBriefForm } from "@/components/MultiStepContentBriefForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const ContentBrief = () => {
  return (
    <div className="min-h-screen bg-gradient-hero py-6 sm:py-8 md:py-12 px-4">
      <div className="container mx-auto">
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 font-mono">Submit Content Brief</h1>
          <p className="text-white/70 font-mono text-sm sm:text-base">Complete the form step-by-step to submit your content request</p>
        </div>

        <MultiStepContentBriefForm />
      </div>
    </div>
  );
};

export default ContentBrief;