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

        {/* Submit New Brief Button */}
        <div className="mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-cyber rounded-lg blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
            <Button 
              onClick={() => window.location.href = '/content-brief'}
              className="relative w-full bg-primary hover:bg-primary-glow text-white font-mono tracking-wide border-2 border-primary-glow/50 hover:border-primary-glow shadow-cyber hover:shadow-hologram transition-all duration-500 h-16 text-xl"
            >
              <FileText className="h-6 w-6 mr-3" />
              + SUBMIT NEW CONTENT BRIEF
            </Button>
          </div>
        </div>

        {/* Account Status */}
        <Card className="mb-8 bg-black/30 backdrop-blur-xl border-green-500/30 shadow-cyber">
          <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-lg" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
              <CreditCard className="h-5 w-5 text-green-400" />
              ACCOUNT STATUS
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono tracking-wide">
                  READY FOR YOUR FIRST BRIEF ✅
                </Badge>
                <Badge className="bg-primary-glow/20 text-primary-glow border-primary-glow/30 font-mono tracking-wide">
                  PLAN: DOMINANCE
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Pipeline Status */}
        <Card className="mb-8 bg-black/30 backdrop-blur-xl border-green-500/30 shadow-cyber">
          <div className="absolute inset-0 bg-gradient-cyber opacity-5 rounded-lg" />
          <CardHeader className="relative">
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
              <Target className="h-5 w-5 text-green-400" />
              CONTENT PIPELINE STATUS
            </CardTitle>
          </CardHeader>
          <CardContent className="relative space-y-4">
            {articles.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg border border-green-500/20">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="text-green-400 font-mono text-sm">✅ Brief Submitted:</p>
                    <p className="text-white font-mono">{new Date(articles[0]?.created_at).toLocaleDateString()} at {new Date(articles[0]?.created_at).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg border border-yellow-500/20">
                  <Clock className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <div>
                    <p className="text-yellow-400 font-mono text-sm">🔄 Current Stage:</p>
                    <p className="text-white font-mono">AI Research & Writing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-black/20 rounded-lg border border-blue-500/20">
                  <AlertCircle className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="text-blue-400 font-mono text-sm">⏱️ Estimated Delivery:</p>
                    <p className="text-white font-mono">Today, 5:00 PM</p>
                  </div>
                </div>
                <Button 
                  variant="ghost"
                  className="w-full text-primary-glow border border-primary-glow/30 hover:border-primary-glow/60 font-mono mt-4"
                >
                  VIEW PROGRESS DETAILS
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-primary-glow/50 mx-auto mb-3" />
                <p className="text-white font-mono text-lg mb-2">Ready for Content Production</p>
                <p className="text-white/70 font-mono text-sm">Submit your first content brief to get started</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Monthly Plan Tracker */}
        <Card className="mb-8 bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
              <BarChart3 className="h-5 w-5 text-primary-glow" />
              YOUR PLAN: Dominance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-mono text-sm">Monthly Articles:</span>
                <span className="text-white font-mono text-lg">{completedArticles} of 50 delivered</span>
              </div>
              <Progress 
                value={(completedArticles / 50) * 100} 
                className="h-2 bg-black/50"
              />
              <div className="text-center">
                <p className="text-primary-glow font-mono text-sm">
                  {50 - completedArticles} articles remaining this month
                </p>
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

        {/* Content Projects */}
        <Card className="bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
              <FileText className="h-5 w-5 text-primary-glow" />
              YOUR CONTENT PROJECTS
            </CardTitle>
          </CardHeader>
          <CardContent>
            {articles.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-primary-glow/50 mx-auto mb-4" />
                <p className="text-white font-mono tracking-wide text-xl mb-2">
                  No Active Projects
                </p>
                <p className="text-white/70 font-mono text-sm">
                  Click "Submit New Content Brief" above to start your first project
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary-glow/20 text-left">
                      <th className="text-white/70 font-mono text-sm pb-3">Topic</th>
                      <th className="text-white/70 font-mono text-sm pb-3">Status</th>
                      <th className="text-white/70 font-mono text-sm pb-3">Submitted</th>
                      <th className="text-white/70 font-mono text-sm pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-3">
                    {articles.map((article) => (
                      <tr key={article.id} className="border-b border-primary-glow/10 hover:bg-black/20 transition-colors">
                        <td className="py-4">
                          <div>
                            <h3 className="text-white font-mono tracking-wide font-semibold">
                              {article.title}
                            </h3>
                            {article.word_count > 0 && (
                              <p className="text-white/50 font-mono text-sm">{article.word_count} words</p>
                            )}
                          </div>
                        </td>
                        <td className="py-4">
                          <Badge className={`${getStatusColor(article.status)} font-mono tracking-wide`}>
                            {getStatusIcon(article.status)}
                            {article.status === 'completed' ? '✅ Ready' : 
                             article.status === 'in_progress' ? '🔄 In Progress' : 
                             '⏳ Pending'}
                          </Badge>
                        </td>
                        <td className="py-4">
                          <span className="text-white font-mono">
                            {new Date(article.created_at).toLocaleDateString()}
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
                                  Download
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  className="text-yellow-400 border border-yellow-500/30 hover:border-yellow-500/60 font-mono"
                                >
                                  Revise
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
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;