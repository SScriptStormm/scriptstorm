import { useState, useMemo } from "react";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { AnimatedStat } from "@/components/ui/AnimatedStat";
import { formatMonthYear } from "@/lib/dateUtils";

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

const getMonthYear = (dateString: string): string => {
  const d = new Date(dateString);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
};

const getMonthLabel = (monthYear: string): string => {
  const [year, month] = monthYear.split('-');
  return formatMonthYear(new Date(parseInt(year), parseInt(month) - 1, 1));
};

const getCurrentMonthYear = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

export const ContentQueueCard = ({ articles }: ContentQueueCardProps) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(getCurrentMonthYear());

  const availableMonths = useMemo(() => {
    const monthSet = new Map<string, number>();
    articles.forEach(a => {
      const my = getMonthYear(a.created_at);
      monthSet.set(my, (monthSet.get(my) || 0) + 1);
    });
    return Array.from(monthSet.entries())
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([value, count]) => ({ value, label: getMonthLabel(value), count }));
  }, [articles]);

  const filtered = useMemo(() => {
    if (selectedMonth === "all_time") return articles;
    return articles.filter(a => getMonthYear(a.created_at) === selectedMonth);
  }, [articles, selectedMonth]);

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
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[160px] h-8 text-xs bg-white/[0.05] border-white/[0.12] text-white/80 font-mono uppercase tracking-wider">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[hsl(222,30%,12%)] border-white/[0.12] max-h-[240px]">
              {availableMonths.map(m => (
                <SelectItem key={m.value} value={m.value} className="text-white/80 font-mono text-xs">
                  {m.label} ({m.count})
                </SelectItem>
              ))}
              <SelectItem value="all_time" className="text-white/80 font-mono text-xs">All Time ({articles.length})</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </GlassCardHeader>
      <GlassCardContent>

        {/* Status Overview */}
        <div className="mb-6">
          <h3 className="text-white/60 font-mono text-xs uppercase tracking-wider mb-4">{selectedMonth === 'all_time' ? 'All Time Status' : `${getMonthLabel(selectedMonth)} Status`}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/[0.12]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
              </div>
              <AnimatedStat value={completedCount} label="Completed" variant="success" size="sm" />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <AnimatedStat value={inProgressCount} label="In Progress" variant="warning" size="sm" />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <Eye className="h-5 w-5 text-purple-400" />
              </div>
              <AnimatedStat value={reviewCount} label="In Review" variant="purple" size="sm" />
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-blue-400" />
              </div>
              <AnimatedStat value={pendingCount} label="Pending" variant="primary" size="sm" />
            </div>
          </div>
        </div>
        
        {/* Content Breakdown */}
        <div>
          <h3 className="text-white/60 font-mono text-xs uppercase tracking-wider mb-4">Content Breakdown</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Blog Articles */}
            <div className="group relative p-4 bg-white/[0.03] rounded-xl border border-white/[0.12] hover:border-primary-glow/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-primary-glow" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">Blog Articles</span>
                </div>
                <AnimatedStat value={blogArticles.length} label={`${blogWords.toLocaleString()} words`} variant="primary" size="sm" />
              </div>
            </div>
            
            {/* Social Posts */}
            <div className="group relative p-4 bg-white/[0.03] rounded-xl border border-white/[0.12] hover:border-emerald-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-emerald-400" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">Social Posts</span>
                </div>
                <AnimatedStat value={socialPosts.length} label={`${socialWords.toLocaleString()} words`} variant="success" size="sm" />
              </div>
            </div>

            {/* YouTube Scripts */}
            <div className="group relative p-4 bg-white/[0.03] rounded-xl border border-white/[0.12] hover:border-rose-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                    <Video className="h-4 w-4 text-rose-400" />
                  </div>
                  <span className="text-white/80 font-mono text-xs uppercase">YT Scripts</span>
                </div>
                <AnimatedStat value={youtubeScripts.length} label={`${youtubeWords.toLocaleString()} words`} variant="danger" size="sm" />
              </div>
            </div>
            
            {/* Product Descriptions */}
            <div className="group relative p-4 bg-white/[0.03] rounded-xl border border-white/[0.12] hover:border-purple-500/30 hover:bg-white/[0.05] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
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
