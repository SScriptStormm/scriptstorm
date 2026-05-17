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
        <div className="space-y-5">
          {/* Two-channel hero: AI + Human side-by-side */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* AI Assistant */}
            <div className="p-5 bg-white/[0.05] backdrop-blur-sm rounded-xl border border-white/[0.1] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-primary-glow/15 border border-primary-glow/30">
                  <Bot className="h-4 w-4 text-primary-glow" />
                </div>
                <h4 className="text-white font-semibold text-sm tracking-wide">24/7 AI Assistant</h4>
              </div>
              <p className="text-white/95 text-sm leading-relaxed mb-4 flex-1">
                Instant answers to common questions: password reset, project status, revisions, and more.
              </p>
              <Button
                size="sm"
                onClick={handleLaunchAIChat}
                className="bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-semibold"
              >
                <Sparkles className="h-3 w-3 mr-1" />
                LAUNCH AI CHAT
              </Button>
            </div>

            {/* Human Support */}
            <div className="p-5 bg-white/[0.05] backdrop-blur-sm rounded-xl border border-white/[0.1] flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-md bg-primary-glow/15 border border-primary-glow/30">
                  <Users className="h-4 w-4 text-primary-glow" />
                </div>
                <h4 className="text-white font-semibold text-sm tracking-wide">Human Support Team</h4>
              </div>
              <p className="text-white/95 text-sm leading-relaxed mb-4 flex-1">
                For complex issues not resolved by AI. Response times vary by plan:
              </p>
              <Button
                size="sm"
                onClick={handleContactSupport}
                className="bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-semibold"
              >
                <Mail className="h-3 w-3 mr-1" />
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
          <div className="rounded-xl border border-white/[0.1] overflow-hidden bg-white/[0.03]">
            <div className="grid grid-cols-2 bg-white/[0.06] px-4 py-2.5 border-b border-white/[0.1]">
              <div className="text-white font-mono text-[11px] uppercase tracking-wider">Plan</div>
              <div className="text-white font-mono text-[11px] uppercase tracking-wider">Human Response Time</div>
            </div>
            {RESPONSE_TIMES.map((row) => {
              const isCurrent = row.key === currentTier;
              return (
                <div
                  key={row.key}
                  className={`grid grid-cols-2 px-4 py-3 border-b border-white/[0.05] last:border-b-0 transition-all ${
                    isCurrent ? "bg-primary-glow/10 border-l-2 border-l-primary-glow" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${isCurrent ? "text-white" : "text-white/95"}`}>
                      {row.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-glow/20 text-primary-glow border border-primary-glow/30">
                        YOUR PLAN
                      </span>
                    )}
                  </div>
                  <div className={`text-sm ${isCurrent ? "text-primary-glow font-semibold" : "text-white/95"}`}>
                    {row.time}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Scannable policy notes — icon-led grid */}
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/[0.1] flex gap-3">
              <Clock className="h-4 w-4 text-primary-glow shrink-0 mt-0.5" />
              <p className="text-white/95 text-xs leading-relaxed">
                Business hours: Monday–Friday, 6 AM – 3 PM HKT (Hong Kong Time)
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/[0.1] flex gap-3">
              <CalendarOff className="h-4 w-4 text-primary-glow shrink-0 mt-0.5" />
              <p className="text-white/95 text-xs leading-relaxed">
                No human responses on weekends (Saturday–Sunday). Inquiries submitted on weekends will be handled on the next business day (Monday). Our AI assistant remains available 24/7.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-white/[0.04] border border-white/[0.1] flex gap-3">
              <Globe2 className="h-4 w-4 text-primary-glow shrink-0 mt-0.5" />
              <p className="text-white/95 text-xs leading-relaxed">
                For clients outside Asia, please expect responses within your next business day. Our AI assistant is always available for instant help.
              </p>
            </div>
          </div>

          {/* Email helper + footer combined */}
          <div className="p-4 rounded-xl border border-white/[0.1] bg-white/[0.03] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-white/95 text-xs leading-relaxed">
              📧 Need human help? Use the "SUBMIT A SUPPORT REQUEST" button below. For billing questions, email{" "}
              <a href="mailto:billing@scriptstorm.org" className="text-primary-glow hover:underline font-medium">billing@scriptstorm.org</a>.
            </p>
            <p className="text-white/95 text-xs whitespace-nowrap">
              Support Email: <span className="text-primary-glow font-medium">support@scriptstorm.org</span>
            </p>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default PrioritySupport;
