import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";

interface PrioritySupportProps {
  userEmail: string;
}

const PrioritySupport = ({ userEmail }: PrioritySupportProps) => {
  const handleContactSupport = () => {
    const subject = encodeURIComponent('Priority Support Request');
    const body = encodeURIComponent(`
Hello ScriptStorm Team,

I need assistance with:

[Please describe your request here]

Account Email: ${userEmail}

Thank you,
${userEmail}
    `);
    
    window.location.href = `mailto:support@scriptstorm.org?subject=${subject}&body=${body}`;
  };

  return (
    <GlassCard variant="default" glow>
      <GlassCardHeader>
        <div className="flex items-center justify-between">
          <GlassCardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
            <MessageSquare className="h-5 w-5 text-primary-glow" />
            PRIORITY SUPPORT PORTAL
          </GlassCardTitle>
          <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-mono font-semibold">
            PRIORITY ACCESS
          </div>
        </div>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="space-y-6">
          <div className="p-6 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-glow/20 border-2 border-primary-glow mb-4">
              <Phone className="h-8 w-8 text-primary-glow" />
            </div>
            <h3 className="text-white font-mono text-lg mb-2">White-Glove Support</h3>
            <p className="text-white/70 font-mono text-sm mb-4">
              As a premium client, you have access to our dedicated priority support team.
            </p>
            <Button
              onClick={handleContactSupport}
              className="w-full bg-primary hover:bg-primary-glow text-white font-mono tracking-wide border-2 border-primary-glow/50 hover:border-primary-glow shadow-cyber transition-all"
            >
              <Mail className="h-4 w-4 mr-2" />
              CONTACT PRIORITY SUPPORT
            </Button>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] transition-all">
              <div className="flex items-start gap-3">
                <div className="text-primary-glow font-mono text-sm">✓</div>
                <div>
                  <h4 className="text-white font-mono text-sm mb-1">Faster Response Times</h4>
                  <p className="text-white/60 font-mono text-xs">
                    Priority queue with responses within 4 business hours
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] transition-all">
              <div className="flex items-start gap-3">
                <div className="text-primary-glow font-mono text-sm">✓</div>
                <div>
                  <h4 className="text-white font-mono text-sm mb-1">Dedicated Account Manager</h4>
                  <p className="text-white/60 font-mono text-xs">
                    Direct access to your assigned content strategist
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] transition-all">
              <div className="flex items-start gap-3">
                <div className="text-primary-glow font-mono text-sm">✓</div>
                <div>
                  <h4 className="text-white font-mono text-sm mb-1">Strategic Consultations</h4>
                  <p className="text-white/60 font-mono text-xs">
                    Quarterly strategy sessions included with your plan
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white/[0.03] rounded-lg border border-white/[0.1]">
            <p className="text-white/70 font-mono text-xs text-center">
              Support Email: <span className="text-primary-glow">support@scriptstorm.org</span>
            </p>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default PrioritySupport;
