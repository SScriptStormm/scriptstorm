import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PackageFeaturesWidget } from "@/components/dashboard/PackageFeaturesWidget";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { ChevronLeft } from "lucide-react";

interface SubscriberData {
  subscription_tier: string | null;
}

export default function PackageDetails() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subscriber, setSubscriber] = useState<SubscriberData | null>(null);

  useEffect(() => {
    const fetchSubscriberData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from("subscribers")
        .select("subscription_tier")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Error fetching subscriber:", error);
      } else {
        setSubscriber(data);
      }
      
      setLoading(false);
    };

    fetchSubscriberData();
  }, [navigate]);

  if (loading) {
    return <LoadingScreen message="Loading package details..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero bg-fixed relative overflow-hidden">
      {/* Animated neural network overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, hsl(var(--primary-glow)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Darkening overlay */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none" />

      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/40 rotate-45 animate-float shadow-cyber" />
      <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/account-settings")}
            className="mb-4 group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-xl text-white/80 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
          >
            <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Account Settings
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-mono tracking-tight">Your Package Details</h1>
          <p className="text-sm sm:text-base text-white/60 font-mono">Everything included in your subscription</p>
        </div>

        <PackageFeaturesWidget subscriptionTier={subscriber?.subscription_tier || 'starter'} />
      </div>
    </div>
  );
}
