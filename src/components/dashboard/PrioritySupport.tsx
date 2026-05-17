import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Bot, Mail, MessageSquare, Users, Sparkles, Clock, CalendarOff, Globe2, HelpCircle } from "lucide-react";
import { toast } from "sonner";

interface PrioritySupportProps {
  userEmail: string;
  subscriptionTier?: string;
}

type TierKey = "scale" | "authority" | "dominance";

const RESPONSE_TIMES: { key: TierKey; label: string; time: string }[] = [
  { key: "scale", label: "Scale", time: "Within 12 business hours" },
  { key: "authority", label: "Authority", time: "Within 6 business hours" },
  { key: "dominance", label: "Dominance", time: "Within 2–4 business hours" },
];

const normalizeTier = (tier?: string): TierKey => {
  const t = (tier || "").toLowerCase();
  if (t === "authority") return "authority";
  if (t === "dominance") return "dominance";
  return "scale";
};

const PrioritySupport = ({ userEmail, subscriptionTier = "scale" }: PrioritySupportProps) => {
  const currentTier = normalizeTier(subscriptionTier);
  const tierLabel = currentTier.charAt(0).toUpperCase() + currentTier.slice(1);

  const handleLaunchAIChat = () => {
    toast("AI Assistant coming soon", {
      description: "Our 24/7 AI support agent is being integrated. In the meantime, please submit a support request.",
    });
  };

  const handleContactSupport = () => {
    const subject = encodeURIComponent(`Enterprise Support Request – ${tierLabel}`);
    const body = encodeURIComponent(`Hello ScriptStorm Team,

Our support team can assist with the following:

[Please describe your request here]

Account Email: ${userEmail}
Plan: ${tierLabel}

Thank you,
${userEmail}
`);

    window.location.href = `mailto:support@scriptstorm.org?subject=${subject}&body=${body}`;
  };

  return (
    <GlassCard variant="default" glow hover={false}>
      <GlassCardHeader>
        <GlassCardTitle className="flex items-center gap-3 text-white font-mono tracking-wide">
          <span className="p-2 rounded-lg bg-primary/15 border border-primary-glow/20">
            <MessageSquare className="h-4 w-4 text-primary-glow" />
          </span>
          <span className="text-xs sm:text-sm tracking-[0.2em] uppercase text-white/60 font-bold">
            ENTERPRISE SUPPORT CENTER
          </span>
        </GlassCardTitle>
        <p className="text-white/90 text-base sm:text-lg font-medium tracking-tight pt-2">
          24/7 AI assistance + priority human response based on your plan.
        </p>
      </GlassCardHeader>

      <GlassCardContent>
        <div className="space-y-8">
          {/* AI Section — split row */}
          <section className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary-glow opacity-75 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-glow" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-glow font-bold">
                  24/7 AI Assistant
                </span>
              </div>
              <p className="text-white/75 text-sm leading-relaxed">
                Instant answers to common questions: password reset, project status, revisions, and more.
              </p>
              <div className="flex items-start gap-2 pt-1">
                <HelpCircle className="h-3.5 w-3.5 text-white/40 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-white/50 leading-relaxed">
                  📧 Need human help? Use the "SUBMIT A SUPPORT REQUEST" button below. For billing questions, email{" "}
                  <a href="mailto:billing@scriptstorm.org" className="text-primary-glow hover:underline">
                    billing@scriptstorm.org
                  </a>.
                </span>
              </div>
            </div>
            <Button
              onClick={handleLaunchAIChat}
              className="whitespace-nowrap bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-bold uppercase tracking-widest px-6 py-5"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              LAUNCH AI CHAT
            </Button>
          </section>

          {/* Human Support — tier cards */}
          <section className="space-y-4">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">
                Human Support Team
              </span>
              <p className="text-white/70 text-sm italic">
                For complex issues not resolved by AI. Response times vary by plan:
              </p>
            </div>

            <div className="space-y-2">
              <div className="grid grid-cols-12 px-5 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                <div className="col-span-7">Plan</div>
                <div className="col-span-5 text-right">Human Response Time</div>
              </div>

              {RESPONSE_TIMES.map((row) => {
                const isCurrent = row.key === currentTier;
                return (
                  <div
                    key={row.key}
                    className={`grid grid-cols-12 items-center px-5 py-4 rounded-xl border transition-colors ${
                      isCurrent
                        ? "bg-primary/15 border-primary-glow/40"
                        : "bg-white/[0.02] border-white/[0.06]"
                    }`}
                  >
                    <div className="col-span-7 flex items-center gap-3">
                      <span className={`text-base sm:text-lg font-semibold ${isCurrent ? "text-white" : "text-white/70"}`}>
                        {row.label}
                      </span>
                      {isCurrent && (
                        <span className="bg-primary-glow text-primary text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter">
                          YOUR PLAN
                        </span>
                      )}
                    </div>
                    <div className={`col-span-5 text-right font-mono text-sm ${isCurrent ? "text-primary-glow" : "text-white/45"}`}>
                      {row.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Logistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/[0.06]">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/40">
                <Clock className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Business Hours</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                Monday–Friday, 6 AM – 3 PM HKT (Hong Kong Time)
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/40">
                <CalendarOff className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Weekend Policy</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed">
                No human responses on weekends (Saturday–Sunday). Inquiries submitted on weekends will be handled on the next business day (Monday). Our AI assistant remains available 24/7.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/40">
                <Globe2 className="h-4 w-4" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold">Global Notes</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed italic">
                For clients outside Asia, please expect responses within your next business day. Our AI assistant is always available for instant help.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 flex flex-col items-center gap-5">
            <Button
              onClick={handleContactSupport}
              className="w-full bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-bold uppercase tracking-widest py-6"
            >
              <Mail className="h-4 w-4 mr-2" />
              SUBMIT A SUPPORT REQUEST
            </Button>

            {currentTier === "dominance" && (
              <p className="text-amber-300 font-mono text-xs">
                ★ Priority queue — your request is flagged for fastest response.
              </p>
            )}

            <div className="text-center">
              <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-mono font-bold">
                Support Email
              </span>
              <p className="text-sm text-primary-glow font-medium mt-1">support@scriptstorm.org</p>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default PrioritySupport;
