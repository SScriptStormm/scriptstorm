import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import OnboardingFlow from "@/components/OnboardingFlow";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ConstructionBanner from "@/components/ConstructionBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <ConstructionBanner />
      <Hero />
      <Services />
      <Portfolio />
      <OnboardingFlow />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
