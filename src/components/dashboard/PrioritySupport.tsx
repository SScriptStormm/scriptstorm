import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone } from "lucide-react";

interface PrioritySupportProps {
  userEmail: string;
  subscriptionTier?: string;
}

type TierConfig = {
  headerTitle: string;
  badgeLabel: string;
  badgeClass: string;
  heroTitle: string;
  heroDescription: string;
  buttonLabel: string;
  emailSubject: string;
  features: { title: string; description: string }[];
};

const getTierConfig = (tier: string): TierConfig => {
  const t = tier.toLowerCase();

  if (t === "dominance") {
    return {
      headerTitle: "PRIORITY SUPPORT + DEDICATED WORKSPACE",
      badgeLabel: "VIP ACCESS",
      badgeClass: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
      heroTitle: "White-Glove Concierge Support",
      heroDescription:
        "As a Dominance client, you have access to your dedicated client success workspace and our top-tier priority support team — handled with absolute precision.",
      buttonLabel: "CONTACT VIP SUPPORT",
      emailSubject: "Dominance VIP Support Request",
      features: [
        {
          title: "Lightning Response Times",
          description: "Top of the queue with responses within 2 business hours",
        },
        {
          title: "Dedicated Client Success Workspace",
          description: "Private workspace with your assigned strategist and content team",
        },
        {
          title: "Unlimited Strategic Consultations",
          description: "On-demand strategy sessions whenever you need them",
        },
      ],
    };
  }

  if (t === "authority") {
    return {
      headerTitle: "PRIORITY SUPPORT PORTAL",
      badgeLabel: "PRIORITY ACCESS",
      badgeClass: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
      heroTitle: "White-Glove Support",
      heroDescription:
        "As a premium client, you have access to our dedicated priority support team.",
      buttonLabel: "CONTACT PRIORITY SUPPORT",
      emailSubject: "Priority Support Request",
      features: [
        {
          title: "Faster Response Times",
          description: "Priority queue with responses within 4 business hours",
        },
        {
          title: "Dedicated Account Manager",
          description: "Direct access to your assigned content strategist",
        },
        {
          title: "Strategic Consultations",
          description: "Quarterly strategy sessions included with your plan",
        },
      ],
    };
  }

  // Scale (default for this tab)
  return {
    headerTitle: "EFFICIENT SUPPORT PORTAL",
    badgeLabel: "SCALE ACCESS",
    badgeClass: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
    heroTitle: "Streamlined Support",
    heroDescription:
      "Streamlined communication for seamless project management. Our team is here to help keep your content engine running smoothly.",
    buttonLabel: "CONTACT SUPPORT",
    emailSubject: "Support Request",
    features: [
      {
        title: "Standard Response Times",
        description: "Responses within 24 business hours",
      },
      {
        title: "Direct Project Communication",
        description: "Streamlined channel to your content team",
      },
      {
        title: "Seamless Project Management",
        description: "Coordinated handling of revisions and deliverables",
      },
    ],
  };
};

const PrioritySupport = ({ userEmail, subscriptionTier = "scale" }: PrioritySupportProps) => {
  const config = getTierConfig(subscriptionTier);

  const handleContactSupport = () => {
    const subject = encodeURIComponent(config.emailSubject);
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
            {config.headerTitle}
          </GlassCardTitle>
          <div className={`px-3 py-1 ${config.badgeClass} rounded-full text-xs font-mono font-semibold`}>
            {config.badgeLabel}
          </div>
        </div>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="space-y-6">
          <div className="p-6 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-glow/20 border-2 border-primary-glow mb-4">
              <Phone className="h-8 w-8 text-primary-glow" />
            </div>
            <h3 className="text-white font-mono text-lg mb-2">{config.heroTitle}</h3>
            <p className="text-white/70 font-mono text-sm mb-4">
              {config.heroDescription}
            </p>
            <Button
              onClick={handleContactSupport}
              className="w-full bg-primary hover:bg-primary-glow text-white font-mono tracking-wide border-2 border-primary-glow/50 hover:border-primary-glow shadow-cyber transition-all"
            >
              <Mail className="h-4 w-4 mr-2" />
              {config.buttonLabel}
            </Button>
          </div>

          <div className="space-y-3">
            {config.features.map((feature) => (
              <div
                key={feature.title}
                className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="text-primary-glow font-mono text-sm">✓</div>
                  <div>
                    <h4 className="text-white font-mono text-sm mb-1">{feature.title}</h4>
                    <p className="text-white/60 font-mono text-xs">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
