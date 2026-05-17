import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Bot, Mail, MessageSquare, Users, Sparkles } from "lucide-react";
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
        <div className="space-y-6">
          {/* AI Assistant Card */}
          <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="h-4 w-4 text-primary-glow" />
              <h4 className="text-white font-mono text-sm">24/7 AI Assistant</h4>
            </div>
            <p className="text-white/85 font-mono text-xs mb-3">
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
            <p className="text-white/80 font-mono text-xs mt-3">
              📧 Need human help? Use the "SUBMIT A SUPPORT REQUEST" button below. For billing questions, email{" "}
              <a href="mailto:billing@scriptstorm.org" className="text-primary-glow hover:underline">billing@scriptstorm.org</a>.
            </p>
          </div>

          {/* Human Support Card */}
          <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary-glow" />
              <h4 className="text-white font-mono text-sm">Human Support Team</h4>
            </div>
            <p className="text-white/85 font-mono text-xs mb-3">
              For complex issues not resolved by AI. Response times vary by plan:
            </p>

            {/* Response time table */}
            <div className="rounded-lg border border-white/[0.1] overflow-hidden">
              <div className="grid grid-cols-2 bg-white/[0.04] px-4 py-2 border-b border-white/[0.1]">
                <div className="text-white/75 font-mono text-xs uppercase tracking-wider">Plan</div>
                <div className="text-white/75 font-mono text-xs uppercase tracking-wider">Human Response Time</div>
              </div>
              {RESPONSE_TIMES.map((row) => {
                const isCurrent = row.key === currentTier;
                return (
                  <div
                    key={row.key}
                    className={`grid grid-cols-2 px-4 p-3 border-b border-white/[0.05] last:border-b-0 transition-all ${
                      isCurrent
                        ? "bg-primary-glow/10 border-l-2 border-l-primary-glow"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-sm ${isCurrent ? "text-white" : "text-white/85"}`}>
                        {row.label}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary-glow/20 text-primary-glow border border-primary-glow/30">
                          YOUR PLAN
                        </span>
                      )}
                    </div>
                    <div className={`font-mono text-sm ${isCurrent ? "text-primary-glow" : "text-white/80"}`}>
                      {row.time}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-white/75 font-mono text-xs mt-3">
              Business hours: Monday–Friday, 6 AM – 3 PM HKT (Hong Kong Time)
            </p>
            <p className="text-white/70 font-mono text-xs mt-2">
              No human responses on weekends (Saturday–Sunday). Inquiries submitted on weekends will be handled on the next business day (Monday). Our AI assistant remains available 24/7.
            </p>
            <p className="text-white/70 font-mono text-xs mt-2 italic">
              For clients outside Asia, please expect responses within your next business day. Our AI assistant is always available for instant help.
            </p>
          </div>

          {/* Contact Action Block */}
          <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all text-center">
            <Button
              size="sm"
              onClick={handleContactSupport}
              className="w-full bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-semibold"
            >
              <Mail className="h-3 w-3 mr-1" />
              SUBMIT A SUPPORT REQUEST
            </Button>
            {currentTier === "dominance" && (
              <p className="text-amber-300 font-mono text-xs mt-3">
                ★ Priority queue — your request is flagged for fastest response.
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.1]">
            <p className="text-white/85 font-mono text-xs text-center">
              Support Email: <span className="text-primary-glow">support@scriptstorm.org</span>
            </p>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default PrioritySupport;
