import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { FileText, Download, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/dateUtils";

interface ResearchReport {
  id: string;
  title: string;
  description: string | null;
  report_type: string;
  file_url: string | null;
  file_name: string | null;
  uploaded_at: string;
}

interface ResearchReportsProps {
  userId: string;
}

const ResearchReports = ({ userId }: ResearchReportsProps) => {
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, [userId]);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase.
      from('research_reports').
      select('*').
      eq('user_id', userId).
      order('uploaded_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error: any) {
      console.error('Error fetching research reports:', error);
      toast({
        title: "Error",
        description: "Failed to load research reports.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getReportTypeBadge = (type: string) => {
    switch (type) {
      case 'keyword_research':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-mono text-xs">KEYWORD RESEARCH</Badge>;
      case 'competitor_analysis':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-mono text-xs">COMPETITOR ANALYSIS</Badge>;
      case 'gap_analysis':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-mono text-xs">GAP ANALYSIS</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 font-mono text-xs">{type.toUpperCase()}</Badge>;
    }
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    if (!fileUrl) {
      toast({
        title: "Error",
        description: "File URL not available.",
        variant: "destructive"
      });
      return;
    }

    window.open(fileUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary-glow/30 border-t-primary-glow rounded-full animate-spin"></div>
      </div>);

  }

  if (reports.length === 0) {
    return (
      <GlassCard variant="default" glow hover={false}>
        <GlassCardContent className="text-center py-[50px] sm:py-[70px] my-[5px]">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/[0.05] border border-white/[0.1] mb-4">
            <FileBarChart className="h-10 w-10 text-primary-glow" />
          </div>
          <h3 className="text-white font-mono text-lg mb-2">No Research Reports</h3>
          <p className="text-white/70 font-mono text-sm">
            Your research reports will appear here once uploaded by our team.
          </p>
        </GlassCardContent>
      </GlassCard>);

  }

  return (
    <GlassCard variant="default" glow hover={false}>
      <GlassCardHeader>
        <GlassCardTitle className="flex items-center gap-2 text-white font-mono tracking-[0.2em] font-bold uppercase">
          <FileText className="h-5 w-5 text-primary-glow" />
          RESEARCH REPORTS
        </GlassCardTitle>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="space-y-4">
          {reports.map((report) =>
          <div
            key={report.id}
            className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all">
            
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white font-mono text-sm mb-2">{report.title}</h4>
                  {report.description &&
                <p className="text-white/70 font-mono text-xs mb-2">{report.description}</p>
                }
                  {getReportTypeBadge(report.report_type)}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.1]">
                <p className="text-white/50 font-mono text-xs">
                  Uploaded: {formatDate(report.uploaded_at)}
                </p>
                {report.file_url &&
              <Button
                size="sm"
                onClick={() => handleDownload(report.file_url!, report.file_name || 'report.pdf')}
                className="bg-primary/20 text-primary-glow border border-primary-glow/50 hover:bg-primary/30 hover:border-primary-glow font-mono text-xs">
                
                    <Download className="h-3 w-3 mr-1" />
                    DOWNLOAD
                  </Button>
              }
              </div>
            </div>
          )}
        </div>
      </GlassCardContent>
    </GlassCard>);

};

export default ResearchReports;