import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import WhyChooseUs from "./pages/WhyChooseUs";
import OnboardingProcess from "./pages/OnboardingProcess";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ContentBrief from "./pages/ContentBrief";
import AuthGuard from "./components/AuthGuard";
import Contact from "./pages/Contact";
import Support from "./pages/Support";
import HelpCenter from "./pages/HelpCenter";
import AboutUs from "./pages/AboutUs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthGuard requireAuth={false}><Auth /></AuthGuard>} />
          <Route path="/dashboard" element={<AuthGuard><Dashboard /></AuthGuard>} />
          <Route path="/content-brief" element={<AuthGuard><ContentBrief /></AuthGuard>} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/onboarding-process" element={<OnboardingProcess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/terms-and-conditions" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
