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
import { FileText, Calendar as CalendarIcon, TrendingUp, Clock, CheckCircle, AlertCircle, Zap, LogOut, RefreshCw, CreditCard, BarChart3, Target, Eye, Download, Edit, MessageSquare, User as UserIcon, Settings, LayoutDashboard, ChevronDown, Archive, History } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";
import ContentCalendar from "@/components/dashboard/ContentCalendar";
import ResearchReports from "@/components/dashboard/ResearchReports";
import PerformanceDashboard from "@/components/dashboard/PerformanceDashboard";
import PrioritySupport from "@/components/dashboard/PrioritySupport";
import MarketRoadmap from "@/components/dashboard/MarketRoadmap";
import { QuotaUsageWidget } from "@/components/dashboard/QuotaUsageWidget";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const hasGrowth = tier === 'growth';
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

  // Filter articles by month first, then by status
  const monthFilteredArticles = monthFilter === 'all_time' ? articles : articles.filter(article => getMonthYear(article.created_at) === monthFilter);
  const filteredArticles = statusFilter === 'all' ? monthFilteredArticles : monthFilteredArticles.filter(a => a.status === statusFilter);

  // Current month articles for pipeline display
  const currentMonthPipelineArticles = articles.filter(article => getMonthYear(article.created_at) === currentMonthYear);
  const previousMonthArticles = articles.filter(article => getMonthYear(article.created_at) !== currentMonthYear);
  
  // Determine which article to display in pipeline
  const displayedPipelineArticle = selectedPipelineArticleId 
    ? articles.find(a => a.id === selectedPipelineArticleId) 
    : currentMonthPipelineArticles[0] || null;

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
    return <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary-glow/30 border-t-primary-glow rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-primary-glow/60 rounded-full animate-pulse"></div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border border-primary-glow/10 rotate-45 animate-float" />
      <div className="absolute top-40 right-20 w-12 h-12 border border-primary-glow/15 rotate-12 animate-float" style={{
      animationDelay: '2s'
    }} />
      
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
                <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-primary-glow/30 z-50">
                  <DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20 cursor-pointer" onClick={() => navigate('/account-settings')}>
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20 cursor-pointer" onClick={() => window.open('https://billing.stripe.com/p/login/test_your_link', '_blank')}>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary-glow/20" />
                  <DropdownMenuItem className="font-mono text-red-400 hover:bg-red-500/20 cursor-pointer" onClick={handleSignOut}>
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
      <main className="relative z-10 container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 font-mono tracking-wide break-words">
            Welcome back, <span className="text-primary-glow animate-text-glow block sm:inline mt-1 sm:mt-0">{user?.email}</span>
          </h2>
          <p className="text-white/70 font-mono tracking-wide text-sm sm:text-base">
            {hasDominance ? '⚡ Your dedicated client workspace - Market dominance awaits' : 'Your content production command center'}
          </p>
          {hasDominance && <div className="mt-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 font-mono text-sm">
                <strong>Dominance Tier Active:</strong> 12-hour lightning delivery, unlimited revisions, and dedicated priority support at your service.
              </p>
            </div>}
        </div>

        {/* Submit New Brief Button */}
        <div className="mb-6 sm:mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-cyber rounded-lg blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
            <Button onClick={() => window.location.href = '/content-brief'} className="relative w-full bg-primary hover:bg-primary-glow text-white font-mono tracking-wide border-2 border-primary-glow/50 hover:border-primary-glow shadow-cyber hover:shadow-hologram transition-all duration-500 h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-xl">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 sm:mr-3" />
              <span className="hidden sm:inline">+ SUBMIT NEW CONTENT BRIEF</span>
              <span className="sm:hidden">+ NEW BRIEF</span>
            </Button>
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Account Status */}
          <Card className="px-6 pt-6 pb-4 bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber h-fit">
            <h3 className="text-lg font-bold text-white mb-4 font-mono tracking-wide flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary-glow" />
              ACCOUNT STATUS
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white font-mono">Status</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono">
                  READY
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white font-mono">Plan</span>
                <div className="flex items-center gap-2">
                  {(() => {
                  const tier = (subscriber?.subscription_tier || 'starter').toLowerCase();
                  const tierColors = {
                    starter: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                    growth: 'bg-green-500/20 text-green-300 border-green-500/30',
                    scale: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                    authority: 'bg-red-500/20 text-red-300 border-red-500/30',
                    dominance: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  };
                  const tierEmojis = {
                    starter: '🚀',
                    growth: '🔥',
                    scale: '⚡',
                    authority: '👑',
                    dominance: '💎'
                  };
                  const currentTierColor = tierColors[tier] || tierColors.starter;
                  const currentEmoji = tierEmojis[tier] || tierEmojis.starter;
                  return <>
                        <Badge className={`${currentTierColor} font-mono uppercase`}>
                          {currentEmoji} {subscriber?.subscription_tier || 'Starter'}
                        </Badge>
                        {subscriber?.subscription_end && (() => {
                      const endDate = new Date(subscriber.subscription_end);
                      const now = new Date();
                      const daysUntilRenewal = Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                      const isAnnual = daysUntilRenewal > 180;
                      return <Badge className="bg-white/10 text-white/80 border border-white/30 font-mono text-xs">
                              📅 {isAnnual ? 'ANNUAL' : 'MONTHLY'}
                            </Badge>;
                    })()}
                      </>;
                })()}
                </div>
              </div>
              {subscriber?.subscription_end && <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white font-mono">Renews</span>
                  <span className="text-sm font-mono text-white/70">
                    {formatDate(subscriber.subscription_end)}
                  </span>
                </div>}
            </div>
          </Card>

          {/* Monthly Usage - QuotaUsageWidget */}
          <QuotaUsageWidget subscriptionTier={tier} articlesUsed={monthlyUsage.articles} socialPostsUsed={monthlyUsage.socialPosts} productDescUsed={monthlyUsage.productDesc} />
        </div>

        {/* Content Queue */}
        {totalArticles > 0 && <Card className="mb-6 sm:mb-8 bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
            <CardHeader className="px-4 sm:px-6">
              <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide text-base sm:text-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-primary-glow" />
                CONTENT QUEUE
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 sm:px-6">
              <div className="space-y-4 sm:space-y-6">
                {/* Status Overview - Stacked on mobile */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 sm:gap-8 p-3 sm:p-4 bg-black/20 rounded-lg border border-primary-glow/20">
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                      <span className="text-white font-mono text-xs sm:text-base whitespace-nowrap">
                        {articles.filter(a => a.status === 'completed').length} <span className="text-white/60">Completed</span>
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-white/20" />
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-white font-mono text-xs sm:text-base whitespace-nowrap">
                        {articles.filter(a => a.status === 'in_progress').length} <span className="text-white/60">In Progress</span>
                      </span>
                    </div>
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-white/20" />
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-white font-mono text-xs sm:text-base whitespace-nowrap">
                        {articles.filter(a => a.status === 'pending').length} <span className="text-white/60">Pending</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Mix */}
                <div>
                  <h3 className="text-white/70 font-mono text-xs uppercase tracking-wider mb-3">Content Mix</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    {/* Blog Articles */}
                    <div className="p-3 sm:p-4 bg-black/20 rounded-lg border border-primary-glow/20">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-primary-glow flex-shrink-0" />
                        <span className="text-white font-mono text-xs sm:text-sm">Blog Articles</span>
                      </div>
                      <p className="text-white font-mono text-xl sm:text-2xl mb-1">
                        {articles.filter(a => !a.content_type || a.content_type === 'article' || a.content_type === 'blog_article').length}
                      </p>
                      <p className="text-white/60 font-mono text-xs break-words">
                        {articles.filter(a => !a.content_type || a.content_type === 'article' || a.content_type === 'blog_article').reduce((sum, a) => sum + (a.word_count || 0), 0).toLocaleString()} words total
                      </p>
                    </div>

                    {/* Social Posts */}
                    <div className="p-3 sm:p-4 bg-black/20 rounded-lg border border-primary-glow/20">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="h-4 w-4 text-primary-glow flex-shrink-0" />
                        <span className="text-white font-mono text-xs sm:text-sm">Social Posts</span>
                      </div>
                      <p className="text-white font-mono text-xl sm:text-2xl mb-1">
                        {articles.filter(a => a.content_type === 'social_media' || a.content_type === 'social_media_post').length}
                      </p>
                      <p className="text-white/60 font-mono text-xs">submitted</p>
                    </div>

                    {/* Product Descriptions */}
                    <div className="p-3 sm:p-4 bg-black/20 rounded-lg border border-primary-glow/20">
                      <div className="flex items-center gap-2 mb-2">
                        <CreditCard className="h-4 w-4 text-primary-glow flex-shrink-0" />
                        <span className="text-white font-mono text-xs sm:text-sm">Product Descriptions</span>
                      </div>
                      <p className="text-white font-mono text-xl sm:text-2xl mb-1">
                        {articles.filter(a => a.content_type === 'product_description').length}
                      </p>
                      <p className="text-white/60 font-mono text-xs">submitted</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>}

        {/* Consolidated Pipeline & Workflow */}
        <Card className="mb-6 sm:mb-8 bg-black/30 backdrop-blur-xl border-green-500/30 shadow-cyber">
          <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-lg" />
          <CardHeader className="relative px-4 sm:px-6">
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide text-base sm:text-lg">
              <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
              CONTENT PIPELINE
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4 sm:space-y-6 px-4 sm:px-6">
            {/* Selected Project Indicator */}
            {selectedPipelineArticleId && displayedPipelineArticle && (
              <div className="flex items-center justify-between p-2 bg-primary-glow/10 rounded-lg border border-primary-glow/30">
                <span className="text-white/70 font-mono text-xs">
                  Viewing: <span className="text-primary-glow">{displayedPipelineArticle.title}</span>
                </span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedPipelineArticleId(null)}
                  className="font-mono text-xs text-primary-glow hover:text-white h-7"
                >
                  {currentMonthPipelineArticles.length > 0 ? 'Show Latest' : 'Clear Selection'}
                </Button>
              </div>
            )}

            {/* Latest Project Status or Empty State */}
            {displayedPipelineArticle ? (
              <div className="space-y-3">
                <h3 className="text-white/70 font-mono text-xs sm:text-sm uppercase tracking-wider">
                  {selectedPipelineArticleId ? 'Selected Project' : 'Latest Project'}
                </h3>
                <div className="p-3 sm:p-6 bg-black/20 rounded-lg border border-green-500/20">
                  <div className="mb-2">
                    <p className="text-white font-mono text-sm sm:text-base break-words">{displayedPipelineArticle.title}</p>
                  </div>
                  <p className="text-white/50 font-mono text-xs mb-4 sm:mb-6">
                    Submitted: {formatDateTime(displayedPipelineArticle.created_at)}
                  </p>
                  
                  {/* Progress Tracker */}
                  <div className="space-y-3 sm:space-y-4">
                    {(() => {
                      const status = displayedPipelineArticle.status || 'pending';
                      const stages = [{
                        name: 'Brief Received',
                        icon: CheckCircle,
                        emoji: '✅',
                        desc: 'Your brief has been received and queued',
                        step: 1
                      }, {
                        name: 'AI Research & Strategy',
                        icon: Clock,
                        emoji: '🔄',
                        desc: 'Analyzing keywords and competitor insights',
                        step: 2
                      }, {
                        name: 'AI Writing',
                        icon: FileText,
                        emoji: '✍️',
                        desc: 'Content generation in progress',
                        step: 3
                      }, {
                        name: 'Quality Control',
                        icon: Eye,
                        emoji: '🔍',
                        desc: 'Human review and optimization',
                        step: 4
                      }, {
                        name: 'Ready for Download',
                        icon: Zap,
                        emoji: '🚀',
                        desc: 'Your content will be available here',
                        step: 5
                      }];

                      let currentStep = 1;
                      if (status === 'pending') currentStep = 2;
                      else if (status === 'in_progress') currentStep = 3;
                      else if (status === 'review') currentStep = 4;
                      else if (status === 'completed') currentStep = 5;

                      return stages.map((stage, index) => {
                        const isCompleted = stage.step < currentStep;
                        const isCurrent = stage.step === currentStep;
                        const Icon = stage.icon;
                        return (
                          <div key={stage.name}>
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className={`flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0 mt-0.5 ${isCompleted ? 'bg-green-500/20 border border-green-500' : isCurrent ? 'bg-yellow-500/20 border border-yellow-500' : 'bg-white/10 border border-white/30'}`}>
                                <Icon className={`h-3 w-3 sm:h-4 sm:w-4 ${isCompleted ? 'text-green-400' : isCurrent ? 'text-yellow-400 animate-pulse' : 'text-white/50'}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-mono text-xs sm:text-sm font-semibold ${isCompleted ? 'text-green-400' : isCurrent ? 'text-yellow-400' : 'text-white/50'}`}>
                                  {stage.emoji} {stage.name}
                                </p>
                                <p className={`font-mono text-[10px] sm:text-xs mt-0.5 break-words ${isCompleted || isCurrent ? 'text-white/60' : 'text-white/40'}`}>
                                  {stage.desc}
                                </p>
                              </div>
                            </div>
                            {index < stages.length - 1 && <div className={`ml-2 sm:ml-3 w-0.5 h-3 sm:h-4 ${isCompleted ? 'bg-green-500/30' : isCurrent ? 'bg-yellow-500/30' : 'bg-white/10'}`}></div>}
                          </div>
                        );
                      });
                    })()}
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    {(() => {
                      const status = displayedPipelineArticle.status || 'pending';
                      let progress = 20;
                      let statusMessage = 'Estimated completion: Within 24 hours';
                      if (status === 'pending') {
                        progress = 20;
                        statusMessage = 'Brief received, starting research...';
                      } else if (status === 'in_progress') {
                        progress = 60;
                        statusMessage = 'AI writing in progress...';
                      } else if (status === 'review') {
                        progress = 80;
                        statusMessage = 'Under quality review...';
                      } else if (status === 'completed') {
                        progress = 100;
                        statusMessage = 'Content ready for download!';
                      }
                      return (
                        <>
                          <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                            <span>Progress</span>
                            <span>{progress}% Complete</span>
                          </div>
                          <Progress value={progress} className="h-2 bg-black/50" />
                          <p className={`font-mono text-xs mt-2 ${status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {status === 'completed' ? '✅' : '⏱️'} {statusMessage}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-primary-glow/50 mx-auto mb-4" />
                <p className="text-white font-mono text-xl mb-2">Ready for Content Production</p>
                <p className="text-white/70 font-mono text-sm">
                  {articles.length > 0 
                    ? "No content briefs submitted this month. Submit a new brief to get started!" 
                    : "Submit your first content brief to get started"}
                </p>
              </div>
            )}

            {/* Hint to use PROJECTS tab */}
            {articles.length > 1 && (
              <p className="text-white/50 font-mono text-xs text-center">
                View all projects in the PROJECTS tab below
              </p>
            )}
          </CardContent>
        </Card>

        {/* Dashboard Features Tabs */}
        <Tabs defaultValue="projects" className="mb-8">
          <TabsList className="bg-black/40 border border-primary-glow/40 mb-6">
            <TabsTrigger value="projects" className="font-mono data-[state=active]:bg-primary-glow/30 data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              PROJECTS
            </TabsTrigger>
            
            {hasGrowth && <TabsTrigger value="calendar" className="font-mono data-[state=active]:bg-primary-glow/30 data-[state=active]:text-white">
                <CalendarIcon className="h-4 w-4 mr-2" />
                CALENDAR
              </TabsTrigger>}
            
            {hasScale && <TabsTrigger value="reports" className="font-mono data-[state=active]:bg-primary-glow/30 data-[state=active]:text-white">
                <FileText className="h-4 w-4 mr-2" />
                RESEARCH
              </TabsTrigger>}
            
            {hasDominance && <TabsTrigger value="performance" className="font-mono data-[state=active]:bg-primary-glow/30 data-[state=active]:text-white">
                <BarChart3 className="h-4 w-4 mr-2" />
                PERFORMANCE
              </TabsTrigger>}
            
            {hasScale && <TabsTrigger value="support" className="font-mono data-[state=active]:bg-primary-glow/30 data-[state=active]:text-white relative">
                <MessageSquare className="h-4 w-4 mr-2" />
                SUPPORT
                {(hasAuthority || hasDominance) && <Badge className="ml-2 bg-yellow-500/30 text-yellow-300 border-yellow-500/50 text-xs px-1 py-0">
                    PRIORITY
                  </Badge>}
              </TabsTrigger>}
            
            {hasDominance && <TabsTrigger value="roadmap" className="font-mono data-[state=active]:bg-primary-glow/30 data-[state=active]:text-white">
                <Target className="h-4 w-4 mr-2" />
                ROADMAP
              </TabsTrigger>}
          </TabsList>

          {/* Projects Tab (Default) */}
          <TabsContent value="projects">
            <Card className="bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide text-sm sm:text-base">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary-glow" />
                  YOUR CONTENT PROJECTS
                  {monthFilter !== 'all_time' && monthFilter !== currentMonthYear && <Badge className="ml-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs font-mono">
                      <Archive className="h-3 w-3 mr-1" />
                      ARCHIVE
                    </Badge>}
                </CardTitle>
              </div>
              
              {articles.length > 0 && <div className="flex flex-col gap-3">
                  {/* Month Filter */}
                  <div className="flex items-center gap-2 w-full">
                    <CalendarIcon className="h-4 w-4 text-primary-glow flex-shrink-0" />
                    <Select value={monthFilter} onValueChange={setMonthFilter}>
                      <SelectTrigger className="flex-1 bg-black/40 border-primary-glow/30 text-white font-mono text-xs sm:text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 backdrop-blur-xl border-primary-glow/30 z-50">
                        <SelectItem value={currentMonthYear} className="font-mono text-white hover:bg-primary-glow/20">
                          {getMonthLabel(currentMonthYear)} ({articles.filter(a => getMonthYear(a.created_at) === currentMonthYear).length})
                        </SelectItem>
                        {availableMonths.filter(month => month !== currentMonthYear).map(month => <SelectItem key={month} value={month} className="font-mono text-white hover:bg-primary-glow/20">
                              {getMonthLabel(month)} ({articles.filter(a => getMonthYear(a.created_at) === month).length})
                            </SelectItem>)}
                        <SelectItem value="all_time" className="font-mono text-white hover:bg-primary-glow/20">
                          📚 View All Time
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status Filters */}
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                    <Button size="sm" variant={statusFilter === 'all' ? 'default' : 'outline'} onClick={() => setStatusFilter('all')} className={`font-mono text-xs whitespace-nowrap flex-shrink-0 ${statusFilter !== 'all' ? 'hover:!bg-transparent hover:!text-inherit' : ''}`}>
                      All ({monthFilteredArticles.length})
                    </Button>
                    <Button size="sm" variant={statusFilter === 'completed' ? 'default' : 'outline'} onClick={() => setStatusFilter('completed')} className={`font-mono text-xs whitespace-nowrap flex-shrink-0 ${statusFilter !== 'completed' ? 'hover:!bg-transparent hover:!text-inherit' : ''}`}>
                      Completed ({monthFilteredArticles.filter(a => a.status === 'completed').length})
                    </Button>
                    <Button size="sm" variant={statusFilter === 'in_progress' ? 'default' : 'outline'} onClick={() => setStatusFilter('in_progress')} className={`font-mono text-xs whitespace-nowrap flex-shrink-0 ${statusFilter !== 'in_progress' ? 'hover:!bg-transparent hover:!text-inherit' : ''}`}>
                      In Progress ({monthFilteredArticles.filter(a => a.status === 'in_progress').length})
                    </Button>
                    <Button size="sm" variant={statusFilter === 'pending' ? 'default' : 'outline'} onClick={() => setStatusFilter('pending')} className={`font-mono text-xs whitespace-nowrap flex-shrink-0 ${statusFilter !== 'pending' ? 'hover:!bg-transparent hover:!text-inherit' : ''}`}>
                      Pending ({monthFilteredArticles.filter(a => a.status === 'pending').length})
                    </Button>
                  </div>
                </div>}
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            {articles.length === 0 ? <div className="text-center py-12">
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
              </div> : filteredArticles.length === 0 ? <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-primary-glow/50 mx-auto mb-3" />
                <p className="text-white font-mono text-lg mb-2">
                  No {statusFilter === 'in_progress' ? 'in progress' : statusFilter === 'all' ? '' : statusFilter + ' '}projects
                  {monthFilter !== 'all_time' && ` in ${getMonthLabel(monthFilter)}`}
                </p>
                <p className="text-white/70 font-mono text-sm">
                  Try selecting a different {monthFilter === 'all_time' ? 'filter' : 'month or filter'}
                </p>
              </div> : <>
                {/* Mobile Card Layout */}
                <div className="block md:hidden space-y-4">
                  {filteredArticles.map(article => <div key={article.id} onClick={() => setSelectedPipelineArticleId(article.id === selectedPipelineArticleId ? null : article.id)} className={`p-4 bg-black/20 rounded-lg border cursor-pointer transition-all ${article.id === selectedPipelineArticleId ? 'border-green-500/60 bg-green-500/10' : 'border-primary-glow/20 hover:border-primary-glow/40'}`}>
                      <div className="space-y-3">
                        {/* Title and Word Count */}
                        <div>
                          <h3 className="text-white font-mono tracking-wide font-semibold text-sm mb-1 break-words">
                            {article.title}
                          </h3>
                          {article.word_count > 0 && <p className="text-white/50 font-mono text-xs">{article.word_count} words</p>}
                        </div>
                        
                        {/* Status Badge */}
                        <div>
                          <Badge className={`${getStatusColor(article.status)} font-mono tracking-wide text-xs`}>
                            {getStatusIcon(article.status)}
                            {article.status === 'completed' ? '✅ Ready' : article.status === 'in_progress' ? '🔄 In Progress' : '⏳ Pending'}
                          </Badge>
                          {(article.status === 'pending' || article.status === 'in_progress') && <p className="text-primary-glow font-mono text-xs mt-1">
                              {getDeliveryTimeframe(article)}
                            </p>}
                        </div>
                        
                        {/* Delivery Deadline for In Progress/Pending */}
                        {(article.status === 'pending' || article.status === 'in_progress') && article.delivery_deadline && <div className="flex items-center justify-between gap-2">
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
                    </div>)}
                </div>
                
                {/* Desktop Table Layout */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary-glow/20 text-left">
                        <th className="text-white/70 font-mono text-sm pb-3">Project Title</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Status</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Delivery</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Revisions</th>
                        <th className="text-white/70 font-mono text-sm pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-3">
                      {filteredArticles.map(article => <tr key={article.id} onClick={() => setSelectedPipelineArticleId(article.id === selectedPipelineArticleId ? null : article.id)} className={`border-b border-primary-glow/10 cursor-pointer transition-colors ${article.id === selectedPipelineArticleId ? 'bg-green-500/10' : 'hover:bg-black/20'}`}>
                          <td className="py-4 align-top w-2/5">
                            <div>
                              <h3 className="text-white font-mono tracking-wide font-semibold text-xs md:text-sm lg:text-base">
                                {article.title}
                              </h3>
                              {article.word_count > 0 && <p className="text-white/50 font-mono text-[10px] md:text-xs">{article.word_count} words</p>}
                            </div>
                          </td>
                          <td className="py-4 align-top">
                            <Badge className={`${getStatusColor(article.status)} font-mono tracking-wide text-[10px] md:text-xs inline-flex items-center gap-1`}>
                              {getStatusIcon(article.status)}
                              {article.status === 'completed' ? '✅ Ready' : article.status === 'in_progress' ? '🔄 In Progress' : '⏳ Pending'}
                            </Badge>
                            {(article.status === 'pending' || article.status === 'in_progress') && <p className="text-primary-glow font-mono text-xs mt-1">
                                {getDeliveryTimeframe(article)}
                              </p>}
                          </td>
                          <td className="py-4 align-top">
                            {article.status === 'completed' ? <span className="text-white font-mono text-xs md:text-sm">
                                {article.delivery_date ? formatDate(article.delivery_date) : 'Completed'}
                              </span> : article.delivery_deadline ? <span className="text-yellow-400 font-mono text-xs md:text-sm font-semibold">
                                {getTimeRemaining(article.delivery_deadline)}
                              </span> : <span className="text-white/50 font-mono text-xs">—</span>}
                          </td>
                          <td className="py-4 align-top">
                            {article.status === 'completed' ? <span className={`font-mono text-xs md:text-sm ${(article.revisions_requested || 0) >= (article.revisions_allowed || 1) ? 'text-red-400' : 'text-white'}`}>
                                {article.revisions_requested || 0} / {article.revisions_allowed === 999999 ? '∞' : article.revisions_allowed || 1}
                              </span> : <span className="text-white/50 font-mono text-xs">—</span>}
                          </td>
                          <td className="py-4 text-right">
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
                        </tr>)}
                    </tbody>
                  </table>
                </div>
              </>}
          </CardContent>
        </Card>
          </TabsContent>

          {/* Content Calendar Tab (Growth) */}
          {hasGrowth && <TabsContent value="calendar">
              {user?.id && <ContentCalendar userId={user.id} />}
            </TabsContent>}

          {/* Research Reports Tab (Scale, Authority, Dominance) */}
          {hasScale && <TabsContent value="reports">
              {user?.id && <ResearchReports userId={user.id} />}
            </TabsContent>}

          {/* Performance Dashboard Tab (Dominance) */}
          {hasDominance && <TabsContent value="performance">
              <PerformanceDashboard articles={articles} monthlyLimit={monthlyLimit} />
            </TabsContent>}

          {/* Priority Support Tab (Authority, Dominance) */}
          {hasAuthority && <TabsContent value="support">
              <PrioritySupport userEmail={user?.email || ''} />
            </TabsContent>}

          {/* Market Roadmap Tab (Dominance) */}
          {hasDominance && <TabsContent value="roadmap">
              {user?.id && <MarketRoadmap userId={user.id} />}
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