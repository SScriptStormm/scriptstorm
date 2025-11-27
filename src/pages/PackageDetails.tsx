import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { PackageFeaturesWidget } from "@/components/dashboard/PackageFeaturesWidget";

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
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-4xl">
        <div className="mb-6 sm:mb-8">
          <Button
            variant="outline"
            onClick={() => navigate("/account-settings")}
            className="mb-4 bg-white/10 text-white border-white/30 hover:bg-white/20"
          >
            ← Back to Account Settings
          </Button>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Your Package Details</h1>
          <p className="text-sm sm:text-base text-white/70">Everything included in your subscription</p>
        </div>

        <PackageFeaturesWidget subscriptionTier={subscriber?.subscription_tier || 'starter'} />
      </div>
    </div>
  );
}
