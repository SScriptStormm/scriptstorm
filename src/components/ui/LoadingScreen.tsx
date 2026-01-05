interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center relative overflow-hidden">
      {/* Subtle neural grid overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--primary)) 1px, transparent 1px),
                         radial-gradient(circle at 75% 75%, hsl(var(--primary-glow)) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Content wrapper */}
      <div className="relative flex flex-col items-center gap-5">
        {/* SVG-based spinner - no gradient seam artifacts */}
        <div className="relative w-16 h-16">
          <svg 
            className="w-full h-full animate-spin" 
            viewBox="0 0 64 64"
            style={{ animationDuration: '1.2s' }}
          >
            <defs>
              <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(221 83% 65%)" />
                <stop offset="50%" stopColor="hsl(221 83% 53%)" />
                <stop offset="100%" stopColor="hsl(221 83% 65% / 0.3)" />
              </linearGradient>
            </defs>
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#spinnerGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="140 60"
            />
          </svg>
          
          {/* Pulsing center dot - positioned directly without wrapper */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" 
            style={{ boxShadow: '0 0 8px hsl(221 83% 53% / 0.6)' }} 
          />
        </div>
        
        {message && (
          <p className="text-white/75 text-sm font-mono">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
