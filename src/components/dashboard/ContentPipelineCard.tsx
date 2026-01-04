import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { NeonProgress } from "@/components/ui/NeonProgress";
import { HoloBadge } from "@/components/ui/HoloBadge";
import { Button } from "@/components/ui/button";
import { Target, CheckCircle, Clock, FileText, Eye, Zap, AlertCircle } from "lucide-react";
import { formatDateTime } from "@/lib/dateUtils";

interface Article {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

interface ContentPipelineCardProps {
  article: Article | null;
  articlesCount: number;
  selectedId: string | null;
  onClearSelection: () => void;
}

export const ContentPipelineCard = ({ article, articlesCount, selectedId, onClearSelection }: ContentPipelineCardProps) => {
  const stages = [
    { name: 'Brief Received', icon: CheckCircle, emoji: '✅', desc: 'Your brief has been received and queued', step: 1 },
    { name: 'AI Research & Strategy', icon: Clock, emoji: '🔄', desc: 'Analyzing keywords and competitor insights', step: 2 },
    { name: 'AI Writing', icon: FileText, emoji: '✍️', desc: 'Content generation in progress', step: 3 },
    { name: 'Quality Control', icon: Eye, emoji: '🔍', desc: 'Human review and optimization', step: 4 },
    { name: 'Ready for Download', icon: Zap, emoji: '🚀', desc: 'Your content will be available here', step: 5 }
  ];

  const getProgress = (status: string) => {
    switch (status) {
      case 'pending': return { step: 2, progress: 20, message: 'Brief received, starting research...' };
      case 'in_progress': return { step: 3, progress: 60, message: 'AI writing in progress...' };
      case 'review': return { step: 4, progress: 80, message: 'Under quality review...' };
      case 'completed': return { step: 5, progress: 100, message: 'Content ready for download!' };
      default: return { step: 1, progress: 20, message: 'Estimated completion: Within 24 hours' };
    }
  };

  return (
    <GlassCard variant="success" glow hover>
      <GlassCardHeader>
        <GlassCardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-400" />
          CONTENT PIPELINE
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        {/* Selection indicator */}
        {selectedId && article && (
          <div className="flex items-center justify-between p-3 bg-primary-glow/10 rounded-lg border border-primary-glow/30 mb-4">
            <span className="text-white/70 font-mono text-xs">
              Viewing: <span className="text-primary-glow">{article.title}</span>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="font-mono text-xs text-primary-glow hover:text-white h-7"
            >
              Show Latest
            </Button>
          </div>
        )}

        {article ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-white/50 font-mono text-xs uppercase tracking-wider">
                {selectedId ? 'Selected Project' : 'Latest Project'}
              </h3>
              <div className="p-4 bg-white/[0.03] rounded-xl border border-emerald-500/20">
                <p className="text-white font-mono text-base mb-1">{article.title}</p>
                <p className="text-white/40 font-mono text-xs">
                  Submitted: {formatDateTime(article.created_at)}
                </p>
              </div>
            </div>

            {/* Pipeline Stages */}
            <div className="space-y-3">
              {(() => {
                const { step: currentStep, progress, message } = getProgress(article.status);
                
                return (
                  <>
                    {stages.map((stage, index) => {
                      const isCompleted = stage.step < currentStep;
                      const isCurrent = stage.step === currentStep;
                      const Icon = stage.icon;
                      
                      return (
                        <div key={stage.name}>
                          <div className="flex items-start gap-3">
                            <div className={`
                              flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0 transition-all duration-300
                              ${isCompleted 
                                ? 'bg-emerald-500/20 border-2 border-emerald-500 shadow-[0_0_10px_hsl(160_84%_45%/0.4)]' 
                                : isCurrent 
                                  ? 'bg-amber-500/20 border-2 border-amber-500 shadow-[0_0_10px_hsl(45_93%_55%/0.4)]' 
                                  : 'bg-white/5 border border-white/20'}
                            `}>
                              <Icon className={`h-4 w-4 ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-amber-400 animate-pulse' : 'text-white/40'}`} />
                            </div>
                            <div className="flex-1 min-w-0 pt-1">
                              <p className={`font-mono text-sm font-semibold ${isCompleted ? 'text-emerald-400' : isCurrent ? 'text-amber-400' : 'text-white/40'}`}>
                                {stage.emoji} {stage.name}
                              </p>
                              <p className={`font-mono text-xs mt-0.5 ${isCompleted || isCurrent ? 'text-white/50' : 'text-white/30'}`}>
                                {stage.desc}
                              </p>
                            </div>
                          </div>
                          {index < stages.length - 1 && (
                            <div className={`ml-4 w-0.5 h-4 ${isCompleted ? 'bg-emerald-500/50' : isCurrent ? 'bg-amber-500/50' : 'bg-white/10'}`} />
                          )}
                        </div>
                      );
                    })}
                    
                    {/* Progress Bar */}
                    <div className="mt-6 pt-4 border-t border-white/10">
                      <div className="flex justify-between text-xs font-mono text-white/50 mb-3">
                        <span>Progress</span>
                        <span>{progress}% Complete</span>
                      </div>
                      <NeonProgress 
                        value={progress} 
                        max={100} 
                        variant={article.status === 'completed' ? 'success' : 'primary'}
                        size="md"
                        animated
                        glowIntensity="high"
                      />
                      <div className="mt-3 flex items-center gap-2">
                        <HoloBadge 
                          variant={article.status === 'completed' ? 'success' : 'warning'} 
                          size="sm"
                          pulse={article.status !== 'completed'}
                        >
                          {article.status === 'completed' ? '✅' : '⏱️'} {message}
                        </HoloBadge>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary-glow/30 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-10 w-10 text-primary-glow/50" />
            </div>
            <p className="text-white font-mono text-xl mb-2">Ready for Content Production</p>
            <p className="text-white/50 font-mono text-sm">
              {articlesCount > 0
                ? "No content briefs submitted this month. Submit a new brief to get started!"
                : "Submit your first content brief to get started"}
            </p>
          </div>
        )}

        {articlesCount > 1 && (
          <p className="text-white/40 font-mono text-xs text-center mt-4 pt-4 border-t border-white/10">
            View all projects in the PROJECTS tab below
          </p>
        )}
      </GlassCardContent>
    </GlassCard>
  );
};
