import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Zap,
  LogOut,
  RefreshCw,
  CreditCard,
  BarChart3,
  Target,
  Eye,
  Download,
  Edit,
  MessageSquare,
  User as UserIcon,
  Settings,
  LayoutDashboard,
  ChevronDown
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";
import ContentCalendar from "@/components/dashboard/ContentCalendar";
import ResearchReports from "@/components/dashboard/ResearchReports";
import PerformanceDashboard from "@/components/dashboard/PerformanceDashboard";
import PrioritySupport from "@/components/dashboard/PrioritySupport";
import MarketRoadmap from "@/components/dashboard/MarketRoadmap";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [revisionDialogOpen, setRevisionDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState("");
  const [submittingRevision, setSubmittingRevision] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchSubscriberData(session.user.id);
          fetchArticles(session.user.id);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
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

  const fetchSubscriberData = async (userId?: string) => {
    const id = userId || user?.id;
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('subscribed, subscription_tier, subscription_end')
        .eq('user_id', id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      setSubscriber(data || { subscribed: false, subscription_tier: null, subscription_end: null });
    } catch (error: any) {
      console.error('Error fetching subscriber data:', error);
    }
  };

  const fetchArticles = async (userId?: string) => {
    const id = userId || user?.id;
    if (!id) return;
    
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('user_id', id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      console.error('Error fetching articles:', error);
    }
  };

  const refreshSubscription = async () => {
    if (!user?.id) return;
    
    setRefreshing(true);
    try {
      const { error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      
      await fetchSubscriberData(user.id);
      await fetchArticles(user.id);
      
      toast({
        title: "Data Refreshed",
        description: "Your dashboard has been updated.",
      });
    } catch (error: any) {
      console.error('Refresh error:', error);
      // Still refresh the local data even if the edge function fails
      await fetchSubscriberData(user.id);
      await fetchArticles(user.id);
      
      toast({
        title: "Data Refreshed",
        description: "Dashboard updated successfully.",
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
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'pending': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'in_progress': return <Clock className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
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
  const articlesOnlyThisMonth = articlesThisMonth.filter(a => 
    !a.content_type || a.content_type === 'article' || a.content_type === 'blog_article'
  );
  const productDescriptionsThisMonth = articlesThisMonth.filter(a => 
    a.content_type === 'product_description'
  );
  const socialPostsThisMonth = articlesThisMonth.filter(a => 
    a.content_type === 'social_media_post' || (tier === 'growth+' && a.youtube_script)
  );

  const completedArticles = articles.filter(a => a.status === 'completed').length;
  const completedArticlesThisMonth = articlesOnlyThisMonth.length;
  const completedProductDescriptionsThisMonth = productDescriptionsThisMonth.length;
  const completedSocialPostsThisMonth = socialPostsThisMonth.length;
  const totalArticles = articles.length;
  const averageWordCount = articles.length > 0 ? Math.round(articles.reduce((sum, a) => sum + (a.word_count || 0), 0) / articles.length) : 0;
  
  const filteredArticles = statusFilter === 'all' 
    ? articles 
    : articles.filter(a => a.status === statusFilter);

  // Monthly limits by tier
  const getMonthlyLimit = () => {
    switch(tier) {
      case 'growth':
      case 'growth+': return 10;
      case 'scale': return 25;
      case 'authority': return 40;
      case 'dominance': return 50;
      default: return 5; // starter
    }
  };

  const getProductDescriptionLimit = () => {
    switch(tier) {
      case 'growth':
      case 'growth+': return 20;
      case 'scale': return 50;
      case 'authority': return 80;
      case 'dominance': return 100;
      default: return 10; // starter
    }
  };

  const getSocialPostLimit = () => {
    switch(tier) {
      case 'growth':
      case 'growth+': return 30;
      case 'scale': return 60;
      case 'authority': return 100;
      case 'dominance': return 150;
      default: return 15; // starter
    }
  };

  // Word count ranges by tier
  const getWordCountRange = () => {
    switch(tier) {
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
        variant: "destructive",
      });
      return;
    }

    setSubmittingRevision(true);
    try {
      // Here you would call your revision request API
      // For now, we'll just show a success message
      toast({
        title: "Revision Requested",
        description: "Your revision request has been submitted successfully.",
      });
      
      setRevisionDialogOpen(false);
      setSelectedArticle(null);
      setRevisionFeedback("");
    } catch (error) {
      console.error('Error submitting revision:', error);
      toast({
        title: "Error",
        description: "Failed to submit revision request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingRevision(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary-glow/30 border-t-primary-glow rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-primary-glow/60 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border border-primary-glow/10 rotate-45 animate-float" />
      <div className="absolute top-40 right-20 w-12 h-12 border border-primary-glow/15 rotate-12 animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Header */}
      <header className="relative z-10 border-b border-primary-glow/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <img 
                src={scriptStormLogo} 
                alt="ScriptStorm" 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-cyber border border-primary-glow/30 hover:border-primary-glow/60 transition-all duration-300"
              />
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
              <Button
                onClick={refreshSubscription}
                disabled={refreshing}
                size="sm"
                className="relative bg-primary/20 backdrop-blur-sm text-primary-glow border-2 border-primary-glow/50 hover:border-primary-glow hover:bg-primary/30 hover:shadow-cyber font-mono text-xs sm:text-sm flex-1 sm:flex-initial transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                REFRESH
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="relative bg-white/5 backdrop-blur-sm text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 font-mono text-xs sm:text-sm flex-1 sm:flex-initial transition-all duration-300"
                  >
                    <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    ACCOUNT
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-56 bg-black/95 backdrop-blur-xl border-primary-glow/30 z-50"
                >
                  <DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20 cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20 cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="font-mono text-white hover:bg-primary-glow/20 cursor-pointer"
                    onClick={() => window.open('https://billing.stripe.com/p/login/test_your_link', '_blank')}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary-glow/20" />
                  <DropdownMenuItem 
                    className="font-mono text-red-400 hover:bg-red-500/20 cursor-pointer"
                    onClick={handleSignOut}
                  >
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
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 font-mono tracking-wide break-words">
            Welcome back, <span className="text-primary-glow animate-text-glow block sm:inline mt-1 sm:mt-0">{user?.email}</span>
          </h2>
          <p className="text-white/70 font-mono tracking-wide text-sm sm:text-base">
            Your content production command center
          </p>
        </div>

        {/* Submit New Brief Button */}
        <div className="mb-6 sm:mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-cyber rounded-lg blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
            <Button 
              onClick={() => window.location.href = '/content-brief'}
              className="relative w-full bg-primary hover:bg-primary-glow text-white font-mono tracking-wide border-2 border-primary-glow/50 hover:border-primary-glow shadow-cyber hover:shadow-hologram transition-all duration-500 h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-xl"
            >
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2 sm:mr-3" />
              <span className="hidden sm:inline">+ SUBMIT NEW CONTENT BRIEF</span>
              <span className="sm:hidden">+ NEW BRIEF</span>
            </Button>
          </div>
        </div>

        {/* 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Account Status */}
          <Card className="bg-black/30 backdrop-blur-xl border-green-500/30 shadow-cyber">
            <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-lg" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide text-base sm:text-lg">
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                ACCOUNT STATUS
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono tracking-wide text-xs sm:text-sm">
                    READY ✅
                  </Badge>
                  <Badge className="bg-primary-glow/20 text-primary-glow border-primary-glow/30 font-mono tracking-wide text-xs sm:text-sm">
                    PLAN: {(subscriber?.subscription_tier || 'STARTER').toUpperCase()}
                  </Badge>
                </div>
                <div className="pt-2 space-y-4">
                  {/* Articles */}
                  <div>
                    <p className="text-white/70 font-mono text-xs sm:text-sm">Monthly Articles:</p>
                    <p className="text-white font-mono text-xl sm:text-2xl">{completedArticlesThisMonth} / {monthlyLimit}</p>
                    <Progress 
                      value={(completedArticlesThisMonth / monthlyLimit) * 100} 
                      className="h-2 bg-black/50 mt-2"
                    />
                    <p className="text-primary-glow font-mono text-xs mt-2">
                      {monthlyLimit - completedArticlesThisMonth} articles remaining this month
                    </p>
                  </div>
                  
                  {/* Product Descriptions */}
                  <div>
                    <p className="text-white/70 font-mono text-xs sm:text-sm">Monthly Product Descriptions:</p>
                    <p className="text-white font-mono text-xl sm:text-2xl">{completedProductDescriptionsThisMonth} / {productDescriptionLimit}</p>
                    <Progress 
                      value={(completedProductDescriptionsThisMonth / productDescriptionLimit) * 100} 
                      className="h-2 bg-black/50 mt-2"
                    />
                    <p className="text-primary-glow font-mono text-xs mt-2">
                      {productDescriptionLimit - completedProductDescriptionsThisMonth} product descriptions remaining this month
                    </p>
                  </div>
                  
                  {/* Social Media Posts */}
                  <div>
                    <p className="text-white/70 font-mono text-xs sm:text-sm">Monthly Social Media Posts:</p>
                    <p className="text-white font-mono text-xl sm:text-2xl">{completedSocialPostsThisMonth} / {socialPostLimit}</p>
                    <Progress 
                      value={(completedSocialPostsThisMonth / socialPostLimit) * 100} 
                      className="h-2 bg-black/50 mt-2"
                    />
                    <p className="text-primary-glow font-mono text-xs mt-2">
                      {socialPostLimit - completedSocialPostsThisMonth} social media posts remaining this month
                      {tier === 'growth+' && <span className="block text-white/50 text-[10px] mt-1">(includes YouTube scripts)</span>}
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full bg-white/5 border-primary-glow/30 text-white hover:bg-white/10 hover:border-primary-glow/50 font-mono text-xs sm:text-sm"
                    onClick={() => window.open('https://billing.stripe.com/p/login/test_your_link', '_blank')}
                  >
                    <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                    Manage Subscription
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Production Stats */}
          {totalArticles > 0 && (
            <Card className="bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-primary-glow" />
                  PRODUCTION STATS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs sm:text-sm font-mono text-white/70 mb-2">
                      <span>Completion Rate</span>
                      <span>{Math.round((completedArticles / totalArticles) * 100)}%</span>
                    </div>
                    <Progress 
                      value={(completedArticles / totalArticles) * 100} 
                      className="h-3 bg-black/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                    <div className="text-center p-2 sm:p-3 bg-black/20 rounded-lg border border-primary-glow/20">
                      <p className="text-white font-mono text-xl sm:text-2xl">{totalArticles}</p>
                      <p className="text-white/70 font-mono text-xs">Total Briefs</p>
                    </div>
                    <div className="text-center p-2 sm:p-3 bg-black/20 rounded-lg border border-primary-glow/20">
                      <p className="text-white font-mono text-lg sm:text-xl">{wordCountRange}</p>
                      <p className="text-white/70 font-mono text-xs">Words Per Article</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Consolidated Pipeline & Workflow */}
        {articles.length > 0 ? (
          <Card className="mb-8 bg-black/30 backdrop-blur-xl border-green-500/30 shadow-cyber">
            <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-lg" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide text-base sm:text-lg">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                CONTENT PIPELINE
              </CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-4 sm:space-y-6">
              {/* Latest Project Status */}
              <div className="space-y-3">
                <h3 className="text-white/70 font-mono text-xs sm:text-sm uppercase tracking-wider">Latest Project</h3>
                <div className="p-4 sm:p-6 bg-black/20 rounded-lg border border-green-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white font-mono text-sm sm:text-base break-words">{articles[0]?.title}</p>
                  </div>
                  <p className="text-white/50 font-mono text-xs mb-6">
                    Submitted: {new Date(articles[0]?.created_at).toLocaleDateString()} at {new Date(articles[0]?.created_at).toLocaleTimeString()}
                  </p>
                  
                  {/* Progress Tracker */}
                  <div className="space-y-4">
                    {/* Brief Received */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex-shrink-0 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-green-400 font-mono text-xs sm:text-sm font-semibold">✅ Brief Received</p>
                        <p className="text-white/60 font-mono text-[10px] sm:text-xs mt-0.5">Your brief has been received and queued</p>
                      </div>
                    </div>
                    
                    {/* Connector Line */}
                    <div className="ml-3 w-0.5 h-4 bg-yellow-500/30"></div>
                    
                    {/* AI Research & Strategy */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500/20 border border-yellow-500 flex-shrink-0 mt-0.5">
                        <Clock className="h-4 w-4 text-yellow-400 animate-pulse" />
                      </div>
                      <div className="flex-1">
                        <p className="text-yellow-400 font-mono text-xs sm:text-sm font-semibold">🔄 AI Research & Strategy</p>
                        <p className="text-white/60 font-mono text-[10px] sm:text-xs mt-0.5">Analyzing keywords and competitor insights</p>
                      </div>
                    </div>
                    
                    {/* Connector Line */}
                    <div className="ml-3 w-0.5 h-4 bg-white/10"></div>
                    
                    {/* AI Writing */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/30 flex-shrink-0 mt-0.5">
                        <FileText className="h-4 w-4 text-white/50" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/50 font-mono text-xs sm:text-sm font-semibold">✍️ AI Writing</p>
                        <p className="text-white/40 font-mono text-[10px] sm:text-xs mt-0.5">Content generation in progress</p>
                      </div>
                    </div>
                    
                    {/* Connector Line */}
                    <div className="ml-3 w-0.5 h-4 bg-white/10"></div>
                    
                    {/* Quality Control */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/30 flex-shrink-0 mt-0.5">
                        <Eye className="h-4 w-4 text-white/50" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/50 font-mono text-xs sm:text-sm font-semibold">🔍 Quality Control</p>
                        <p className="text-white/40 font-mono text-[10px] sm:text-xs mt-0.5">Final review and optimization</p>
                      </div>
                    </div>
                    
                    {/* Connector Line */}
                    <div className="ml-3 w-0.5 h-4 bg-white/10"></div>
                    
                    {/* Ready for Download */}
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 border border-white/30 flex-shrink-0 mt-0.5">
                        <Zap className="h-4 w-4 text-white/50" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white/50 font-mono text-xs sm:text-sm font-semibold">🚀 Ready for Download</p>
                        <p className="text-white/40 font-mono text-[10px] sm:text-xs mt-0.5">Your content will be available here</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-xs font-mono text-white/60 mb-2">
                      <span>Progress</span>
                      <span>40% Complete</span>
                    </div>
                    <Progress value={40} className="h-2 bg-black/50" />
                    <p className="text-yellow-400 font-mono text-xs mt-2">
                      ⏱️ Estimated completion: Within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Workflow Progress */}
              <div className="space-y-3">
                <h3 className="text-white/70 font-mono text-xs sm:text-sm uppercase tracking-wider">Recent Projects</h3>
                {articles.slice(0, 3).map((article) => (
                  <div key={article.id} className="flex items-center gap-2 sm:gap-4 p-2 sm:p-3 bg-black/20 rounded-lg border border-primary-glow/20">
                    {article.status === 'completed' && (
                      <>
                        <span className="text-green-400 text-base sm:text-lg flex-shrink-0">🟢</span>
                        <span className="text-white font-mono flex-1 truncate text-xs sm:text-sm">{article.title}</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono text-[10px] sm:text-xs whitespace-nowrap">
                          COMPLETE
                        </Badge>
                      </>
                    )}
                    {article.status === 'in_progress' && (
                      <>
                        <span className="text-yellow-400 text-base sm:text-lg flex-shrink-0">🟡</span>
                        <span className="text-white font-mono flex-1 truncate text-xs sm:text-sm">{article.title}</span>
                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 font-mono text-[10px] sm:text-xs whitespace-nowrap">
                          IN PROGRESS
                        </Badge>
                      </>
                    )}
                    {article.status === 'pending' && (
                      <>
                        <span className="text-blue-400 text-base sm:text-lg flex-shrink-0">🔵</span>
                        <span className="text-white font-mono flex-1 truncate text-xs sm:text-sm">{article.title}</span>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-mono text-[10px] sm:text-xs whitespace-nowrap">
                          QUEUED
                        </Badge>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8 bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
            <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-lg" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
                <Target className="h-5 w-5 text-primary-glow" />
                CONTENT PIPELINE
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-primary-glow/50 mx-auto mb-4" />
                <p className="text-white font-mono text-xl mb-2">Ready for Content Production</p>
                <p className="text-white/70 font-mono text-sm">Submit your first content brief to get started</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Features Tabs */}
        <Tabs defaultValue="projects" className="mb-8">
          <TabsList className="bg-black/30 border border-primary-glow/30 mb-6">
            <TabsTrigger value="projects" className="font-mono data-[state=active]:bg-primary-glow/20">
              <FileText className="h-4 w-4 mr-2" />
              PROJECTS
            </TabsTrigger>
            
            {hasGrowth && (
              <TabsTrigger value="calendar" className="font-mono data-[state=active]:bg-primary-glow/20">
                <CalendarIcon className="h-4 w-4 mr-2" />
                CALENDAR
              </TabsTrigger>
            )}
            
            {hasScale && (
              <TabsTrigger value="reports" className="font-mono data-[state=active]:bg-primary-glow/20">
                <FileText className="h-4 w-4 mr-2" />
                RESEARCH
              </TabsTrigger>
            )}
            
            {hasDominance && (
              <TabsTrigger value="performance" className="font-mono data-[state=active]:bg-primary-glow/20">
                <BarChart3 className="h-4 w-4 mr-2" />
                PERFORMANCE
              </TabsTrigger>
            )}
            
            {hasAuthority && (
              <TabsTrigger value="support" className="font-mono data-[state=active]:bg-primary-glow/20">
                <MessageSquare className="h-4 w-4 mr-2" />
                SUPPORT
              </TabsTrigger>
            )}
            
            {hasDominance && (
              <TabsTrigger value="roadmap" className="font-mono data-[state=active]:bg-primary-glow/20">
                <Target className="h-4 w-4 mr-2" />
                ROADMAP
              </TabsTrigger>
            )}
          </TabsList>

          {/* Projects Tab (Default) */}
          <TabsContent value="projects">
            <Card className="bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide text-sm sm:text-base">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary-glow" />
                YOUR CONTENT PROJECTS
              </CardTitle>
              {articles.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
                  <Button
                    size="sm"
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('all')}
                    className="font-mono text-xs whitespace-nowrap flex-shrink-0"
                  >
                    All ({articles.length})
                  </Button>
                  <Button
                    size="sm"
                    variant={statusFilter === 'completed' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('completed')}
                    className="font-mono text-xs whitespace-nowrap flex-shrink-0"
                  >
                    Completed ({articles.filter(a => a.status === 'completed').length})
                  </Button>
                  <Button
                    size="sm"
                    variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('in_progress')}
                    className="font-mono text-xs whitespace-nowrap flex-shrink-0"
                  >
                    In Progress ({articles.filter(a => a.status === 'in_progress').length})
                  </Button>
                  <Button
                    size="sm"
                    variant={statusFilter === 'pending' ? 'default' : 'outline'}
                    onClick={() => setStatusFilter('pending')}
                    className="font-mono text-xs whitespace-nowrap flex-shrink-0"
                  >
                    Pending ({articles.filter(a => a.status === 'pending').length})
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {articles.length === 0 ? (
              <div className="text-center py-12">
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
            ) : filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-primary-glow/50 mx-auto mb-3" />
                <p className="text-white font-mono text-lg mb-2">
                  No {statusFilter} projects
                </p>
                <p className="text-white/70 font-mono text-sm">
                  Try selecting a different filter
                </p>
              </div>
            ) : (
              <>
                {/* Mobile Card Layout */}
                <div className="block md:hidden space-y-6">
                  {filteredArticles.map((article) => (
                    <div key={article.id} className="p-6 bg-black/20 rounded-lg border border-primary-glow/20">
                      <div className="space-y-5">
                        {/* Title and Word Count */}
                        <div>
                          <h3 className="text-white font-mono tracking-wide font-semibold text-sm mb-1">
                            {article.title}
                          </h3>
                          {article.word_count > 0 && (
                            <p className="text-white/50 font-mono text-xs">{article.word_count} words</p>
                          )}
                        </div>
                        
                        {/* Status Badge */}
                        <div>
                          <Badge className={`${getStatusColor(article.status)} font-mono tracking-wide text-xs`}>
                            {getStatusIcon(article.status)}
                            {article.status === 'completed' ? '✅ Ready' : 
                             article.status === 'in_progress' ? '🔄 In Progress' : 
                             '⏳ Pending'}
                          </Badge>
                        </div>
                        
                        {/* Delivered On */}
                        <div className="flex items-center justify-between">
                          <span className="text-white/70 font-mono text-xs">Delivered:</span>
                          <span className="text-white font-mono text-xs">
                            {article.status === 'completed' && article.delivery_date
                              ? new Date(article.delivery_date).toLocaleDateString()
                              : article.status === 'completed'
                              ? 'Completed'
                              : '—'}
                          </span>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex flex-col gap-2 pt-2">
                          {article.status === 'completed' ? (
                            <>
                              <Button 
                                size="sm" 
                                className="w-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 font-mono text-xs"
                                onClick={() => article.article_url && window.open(article.article_url, '_blank')}
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Download
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="w-full text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/60 font-mono text-xs"
                                onClick={() => handleRequestRevision(article)}
                              >
                                <Edit className="h-3 w-3 mr-1" />
                                Request Revision
                              </Button>
                            </>
                          ) : article.status === 'in_progress' ? (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="w-full text-blue-400 border border-blue-500/30 hover:border-blue-500/60 font-mono text-xs"
                            >
                              View ETA
                            </Button>
                          ) : (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="w-full text-gray-400 border border-gray-500/30 font-mono text-xs"
                              disabled
                            >
                              Queued
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Desktop Table Layout */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-primary-glow/20 text-left">
                        <th className="text-white/70 font-mono text-sm pb-3">Project Title</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Status</th>
                        <th className="text-white/70 font-mono text-sm pb-3">Delivered On</th>
                        <th className="text-white/70 font-mono text-sm pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-3">
                      {filteredArticles.map((article) => (
                        <tr key={article.id} className="border-b border-primary-glow/10 hover:bg-black/20 transition-colors">
                          <td className="py-4 align-top w-2/5">
                            <div>
                              <h3 className="text-white font-mono tracking-wide font-semibold text-xs md:text-sm lg:text-base">
                                {article.title}
                              </h3>
                              {article.word_count > 0 && (
                                <p className="text-white/50 font-mono text-[10px] md:text-xs">{article.word_count} words</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 align-top">
                            <Badge className={`${getStatusColor(article.status)} font-mono tracking-wide text-[10px] md:text-xs inline-flex items-center gap-1`}>
                              {getStatusIcon(article.status)}
                              {article.status === 'completed' ? '✅ Ready' : 
                               article.status === 'in_progress' ? '🔄 In Progress' : 
                               '⏳ Pending'}
                            </Badge>
                          </td>
                          <td className="py-4 align-top">
                            <span className="text-white font-mono text-xs md:text-sm">
                              {article.status === 'completed' && article.delivery_date
                                ? new Date(article.delivery_date).toLocaleDateString()
                                : article.status === 'completed'
                                ? 'Completed'
                                : '—'}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center gap-2 justify-end">
                              {article.status === 'completed' ? (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 font-mono"
                                    onClick={() => article.article_url && window.open(article.article_url, '_blank')}
                                  >
                                    <Download className="h-4 w-4 mr-1" />
                                    Download
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    className="text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/60 font-mono"
                                    onClick={() => handleRequestRevision(article)}
                                  >
                                    <Edit className="h-4 w-4 mr-1" />
                                    Request Revision
                                  </Button>
                                </>
                              ) : article.status === 'in_progress' ? (
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-blue-400 border border-blue-500/30 hover:border-blue-500/60 font-mono"
                                >
                                  View ETA
                                </Button>
                              ) : (
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-gray-400 border border-gray-500/30 font-mono"
                                  disabled
                                >
                                  Queued
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
          </TabsContent>

          {/* Content Calendar Tab (Growth) */}
          {hasGrowth && (
            <TabsContent value="calendar">
              {user?.id && <ContentCalendar userId={user.id} />}
            </TabsContent>
          )}

          {/* Research Reports Tab (Scale, Authority, Dominance) */}
          {hasScale && (
            <TabsContent value="reports">
              {user?.id && <ResearchReports userId={user.id} />}
            </TabsContent>
          )}

          {/* Performance Dashboard Tab (Dominance) */}
          {hasDominance && (
            <TabsContent value="performance">
              <PerformanceDashboard articles={articles} monthlyLimit={monthlyLimit} />
            </TabsContent>
          )}

          {/* Priority Support Tab (Authority, Dominance) */}
          {hasAuthority && (
            <TabsContent value="support">
              <PrioritySupport userEmail={user?.email || ''} />
            </TabsContent>
          )}

          {/* Market Roadmap Tab (Dominance) */}
          {hasDominance && (
            <TabsContent value="roadmap">
              {user?.id && <MarketRoadmap userId={user.id} />}
            </TabsContent>
          )}
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
              <Textarea
                id="feedback"
                placeholder="Please describe the changes you'd like to see..."
                value={revisionFeedback}
                onChange={(e) => setRevisionFeedback(e.target.value)}
                className="min-h-[150px] bg-black/50 border-primary-glow/30 text-white font-mono"
              />
              <p className="text-white/50 font-mono text-xs">
                Be specific about what needs to be changed for faster turnaround
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRevisionDialogOpen(false)}
              className="font-mono"
              disabled={submittingRevision}
            >
              Cancel
            </Button>
            <Button
              onClick={submitRevisionRequest}
              disabled={submittingRevision || !revisionFeedback.trim()}
              className="bg-primary hover:bg-primary-glow text-white font-mono"
            >
              {submittingRevision ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Revision Request'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;