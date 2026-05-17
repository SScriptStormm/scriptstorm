import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { RefreshCw, LogOut, Settings, LayoutDashboard, ChevronDown, User as UserIcon } from "lucide-react";
import scriptStormLogo from "@/assets/scriptstorm-logo.png";

interface DashboardHeaderProps {
  onRefresh: () => void;
  onSignOut: () => void;
  refreshing: boolean;
}

export const DashboardHeader = ({ onRefresh, onSignOut, refreshing }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="relative z-10 border-b border-primary-glow/20 bg-black/40 backdrop-blur-2xl">
      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-glow/5 to-transparent animate-scan-line" />
      </div>
      
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo with enhanced glow effect */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary-glow to-primary rounded-xl blur opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
              <img 
                src={scriptStormLogo} 
                alt="ScriptStorm" 
                className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-cyber border border-primary-glow/40 group-hover:border-primary-glow/80 transition-all duration-300" 
              />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-mono tracking-[0.2em] font-bold uppercaser">
                SCRIPTSTORM
              </h1>
              <p className="text-primary-glow/80 text-xs sm:text-sm font-mono tracking-[0.25em] uppercase">
                Command Center
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Refresh Button */}
            <Button 
              onClick={onRefresh} 
              disabled={refreshing} 
              size="sm" 
              className="relative bg-primary/10 backdrop-blur-sm text-primary-glow border border-primary-glow/40 hover:border-primary-glow hover:bg-primary/20 hover:shadow-[0_0_20px_hsl(221_83%_53%/0.3)] font-mono text-xs sm:text-sm flex-1 sm:flex-initial transition-all duration-300 disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              SYNC
            </Button>
            
            {/* Account Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  className="relative bg-white/5 backdrop-blur-sm text-white border border-white/20 hover:border-white/40 hover:bg-white/10 font-mono text-xs sm:text-sm flex-1 sm:flex-initial transition-all duration-300"
                >
                  <UserIcon className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  ACCOUNT
                  <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-black/95 backdrop-blur-xl border-primary-glow/30 z-50">
                <DropdownMenuItem className="font-mono text-white hover:bg-primary-glow/20 cursor-pointer">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="font-mono text-white hover:bg-primary-glow/20 cursor-pointer" 
                  onClick={() => navigate('/account-settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-primary-glow/20" />
                <DropdownMenuItem 
                  className="font-mono text-red-400 hover:bg-red-500/20 cursor-pointer" 
                  onClick={onSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};
