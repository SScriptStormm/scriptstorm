import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/dateUtils";

interface MarketRoadmap {
  id: string;
  title: string;
  description: string | null;
  quarter: string;
  file_url: string | null;
  file_name: string | null;
  status: string;
  created_at: string;
}

interface MarketRoadmapProps {
  userId: string;
}

const MarketRoadmap = ({ userId }: MarketRoadmapProps) => {
  const [roadmaps, setRoadmaps] = useState<MarketRoadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchRoadmaps();
  }, [userId]);

  const fetchRoadmaps = async () => {
    try {
      const { data, error } = await supabase
        .from('market_roadmaps')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRoadmaps(data || []);
    } catch (error: any) {
      console.error('Error fetching market roadmaps:', error);
      toast({
        title: "Error",
        description: "Failed to load market roadmaps.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleView = (fileUrl: string) => {
    if (!fileUrl) {
      toast({
        title: "Error",
        description: "File URL not available.",
        variant: "destructive",
      });
      return;
    }
    window.open(fileUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary-glow/30 border-t-primary-glow rounded-full animate-spin"></div>
      </div>
    );
  }

  if (roadmaps.length === 0) {
    return (
      <Card className="bg-black/30 backdrop-blur-xl border-primary-glow/30">
        <CardContent className="py-12 text-center">
          <Target className="h-16 w-16 text-primary-glow/50 mx-auto mb-4" />
          <h3 className="text-white font-mono text-lg mb-2">No Market Roadmaps</h3>
          <p className="text-white/70 font-mono text-sm">
            Your strategic quarterly roadmaps will appear here once created by our team.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/30 backdrop-blur-xl border-primary-glow/30">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
            <Target className="h-5 w-5 text-primary-glow" />
            MARKET DOMINANCE ROADMAP
          </CardTitle>
          <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-mono font-semibold">
            DOMINANCE EXCLUSIVE
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roadmaps.map((roadmap) => (
            <div 
              key={roadmap.id}
              className="p-6 bg-gradient-cyber/10 rounded-lg border border-primary-glow/30 hover:border-primary-glow/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-white font-mono text-base">{roadmap.title}</h4>
                    <Badge className="bg-primary-glow/20 text-primary-glow border-primary-glow/30 font-mono text-xs">
                      {roadmap.quarter}
                    </Badge>
                  </div>
                  {roadmap.description && (
                    <p className="text-white/70 font-mono text-sm mb-3">{roadmap.description}</p>
                  )}
                  <Badge className={
                    roadmap.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30 font-mono text-xs'
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/30 font-mono text-xs'
                  }>
                    {roadmap.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary-glow/10">
                <p className="text-white/50 font-mono text-xs">
                  Created: {formatDate(roadmap.created_at)}
                </p>
                {roadmap.file_url && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleView(roadmap.file_url!)}
                      className="bg-primary/20 text-primary-glow border border-primary-glow/50 hover:bg-primary/30 hover:border-primary-glow font-mono text-xs"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      VIEW
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleView(roadmap.file_url!)}
                      className="bg-green-500/20 text-green-400 border border-green-500/50 hover:bg-green-500/30 hover:border-green-500 font-mono text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      DOWNLOAD
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-black/20 rounded-lg border border-primary-glow/20">
          <h4 className="text-white font-mono text-sm mb-2">About Your Roadmap</h4>
          <p className="text-white/70 font-mono text-xs">
            Your Market Dominance Roadmap is a strategic, quarterly plan designed to systematically 
            dismantle competitor positions and cement your #1 status in your industry. Each roadmap 
            includes detailed action items, content themes, and competitive analysis.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketRoadmap;