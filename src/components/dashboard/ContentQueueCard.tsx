import { useState, useMemo } from "react";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { AnimatedStat } from "@/components/ui/AnimatedStat";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, FileText, MessageSquare, CreditCard, CheckCircle, Clock, AlertCircle, Video, Eye } from "lucide-react";

interface Article {
  id: string;
  status: string;
  content_type?: string;
  word_count?: number;
  youtube_script?: boolean | null;
  created_at: string;
}

interface ContentQueueCardProps {
  articles: Article[];
}

type Period = "this_month" | "last_month" | "all_time";

const getPeriodLabel = (period: Period) => {
  switch (period) {
    case "this_month": return "This Month's Status";
    case "last_month": return "Last Month's Status";
    case "all_time": return "All Time Status";
  }
};

const filterByPeriod = (articles: Article[], period: Period): Article[] => {
  if (period === "all_time") return articles;

  const now = new Date();
  let start: Date, end: Date;

  if (period === "this_month") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  } else {
    start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    end = new Date(now.getFullYear(), now.getMonth(), 1);
  }

  return articles.filter(a => {
    const d = new Date(a.created_at);
    return d >= start && d < end;
  });
};

export const ContentQueueCard = ({ articles }: ContentQueueCardProps) => {
  const [period, setPeriod] = useState<Period>("this_month");

  const filtered = useMemo(() => filterByPeriod(articles, period), [articles, period]);

  const completedCount = filtered.filter(a => a.status === 'completed').length;
  const inProgressCount = filtered.filter(a => a.status === 'in_progress').length;
  const reviewCount = filtered.filter(a => a.status === 'review').length;
  const pendingCount = filtered.filter(a => a.status === 'pending').length;
  const totalCount = filtered.length;
  
  
  const blogArticles = filtered.filter(a => !a.content_type || a.content_type === 'article' || a.content_type === 'blog_article');
  const socialPosts = filtered.filter(a => a.content_type === 'social_media' || a.content_type === 'social_media_post');
  const productDescs = filtered.filter(a => a.content_type === 'product_description');
  const youtubeScripts = filtered.filter(a => a.youtube_script);
  
  const blogWords = blogArticles.reduce((sum, a) => sum + (a.word_count || 0), 0);
  const socialWords = socialPosts.reduce((sum, a) => sum + (a.word_count || 0), 0);
  const productWords = productDescs.reduce((sum, a) => sum + (a.word_count || 0), 0);
  const youtubeWords = youtubeScripts.reduce((sum, a) => sum + (a.word_count || 0), 0);

  if (articles.length === 0) return null;

  return (
    <GlassCard variant="default" glow hover={false}>
      <GlassCardHeader>
        <div className="flex items-center justify-between w-full">
          <GlassCardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary-glow" />
            PRODUCTION SUMMARY
          </GlassCardTitle>
          <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
            <SelectTrigger className="w-[140px] h-8 text-xs bg-white/[0.05] border-white/[0.12] text-white/80 font-mono uppercase tracking-wider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(222,30%,12%)] border-white/[0.12]">
              <SelectItem value="this_month" className="text-white/80 font-mono text-xs">This Month</SelectItem>
              <SelectItem value="last_month" className="text-white/80 font-mono text-xs">Last Month</SelectItem>
              <SelectItem value="all_time" className="text-white/80 font-mono text-xs">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </GlassCardHeader>
      <GlassCardContent>

        {/* Status Overview */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-white/60 font-mono text-xs uppercase tracking-wider mb-3 sm:mb-4">{getPeriodLabel(period)}</h3>
          <div className="flex flex-wrap items-center justify-center gap-8 p-4 bg-white/[0.03] rounded-xl border border-white/[0.12]">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <AnimatedStat value={completedCount} label="Completed" variant="success" size="sm" />
            </div>
            
            <div className="w-px h-10 bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <AnimatedStat value={inProgressCount} label="In Progress" variant="warning" size="sm" />
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Eye className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
              </div>
              <AnimatedStat value={reviewCount} label="In Review" variant="purple" size="sm" />
            </div>
            
            <div className="hidden sm:block w-px h-10 bg-white/10" />
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
              </div>
              <AnimatedStat value={pendingCount} label="Pending" variant="primary" size="sm" />
            </div>
          </div>
        </div>
        
        {/* Content Breakdown */}
        <div>
          <h3 className="text-white/60 font-mono text-xs uppercase tracking-wider mb-4">Content Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Blog Articles */}
            <div className="group relative p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.12] hover:border-primary-glow/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary-glow" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">Blog Articles</span>
                </div>
                <AnimatedStat value={blogArticles.length} label={`${blogWords.toLocaleString()} words`} variant="primary" size="sm" />
              </div>
            </div>
            
            {/* Social Posts */}
            <div className="group relative p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.12] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">Social Posts</span>
                </div>
                <AnimatedStat value={socialPosts.length} label={`${socialWords.toLocaleString()} words`} variant="success" size="sm" />
              </div>
            </div>

            {/* YouTube Scripts */}
            <div className="group relative p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.12] hover:border-rose-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <Video className="h-4 w-4 text-rose-400" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">YT Scripts</span>
                </div>
                <AnimatedStat value={youtubeScripts.length} label={`${youtubeWords.toLocaleString()} words`} variant="danger" size="sm" />
              </div>
            </div>
            
            {/* Product Descriptions */}
            <div className="group relative p-3 sm:p-4 bg-white/[0.03] rounded-xl border border-white/[0.12] hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <CreditCard className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">Product Desc</span>
                </div>
                <AnimatedStat value={productDescs.length} label={`${productWords.toLocaleString()} words`} variant="purple" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};
