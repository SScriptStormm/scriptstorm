import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatDate, formatDateTime, formatMonthYear } from "@/lib/dateUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Calendar as CalendarIcon, Clock, CheckCircle, AlertCircle, Zap, LogOut, RefreshCw, BarChart3, Target, Eye, Download, Edit, MessageSquare, User as UserIcon, Settings, LayoutDashboard, ChevronDown, Archive, Plus, ArrowRight, ChevronLeft, ChevronRight, Video, Package, Search, X, Sun, SunDim, Moon } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";
import LoadingScreen from "@/components/ui/LoadingScreen";
import ContentCalendar from "@/components/dashboard/ContentCalendar";
import ResearchReports from "@/components/dashboard/ResearchReports";
import PerformanceDashboard from "@/components/dashboard/PerformanceDashboard";
import PrioritySupport from "@/components/dashboard/PrioritySupport";
import MarketRoadmap from "@/components/dashboard/MarketRoadmap";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { HoloBadge } from "@/components/ui/HoloBadge";
import { NeonProgress } from "@/components/ui/NeonProgress";
import { AccountStatusCard } from "@/components/dashboard/AccountStatusCard";
import { MonthlyUsageCard } from "@/components/dashboard/MonthlyUsageCard";
import { ContentQueueCard } from "@/components/dashboard/ContentQueueCard";
import { ContentPipelineCard } from "@/components/dashboard/ContentPipelineCard";
interface Subscriber {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}
interface Article {
  id: string;
  title: string;
  status: string;
  target_keywords: string[];
  word_count: number;
  delivery_date: string;
  created_at: string;
  article_url: string | null;
  notes: string | null;
  revisions_remaining?: number;
  content_type?: string;
  youtube_script?: boolean;
  revisions_requested?: number;
  revisions_allowed?: number;
  delivery_timeframe?: number;
  delivery_deadline?: string;
}
const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [monthlyUsage, setMonthlyUsage] = useState({
    articles: 0,
    socialPosts: 0,
    productDesc: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [contentTypeFilter, setContentTypeFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<string>(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState("");
  const [selectedPipelineArticleId, setSelectedPipelineArticleId] = useState<string | null>(null);
  const [previousMonthsOpen, setPreviousMonthsOpen] = useState(false);
  const [submittingRevision, setSubmittingRevision] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const itemsPerPage = 10;
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSubscriberData(session.user.id);
        fetchArticles(session.user.id);
      }
    });
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSubscriberData(session.user.id);
        fetchArticles(session.user.id);
      }
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  // Real-time subscription for articles updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel('articles-changes')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'articles',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('Article updated:', payload);
          setArticles(prev => 
            prev.map(article => 
              article.id === payload.new.id ? payload.new as Article : article
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'articles',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          console.log('New article:', payload);
          setArticles(prev => [payload.new as Article, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const fetchSubscriberData = async (userId?: string) => {
    const id = userId || user?.id;
    if (!id) return;
    try {
      const {
        data,
        error
      } = await supabase.from('subscribers').select('subscribed, subscription_tier, subscription_end').eq('user_id', id).single();
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      setSubscriber(data || {
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      });
    } catch (error: any) {
      console.error('Error fetching subscriber data:', error);
    }
  };
  const fetchArticles = async (userId?: string) => {
    const id = userId || user?.id;
    if (!id) return;
    try {
      const {
        data,
        error
      } = await supabase.from('articles').select('*').eq('user_id', id).order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setArticles(data || []);

      // Calculate monthly usage from articles
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM format
      const currentMonthArticles = (data || []).filter(article => article.created_at.startsWith(currentMonth));
      const articlesCount = currentMonthArticles.filter(a => a.content_type === 'blog_article').length;
      const socialPostsCount = currentMonthArticles.filter(a => a.content_type === 'social_media').length;
      const productDescCount = currentMonthArticles.filter(a => a.content_type === 'product_description').length;
      setMonthlyUsage({
        articles: articlesCount,
        socialPosts: socialPostsCount,
        productDesc: productDescCount
      });
    } catch (error: any) {
      console.error('Error fetching articles:', error);
    }
  };
  const refreshSubscription = async () => {
    if (!user?.id) return;
    setRefreshing(true);
    try {
      const {
        error
      } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      await fetchSubscriberData(user.id);
      await fetchArticles(user.id);
      toast({
        title: "Data Refreshed",
        description: "Your dashboard has been updated."
      });
    } catch (error: any) {
      console.error('Refresh error:', error);
      // Still refresh the local data even if the edge function fails
      await fetchSubscriberData(user.id);
      await fetchArticles(user.id);
      toast({
        title: "Data Refreshed",
        description: "Dashboard updated successfully."
      });
    } finally {
      setRefreshing(false);
    }
  };
  const handleSignOut = async () => {
    try {
      // Clear local state immediately
      setUser(null);
      setSession(null);

      // Sign out from Supabase
      await supabase.auth.signOut();

      // Clear localStorage manually to ensure no stale session
      localStorage.removeItem('sb-akqbsuvbammezjyeospk-auth-token');

      // Force a complete page reload to /auth
      window.location.replace('/auth');
    } catch (error) {
      // Even if signOut fails, still redirect
      console.error('Logout error:', error);
      localStorage.clear();
      window.location.replace('/auth');
    }
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'pending':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'review':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_progress':
        return <Clock className="h-4 w-4" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4" />;
      case 'review':
        return <Eye className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  const getDeliveryTimeframe = (article: Article) => {
    if (article.delivery_timeframe === 12) {
      return '12-Hour Lightning Delivery ⚡';
    }
    return '24-Hour Delivery ⏱️';
  };
  const getTimeRemaining = (deadline: string | null) => {
    if (!deadline) return null;
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    if (diff <= 0) return 'Overdue';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));
    if (hours < 1) return `${minutes}m remaining`;
    if (hours < 24) return `${hours}h ${minutes}m remaining`;
    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h remaining`;
  };

  // Get subscription tier for feature access (must be declared before use)
  const tier = subscriber?.subscription_tier?.toLowerCase() || '';
  const hasGrowth = tier === 'growth' || tier === 'scale' || tier === 'authority' || tier === 'dominance';
  const hasScale = tier === 'scale' || tier === 'authority' || tier === 'dominance';
  const hasAuthority = tier === 'authority' || tier === 'dominance';
  const hasDominance = tier === 'dominance';

  // Get current month's start date
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  // Filter articles created this month
  const articlesThisMonth = articles.filter(a => {
    const articleDate = new Date(a.created_at);
    return articleDate >= currentMonthStart;
  });

  // Filter by content type for this month
  const articlesOnlyThisMonth = articlesThisMonth.filter(a => !a.content_type || a.content_type === 'article' || a.content_type === 'blog_article');
  const productDescriptionsThisMonth = articlesThisMonth.filter(a => a.content_type === 'product_description');
  const socialPostsThisMonth = articlesThisMonth.filter(a => a.content_type === 'social_media' || a.content_type === 'social_media_post' || tier === 'growth+' && a.youtube_script);
  const completedArticles = articles.filter(a => a.status === 'completed').length;
  const completedArticlesThisMonth = articlesOnlyThisMonth.length;

  // Time-based greeting
  const getGreetingData = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: 'sunrise' as const };
    if (hour < 18) return { text: 'Good afternoon', icon: 'sun' as const };
    return { text: 'Good evening', icon: 'moon' as const };
  };
  const greetingData = getGreetingData();

  const completedProductDescriptionsThisMonth = productDescriptionsThisMonth.length;
  const completedSocialPostsThisMonth = socialPostsThisMonth.length;
  const totalArticles = articles.length;
  const averageWordCount = articles.length > 0 ? Math.round(articles.reduce((sum, a) => sum + (a.word_count || 0), 0) / articles.length) : 0;

  // Helper functions for month filtering
  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };
  const getCurrentMonthYear = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  };
  const getMonthLabel = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return formatMonthYear(date);
  };

  // Get all unique months from articles
  const availableMonths = [...new Set(articles.map(a => getMonthYear(a.created_at)))].sort().reverse();
  const currentMonthYear = getCurrentMonthYear();

  // Helper function to get content type info
  const getContentTypeInfo = (article: Article) => {
    if (article.youtube_script) {
      return { label: 'YouTube Script', shortLabel: 'YouTube', icon: Video, colorClass: 'bg-red-500/20 text-red-400 border-red-500/30' };
    }
    switch (article.content_type) {
      case 'blog_article':
      case 'article':
        return { label: 'Blog Article', shortLabel: 'Blog', icon: FileText, colorClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      case 'social_media':
      case 'social_media_post':
        return { label: 'Social Post', shortLabel: 'Social', icon: MessageSquare, colorClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'product_description':
        return { label: 'Product Desc', shortLabel: 'Product', icon: Package, colorClass: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
      default:
        return { label: 'Blog Article', shortLabel: 'Blog', icon: FileText, colorClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    }
  };

  // Filter articles by month first, then by status, then by content type
  const monthFilteredArticles = monthFilter === 'all_time' ? articles : articles.filter(article => getMonthYear(article.created_at) === monthFilter);
  const statusFilteredArticles = statusFilter === 'all' ? monthFilteredArticles : monthFilteredArticles.filter(a => a.status === statusFilter);
  const filteredArticles = contentTypeFilter === 'all' 
    ? statusFilteredArticles 
    : statusFilteredArticles.filter(a => {
        if (contentTypeFilter === 'youtube_script') return a.youtube_script;
        if (contentTypeFilter === 'blog_article') return !a.youtube_script && (!a.content_type || a.content_type === 'article' || a.content_type === 'blog_article');
        if (contentTypeFilter === 'social_media') return !a.youtube_script && (a.content_type === 'social_media' || a.content_type === 'social_media_post');
        if (contentTypeFilter === 'product_description') return a.content_type === 'product_description';
        return true;
      });

  // Search filter
  const searchFilteredArticles = searchQuery.trim() === ''
    ? filteredArticles
    : filteredArticles.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Pagination calculations
  const totalPages = Math.ceil(searchFilteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = searchFilteredArticles.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, monthFilter, contentTypeFilter, searchQuery]);

  // Current month articles for pipeline display
  const currentMonthPipelineArticles = articles.filter(article => getMonthYear(article.created_at) === currentMonthYear);
  const previousMonthArticles = articles.filter(article => getMonthYear(article.created_at) !== currentMonthYear);
  
  // Determine which article to display in pipeline
  const displayedPipelineArticle = selectedPipelineArticleId 
    ? articles.find(a => a.id === selectedPipelineArticleId) 
    : currentMonthPipelineArticles[0] || null;

  // Check if the selected project is already the latest one (to hide "Show Latest" button)
  const latestArticleId = currentMonthPipelineArticles[0]?.id;
  const isSelectingLatest = selectedPipelineArticleId === latestArticleId;

  // Monthly limits by tier
  const getMonthlyLimit = () => {
    switch (tier) {
      case 'growth':
      case 'growth+':
        return 10;
      case 'scale':
        return 25;
      case 'authority':
        return 30;
      case 'dominance':
        return 50;
      default:
        return 5;
      // starter
    }
  };
  const getProductDescriptionLimit = () => {
    switch (tier) {
      case 'growth':
      case 'growth+':
        return 10;
      case 'scale':
        return 25;
      case 'authority':
        return 30;
      case 'dominance':
        return 999999;
      // unlimited
      default:
        return 5;
      // starter
    }
  };
  const getSocialPostLimit = () => {
    switch (tier) {
      case 'growth':
      case 'growth+':
        return 30;
      case 'scale':
        return 75;
      case 'authority':
        return 90;
      case 'dominance':
        return 150;
      default:
        return 15;
      // starter
    }
  };

  // Word count ranges by tier
  const getWordCountRange = () => {
    switch (tier) {
      case 'starter':
      case 'growth':
        return '1,500 - 2,000';
      case 'scale':
      case 'authority':
        return '2,000 - 3,000';
      case 'dominance':
        return '2,000 - 5,000';
      default:
        return '1,500 - 2,000';
    }
  };
  const monthlyLimit = getMonthlyLimit();
  const productDescriptionLimit = getProductDescriptionLimit();
  const socialPostLimit = getSocialPostLimit();
  const wordCountRange = getWordCountRange();
  const handleRequestRevision = (article: Article) => {
    setSelectedArticle(article);
    setRevisionFeedback("");
    setRevisionDialogOpen(true);
  };
  const submitRevisionRequest = async () => {
    if (!selectedArticle || !revisionFeedback.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide feedback for the revision request.",
        variant: "destructive"
      });
      return;
    }

    // Check if user has exceeded revision limit
    const revisionsUsed = selectedArticle.revisions_requested || 0;
    const revisionsAllowed = selectedArticle.revisions_allowed || 1;
    if (revisionsUsed >= revisionsAllowed) {
      toast({
        title: "Revision Limit Reached",
        description: `You've used all ${revisionsAllowed} revision${revisionsAllowed > 1 ? 's' : ''} for this article.`,
        variant: "destructive"
      });
      return;
    }
    setSubmittingRevision(true);
    try {
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      // Insert revision request
      const {
        error: revisionError
      } = await supabase.from('content_revisions').insert({
        article_id: selectedArticle.id,
        user_id: user.id,
        revision_notes: revisionFeedback.trim(),
        status: 'pending'
      });
      if (revisionError) throw revisionError;

      // Update article's revision count
      const {
        error: updateError
      } = await supabase.from('articles').update({
        revisions_requested: revisionsUsed + 1
      }).eq('id', selectedArticle.id);
      if (updateError) throw updateError;
      toast({
        title: "Revision Requested",
        description: "Your revision request has been submitted successfully."
      });

      // Refresh articles to show updated revision count
      await fetchArticles();
      setRevisionDialogOpen(false);
      setSelectedArticle(null);
      setRevisionFeedback("");
    } catch (error: any) {
      console.error('Error submitting revision:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit revision request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmittingRevision(false);
    }
  };
  if (loading) {
    return <LoadingScreen message="Initializing dashboard..." />;
  }
  return <div className="min-h-screen bg-gradient-hero bg-fixed relative overflow-hidden">
      {/* Fixed darkening overlay to prevent gradient color shift */}
      <div className="fixed inset-0 bg-black/20 pointer-events-none" />
      
      {/* Floating geometric elements */}
      <div className="absolute top-40 left-10 w-16 h-16 border-2 border-primary-glow/45 rotate-45 animate-float shadow-cyber" />
      <div className="absolute top-60 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
      
      {/* Header */}
      <header className="relative z-10 border-b border-primary-glow/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <img src={scriptStormLogo} alt="ScriptStorm" className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-cyber border border-primary-glow/30 hover:border-primary-glow/60 transition-all duration-300" />
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono tracking-wide">
                  SCRIPTSTORM
                </h1>
                <p className="text-primary-glow/80 text-xs sm:text-sm font-mono tracking-widest">
                  CLIENT DASHBOARD
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Button onClick={refreshSubscription} disabled={refreshing} size="sm" className="relative bg-primary/20 backdrop-blur-sm text-primary-glow border-2 border-primary-glow/50 hover:border-primary-glow hover:bg-primary/30 hover:shadow-cyber font-mono text-xs sm:text-sm flex-1 sm:flex-initial transition-all duration-300 disabled:opacity-50">
                <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                REFRESH
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" className="relative bg-white/5 backdrop-blur-sm text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 font-mono text-xs sm:text-sm flex-1 sm:flex-initial transition-all duration-300">
                    <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    ACCOUNT
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-primary-glow/20">
                  <DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20" onClick={() => navigate('/account-settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="font-mono text-red-400 hover:bg-red-500/20" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Welcome Strip + CTA */}
        <GlassCard className="mb-6 sm:mb-8 p-0 relative overflow-hidden" hover={false}>
          {/* Accent glow line */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary-glow to-primary/50" />

          <div className="p-4 sm:p-5 pl-5 sm:pl-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              {/* Left: Greeting */}
              <div>
                <div className="flex items-center gap-2">
                  {greetingData.icon === 'sunrise' && <Sun className="h-5 w-5 text-amber-400" />}
                  {greetingData.icon === 'sun' && <SunDim className="h-5 w-5 text-orange-400" />}
                  {greetingData.icon === 'moon' && <Moon className="h-5 w-5 text-blue-300" />}
                  <h2 className="text-lg sm:text-xl font-bold text-white font-mono tracking-wide">
                    {greetingData.text}
                  </h2>
                </div>
                <p className="text-white/60 font-mono text-xs sm:text-sm tracking-wide">
                  {user?.email}
                </p>
              </div>

              {/* Right: CTA */}
              <button
                onClick={() => navigate('/content-brief')}
                className="group relative flex items-center gap-3 px-4 py-2.5 sm:px-5 sm:py-3 rounded-lg overflow-hidden
                  border border-primary-glow/30 backdrop-blur-xl
                  bg-gradient-to-r from-primary/15 to-primary-glow/10
                  hover:border-primary-glow/60 hover:shadow-[0_0_30px_hsl(221_83%_53%/0.3)]
                  transform hover:scale-105 transition-all duration-300 animate-glow-pulse-soft"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-glow/20 to-transparent animate-shimmer pointer-events-none" />
                <div className="relative flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-md bg-primary/20 border border-primary-glow/40 animate-scale-subtle">
                  <Plus className="h-4 w-4 text-primary-glow" />
                </div>
                <span className="relative text-white font-mono text-sm sm:text-base font-semibold tracking-wide group-hover:text-primary-glow transition-colors duration-300">
                  Submit New Brief
                </span>
                <ArrowRight className="relative h-4 w-4 text-primary-glow/50 group-hover:text-primary-glow group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </div>

            {/* Dominance tier notice (conditional) */}
            {hasDominance && (
              <div className="mt-3 pt-3 border-t border-white/[0.12]">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
                  <p className="text-yellow-400/90 font-mono text-xs sm:text-sm">
                    <strong>Dominance Tier:</strong> 12-hour delivery · Unlimited revisions · Priority support
                  </p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        {/* 2-Column Grid Layout - Premium Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <AccountStatusCard 
            subscriptionTier={subscriber?.subscription_tier || 'starter'}
            subscriptionEnd={subscriber?.subscription_end || null}
            isSubscribed={subscriber?.subscribed || false}
          />
          <MonthlyUsageCard 
            subscriptionTier={tier} 
            articlesUsed={monthlyUsage.articles} 
            socialPostsUsed={monthlyUsage.socialPosts} 
            productDescUsed={monthlyUsage.productDesc} 
          />
        </div>

        {/* Content Queue - Premium Card */}
        {totalArticles > 0 && (
          <div className="mb-8">
            <ContentQueueCard articles={articles} />
          </div>
        )}

        {/* Content Pipeline - Premium Card */}
        <div className="mb-8">
          <ContentPipelineCard
            article={displayedPipelineArticle}
            articlesCount={articles.length}
            selectedId={isSelectingLatest ? null : selectedPipelineArticleId}
            onClearSelection={() => setSelectedPipelineArticleId(null)}
          />
        </div>

        {/* Dashboard Features Tabs */}
        <Tabs defaultValue="projects" className="mb-8">
          <TabsList className="bg-black/60 backdrop-blur-xl border border-white/[0.1] rounded-lg p-1.5 mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] w-full justify-center sm:w-auto sm:justify-start">
            <TabsTrigger value="projects" className="font-mono text-white/60 transition-all duration-200 rounded-md px-4 py-2 hover:text-white hover:bg-white/[0.08] data-[state=active]:bg-primary/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-primary-glow/50 data-[state=active]:shadow-[0_0_12px_hsl(221_83%_53%/0.25)]">
              <FileText className="h-4 w-4 mr-2" />
              PROJECTS
            </TabsTrigger>
            
            {hasGrowth && <TabsTrigger value="calendar" className="font-mono text-white/60 transition-all duration-200 rounded-md px-4 py-2 hover:text-white hover:bg-white/[0.08] data-[state=active]:bg-primary/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-primary-glow/50 data-[state=active]:shadow-[0_0_12px_hsl(221_83%_53%/0.25)]">
                <CalendarIcon className="h-4 w-4 mr-2" />
                CALENDAR
              </TabsTrigger>}
            
            {hasScale && <TabsTrigger value="reports" className="font-mono text-white/60 transition-all duration-200 rounded-md px-4 py-2 hover:text-white hover:bg-white/[0.08] data-[state=active]:bg-primary/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-primary-glow/50 data-[state=active]:shadow-[0_0_12px_hsl(221_83%_53%/0.25)]">
                <FileText className="h-4 w-4 mr-2" />
                RESEARCH
              </TabsTrigger>}
            
            
            {hasScale && <TabsTrigger value="support" className="font-mono text-white/60 transition-all duration-200 rounded-md px-4 py-2 hover:text-white hover:bg-white/[0.08] data-[state=active]:bg-primary/20 data-[state=active]:text-white data-[state=active]:border data-[state=active]:border-primary-glow/50 data-[state=active]:shadow-[0_0_12px_hsl(221_83%_53%/0.25)] relative">
                <MessageSquare className="h-4 w-4 mr-2" />
                SUPPORT
                {(hasAuthority || hasDominance) && <Badge className="ml-2 bg-yellow-500/30 text-yellow-300 border-yellow-500/50 text-xs px-1 py-0">
                    PRIORITY
                  </Badge>}
              </TabsTrigger>}
            
          </TabsList>

          <TabsContent value="projects">
            <GlassCard variant="default" glow hover={false}>
          <GlassCardHeader className="px-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-row items-center justify-between gap-3">
                <GlassCardTitle className="flex items-center gap-2 text-base">
                  <FileText className="h-5 w-5 text-primary-glow" />
                  YOUR CONTENT PROJECTS
                  {monthFilter !== 'all_time' && monthFilter !== currentMonthYear && (
                    <HoloBadge variant="warning" size="sm">
                      <Archive className="h-3 w-3 mr-1" />
                      ARCHIVE
                    </HoloBadge>
                  )}
                </GlassCardTitle>
              </div>
              
              {articles.length > 0 && <div className="flex flex-col gap-3">
                  {/* Mobile-only Search Input */}
                  <div className="relative w-full lg:hidden">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search titles..."
                      className="w-full pl-8 pr-8 py-1.5 bg-black/50 backdrop-blur-sm border border-white/[0.15] rounded-md text-white font-mono text-xs placeholder:text-white/30 focus:outline-none focus:border-primary-glow/50 focus:shadow-[0_0_10px_hsl(221_83%_53%/0.15)] transition-all duration-200 hover:border-white/[0.25]"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Month Filter */}
                  <div className="flex items-center gap-2 w-full">
                    <CalendarIcon className="h-4 w-4 text-primary-glow flex-shrink-0" />
                    <Select value={monthFilter} onValueChange={setMonthFilter}>
                      <SelectTrigger className="flex-1 bg-black/50 backdrop-blur-sm border-white/[0.15] text-white font-mono text-xs sm:text-sm transition-all duration-200 hover:border-white/[0.25] focus:border-primary-glow/50 focus:shadow-[0_0_10px_hsl(221_83%_53%/0.15)]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 backdrop-blur-xl border-white/[0.15] shadow-xl shadow-black/50 z-50">
                        <SelectItem value={currentMonthYear} className="font-mono text-white/80 hover:bg-primary/20 hover:text-white focus:bg-primary/20 focus:text-white transition-colors cursor-pointer">
                          {getMonthLabel(currentMonthYear)} ({articles.filter(a => getMonthYear(a.created_at) === currentMonthYear).length})
                        </SelectItem>
                        {availableMonths.filter(month => month !== currentMonthYear).map(month => <SelectItem key={month} value={month} className="font-mono text-white/80 hover:bg-primary/20 hover:text-white focus:bg-primary/20 focus:text-white transition-colors cursor-pointer">
                              {getMonthLabel(month)} ({articles.filter(a => getMonthYear(a.created_at) === month).length})
                            </SelectItem>)}
                        <SelectItem value="all_time" className="font-mono text-white/80 hover:bg-primary/20 hover:text-white focus:bg-primary/20 focus:text-white transition-colors cursor-pointer">
                          📚 View All Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filters */}
                  <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setStatusFilter('all')}
                      className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 px-2 h-7 ${
                        statusFilter === 'all' 
                          ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                          : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                      }`}
                    >
                      All ({monthFilteredArticles.length})
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setStatusFilter('completed')}
                      className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 px-2 h-7 ${
                        statusFilter === 'completed' 
                          ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                          : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                      }`}
                    >
                      Completed ({monthFilteredArticles.filter(a => a.status === 'completed').length})
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setStatusFilter('in_progress')}
                      className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 px-2 h-7 ${
                        statusFilter === 'in_progress' 
                          ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                          : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                      }`}
                    >
                      In Progress ({monthFilteredArticles.filter(a => a.status === 'in_progress').length})
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setStatusFilter('pending')}
                      className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                        statusFilter === 'pending' 
                          ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                          : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                      }`}
                    >
                      Pending ({monthFilteredArticles.filter(a => a.status === 'pending').length})
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setStatusFilter('review')}
                      className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                        statusFilter === 'review' 
                          ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                          : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                      }`}
                    >
                      In Review ({monthFilteredArticles.filter(a => a.status === 'review').length})
                    </Button>
                  </div>

                  {/* Content Type Filters + Inline Search */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex gap-1.5 overflow-x-auto pb-2 -mx-1 px-1 flex-shrink min-w-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setContentTypeFilter('all')}
                        className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                          contentTypeFilter === 'all' 
                            ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                            : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                        }`}
                      >
                        All Types
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setContentTypeFilter('blog_article')}
                        className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                          contentTypeFilter === 'blog_article' 
                            ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                            : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                        }`}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Blogs
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setContentTypeFilter('social_media')}
                        className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                          contentTypeFilter === 'social_media' 
                            ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                            : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                        }`}
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Social
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setContentTypeFilter('youtube_script')}
                        className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                          contentTypeFilter === 'youtube_script' 
                            ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                            : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                        }`}
                      >
                        <Video className="h-3 w-3 mr-1" />
                        YouTube
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setContentTypeFilter('product_description')}
                        className={`font-mono text-xs whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                          contentTypeFilter === 'product_description' 
                            ? 'bg-primary/20 text-white border border-primary-glow/60 shadow-[0_0_15px_hsl(221_83%_53%/0.3)] hover:bg-primary/20 hover:border-primary-glow/60 focus:ring-0 focus:ring-offset-0' 
                            : 'bg-white/[0.05] text-white/70 border border-white/[0.15] hover:bg-white/[0.08] hover:text-white hover:border-white/[0.25]'
                        }`}
                      >
                        <Package className="h-3 w-3 mr-1" />
                        Products
                      </Button>
                    </div>
                    {/* Desktop inline search */}
                    <div className="relative hidden lg:block flex-shrink-0 w-48 lg:w-72 pb-2">
                      <Search className="absolute left-2.5 top-[calc(50%-4px)] -translate-y-1/2 h-3.5 w-3.5 text-white/40" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search titles..."
                        className="w-full pl-7 pr-7 py-1.5 bg-black/50 backdrop-blur-sm border border-white/[0.15] rounded-md text-white font-mono text-xs placeholder:text-white/30 focus:outline-none focus:border-primary-glow/50 focus:shadow-[0_0_10px_hsl(221_83%_53%/0.15)] transition-all duration-200 hover:border-white/[0.25]"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2.5 top-[calc(50%-4px)] -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>}
            </div>
          </GlassCardHeader>
          <GlassCardContent className="px-6">
            {articles.length === 0 ? (
              <div className="py-12 text-center">
                <FileText className="h-16 w-16 text-primary-glow/50 mx-auto mb-4" />
                <p className="text-white font-mono tracking-wide text-xl mb-2">
                  No Active Projects
                </p>
                <p className="text-white/70 font-mono text-sm mb-3">
                  Click "Submit New Content Brief" above to start your first project
                </p>
                <p className="text-primary-glow font-mono text-sm font-semibold">
                  Your 24-hour clock starts the moment you submit your first brief.
                </p>
              </div>
            ) : searchFilteredArticles.length === 0 ? (
              <div className="py-12 text-center">
                <AlertCircle className="h-12 w-12 text-primary-glow/50 mx-auto mb-3" />
                {searchQuery.trim() !== '' ? (
                  <>
                    <p className="text-white font-mono text-lg mb-2">
                      No projects matching "{searchQuery.length > 40 ? searchQuery.slice(0, 40) + '…' : searchQuery}"
                    </p>
                    <p className="text-white/70 font-mono text-sm">
                      Try a different search term or clear the search
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-white font-mono text-lg mb-2">
                      No {statusFilter === 'all' ? '' : statusFilter === 'in_progress' ? '' : statusFilter + ' '}projects
                      {statusFilter === 'in_progress' && ' in progress'}
                      {monthFilter !== 'all_time' && ` in ${getMonthLabel(monthFilter)}`}
                    </p>
                    <p className="text-white/70 font-mono text-sm">
                      Try selecting a different {monthFilter === 'all_time' ? 'filter' : 'month or filter'}
                    </p>
                  </>
                )}
              </div>
            ) : (
              <>
                {/* Mobile Card Layout */}
                <div className="block lg:hidden space-y-4">
                  {paginatedArticles.map(article => {
                    const isSelected = article.id === selectedPipelineArticleId;
                    return (
                      <div 
                        key={article.id} 
                        onClick={() => setSelectedPipelineArticleId(isSelected ? null : article.id)} 
                        className={`relative p-4 rounded-lg cursor-pointer transition-all duration-300 overflow-hidden ${
                          isSelected 
                            ? 'bg-gradient-to-br from-primary/25 via-primary/10 to-transparent border border-primary-glow/60 shadow-[0_0_25px_hsl(221_83%_53%/0.3),inset_0_1px_0_rgba(255,255,255,0.08)]' 
                            : 'bg-white/[0.05] border border-white/[0.1] hover:border-primary-glow/40 hover:bg-white/[0.08]'
                        }`}
                      >
                        {/* Selection Accent Rail */}
                        {isSelected && (
                          <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full bg-primary-glow shadow-[0_0_12px_hsl(221_83%_53%/0.6)]" />
                        )}
                        
                        <div className={`space-y-3 ${isSelected ? 'pl-2' : ''}`}>
                          {/* Title and Word Count */}
                          <div>
                            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 font-mono tracking-wider font-bold text-sm mb-1 line-clamp-2">
                              {article.title}
                            </h3>
                            {article.word_count > 0 && <p className="text-white/50 font-mono text-xs">{article.word_count} words</p>}
                          </div>
                          
                          {/* Content Type Badge */}
                          {(() => {
                            const typeInfo = getContentTypeInfo(article);
                            const TypeIcon = typeInfo.icon;
                            return (
                              <Badge className={`${typeInfo.colorClass} font-mono tracking-wide text-xs inline-flex items-center gap-1`}>
                                <TypeIcon className="h-3 w-3" />
                                {typeInfo.shortLabel}
                              </Badge>
                            );
                          })()}
                          
                          {/* Status Badge */}
                          <div>
                            <Badge className={`${getStatusColor(article.status)} font-mono tracking-wide text-xs`}>
                              {getStatusIcon(article.status)}
                              {article.status === 'completed' ? '✅ Ready' : article.status === 'in_progress' ? '🔄 In Progress' : article.status === 'review' ? '🔍 In Review' : '⏳ Pending'}
                            </Badge>
                            {(article.status === 'pending' || article.status === 'in_progress' || article.status === 'review') && <p className="text-primary-glow font-mono text-xs mt-1">
                                {article.status === 'review' ? 'Quality Control in Progress' : getDeliveryTimeframe(article)}
                              </p>}
                          </div>
                          
                          {/* Delivery Deadline for In Progress/Pending/Review */}
                          {(article.status === 'pending' || article.status === 'in_progress' || article.status === 'review') && article.delivery_deadline && <div className="flex items-center justify-between gap-2">
                              <span className="text-white/70 font-mono text-xs flex-shrink-0">Deadline:</span>
                              <span className="text-yellow-400 font-mono text-xs font-semibold break-words text-right">
                                {getTimeRemaining(article.delivery_deadline)}
                              </span>
                            </div>}
                          
                          {/* Delivered On */}
                          {article.status === 'completed' && <div className="flex items-center justify-between gap-2">
                              <span className="text-white/70 font-mono text-xs flex-shrink-0">Delivered:</span>
                              <span className="text-white font-mono text-xs break-words text-right">
                                {article.delivery_date ? formatDate(article.delivery_date) : 'Completed'}
                              </span>
                            </div>}
                          
                          {/* Revisions */}
                          {article.status === 'completed' && <div className="flex items-center justify-between gap-2">
                              <span className="text-white/70 font-mono text-xs flex-shrink-0">Revisions:</span>
                              <span className={`font-mono text-xs ${(article.revisions_requested || 0) >= (article.revisions_allowed || 1) ? 'text-red-400' : 'text-white'}`}>
                                {article.revisions_requested || 0} / {article.revisions_allowed === 999999 ? '∞' : article.revisions_allowed || 1}
                              </span>
                            </div>}
                          
                          {/* Actions */}
                          <div className="flex flex-col gap-2 pt-1">
                            {article.status === 'completed' ? <>
                                <Button size="sm" className="w-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 font-mono text-xs" onClick={() => article.article_url && window.open(article.article_url, '_blank')}>
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                                <Button size="sm" variant="ghost" className="w-full text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/60 font-mono text-xs disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleRequestRevision(article)} disabled={(article.revisions_requested || 0) >= (article.revisions_allowed || 1)}>
                                  <Edit className="h-3 w-3 mr-1" />
                                  {(article.revisions_requested || 0) >= (article.revisions_allowed || 1) ? 'Revision Limit Reached' : 'Request Revision'}
                                </Button>
                              </> : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Desktop Table Layout */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-primary-glow/20 text-left">
                        <th className="text-white/70 font-mono text-sm pb-3">Project Title</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Type</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Status</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Delivery</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Revisions</th>
                        <th className="text-white/70 font-mono text-sm pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedArticles.map(article => {
                        const isSelected = article.id === selectedPipelineArticleId;
                        // Move gradient to <tr> for seamless background, cells only handle borders
                        const unselectedRowBase = 'border-b border-white/[0.1] hover:bg-primary/[0.06]';
                        const selectedRowStyle = 'bg-primary/10 shadow-[inset_0_2px_0_hsl(221_83%_53%/0.5),inset_0_-2px_0_hsl(221_83%_53%/0.5)]';
                        
                        return (
                          <tr 
                            key={article.id} 
                            onClick={() => setSelectedPipelineArticleId(isSelected ? null : article.id)} 
                            className={`cursor-pointer transition-[background-color,box-shadow] duration-300 ${isSelected ? selectedRowStyle : unselectedRowBase}`}
                          >
                            {/* First Cell - Project Title with Accent Rail */}
                            <td className={`py-4 pl-2 align-top w-2/5 relative border-l-2 ${isSelected ? 'border-primary-glow/60 rounded-l-lg' : 'border-white/[0.08]'}`}>
                              {/* Accent Rail */}
                              {isSelected && (
                                <div className="absolute left-1 top-3 bottom-3 w-[3px] rounded-full bg-primary-glow shadow-[0_0_12px_hsl(221_83%_53%/0.6)]" />
                              )}
                              <div className={isSelected ? 'pl-3' : ''}>
                                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/70 font-mono tracking-wider font-bold text-xs md:text-sm lg:text-base truncate max-w-[300px] lg:max-w-[400px]" title={article.title}>
                                  {article.title}
                                </h3>
                                {article.word_count > 0 && <p className="text-white/50 font-mono text-[10px] md:text-xs">{article.word_count} words</p>}
                              </div>
                            </td>
                            
                            {/* Type Cell */}
                            <td className="py-4 align-top">
                              {(() => {
                                const typeInfo = getContentTypeInfo(article);
                                const TypeIcon = typeInfo.icon;
                                return (
                                  <Badge className={`${typeInfo.colorClass} font-mono tracking-wide text-[10px] md:text-xs inline-flex items-center gap-1`}>
                                    <TypeIcon className="h-3 w-3" />
                                    {typeInfo.shortLabel}
                                  </Badge>
                                );
                              })()}
                            </td>
                            
                            {/* Status Cell */}
                            <td className="py-4 align-top">
                              <Badge className={`${getStatusColor(article.status)} font-mono tracking-wide text-[10px] md:text-xs inline-flex items-center gap-1`}>
                                {getStatusIcon(article.status)}
                                {article.status === 'completed' ? '✅ Ready' : article.status === 'in_progress' ? '🔄 In Progress' : article.status === 'review' ? '🔍 In Review' : '⏳ Pending'}
                              </Badge>
                              {(article.status === 'pending' || article.status === 'in_progress' || article.status === 'review') && <p className="text-primary-glow font-mono text-xs mt-1">
                                  {article.status === 'review' ? 'Quality Control in Progress' : getDeliveryTimeframe(article)}
                                </p>}
                            </td>
                            
                            {/* Delivery Cell */}
                            <td className="py-4 align-top">
                              {article.status === 'completed' ? <span className="text-white font-mono text-xs md:text-sm">
                                  {article.delivery_date ? formatDate(article.delivery_date) : 'Completed'}
                                </span> : article.delivery_deadline ? <span className="text-yellow-400 font-mono text-xs md:text-sm font-semibold">
                                  {getTimeRemaining(article.delivery_deadline)}
                                </span> : <span className="text-white/50 font-mono text-xs">—</span>}
                            </td>
                            
                            {/* Revisions Cell */}
                            <td className="py-4 align-top">
                              {article.status === 'completed' ? <span className={`font-mono text-xs md:text-sm ${(article.revisions_requested || 0) >= (article.revisions_allowed || 1) ? 'text-red-400' : 'text-white'}`}>
                                  {article.revisions_requested || 0} / {article.revisions_allowed === 999999 ? '∞' : article.revisions_allowed || 1}
                                </span> : <span className="text-white/50 font-mono text-xs">—</span>}
                            </td>
                            
                            {/* Last Cell - Actions */}
                            <td className={`py-4 text-right border-r-2 ${isSelected ? 'border-primary-glow/60 rounded-r-lg' : 'border-white/[0.08]'}`}>
                              <div className="flex items-center gap-2 justify-end">
                                {article.status === 'completed' ? <>
                                    <Button size="sm" className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 font-mono" onClick={() => article.article_url && window.open(article.article_url, '_blank')}>
                                      <Download className="h-4 w-4 mr-1" />
                                      Download
                                    </Button>
                                    <Button size="sm" variant="ghost" className="text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/60 font-mono disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => handleRequestRevision(article)} disabled={(article.revisions_requested || 0) >= (article.revisions_allowed || 1)}>
                                      <Edit className="h-4 w-4 mr-1" />
                                      {(article.revisions_requested || 0) >= (article.revisions_allowed || 1) ? 'Limit Reached' : 'Request Revision'}
                                    </Button>
                                  </> : null}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-6 flex flex-col lg:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.1]">
                    {/* Results Count */}
                    <p className="text-white/60 font-mono text-xs lg:text-sm">
                      Showing {startIndex + 1}-{Math.min(endIndex, searchFilteredArticles.length)} of {searchFilteredArticles.length} projects
                    </p>
                    
                    {/* Pagination Buttons */}
                    <div className="flex items-center gap-2">
                      {/* Previous Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPage(prev => Math.max(1, prev - 1));
                        }}
                        disabled={currentPage === 1}
                        className="font-mono text-xs bg-white/[0.05] border border-white/[0.15] text-white/70 hover:bg-white/[0.08] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                      
                      {/* Page Numbers - Desktop */}
                      <div className="hidden lg:flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                          // Show first page, last page, current page, and pages around current
                          const showPage = page === 1 || 
                                          page === totalPages || 
                                          Math.abs(page - currentPage) <= 1;
                          
                          const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                          const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;
                          
                          if (showEllipsisBefore || showEllipsisAfter) {
                            return (
                              <span key={page} className="text-white/40 font-mono text-sm px-2">...</span>
                            );
                          }
                          
                          if (!showPage) return null;
                          
                          return (
                            <Button
                              key={page}
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setCurrentPage(page);
                              }}
                              className={`font-mono text-xs min-w-[32px] ${
                                currentPage === page
                                  ? 'bg-primary/20 hover:bg-primary/20 text-white hover:text-white border border-primary-glow/60 hover:border-primary-glow/60 shadow-[0_0_10px_hsl(221_83%_53%/0.3)]'
                                  : 'bg-white/[0.05] border border-white/[0.15] text-white/70 hover:bg-white/[0.08] hover:text-white'
                              }`}
                            >
                              {page}
                            </Button>
                          );
                        })}
                      </div>
                      
                      {/* Page Indicator - Mobile */}
                      <span className="lg:hidden text-white font-mono text-sm px-3 whitespace-nowrap">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      {/* Next Button */}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentPage(prev => Math.min(totalPages, prev + 1));
                        }}
                        disabled={currentPage === totalPages}
                        className="font-mono text-xs bg-white/[0.05] border border-white/[0.15] text-white/70 hover:bg-white/[0.08] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </GlassCardContent>
        </GlassCard>
          </TabsContent>

          {/* Content Calendar Tab (Growth) */}
          {hasGrowth && <TabsContent value="calendar">
              {user?.id && <ContentCalendar userId={user.id} />}
            </TabsContent>}

          {/* Research Reports Tab (Scale, Authority, Dominance) */}
          {hasScale && <TabsContent value="reports">
              {user?.id && <ResearchReports userId={user.id} />}
            </TabsContent>}


          {/* Priority Support Tab (Authority, Dominance) */}
          {hasAuthority && <TabsContent value="support">
              <PrioritySupport userEmail={user?.email || ''} />
            </TabsContent>}

        </Tabs>
      </main>

      {/* Revision Request Dialog */}
      <Dialog open={revisionDialogOpen} onOpenChange={setRevisionDialogOpen}>
        <DialogContent className="bg-black/95 border-primary-glow/30">
          <DialogHeader>
            <DialogTitle className="text-white font-mono tracking-wide">
              Request Revision
            </DialogTitle>
            <DialogDescription className="text-white/70 font-mono">
              Provide feedback for "{selectedArticle?.title}"
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="p-3 bg-primary-glow/10 border border-primary-glow/30 rounded-lg">
              <p className="text-primary-glow font-mono text-sm">
                ✅ Revisions Remaining: {selectedArticle?.revisions_remaining ?? 2} / 2
              </p>
              <p className="text-white/60 font-mono text-xs mt-1">
                Each article includes 2 free revisions
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback" className="text-white font-mono">
                Revision Feedback
              </Label>
              <Textarea id="feedback" placeholder="Please describe the changes you'd like to see..." value={revisionFeedback} onChange={e => setRevisionFeedback(e.target.value)} className="min-h-[150px] bg-black/50 border-primary-glow/30 text-white font-mono" />
              <p className="text-white/50 font-mono text-xs">
                Be specific about what needs to be changed for faster turnaround
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setRevisionDialogOpen(false)} className="font-mono" disabled={submittingRevision}>
              Cancel
            </Button>
            <Button onClick={submitRevisionRequest} disabled={submittingRevision || !revisionFeedback.trim()} className="bg-primary hover:bg-primary-glow text-white font-mono">
              {submittingRevision ? <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </> : 'Submit Revision Request'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Dashboard;