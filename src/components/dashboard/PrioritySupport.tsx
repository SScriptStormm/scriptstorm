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
    <section className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-xl">
      {/* Unified Mono Header bar */}
      <header className="relative border-b border-white/[0.08] bg-white/[0.03]">
        <div className="px-6 sm:px-8 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-md border border-primary-glow/40 bg-primary-glow/10 flex items-center justify-center shrink-0">
              <MessageSquare className="h-4 w-4 text-primary-glow" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-white font-mono text-[11px] tracking-[0.28em] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-glow" />
                <span>Enterprise Support Center</span>
              </div>
              <p className="mt-1 text-white/85 text-sm font-medium">
                24/7 AI assistance + priority human response based on your plan.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase">
            <span className="px-2.5 py-1 rounded border border-white/15 text-white/70">Plan</span>
            <span className="px-2.5 py-1 rounded border border-primary-glow/40 bg-primary-glow/10 text-primary-glow font-bold">
              {tierLabel}
            </span>
          </div>
        </div>
      </header>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Two channels — minimal split, no boxed cards */}
        <div className="grid md:grid-cols-2 gap-px bg-white/[0.06] rounded-xl overflow-hidden border border-white/[0.08]">
          <div className="bg-black/40 p-6 flex flex-col">
            <div className="flex items-center gap-2 text-primary-glow font-mono text-[10px] tracking-[0.24em] uppercase mb-3">
              <Bot className="h-3.5 w-3.5" />
              <span>Channel 01 — AI</span>
            </div>
            <h4 className="text-white text-lg font-semibold leading-tight">24/7 AI Assistant</h4>
            <p className="mt-2 text-white/80 text-[13px] leading-relaxed">
              Instant answers to common questions: password reset, project status, revisions, and more.
            </p>
            <Button
              size="sm"
              onClick={handleLaunchAIChat}
              className="mt-5 w-full bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-bold tracking-widest py-3"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              LAUNCH AI CHAT
            </Button>
          </div>
          <div className="bg-black/40 p-6 flex flex-col">
            <div className="flex items-center gap-2 text-primary-glow font-mono text-[10px] tracking-[0.24em] uppercase mb-3">
              <Users className="h-3.5 w-3.5" />
              <span>Channel 02 — Human</span>
            </div>
            <h4 className="text-white text-lg font-semibold leading-tight">Human Support Team</h4>
            <p className="mt-2 text-white/80 text-[13px] leading-relaxed">
              For complex issues not resolved by AI. Response times vary by plan:
            </p>
            <Button
              size="sm"
              onClick={handleContactSupport}
              className="mt-5 w-full bg-primary text-white border border-primary-glow hover:bg-primary/90 hover:shadow-glow font-mono text-xs font-bold tracking-widest py-3"
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

        {/* Response time — editorial list, not a boxed table */}
        <div>
          <div className="flex items-baseline justify-between border-b border-white/[0.1] pb-2 mb-1">
            <span className="text-white/60 font-mono text-[10px] tracking-[0.24em] uppercase">Plan</span>
            <span className="text-white/60 font-mono text-[10px] tracking-[0.24em] uppercase">Human Response Time</span>
          </div>
          <ul>
            {RESPONSE_TIMES.map((row) => {
              const isCurrent = row.key === currentTier;
              return (
                <li
                  key={row.key}
                  className={`flex items-center justify-between gap-4 py-3.5 border-b border-white/[0.05] last:border-b-0 ${
                    isCurrent ? "pl-3 -ml-3 border-l-2 border-l-primary-glow bg-primary-glow/[0.06]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[15px] font-semibold ${isCurrent ? "text-white" : "text-white/90"}`}>
                      {row.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-primary-glow/15 text-primary-glow border border-primary-glow/40 uppercase tracking-[0.18em]">
                        Your Plan
                      </span>
                    )}
                  </div>
                  <div className={`text-[14px] font-medium ${isCurrent ? "text-primary-glow" : "text-white/80"}`}>
                    {row.time}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Policy notes — three lean columns, no card chrome */}
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-6 pt-2">
          {[
            {
              Icon: Clock,
              label: "Business Hours",
              body: "Business hours: Monday–Friday, 6 AM – 3 PM HKT (Hong Kong Time)",
            },
            {
              Icon: CalendarOff,
              label: "Weekend Policy",
              body: "No human responses on weekends (Saturday–Sunday). Inquiries submitted on weekends will be handled on the next business day (Monday). Our AI assistant remains available 24/7.",
            },
            {
              Icon: Globe2,
              label: "International",
              body: "For clients outside Asia, please expect responses within your next business day. Our AI assistant is always available for instant help.",
            },
          ].map(({ Icon, label, body }) => (
            <div key={label} className="border-t border-white/[0.1] pt-4">
              <div className="flex items-center gap-2 text-primary-glow mb-2">
                <Icon className="h-3.5 w-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] font-mono">{label}</span>
              </div>
              <p className="text-white/85 text-[13px] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-white/[0.08] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-white/80 text-[13px] leading-relaxed">
            📧 Need human help? Use the "SUBMIT A SUPPORT REQUEST" button below. For billing questions, email{" "}
            <a href="mailto:billing@scriptstorm.org" className="text-primary-glow hover:underline font-medium">billing@scriptstorm.org</a>.
          </p>
          <div className="text-xs whitespace-nowrap">
            <span className="text-white/60 font-mono uppercase tracking-[0.18em]">Support Email:</span>{" "}
            <a href="mailto:support@scriptstorm.org" className="text-white hover:text-primary-glow transition-colors underline decoration-primary-glow/40 font-medium ml-1">support@scriptstorm.org</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrioritySupport;
