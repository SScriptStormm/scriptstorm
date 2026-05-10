import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, LayoutDashboard, FileText, Zap, ArrowRight } from "lucide-react";
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    let cancelled = false;
    const sync = async () => {
      toast({
        title: "Activating your plan…",
        description: "Syncing your subscription with Stripe.",
        duration: 2500,
      });
      // Retry a few times in case the webhook is still in flight
      for (let i = 0; i < 4 && !cancelled; i++) {
        const { data, error } = await supabase.functions.invoke("check-subscription");
        if (!error && data?.subscribed) return;
        await new Promise((r) => setTimeout(r, 1500));
      }
    };
    sync();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-hero bg-fixed relative overflow-hidden flex items-center justify-center p-4">
      {/* Darkening overlay */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={scriptStormLogo} alt="ScriptStorm" className="h-10 opacity-90" />
        </div>

        <GlassCard variant="success" glow hover={false} className="p-8 sm:p-10">
          <GlassCardContent className="p-0 sm:p-0 text-center">
            {/* Success icon with neon glow */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl scale-150" />
                <div className="relative w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center">
                  <CheckCircle className="w-9 h-9 text-emerald-400" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white font-mono mb-2">
              Welcome to ScriptStorm!
            </h1>
            <p className="text-white/60 mb-8">
              Your subscription is now active.
            </p>

            {/* Order ID */}
            {orderId && (
              <div className="bg-white/[0.05] border border-white/[0.1] rounded-lg p-4 mb-8">
                <p className="text-xs text-white/40 mb-1 font-mono">Order ID</p>
                <p className="font-mono text-xs text-white/70 break-all">{orderId}</p>
              </div>
            )}

            {/* Next steps */}
            <div className="space-y-3 mb-8 text-left">
              <div className="flex items-start gap-3 p-3 bg-white/[0.05] border border-white/[0.08] rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <LayoutDashboard className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Your Dashboard Is Ready</p>
                  <p className="text-xs text-white/50 mt-0.5">
                    Your content pipeline and brief form are now active.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/[0.05] border border-white/[0.08] rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Submit Your First Brief</p>
                  <p className="text-xs text-white/50 mt-0.5">
                    Head to your dashboard to submit a content brief and get your first draft.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/[0.05] border border-white/[0.08] rounded-lg">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">Fully Automated Delivery</p>
                  <p className="text-xs text-white/50 mt-0.5">
                    Our AI stack handles everything. No calls, no delays.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-xs text-white/30 mb-5 font-mono">
              Billed in USD · Cancel anytime
            </div>

            {/* Login instructions */}
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-5 text-sm text-white/80">
              Your login details have been sent to your email. Please check your inbox. You can change your password anytime from your account settings.
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate("/auth")}
              className="w-full py-3 px-6 rounded-lg font-semibold text-sm text-white bg-gradient-to-r from-primary to-primary-glow hover:shadow-[0_0_30px_hsl(221_83%_53%/0.4)] transition-all duration-300 flex items-center justify-center gap-2 mb-3"
            >
              Log In Now
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full py-2 px-4 rounded-lg text-sm text-white/50 hover:text-white/80 transition-colors"
            >
              Back to Homepage
            </button>
          </GlassCardContent>
        </GlassCard>
      </div>
    </div>
  );
};

export default ThankYou;