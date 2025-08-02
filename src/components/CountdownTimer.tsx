import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset timer when it reaches 0
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-red-500/10 border-red-500/30 p-4 backdrop-blur-sm animate-pulse">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Clock className="h-4 w-4 text-red-400" />
          <span className="text-red-400 font-semibold text-sm">URGENT</span>
        </div>
        <p className="text-white font-bold text-lg mb-3">
          Only 3 Spots Left for July Content Calendar!
        </p>
        <div className="flex justify-center gap-4">
          <div className="bg-white/20 px-3 py-2 rounded-lg min-w-[60px]">
            <div className="text-white font-bold text-xl">{timeLeft.hours.toString().padStart(2, '0')}</div>
            <div className="text-white/70 text-xs">Hours</div>
          </div>
          <div className="bg-white/20 px-3 py-2 rounded-lg min-w-[60px]">
            <div className="text-white font-bold text-xl">{timeLeft.minutes.toString().padStart(2, '0')}</div>
            <div className="text-white/70 text-xs">Minutes</div>
          </div>
          <div className="bg-white/20 px-3 py-2 rounded-lg min-w-[60px]">
            <div className="text-white font-bold text-xl">{timeLeft.seconds.toString().padStart(2, '0')}</div>
            <div className="text-white/70 text-xs">Seconds</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountdownTimer;