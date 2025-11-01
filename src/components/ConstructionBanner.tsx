import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

const ConstructionBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-500/90 text-yellow-900 px-4 py-3 fixed top-0 left-0 right-0 z-[9998]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">
            🚧 This website is still under construction - Stay tuned for updates!
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:bg-yellow-600/20 p-1 rounded"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ConstructionBanner;