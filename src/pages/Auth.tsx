import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navigate, Link } from "react-router-dom";
import { User, Session } from "@supabase/supabase-js";
import { Eye, EyeOff, Mail, Lock, LogIn, Zap, Check, X, Shield, AlertCircle, ArrowLeft } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [logoState, setLogoState] = useState<'normal' | 'loading' | 'success' | 'error' | 'clicked'>('normal');
  const [showRipple, setShowRipple] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Form validation states
  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  
  const { toast } = useToast();

  // Email validation
  const validateEmail = useCallback((email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailValid(isValid);
    setEmailError(isValid || email === "" ? "" : "Please enter a valid email address");
    return isValid;
  }, []);

  // Debounced validation
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (email) validateEmail(email);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [email, validateEmail]);

  // Rate limiting
  useEffect(() => {
    if (failedAttempts >= 5) {
      setIsBlocked(true);
      const timer = setTimeout(() => {
        setIsBlocked(false);
        setFailedAttempts(0);
      }, 300000); // 5 minutes
      return () => clearTimeout(timer);
    }
  }, [failedAttempts]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setInitialLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setInitialLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto-focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !loading) {
        const form = document.querySelector('form');
        if (form) {
          const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
          if (submitButton && !submitButton.disabled) {
            submitButton.click();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loading]);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLogoState('loading');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setLogoState('success');
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to your dashboard.",
      });
      // Keep success state for a moment before redirect
      setTimeout(() => setLogoState('normal'), 1000);
    } catch (error: any) {
      setLogoState('error');
      setFailedAttempts(prev => prev + 1);
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
      // Reset error state after animation
      setTimeout(() => setLogoState('normal'), 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setLogoState('error');
      toast({
        title: "Email Required",
        description: "Please enter your email address to reset your password.",
        variant: "destructive",
      });
      setTimeout(() => setLogoState('normal'), 1000);
      return;
    }

    setLoading(true);
    setLogoState('loading');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });
      if (error) throw error;
      
      setLogoState('success');
      toast({
        title: "Password Reset Sent",
        description: "Check your email for password reset instructions.",
      });
      setShowForgotPassword(false);
      setTimeout(() => setLogoState('normal'), 1000);
    } catch (error: any) {
      setLogoState('error');
      toast({
        title: "Reset Error",
        description: error.message,
        variant: "destructive",
      });
      setTimeout(() => setLogoState('normal'), 1000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogoClick = () => {
    if (logoState === 'normal' || logoState === 'clicked') {
      setLogoState('clicked');
      setShowRipple(true);
      setTimeout(() => {
        setShowRipple(false);
        setLogoState('normal');
      }, 600);
    }
  };

  const getLogoAnimationClass = () => {
    switch (logoState) {
      case 'loading':
        return 'animate-logo-breathe';
      case 'success':
        return 'animate-logo-success-spin';
      case 'error':
        return 'animate-logo-shake';
      case 'clicked':
        return 'animate-pulse';
      default:
        return 'animate-float';
    }
  };

  return (
    <>
      {/* Back to Home Button - Absolute positioning */}
      <Link 
        to="/" 
        className="absolute top-6 right-6 z-[9999] flex items-center gap-2 px-3 py-2 text-white border border-primary-glow/30 hover:border-primary-glow/60 font-mono text-sm rounded-md bg-black/20 backdrop-blur-sm transition-colors"
        style={{ 
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        <ArrowLeft className="h-4 w-4" />
        <span>HOME</span>
      </Link>

      <div className="min-h-screen bg-gradient-hero flex items-center justify-center py-12 px-4 sm:py-8 sm:px-4 relative overflow-hidden">

      {/* AI Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse" />
      
      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" />
      <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
      
      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 mt-8 sm:mt-0">
          {/* Enhanced Logo with Advanced Effects */}
          <div 
            className={`relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 ${getLogoAnimationClass()} transition-all duration-500 cursor-pointer group hover:scale-110 hover:rotate-1 motion-reduce:animate-none motion-reduce:hover:scale-105 motion-reduce:hover:rotate-0`}
            style={{ willChange: 'transform' }}
            role="img"
            aria-label="ScriptStorm Logo - AI Content Production Platform"
            onClick={handleLogoClick}
          >
            {/* Neural Network Orbiting Elements */}
            <div className="absolute inset-0 animate-neural-orbit opacity-60">
              <div className="absolute w-1 h-1 bg-primary-glow rounded-full blur-sm" />
            </div>
            <div className="absolute inset-0 animate-neural-orbit opacity-40" style={{ animationDelay: '2s' }}>
              <div className="absolute w-1 h-1 bg-primary rounded-full blur-sm" />
            </div>
            <div className="absolute inset-0 animate-neural-orbit opacity-30" style={{ animationDelay: '4s' }}>
              <div className="absolute w-0.5 h-0.5 bg-primary-glow rounded-full" />
            </div>

            {/* Matrix Rain Effect Behind Logo */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-20">
              <div className="absolute w-0.5 h-4 bg-primary-glow animate-matrix-rain blur-sm" style={{ left: '20%' }} />
              <div className="absolute w-0.5 h-6 bg-primary animate-matrix-rain-delay-1 blur-sm" style={{ left: '40%' }} />
              <div className="absolute w-0.5 h-5 bg-primary-glow animate-matrix-rain-delay-2 blur-sm" style={{ left: '60%' }} />
              <div className="absolute w-0.5 h-4 bg-primary animate-matrix-rain blur-sm" style={{ left: '80%' }} />
            </div>

            {/* Energy Pulse Rings */}
            <div className="absolute inset-0 animate-energy-pulse opacity-30">
              <div className="absolute inset-4 border border-primary-glow rounded-full" />
            </div>
            <div className="absolute inset-0 animate-energy-pulse opacity-20" style={{ animationDelay: '1s' }}>
              <div className="absolute inset-2 border border-primary rounded-full" />
            </div>

            {/* Main Logo Glow */}
            <div className={`absolute inset-0 ${logoState === 'success' ? 'bg-green-500/30' : logoState === 'error' ? 'bg-red-500/30' : logoState === 'loading' ? 'bg-primary/40' : 'bg-primary/30'} group-hover:bg-primary/40 rounded-2xl blur-md transition-all duration-300 motion-reduce:transition-none`} />
            
            {/* Click Ripple Effect */}
            {showRipple && (
              <div className="absolute inset-0 rounded-2xl">
                <div className="absolute inset-0 bg-primary-glow/30 rounded-2xl animate-logo-click-ripple" />
              </div>
            )}

            {/* Holographic Shimmer Overlay */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)',
                backgroundSize: '200% 200%'
              }}
            >
              <div className="w-full h-full animate-holographic-shimmer" />
            </div>

            {/* Main Logo Image */}
            <img 
              src={scriptStormLogo} 
              alt="ScriptStorm - AI Content Production Platform Logo" 
              className={`relative w-full h-full rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.6)] group-hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transition-all duration-300 motion-reduce:transition-none ${logoState === 'loading' ? 'animate-chromatic-aberration' : ''}`}
              style={{ 
                filter: `drop-shadow(0 0 20px rgba(6, 182, 212, 0.4)) brightness(${logoState === 'success' ? '1.3' : logoState === 'error' ? '0.8' : '1.05'}) contrast(1.3) saturate(${logoState === 'success' ? '1.5' : logoState === 'error' ? '0.8' : '1.2'}) invert(0.1) ${logoState === 'loading' ? 'hue-rotate(10deg)' : ''}`,
                willChange: 'filter, transform'
              }}
              loading="eager"
              decoding="async"
            />

            {/* Particle Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute w-1 h-1 bg-primary-glow rounded-full animate-particle-float opacity-60 blur-sm" style={{ top: '20%', left: '10%' }} />
              <div className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-particle-float-delay-1 opacity-40 blur-sm" style={{ top: '60%', right: '15%' }} />
              <div className="absolute w-1 h-1 bg-primary-glow rounded-full animate-particle-float-delay-2 opacity-50 blur-sm" style={{ bottom: '20%', left: '20%' }} />
              <div className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-particle-float-delay-3 opacity-30 blur-sm" style={{ top: '40%', right: '10%' }} />
            </div>

            {/* Enhanced Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 motion-reduce:transition-none" />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 animate-text-glow font-mono tracking-wide">
            SCRIPTSTORM
          </h1>
          <p className="text-primary-glow/80 font-mono tracking-widest text-xs sm:text-sm">
            CLIENT DASHBOARD ACCESS
          </p>
        </div>

        <Card className="relative bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber hover:shadow-hologram transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-lg" />
          <CardHeader className="relative text-center space-y-2 px-4 sm:px-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl text-white font-mono tracking-wide flex items-center justify-center gap-2 flex-wrap">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary-glow animate-pulse" />
              <span className="break-words">{showForgotPassword ? "RESET PASSWORD" : "CLIENT DASHBOARD ACCESS"}</span>
            </CardTitle>
            <p className="text-white/70 text-xs sm:text-sm font-mono">
              {showForgotPassword ? "Enter your email to reset password" : "Sign in to access your client dashboard"}
            </p>
          </CardHeader>
          <CardContent className="relative space-y-6 px-4 sm:px-6">
            <form onSubmit={showForgotPassword ? handleForgotPassword : handleAuth} className="space-y-4">
              {/* Rate Limiting Warning */}
              {isBlocked && (
                <div className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm font-mono">
                  <Shield className="h-4 w-4" />
                  <span>Too many failed attempts. Try again in 5 minutes.</span>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-mono tracking-wide text-sm flex items-center gap-2">
                  EMAIL ADDRESS
                  {emailValid && <Check className="h-3 w-3 text-green-400" />}
                  {emailError && <X className="h-3 w-3 text-red-400" />}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-glow/60" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isBlocked}
                    className={`pl-10 bg-black/40 border-primary-glow/30 text-white placeholder:text-white/50 focus:border-primary-glow focus:ring-primary-glow/20 font-mono animate-fade-in ${
                      emailError ? 'border-red-400/50 focus:border-red-400' : 
                      emailValid ? 'border-green-400/50 focus:border-green-400' : ''
                    }`}
                    placeholder="user@example.com"
                    autoFocus
                  />
                </div>
                {emailError && (
                  <p className="text-red-400 text-xs font-mono animate-fade-in flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {emailError}
                  </p>
                )}
              </div>
              
              {!showForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white font-mono tracking-wide text-sm flex items-center gap-2">
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
                      disabled={isBlocked}
                      className="pl-10 pr-10 bg-black/40 border-primary-glow/30 text-white placeholder:text-white/50 focus:border-primary-glow focus:ring-primary-glow/20 font-mono animate-fade-in [&::-ms-reveal]:hidden [&::-ms-clear]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-glow/60 hover:text-primary-glow transition-colors"
                      disabled={isBlocked}
                    >
                      {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember Me Checkbox */}
              {!showForgotPassword && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="border-primary-glow/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary-glow"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-white/80 font-mono cursor-pointer select-none"
                  >
                    Remember me
                  </label>
                </div>
              )}

              {/* Enhanced Submit Button */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-cyber rounded-lg blur-lg opacity-40 group-hover:opacity-70 transition-all duration-500" />
                <Button
                  type="submit"
                  disabled={loading || isBlocked || (!emailValid && email !== "")}
                  className="relative w-full bg-primary hover:bg-primary-glow text-white font-mono tracking-wide border-2 border-primary-glow/50 hover:border-primary-glow shadow-cyber hover:shadow-hologram transition-all duration-500 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="animate-pulse">[AI SYSTEMS PROCESSING...]</span>
                    </div>
                  ) : isBlocked ? (
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      SECURITY LOCKDOWN ACTIVE
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {showForgotPassword ? <Mail className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                      {showForgotPassword ? "SEND RESET EMAIL" : "ACCESS DASHBOARD"}
                    </div>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center space-y-3">
              {!showForgotPassword && (
                <>
                  <div>
                    <button
                      onClick={() => setShowForgotPassword(true)}
                      className="text-primary-glow/70 hover:text-primary-glow font-mono text-xs tracking-wide transition-colors duration-300"
                    >
                      Forgot your password?
                    </button>
                  </div>
                  
                  {/* New Account Info */}
                  <div className="pt-4 border-t border-primary-glow/20">
                    <p className="text-white/70 text-xs font-mono mb-2">Don't have an account yet?</p>
                    <Link 
                      to="/#pricing" 
                      className="text-primary-glow hover:text-primary-glow/80 font-mono text-sm tracking-wide transition-colors duration-300 border-b border-primary-glow/30 hover:border-primary-glow/60 inline-block"
                    >
                      View Our Packages →
                    </Link>
                    <p className="text-white/50 text-xs font-mono mt-2">Accounts are created automatically when you purchase</p>
                  </div>
                </>
              )}
              
              {showForgotPassword && (
                <button
                  onClick={() => setShowForgotPassword(false)}
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
    </>
  );
};

export default Auth;