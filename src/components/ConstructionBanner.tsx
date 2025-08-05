import { Construction } from "lucide-react";

const ConstructionBanner = () => {
  return (
    <div className="bg-yellow-500/10 border-b border-yellow-500/20 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-yellow-700 dark:text-yellow-300">
          <Construction size={16} />
          <span className="text-sm font-medium">
            🚧 This website is currently under construction. Thank you for your patience!
          </span>
        </div>
      </div>
    </div>
  );
};

export default ConstructionBanner;