import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { NeonProgress } from "@/components/ui/NeonProgress";
import { BarChart3, FileText, MessageSquare, CreditCard, CheckCircle, Clock, AlertCircle, Video } from "lucide-react";

interface Article {
  id: string;
  status: string;
  content_type?: string;
  word_count?: number;
  youtube_script?: boolean | null;
}

interface ContentQueueCardProps {
  articles: Article[];
}

export const ContentQueueCard = ({ articles }: ContentQueueCardProps) => {
  const completedCount = articles.filter(a => a.status === 'completed').length;
  const inProgressCount = articles.filter(a => a.status === 'in_progress').length;
  const pendingCount = articles.filter(a => a.status === 'pending').length;
  const totalCount = articles.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  const blogArticles = articles.filter(a => !a.content_type || a.content_type === 'article' || a.content_type === 'blog_article');
  const socialPosts = articles.filter(a => a.content_type === 'social_media' || a.content_type === 'social_media_post');
  const productDescs = articles.filter(a => a.content_type === 'product_description');
  const youtubeScripts = articles.filter(a => a.youtube_script);
  
  const blogWords = blogArticles.reduce((sum, a) => sum + (a.word_count || 0), 0);
  const socialWords = socialPosts.reduce((sum, a) => sum + (a.word_count || 0), 0);
  const productWords = productDescs.reduce((sum, a) => sum + (a.word_count || 0), 0);
  const youtubeWords = youtubeScripts.reduce((sum, a) => sum + (a.word_count || 0), 0);

  if (articles.length === 0) return null;

  return (
    <GlassCard variant="default" glow hover={false}>
      <GlassCardHeader>
        <GlassCardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary-glow" />
          MONTHLY PRODUCTION SUMMARY
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        {/* Completion Rate */}
        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/50 font-mono text-xs uppercase tracking-wider">Completion Rate</span>
            <span className="text-white font-mono text-sm">
              {completedCount} of {totalCount} completed — <span className="text-primary-glow">{completionRate}%</span>
            </span>
          </div>
          <NeonProgress
            value={completedCount}
            max={totalCount}
            variant="tier"
            size="md"
            animated
            glowIntensity="medium"
          />
        </div>

        {/* Status Overview */}
        <div className="mb-6">
          <h3 className="text-white/50 font-mono text-xs uppercase tracking-wider mb-4">This Month's Status</h3>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 p-4 bg-white/[0.03] rounded-xl border border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <AnimatedStat
                value={completedCount}
                label="Completed"
                variant="success"
                size="sm"
              />
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <AnimatedStat
                value={inProgressCount}
                label="In Progress"
                variant="warning"
                size="sm"
              />
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <AnimatedStat
                value={pendingCount}
                label="Pending"
                variant="primary"
                size="sm"
              />
            </div>
          </div>
        </div>
        
        {/* Content Breakdown */}
        <div>
          <h3 className="text-white/50 font-mono text-xs uppercase tracking-wider mb-4">Content Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Blog Articles */}
            <div className="group relative p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] hover:border-primary-glow/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary-glow" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">Blog Articles</span>
                </div>
                <AnimatedStat
                  value={blogArticles.length}
                  label={`${blogWords.toLocaleString()} words`}
                  variant="primary"
                  size="md"
                />
              </div>
            </div>
            
            {/* Social Posts */}
            <div className="group relative p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">Social Posts</span>
                </div>
                <AnimatedStat
                  value={socialPosts.length}
                  label={`${socialWords.toLocaleString()} words`}
                  variant="success"
                  size="md"
                />
              </div>
            </div>

            {/* YouTube Scripts */}
            <div className="group relative p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] hover:border-rose-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <Video className="h-4 w-4 text-rose-400" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">YT Scripts</span>
                </div>
                <AnimatedStat
                  value={youtubeScripts.length}
                  label={`${youtubeWords.toLocaleString()} words`}
                  variant="default"
                  size="md"
                />
              </div>
            </div>
            
            {/* Product Descriptions */}
            <div className="group relative p-4 bg-white/[0.03] rounded-xl border border-white/[0.08] hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">Product Desc</span>
                </div>
                <AnimatedStat
                  value={productDescs.length}
                  label={`${productWords.toLocaleString()} words`}
                  variant="default"
                  size="md"
                />
              </div>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};
