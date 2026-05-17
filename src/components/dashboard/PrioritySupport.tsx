import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Bot, Mail, MessageSquare, Users, Sparkles, Clock, CalendarOff, Globe2 } from "lucide-react";
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
        <GlassCardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
          <MessageSquare className="h-5 w-5 text-primary-glow" />
          ENTERPRISE SUPPORT CENTER
        </GlassCardTitle>
        <p className="text-white/80 font-mono text-xs sm:text-sm pt-1">
          24/7 AI assistance + priority human response based on your plan.
        </p>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="space-y-8">
          {/* Two-channel hero: AI + Human side-by-side */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* AI Assistant */}
            <div className="group p-6 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-primary-glow/40 transition-colors flex flex-col">
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 rounded-lg bg-primary-glow/15 border border-primary-glow/30 shrink-0">
                  <Bot className="h-5 w-5 text-primary-glow" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">24/7 AI Assistant</h4>
                  <p className="text-white/85 text-sm leading-relaxed">
                    Instant answers to common questions: password reset, project status, revisions, and more.
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleLaunchAIChat}
                className="mt-auto w-full bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-bold tracking-widest py-3"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                LAUNCH AI CHAT
              </Button>
            </div>

            {/* Human Support */}
            <div className="group p-6 rounded-xl bg-white/[0.05] border border-white/[0.1] hover:border-primary-glow/40 transition-colors flex flex-col">
              <div className="flex items-start gap-4 mb-5">
                <div className="p-3 rounded-lg bg-primary-glow/15 border border-primary-glow/30 shrink-0">
                  <Users className="h-5 w-5 text-primary-glow" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-base mb-1">Human Support Team</h4>
                  <p className="text-white/85 text-sm leading-relaxed">
                    For complex issues not resolved by AI. Response times vary by plan:
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={handleContactSupport}
                className="mt-auto w-full bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-bold tracking-widest py-3"
              >
                <Mail className="h-4 w-4 mr-2" />
                SUBMIT A SUPPORT REQUEST
              </Button>
              {currentTier === "dominance" && (
                <p className="text-amber-300 text-xs mt-3 font-medium">
                  ★ Priority queue — your request is flagged for fastest response.
                </p>
              )}
            </div>
          </div>

          {/* Response time table */}
          <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-black/20">
            <div className="grid grid-cols-2 bg-white/[0.05] px-6 py-4">
              <div className="text-white/70 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">Plan</div>
              <div className="text-white/70 font-mono text-[10px] font-bold uppercase tracking-[0.18em]">Human Response Time</div>
            </div>
            <div className="divide-y divide-white/[0.05]">
              {RESPONSE_TIMES.map((row) => {
                const isCurrent = row.key === currentTier;
                return (
                  <div
                    key={row.key}
                    className={`grid grid-cols-2 px-6 py-4 items-center ${
                      isCurrent ? "bg-primary-glow/10" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold ${isCurrent ? "text-white" : "text-white/90"}`}>
                        {row.label}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary-glow/20 text-primary-glow border border-primary-glow/30 uppercase tracking-tighter">
                          YOUR PLAN
                        </span>
                      )}
                    </div>
                    <div className={`text-sm font-medium ${isCurrent ? "text-primary-glow" : "text-white/80"}`}>
                      {row.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scannable policy notes — icon chip header + body */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-white/[0.1] bg-white/[0.05] space-y-3">
              <div className="flex items-center gap-2 text-primary-glow">
                <Clock className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] font-mono">Business Hours</span>
              </div>
              <p className="text-white/90 text-xs leading-relaxed">
                Business hours: Monday–Friday, 6 AM – 3 PM HKT (Hong Kong Time)
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.1] bg-white/[0.05] space-y-3">
              <div className="flex items-center gap-2 text-primary-glow">
                <CalendarOff className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] font-mono">Weekend Policy</span>
              </div>
              <p className="text-white/90 text-xs leading-relaxed">
                No human responses on weekends (Saturday–Sunday). Inquiries submitted on weekends will be handled on the next business day (Monday). Our AI assistant remains available 24/7.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-white/[0.1] bg-white/[0.05] space-y-3">
              <div className="flex items-center gap-2 text-primary-glow">
                <Globe2 className="h-4 w-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] font-mono">International</span>
              </div>
              <p className="text-white/90 text-xs leading-relaxed">
                For clients outside Asia, please expect responses within your next business day. Our AI assistant is always available for instant help.
              </p>
            </div>
          </div>

          {/* Helper Line & Footer */}
          <div className="pt-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="text-white/80 text-xs leading-relaxed">
              📧 Need human help? Use the "SUBMIT A SUPPORT REQUEST" button below. For billing questions, email{" "}
              <a href="mailto:billing@scriptstorm.org" className="text-primary-glow hover:underline font-medium">billing@scriptstorm.org</a>.
            </p>
            <div className="text-xs whitespace-nowrap">
              <span className="text-white/60 font-mono uppercase tracking-[0.18em]">Support Email:</span>{" "}
              <a href="mailto:support@scriptstorm.org" className="text-white hover:text-primary-glow transition-colors underline decoration-primary-glow/40 font-medium ml-1">support@scriptstorm.org</a>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default PrioritySupport;
