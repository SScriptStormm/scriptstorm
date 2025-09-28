import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  contentType: z.string().min(1, "Please select a content type"),
  title: z.string().min(1, "Project title is required").max(200, "Title must be less than 200 characters"),
  primaryKeyword: z.string().min(1, "Primary keyword is required").max(100, "Keyword must be less than 100 characters"),
  goal: z.string().min(1, "Content goal is required").max(500, "Goal must be less than 500 characters"),
  targetAudience: z.string().min(1, "Target audience is required").max(500, "Target audience must be less than 500 characters"),
  keyPoints: z.string().min(1, "Key points are required").max(2000, "Key points must be less than 2000 characters"),
  referenceLinks: z.string().optional(),
  tone: z.string().min(1, "Please select a tone"),
  brandVoice: z.string().min(1, "Brand voice description is required").max(1000, "Brand voice must be less than 1000 characters"),
  wordCount: z.number().min(100, "Minimum word count is 100").max(10000, "Maximum word count is 10,000"),
  callToAction: z.string().min(1, "Call to action is required").max(200, "CTA must be less than 200 characters"),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export const ContentBriefForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contentType: "",
      title: "",
      primaryKeyword: "",
      goal: "",
      targetAudience: "",
      keyPoints: "",
      referenceLinks: "",
      tone: "",
      brandVoice: "",
      wordCount: 1500,
      callToAction: "",
      additionalNotes: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Error",
          description: "Please log in to submit a content brief.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('articles')
        .insert({
          user_id: user.id,
          title: data.title,
          target_keywords: [data.primaryKeyword],
          word_count: data.wordCount,
          status: 'pending',
          notes: JSON.stringify({
            contentType: data.contentType,
            goal: data.goal,
            targetAudience: data.targetAudience,
            keyPoints: data.keyPoints,
            referenceLinks: data.referenceLinks,
            tone: data.tone,
            brandVoice: data.brandVoice,
            callToAction: data.callToAction,
            additionalNotes: data.additionalNotes,
          }),
        });

      if (error) throw error;

      toast({
        title: "Content Brief Submitted!",
        description: "Your content brief has been submitted successfully. You'll receive your draft within 24 hours.",
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit content brief. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* AI Neural Network Background */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse" />
      
      {/* Header */}
      <header className="relative z-10 border-b border-primary-glow/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              size="sm"
              className="text-white border border-primary-glow/30 hover:border-primary-glow/60 font-mono"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              BACK TO DASHBOARD
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white font-mono tracking-wide">
                SUBMIT CONTENT BRIEF
              </h1>
              <p className="text-primary-glow/80 text-sm font-mono tracking-widest">
                AI CONTENT PRODUCTION SYSTEM
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-black/30 backdrop-blur-xl border-primary-glow/30 shadow-cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white font-mono tracking-wide text-xl">
              <FileText className="h-6 w-6 text-primary-glow" />
              NEW CONTENT BRIEF
            </CardTitle>
            <p className="text-white/70 font-mono text-sm">
              Fill out this comprehensive brief to ensure your AI-generated content meets your exact specifications
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Project Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-primary-glow font-mono tracking-wide border-b border-primary-glow/30 pb-2">
                    1. PROJECT DETAILS
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Content Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/40 border-primary-glow/30 text-white">
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/90 border-primary-glow/30">
                            <SelectItem value="blog-article">Blog Article</SelectItem>
                            <SelectItem value="social-media">Social Media Posts</SelectItem>
                            <SelectItem value="product-description">Product Description</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Project/Article Title</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="Enter your content title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primaryKeyword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Primary Keyword/Topic</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="e.g., AI content marketing, SaaS onboarding" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Content Brief Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-primary-glow font-mono tracking-wide border-b border-primary-glow/30 pb-2">
                    2. CONTENT BRIEF
                  </h3>

                  <FormField
                    control={form.control}
                    name="goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Goal of this Content</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="e.g., Generate leads, Explain a feature, Improve SEO" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="targetAudience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Target Audience</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="Describe your target audience in detail" rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="keyPoints"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Key Points to Cover</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="• Point 1&#10;• Point 2&#10;• Point 3" rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referenceLinks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Reference/Competitor Links (Optional)</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="Add links to competitors or reference materials" rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Brand Voice & Style Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-primary-glow font-mono tracking-wide border-b border-primary-glow/30 pb-2">
                    3. BRAND VOICE & STYLE
                  </h3>

                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Tone</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/40 border-primary-glow/30 text-white">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/90 border-primary-glow/30">
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="conversational">Conversational</SelectItem>
                            <SelectItem value="authoritative">Authoritative</SelectItem>
                            <SelectItem value="friendly">Friendly</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brandVoice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Brand Voice Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="e.g., We are experts but approachable. Avoid jargon. Use real examples." rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Specific Instructions Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-primary-glow font-mono tracking-wide border-b border-primary-glow/30 pb-2">
                    4. SPECIFIC INSTRUCTIONS
                  </h3>

                  <FormField
                    control={form.control}
                    name="wordCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Word Count Target</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number" 
                            className="bg-black/40 border-primary-glow/30 text-white" 
                            placeholder="1500"
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="callToAction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Call to Action</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="e.g., Sign up for a demo, Read our guide, Contact us" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalNotes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-mono">Any Other Notes</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="bg-black/40 border-primary-glow/30 text-white" placeholder="Additional instructions or requirements" rows={4} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-glow text-white font-mono tracking-wide border-2 border-primary-glow/50 hover:border-primary-glow shadow-cyber hover:shadow-hologram transition-all duration-500 px-8 py-3"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    {isSubmitting ? "SUBMITTING..." : "SUBMIT CONTENT BRIEF"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};