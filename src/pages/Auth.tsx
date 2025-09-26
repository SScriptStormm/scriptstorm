import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navigate } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn, Zap } from "lucide-react";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to your dashboard.",
        });
      } else {
        const redirectUrl = `${window.location.origin}/dashboard`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to reset your password.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      
      toast({
        title: "Password Reset Sent",
        description: "Check your email for password reset instructions.",
      });
      setShowForgotPassword(false);
    } catch (error: any) {
      toast({
        title: "Reset Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 relative overflow-hidden">
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary-glow/20 rotate-45 animate-float" />
      <div className="absolute top-40 right-20 w-16 h-16 border border-primary-glow/15 rotate-12 animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-20 w-12 h-12 border border-primary-glow/25 rotate-45 animate-float" style={{ animationDelay: '4s' }} />
      
      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4 animate-float transition-all duration-500 cursor-pointer group hover:scale-110 hover:rotate-1">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 rounded-2xl blur-md transition-all duration-300"></div>
            <img 
              src={scriptStormLogo} 
              alt="ScriptStorm" 
              className="relative w-full h-full rounded-2xl shadow-2xl group-hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300"
              style={{ 
                filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.4)) brightness(1.05) contrast(1.3) saturate(1.2) hue-rotate(180deg) invert(0.1) hue-rotate(-180deg)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 animate-text-glow font-mono tracking-wide">
            SCRIPTSTORM
          </h1>
          <p className="text-primary-glow/80 font-mono tracking-widest text-sm">
            CLIENT DASHBOARD ACCESS
          </p>
        </div>

        <Card className="relative bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber hover:shadow-hologram transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-lg" />
          <CardHeader className="relative text-center space-y-2">
            <CardTitle className="text-2xl text-white font-mono tracking-wide flex items-center justify-center gap-2">
              <Zap className="h-6 w-6 text-primary-glow animate-pulse" />
              {showForgotPassword ? "RESET PASSWORD" : isLogin ? "ACCESS YOUR DASHBOARD" : "CREATE ACCOUNT"}
            </CardTitle>
            <p className="text-white/70 text-sm font-mono">
              {showForgotPassword ? "Enter your email to reset password" : isLogin ? "Access your content dashboard" : "Join the ScriptStorm network"}
            </p>
          </CardHeader>
          <CardContent className="relative space-y-6">
            <form onSubmit={showForgotPassword ? handleForgotPassword : handleAuth} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-mono tracking-wide text-sm">
                  EMAIL ADDRESS
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-glow/60" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-black/40 border-primary-glow/30 text-white placeholder:text-white/50 focus:border-primary-glow focus:ring-primary-glow/20 font-mono"
                    placeholder="user@example.com"
                  />
                </div>
              </div>
              
              {!showForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-mono tracking-wide text-sm">
                    PASSWORD
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-glow/60" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 bg-black/40 border-primary-glow/30 text-white placeholder:text-white/50 focus:border-primary-glow focus:ring-primary-glow/20 font-mono"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-glow/60 hover:text-primary-glow transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber rounded-lg blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
                <Button
                  type="submit"
                  disabled={loading}
                  className="relative w-full bg-primary hover:bg-primary-glow text-white font-mono tracking-wide border-2 border-primary-glow/50 hover:border-primary-glow shadow-cyber hover:shadow-hologram transition-all duration-500 h-12"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      [AI SYSTEMS INITIALIZING...]
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {showForgotPassword ? <Mail className="h-4 w-4" /> : isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                      {showForgotPassword ? "SEND RESET EMAIL" : isLogin ? "ACCESS DASHBOARD" : "CREATE ACCOUNT"}
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center space-y-3">
              {!showForgotPassword && (
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary-glow hover:text-primary-glow/80 font-mono text-sm tracking-wide transition-colors duration-300 border-b border-primary-glow/30 hover:border-primary-glow/60"
                >
                  {isLogin ? "Need an account? Create one" : "Already have an account? Sign in"}
                </button>
              )}
              
              {isLogin && !showForgotPassword && (
                <div>
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-primary-glow/70 hover:text-primary-glow font-mono text-xs tracking-wide transition-colors duration-300"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
              
              {showForgotPassword && (
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setIsLogin(true);
                  }}
                  className="text-primary-glow hover:text-primary-glow/80 font-mono text-sm tracking-wide transition-colors duration-300 border-b border-primary-glow/30 hover:border-primary-glow/60"
                >
                  Back to login
                </button>
              )}
            </div>

            <div className="text-center text-white/60 text-xs font-mono tracking-wide">
              <p>Secure authentication powered by</p>
              <p className="text-primary-glow">AI CONTENT PRODUCTION ENGINE</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;