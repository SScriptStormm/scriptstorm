import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <Card className="bg-black/30 backdrop-blur-xl border-primary-glow/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
          <MessageSquare className="h-5 w-5 text-primary-glow" />
          PRIORITY SUPPORT PORTAL
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-6 bg-gradient-cyber/10 rounded-lg border border-primary-glow/30 text-center">
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
            <div className="p-4 bg-black/20 rounded-lg border border-primary-glow/20">
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

            <div className="p-4 bg-black/20 rounded-lg border border-primary-glow/20">
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

            <div className="p-4 bg-black/20 rounded-lg border border-primary-glow/20">
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

          <div className="p-4 bg-primary-glow/5 rounded-lg border border-primary-glow/20">
            <p className="text-white/70 font-mono text-xs text-center">
              Support Email: <span className="text-primary-glow">support@scriptstorm.org</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrioritySupport;