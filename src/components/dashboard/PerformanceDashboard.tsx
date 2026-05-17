import { useEffect, useState } from "react";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { BarChart3, TrendingUp, Target, FileText } from "lucide-react";
import { NeonProgress } from "@/components/ui/NeonProgress";

interface Article {
  id: string;
  status: string;
  word_count: number;
  created_at: string;
}

interface PerformanceDashboardProps {
  articles: Article[];
  monthlyLimit: number;
}

const PerformanceDashboard = ({ articles, monthlyLimit }: PerformanceDashboardProps) => {
  const [performanceScore, setPerformanceScore] = useState(0);

  useEffect(() => {
    calculatePerformanceScore();
  }, [articles]);

  const calculatePerformanceScore = () => {
    if (articles.length === 0) {
      setPerformanceScore(0);
      return;
    }

    const completedArticles = articles.filter(a => a.status === 'completed').length;
    const completionRate = (completedArticles / articles.length) * 100;
    const utilizationRate = (completedArticles / monthlyLimit) * 100;
    
    // Simple performance score calculation
    const score = Math.min(100, Math.round((completionRate * 0.6) + (utilizationRate * 0.4)));
    setPerformanceScore(score);
  };

  const completedArticles = articles.filter(a => a.status === 'completed').length;
  const inProgressArticles = articles.filter(a => a.status === 'in_progress').length;
  const pendingArticles = articles.filter(a => a.status === 'pending').length;
  const totalWords = articles.reduce((sum, a) => sum + (a.word_count || 0), 0);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'EXCELLENT';
    if (score >= 60) return 'GOOD';
    if (score >= 40) return 'FAIR';
    return 'NEEDS ATTENTION';
  };

  return (
    <div className="space-y-6">
      {/* Performance Score Card */}
      <GlassCard variant="default" glow>
        <GlassCardHeader>
          <GlassCardTitle className="flex items-center gap-2 text-white font-mono tracking-[0.2em] font-bold uppercase">
            <BarChart3 className="h-5 w-5 text-primary-glow" />
            AI-DRIVEN PERFORMANCE DASHBOARD
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="text-center py-8">
            <div className="relative inline-block">
              <div className={`text-6xl font-bold font-mono ${getScoreColor(performanceScore)}`}>
                {performanceScore}
              </div>
              <div className="text-white/70 font-mono text-sm mt-2">
                PERFORMANCE SCORE
              </div>
              <div className={`${getScoreColor(performanceScore)} font-mono text-xs mt-1`}>
                {getScoreLabel(performanceScore)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-green-500/20 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-green-400" />
                <span className="text-white/70 font-mono text-xs">COMPLETED</span>
              </div>
              <div className="text-white font-mono text-2xl">{completedArticles}</div>
              <NeonProgress 
                value={(completedArticles / monthlyLimit) * 100} 
                variant="success"
                size="sm"
                className="mt-2"
              />
            </div>

            <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-yellow-500/20 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-yellow-400" />
                <span className="text-white/70 font-mono text-xs">IN PROGRESS</span>
              </div>
              <div className="text-white font-mono text-2xl">{inProgressArticles}</div>
            </div>

            <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-blue-500/20 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-400" />
                <span className="text-white/70 font-mono text-xs">PENDING</span>
              </div>
              <div className="text-white font-mono text-2xl">{pendingArticles}</div>
            </div>

            <div className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-primary-glow/20 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-4 w-4 text-primary-glow" />
                <span className="text-white/70 font-mono text-xs">TOTAL WORDS</span>
              </div>
              <div className="text-white font-mono text-2xl">{totalWords.toLocaleString()}</div>
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Content Performance Trend */}
      <GlassCard variant="default" glow>
        <GlassCardHeader>
          <GlassCardTitle className="flex items-center gap-2 text-white font-mono tracking-[0.2em] font-bold uppercase text-sm">
            <TrendingUp className="h-4 w-4 text-primary-glow" />
            UTILIZATION RATE
          </GlassCardTitle>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm font-mono text-white/70">
              <span>Content Published</span>
              <span>{completedArticles} / {monthlyLimit}</span>
            </div>
            <NeonProgress 
              value={(completedArticles / monthlyLimit) * 100} 
              variant="primary"
              size="lg"
              animated
            />
            <p className="text-primary-glow font-mono text-xs text-center mt-2">
              {Math.round((completedArticles / monthlyLimit) * 100)}% of monthly capacity utilized
            </p>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};

export default PerformanceDashboard;
