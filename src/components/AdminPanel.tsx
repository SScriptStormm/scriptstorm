import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { Shield, Mail, Calendar, MapPin, Globe } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  project_details?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  processed: boolean;
}

interface UserRole {
  user_id: string;
  role: 'admin' | 'user';
}

const AdminPanel = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        await checkAdminStatus(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!data);
        if (data) {
          await fetchContactSubmissions();
        }
      }
    } catch (error) {
      console.error('Error in checkAdminStatus:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching contact submissions:', error);
        toast({
          title: "Error",
          description: "Failed to fetch contact submissions.",
          variant: "destructive",
        });
      } else {
        setContactSubmissions(data || []);
      }
    } catch (error) {
      console.error('Error in fetchContactSubmissions:', error);
    }
  };

  const markAsProcessed = async (submissionId: string) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ processed: true })
        .eq('id', submissionId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update submission status.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Submission marked as processed.",
        });
        await fetchContactSubmissions();
      }
    } catch (error) {
      console.error('Error marking submission as processed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-primary-glow/30 border-t-primary-glow rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="w-96 bg-background/95 backdrop-blur-sm border-primary-glow/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Admin Panel
            </CardTitle>
            <CardDescription>
              Please log in to access the admin panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="w-full"
            >
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="w-96 bg-background/95 backdrop-blur-sm border-destructive/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              Access Denied
            </CardTitle>
            <CardDescription>
              You don't have admin privileges to access this panel.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="w-full"
            >
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">Manage contact submissions and system settings</p>
        </div>

        <div className="grid gap-6">
          {/* Contact Submissions */}
          <Card className="bg-background/95 backdrop-blur-sm border-primary-glow/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Submissions ({contactSubmissions.length})
              </CardTitle>
              <CardDescription>
                Review and manage customer contact form submissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {contactSubmissions.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No contact submissions found.
                </p>
              ) : (
                <div className="space-y-4">
                  {contactSubmissions.map((submission) => (
                    <Card key={submission.id} className="bg-background/50 border-border/50">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{submission.name}</h3>
                            <p className="text-sm text-muted-foreground">{submission.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={submission.processed ? "default" : "secondary"}
                            >
                              {submission.processed ? "Processed" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                        
                        {submission.company && (
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Company:</strong> {submission.company}
                          </p>
                        )}
                        
                        {submission.service && (
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Service:</strong> {submission.service}
                          </p>
                        )}
                        
                        {submission.project_details && (
                          <p className="text-sm text-muted-foreground mb-3">
                            <strong>Details:</strong> {submission.project_details}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(submission.created_at).toLocaleDateString()}
                            </span>
                            {submission.ip_address && (
                              <span className="flex items-center gap-1">
                                <Globe className="h-3 w-3" />
                                {submission.ip_address}
                              </span>
                            )}
                          </div>
                          
                          {!submission.processed && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsProcessed(submission.id)}
                            >
                              Mark as Processed
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;