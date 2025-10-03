import { MultiStepContentBriefForm } from "@/components/MultiStepContentBriefForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const ContentBrief = () => {
  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="container mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/dashboard">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Submit Content Brief</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-mono">Submit Content Brief</h1>
          <p className="text-white/70 font-mono">Complete the form step-by-step to submit your content request</p>
        </div>

        <MultiStepContentBriefForm />
      </div>
    </div>
  );
};

export default ContentBrief;