interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Outer glow ring - gradient based, no border artifacts */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-glow via-primary to-primary-glow/30 animate-spin p-[3px]">
            <div className="w-full h-full rounded-full bg-gradient-hero" />
          </div>
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary-glow animate-pulse" />
          </div>
        </div>
        {message && (
          <p className="text-white/70 text-sm font-mono animate-pulse">{message}</p>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
