import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, FileText, Target, Shield, Zap, Package } from "lucide-react";

interface PackageFeaturesWidgetProps {
  subscriptionTier: string;
}

export const PackageFeaturesWidget = ({ subscriptionTier }: PackageFeaturesWidgetProps) => {
  const tier = subscriptionTier.toLowerCase();

  const tierColors: Record<string, string> = {
    starter: 'bg-blue-500/20 text-blue-300 border-blue-400/50',
    growth: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50',
    scale: 'bg-purple-500/20 text-purple-300 border-purple-400/50',
    authority: 'bg-orange-500/20 text-orange-300 border-orange-400/50',
    dominance: 'bg-amber-500/20 text-amber-300 border-amber-400/50'
  };

  const tierEmojis: Record<string, string> = {
    starter: '🚀',
    growth: '🔥',
    scale: '⚡',
    authority: '👑',
    dominance: '💎'
  };

  const getFeaturesByTier = () => {
    switch (tier) {
      case "starter":
        return {
          name: "Starter Package",
          wordCount: "1,500-2,000 words",
          articles: 5,
          articleLabel: "SEO Blog Articles",
          socialLabel: "15 Social Media Posts",
          socialSubtitle: "LinkedIn, X (Twitter), Instagram",
          productLabel: "Product/Service Descriptions",
          productCount: 5,
          revisionLabel: "1 Revision Round",
          hasContentCalendar: false,
        };
      case "growth":
        return {
          name: "Growth Package",
          wordCount: "1,500-2,000 words",
          articles: 10,
          articleLabel: "SEO Blog Articles",
          socialLabel: "30 Social & Video Content",
          socialSubtitle: "LinkedIn, X, Instagram + YouTube video script outlines",
          productLabel: "Product/Service Descriptions",
          productCount: 10,
          revisionLabel: "2 Revision Rounds",
          hasContentCalendar: true,
        };
      case "scale":
        return {
          name: "Scale Package",
          wordCount: "2,000-3,000 words",
          articles: 25,
          articleLabel: "SEO Blog Articles",
          socialLabel: "75 Social & Video Content",
          socialSubtitle: "Multi-platform mix including YouTube script outlines",
          productLabel: "Product/Service Descriptions",
          productCount: 25,
          revisionLabel: "2 Revision Rounds",
          hasContentCalendar: false,
        };
      case "authority":
        return {
          name: "Authority Package",
          wordCount: "2,000-3,000 words",
          articles: 30,
          articleLabel: "Industry-Leading SEO Blog Articles",
          socialLabel: "90 Social & Video Content",
          socialSubtitle: "Multi-platform mix including YouTube script outlines",
          productLabel: "Product/Service Descriptions",
          productCount: 30,
          revisionLabel: "3 Revision Rounds",
          hasContentCalendar: false,
        };
      case "dominance":
        return {
          name: "Dominance Package",
          wordCount: "2,000-5,000 words",
          articles: 50,
          articleLabel: "Unbeatable Cornerstone SEO Blog Articles",
          socialLabel: "150 Social & Video Content",
          socialSubtitle: "Multi-platform mix including YouTube script outlines",
          productLabel: "Unlimited Product/Service Descriptions*",
          productCount: "Unlimited",
          revisionLabel: "Unlimited Revisions*",
          hasContentCalendar: false,
        };
      default:
        return {
          name: "Starter Package",
          wordCount: "1,500-2,000 words",
          articles: 5,
          articleLabel: "SEO Blog Articles",
          socialLabel: "15 Social Media Posts",
          socialSubtitle: "LinkedIn, X (Twitter), Instagram",
          productLabel: "Product/Service Descriptions",
          productCount: 5,
          revisionLabel: "1 Revision Round",
          hasContentCalendar: false,
        };
    }
  };

  const features = getFeaturesByTier();

  const getKeywordResearchLabel = () => {
    const tier = subscriptionTier.toLowerCase();
    switch (tier) {
      case "starter":
        return "Standard Keyword Research";
      case "growth":
        return "Advanced Keyword & Competitor Research";
      case "scale":
        return "Advanced Keyword & Competitor Annihilation";
      case "authority":
        return "Strategic Keyword & Topic Mapping";
      case "dominance":
        return "Enterprise Keyword Intelligence";
      default:
        return "Standard Keyword Research";
    }
  };

  const getKeywordResearchDescription = () => {
    const tier = subscriptionTier.toLowerCase();
    switch (tier) {
      case "starter":
        return "SEO-optimized targeting";
      case "growth":
        return "Find gaps in competitors' strategies";
      case "scale":
        return "Identify and exploit competitor weaknesses";
      case "authority":
        return "Map the competitive landscape";
      case "dominance":
        return "Proprietary insights for untapped opportunities";
      default:
        return "SEO-optimized targeting";
    }
  };

  const getDeliveryTimeframe = () => {
    const tier = subscriptionTier.toLowerCase();
    if (tier === "dominance") {
      return "12-Hour Lightning Delivery ⚡";
    }
    // All tiers (starter, growth, scale, authority) get 24-hour delivery
    return "24-Hour Orchestrated Delivery";
  };

  const getSupportLevel = () => {
    const tier = subscriptionTier.toLowerCase();
    switch (tier) {
      case "scale":
        return { label: "Efficient Support Portal", description: "Streamlined support access" };
      case "authority":
        return { label: "Priority Support Portal", description: "Fast-track support queue" };
      case "dominance":
        return { label: "Priority Support & Dedicated Workspace", description: "VIP support + private workspace" };
      default:
        return null;
    }
  };

  const showCompetitorGapExploitation = subscriptionTier.toLowerCase() === "authority";
  const isDominance = subscriptionTier.toLowerCase() === "dominance";

  const hasDeliverySupportFeatures = getDeliveryTimeframe() || getSupportLevel() || isDominance;

  const tierVariant = tier as "starter" | "growth" | "scale" | "authority" | "dominance";

  return (
    <GlassCard variant={tierVariant} glow hover className="p-0 overflow-hidden">
      <GlassCardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <GlassCardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
            YOUR PACKAGE
          </GlassCardTitle>
          <Badge className={`${tierColors[tier] || tierColors.starter} font-mono uppercase`}>
            {tierEmojis[tier] || tierEmojis.starter} {features.name}
          </Badge>
        </div>
      </GlassCardHeader>
      <GlassCardContent className="pt-0">
      
      <Accordion type="single" collapsible defaultValue="content-deliverables" className="w-full">
        {/* Content Deliverables Section */}
        <AccordionItem value="content-deliverables" className="border-primary-glow/20">
          <AccordionTrigger className="hover:no-underline hover:text-primary-glow transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              <span className="text-sm font-bold text-white font-mono">Content Deliverables</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white font-mono">
                    <strong>{features.articles}</strong> {features.articleLabel}
                  </p>
                  <p className="text-xs text-white/60 font-mono mt-0.5">{features.wordCount} each</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white font-mono">
                    <strong>{features.socialLabel}</strong>
                  </p>
                  <p className="text-xs text-white/60 font-mono mt-0.5">{features.socialSubtitle}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white font-mono">
                    <strong>{features.productCount}</strong> {features.productLabel}
                  </p>
                  <p className="text-xs text-white/60 font-mono mt-0.5">Benefit-focused copy</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white font-mono">
                    <strong>{features.revisionLabel}</strong>
                  </p>
                  <p className="text-xs text-white/60 font-mono mt-0.5">Per content piece</p>
                </div>
              </div>

              {features.hasContentCalendar && (
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-white font-mono">
                      <strong>Automated Content Calendar</strong>
                    </p>
                    <p className="text-xs text-white/60 font-mono mt-0.5">Strategic monthly plan aligned with business goals</p>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Research & Strategy Section */}
        <AccordionItem value="research-strategy" className="border-primary-glow/20">
          <AccordionTrigger className="hover:no-underline hover:text-primary-glow transition-colors">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              <span className="text-sm font-bold text-white font-mono">Research & Strategy</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white font-mono">
                    <strong>{getKeywordResearchLabel()}</strong>
                  </p>
                  <p className="text-xs text-white/60 font-mono mt-0.5">{getKeywordResearchDescription()}</p>
                </div>
              </div>

              {showCompetitorGapExploitation && (
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-white font-mono">
                      <strong>Competitor Gap Exploitation</strong>
                    </p>
                    <p className="text-xs text-white/60 font-mono mt-0.5">In-depth analysis revealing content voids</p>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Quality Guarantees Section */}
        <AccordionItem value="quality-guarantees" className="border-primary-glow/20">
          <AccordionTrigger className="hover:no-underline hover:text-primary-glow transition-colors">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
              <span className="text-sm font-bold text-white font-mono">Quality Guarantees</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-white font-mono">
                    <strong>Plagiarism & AI Scan Guarantee</strong>
                  </p>
                  <p className="text-xs text-white/60 font-mono mt-0.5">100% original content</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Delivery & Support Section (only for Scale+) */}
        {hasDeliverySupportFeatures && (
          <AccordionItem value="delivery-support" className="border-primary-glow/20">
            <AccordionTrigger className="hover:no-underline hover:text-primary-glow transition-colors">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                <span className="text-sm font-bold text-white font-mono">Delivery & Support</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                {getDeliveryTimeframe() && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-white font-mono">
                        <strong>{getDeliveryTimeframe()}</strong>
                      </p>
                      <p className="text-xs text-white/60 font-mono mt-0.5">
                        {isDominance ? "Ultra-fast turnaround for urgent content" : "Coordinated delivery workflow"}
                      </p>
                    </div>
                  </div>
                )}

                {getSupportLevel() && (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-white font-mono">
                        <strong>{getSupportLevel()?.label}</strong>
                      </p>
                      <p className="text-xs text-white/60 font-mono mt-0.5">{getSupportLevel()?.description}</p>
                    </div>
                  </div>
                )}

                {isDominance && (
                  <>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-white font-mono">
                          <strong>Performance Dashboard</strong>
                          <Badge variant="outline" className="ml-2 border-primary-glow/50 text-primary-glow font-mono text-[10px]">
                            EXCLUSIVE
                          </Badge>
                        </p>
                        <p className="text-xs text-white/60 font-mono mt-0.5">Advanced analytics & insights</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-white font-mono">
                          <strong>Market Roadmap</strong>
                          <Badge variant="outline" className="ml-2 border-primary-glow/50 text-primary-glow font-mono text-[10px]">
                            EXCLUSIVE
                          </Badge>
                        </p>
                        <p className="text-xs text-white/60 font-mono mt-0.5">Strategic content planning</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-primary-glow mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-white font-mono">
                          <strong>White-Glove Revision Handling</strong>
                          <Badge variant="outline" className="ml-2 border-primary-glow/50 text-primary-glow font-mono text-[10px]">
                            EXCLUSIVE
                          </Badge>
                        </p>
                        <p className="text-xs text-white/60 font-mono mt-0.5">Personalized revision handling through your dedicated workspace</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
      </GlassCardContent>
    </GlassCard>
  );
};
