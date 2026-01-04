import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from "@/components/ui/GlassCard";
import { Calendar, FileText, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatTime } from "@/lib/dateUtils";

interface CalendarEvent {
  id: string;
  title: string;
  description: string | null;
  event_type: string;
  scheduled_date: string;
  status: string;
}

interface ContentCalendarProps {
  userId: string;
}

const ContentCalendar = ({ userId }: ContentCalendarProps) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchEvents();
  }, [userId]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('content_calendar_events')
        .select('*')
        .eq('user_id', userId)
        .order('scheduled_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      console.error('Error fetching calendar events:', error);
      toast({
        title: "Error",
        description: "Failed to load calendar events.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'article': return <FileText className="h-4 w-4" />;
      case 'social_post': return <MessageSquare className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'scheduled': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary-glow/30 border-t-primary-glow rounded-full animate-spin"></div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <GlassCard variant="default" glow>
        <GlassCardContent className="py-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/[0.05] border border-white/[0.1] mb-4">
            <Calendar className="h-10 w-10 text-primary-glow" />
          </div>
          <h3 className="text-white font-mono text-lg mb-2">No Scheduled Content</h3>
          <p className="text-white/70 font-mono text-sm">
            Your content calendar is empty. Events will appear here once scheduled.
          </p>
        </GlassCardContent>
      </GlassCard>
    );
  }

  return (
    <GlassCard variant="default" glow>
      <GlassCardHeader>
        <div className="flex items-center justify-between">
          <GlassCardTitle className="flex items-center gap-2 text-white font-mono tracking-wide">
            <Calendar className="h-5 w-5 text-primary-glow" />
            AUTOMATED CONTENT CALENDAR
          </GlassCardTitle>
          <div className="px-3 py-1 bg-primary/20 text-primary-glow border border-primary/30 rounded-full text-xs font-mono font-semibold">
            GROWTH+ FEATURE
          </div>
        </div>
      </GlassCardHeader>
      <GlassCardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div 
              key={event.id}
              className="p-4 bg-white/[0.05] backdrop-blur-sm rounded-lg border border-white/[0.1] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="text-primary-glow">
                    {getEventIcon(event.event_type)}
                  </div>
                  <h4 className="text-white font-mono text-sm">{event.title}</h4>
                </div>
                <Badge className={`${getStatusColor(event.status)} font-mono text-xs`}>
                  {event.status.toUpperCase()}
                </Badge>
              </div>
              {event.description && (
                <p className="text-white/70 font-mono text-xs mb-2">{event.description}</p>
              )}
              <p className="text-primary-glow font-mono text-xs">
                Scheduled: {formatDate(event.scheduled_date)} at {formatTime(event.scheduled_date)}
              </p>
            </div>
          ))}
        </div>
      </GlassCardContent>
    </GlassCard>
  );
};

export default ContentCalendar;
