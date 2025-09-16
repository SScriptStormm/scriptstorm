import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Calendar, 
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
  Eye
} from "lucide-react";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";

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
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          fetchSubscriberData();
          fetchArticles();
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchSubscriberData();
        fetchArticles();
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchSubscriberData = async () => {
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('subscribed, subscription_tier, subscription_end')
        .eq('user_id', user?.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      setSubscriber(data || { subscribed: false, subscription_tier: null, subscription_end: null });
    } catch (error: any) {
      console.error('Error fetching subscriber data:', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setArticles(data || []);
    } catch (error: any) {
      console.error('Error fetching articles:', error);
    }
  };

  const refreshSubscription = async () => {
    setRefreshing(true);
    try {
      const { error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      
      await fetchSubscriberData();
      toast({
        title: "Subscription Updated",
        description: "Your subscription status has been refreshed.",
      });
    } catch (error: any) {
      toast({
        title: "Refresh Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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

  const completedArticles = articles.filter(a => a.status === 'completed').length;
  const totalArticles = articles.length;
  const averageWordCount = articles.length > 0 ? Math.round(articles.reduce((sum, a) => sum + (a.word_count || 0), 0) / articles.length) : 0;

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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={scriptStormLogo} 
                alt="ScriptStorm" 
                className="w-16 h-16 rounded-xl bg-white/95 p-2 shadow-cyber border border-primary-glow/30 hover:border-primary-glow/60 transition-all duration-300"
              />
              <div>
                <h1 className="text-2xl font-bold text-white font-mono tracking-wide">
                  SCRIPTSTORM
                </h1>
                <p className="text-primary-glow/80 text-sm font-mono tracking-widest">
                  CLIENT DASHBOARD
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                onClick={refreshSubscription}
                disabled={refreshing}
                variant="ghost"
                size="sm"
                className="text-white border border-primary-glow/30 hover:border-primary-glow/60 font-mono"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                REFRESH
              </Button>
              <Button
                onClick={handleSignOut}
                variant="ghost"
                size="sm"
                className="text-white border border-red-500/30 hover:border-red-500/60 font-mono"
              >
                <LogOut className="h-4 w-4 mr-2" />
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white mb-2 font-mono tracking-wide">
            Welcome back, <span className="text-primary-glow animate-text-glow">{user?.email}</span>
          </h2>
          <p className="text-white/70 font-mono tracking-wide">
            Your content production command center
          </p>
        </div>

        {/* Subscription Status */}
        <Card className="mb-8 bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
          <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-lg" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
              <CreditCard className="h-5 w-5 text-primary-glow" />
              SUBSCRIPTION STATUS
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={`${subscriber?.subscribed ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} font-mono tracking-wide`}>
                  {subscriber?.subscribed ? 'ACTIVE' : 'INACTIVE'}
                </Badge>
                {subscriber?.subscription_tier && (
                  <Badge className="bg-primary-glow/20 text-primary-glow border-primary-glow/30 font-mono tracking-wide">
                    {subscriber.subscription_tier.toUpperCase()}
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <p className="text-white/70 text-sm font-mono">STATUS</p>
                <p className="text-white font-mono tracking-wide">
                  {subscriber?.subscribed ? 'OPERATIONAL' : 'UPGRADE REQUIRED'}
                </p>
              </div>
            </div>
            {subscriber?.subscription_end && (
              <div className="mt-4 p-4 bg-black/20 rounded-lg border border-primary-glow/20">
                <p className="text-white/70 text-sm font-mono mb-1">NEXT BILLING CYCLE</p>
                <p className="text-white font-mono tracking-wide">
                  {new Date(subscriber.subscription_end).toLocaleDateString()}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Live Content Pipeline */}
        <Card className="mb-8 bg-black/30 backdrop-blur-xl border-green-500/30 shadow-cyber">
          <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-lg" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
              🟢 LIVE CONTENT PIPELINE
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-black/20 rounded-lg border border-green-500/20">
                <p className="text-green-400 font-mono text-sm mb-2">• Active:</p>
                <p className="text-white font-mono text-lg">[{totalArticles}] AI-generated pieces</p>
              </div>
              <div className="p-4 bg-black/20 rounded-lg border border-green-500/20">
                <p className="text-green-400 font-mono text-sm mb-2">• Next Delivery:</p>
                <p className="text-white font-mono text-lg">[24h timer starts on approval]</p>
              </div>
              <div className="p-4 bg-black/20 rounded-lg border border-green-500/20">
                <p className="text-green-400 font-mono text-sm mb-2">• Quality:</p>
                <p className="text-white font-mono text-lg">[✅ AUTO-VERIFIED]</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workflow Visualization */}
        {articles.length > 0 && (
          <Card className="mb-8 bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
            <CardHeader>
              <CardTitle className="text-white font-mono tracking-wide">
                WORKFLOW VISUALIZATION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {articles.slice(0, 3).map((article, index) => (
                <div key={article.id} className="flex items-center gap-4 p-3 bg-black/20 rounded-lg border border-primary-glow/20">
                  {article.status === 'completed' && (
                    <>
                      <span className="text-green-400 text-lg">🟢</span>
                      <span className="text-white font-mono">[{article.title}] - AI DRAFT READY</span>
                    </>
                  )}
                  {article.status === 'in_progress' && (
                    <>
                      <span className="text-yellow-400 text-lg">🟡</span>
                      <span className="text-white font-mono">[{article.title}] - AI RESEARCHING</span>
                    </>
                  )}
                  {article.status === 'pending' && (
                    <>
                      <span className="text-red-400 text-lg">🔴</span>
                      <span className="text-white font-mono">[UPGRADE TO JUMP QUEUE]</span>
                    </>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Progress Overview */}
        {totalArticles > 0 && (
          <Card className="mb-8 bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
                <TrendingUp className="h-5 w-5 text-primary-glow" />
                PRODUCTION PROGRESS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-mono text-white/70 mb-2">
                    <span>Completion Rate</span>
                    <span>{Math.round((completedArticles / totalArticles) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(completedArticles / totalArticles) * 100} 
                    className="h-3 bg-black/50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Articles List */}
        <Card className="bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
              <FileText className="h-5 w-5 text-primary-glow" />
              YOUR ARTICLES
            </CardTitle>
          </CardHeader>
          <CardContent>
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <Zap className="h-16 w-16 text-primary-glow/50 mx-auto mb-4 animate-pulse" />
                <p className="text-white font-mono tracking-wide text-xl">
                  AI PRODUCTION READY - AWAITING YOUR REQUEST
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div 
                    key={article.id} 
                    className="p-4 bg-black/20 rounded-lg border border-primary-glow/20 hover:border-primary-glow/40 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-2 font-mono tracking-wide">
                          {article.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/70 font-mono">
                          <span>Created: {new Date(article.created_at).toLocaleDateString()}</span>
                          {article.word_count > 0 && (
                            <span>{article.word_count} words</span>
                          )}
                          {article.delivery_date && (
                            <span>Due: {new Date(article.delivery_date).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(article.status)} font-mono tracking-wide`}>
                          {getStatusIcon(article.status)}
                          {article.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {article.article_url && (
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => window.open(article.article_url!, '_blank')}
                            className="text-primary-glow hover:text-primary-glow/80 border border-primary-glow/30 hover:border-primary-glow/60 font-mono"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            VIEW
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {article.target_keywords && article.target_keywords.length > 0 && (
                      <div className="mb-3">
                        <p className="text-white/50 text-xs font-mono mb-2">TARGET KEYWORDS:</p>
                        <div className="flex flex-wrap gap-2">
                          {article.target_keywords.map((keyword, index) => (
                            <Badge 
                              key={index} 
                              variant="outline" 
                              className="text-xs bg-primary-glow/10 border-primary-glow/30 text-primary-glow font-mono"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {article.notes && (
                      <div className="mt-3 p-3 bg-black/30 rounded border border-primary-glow/20">
                        <p className="text-white/50 text-xs font-mono mb-1">NOTES:</p>
                        <p className="text-white/80 text-sm font-mono">{article.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;