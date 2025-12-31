import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Neural network background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-neural-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-neural-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Floating geometric elements */}
      <div className="absolute top-20 left-10 w-4 h-4 border border-primary-glow/30 rotate-45 animate-float"></div>
      <div className="absolute top-40 right-20 w-6 h-6 border border-primary-glow/20 rotate-12 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-3 h-3 border border-primary-glow/25 rotate-45 animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-5 h-5 border border-primary-glow/15 rotate-45 animate-float" style={{ animationDelay: '0.5s' }}></div>

      {/* Scanning line effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-primary-glow/40 to-transparent animate-scan-line"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        {/* 404 with glow effect */}
        <div className="relative mb-6">
          <h1 className="text-8xl md:text-9xl font-mono font-bold text-primary-glow drop-shadow-[0_0_30px_rgba(0,255,255,0.5)]">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-mono font-bold text-primary-glow/20 blur-xl">
            404
          </div>
        </div>

        {/* Alert icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-full bg-primary-glow/10 border border-primary-glow/30">
            <AlertTriangle className="w-8 h-8 text-primary-glow" />
          </div>
        </div>

        {/* Error message */}
        <h2 className="text-2xl md:text-3xl font-mono font-semibold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-white/70 font-mono mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Return home button */}
        <Link to="/">
          <Button variant="hero" size="lg" className="font-mono group">
            <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Return to Home
          </Button>
        </Link>

        {/* Attempted path display */}
        <p className="mt-8 text-xs text-white/40 font-mono">
          Attempted path: <span className="text-primary-glow/60">{location.pathname}</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
