import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, FileText, Target, Palette, MessageSquare, Zap, Briefcase, Smile, Heart, Shield, MessageCircle, Code, Video } from "lucide-react";

// Default word counts for different content types
const DEFAULT_WORD_COUNTS = {
  blog_article: 2000,
  social_media: 100,
  product_description: 150,
};

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must not exceed 200 characters"),
  content_type: z.string().min(1, "Please select a content type"),
  target_keywords: z.string().min(1, "Please provide at least one target keyword"),
  word_count: z.number().min(100, "Minimum word count is 100").max(10000, "Maximum word count is 10,000"),
  target_audience: z.string().min(10, "Please provide target audience details (minimum 10 characters)").max(500, "Target audience description is too long"),
  content_goal: z.string().min(10, "Please describe the content goal (minimum 10 characters)").max(500, "Content goal description is too long"),
  key_points: z.string().min(20, "Please provide key points (minimum 20 characters)"),
  tone: z.string().min(1, "Please select a tone"),
  brand_voice: z.string().optional(),
  style_preferences: z.string().optional(),
  specific_instructions: z.string().optional(),
  reference_links: z.string().optional(),
  avoid_topics: z.string().optional(),
  youtube_script: z.boolean().optional(),
  youtube_script_length: z.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

const steps = [
  { id: 1, title: "Project Details", icon: FileText, description: "Basic content information" },
  { id: 2, title: "Content Brief", icon: Target, description: "Goals and audience" },
  { id: 3, title: "Brand & Style", icon: Palette, description: "Voice and preferences" },
  { id: 4, title: "Additional Notes", icon: MessageSquare, description: "Extra instructions" },
];

export function MultiStepContentBriefForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionTier, setSubscriptionTier] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content_type: "",
      target_keywords: "",
      word_count: 2000,
      target_audience: "",
      content_goal: "",
      key_points: "",
      tone: "",
      brand_voice: "",
      style_preferences: "",
      specific_instructions: "",
      reference_links: "",
      avoid_topics: "",
      youtube_script: false,
      youtube_script_length: 500,
    },
  });

  // Fetch subscription tier on mount
  useEffect(() => {
    const fetchSubscriptionTier = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('subscribers')
          .select('subscription_tier')
          .eq('user_id', user.id)
          .single();
        
        setSubscriptionTier(data?.subscription_tier || null);
      }
    };
    
    fetchSubscriptionTier();
  }, []);

  // Watch content_type to update word_count defaults
  const contentType = form.watch("content_type");
  const youtubeScript = form.watch("youtube_script");
  
  // Check if user has Growth+ tier
  const tier = subscriptionTier?.toLowerCase() || '';
  const hasGrowthPlus = ['growth', 'scale', 'authority', 'dominance'].includes(tier);

  useEffect(() => {
    if (contentType && contentType !== "blog_article") {
      const defaultCount = DEFAULT_WORD_COUNTS[contentType as keyof typeof DEFAULT_WORD_COUNTS];
      if (defaultCount) {
        form.setValue("word_count", defaultCount);
      }
    }
  }, [contentType, form]);

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof FormData)[] = [];
    
    switch (step) {
      case 1:
        // Only validate word_count for blog articles
        if (contentType === "blog_article") {
          fieldsToValidate = ["title", "content_type", "target_keywords", "word_count"];
        } else {
          fieldsToValidate = ["title", "content_type", "target_keywords"];
        }
        break;
      case 2:
        fieldsToValidate = ["target_audience", "content_goal", "key_points"];
        break;
      case 3:
        fieldsToValidate = ["tone"];
        break;
      case 4:
        fieldsToValidate = [];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please sign in to submit a content brief.",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from('articles').insert([
        {
          user_id: user.id,
          title: data.title,
          content_type: data.content_type,
          target_keywords: data.target_keywords.split(',').map(k => k.trim()),
          word_count: data.word_count,
          target_audience: data.target_audience,
          content_goal: data.content_goal,
          key_points: data.key_points,
          tone: data.tone,
          brand_voice: data.brand_voice || null,
          style_preferences: data.style_preferences || null,
          specific_instructions: data.specific_instructions || null,
          reference_links: data.reference_links || null,
          avoid_topics: data.avoid_topics || null,
          youtube_script: data.youtube_script || false,
          youtube_script_length: data.youtube_script_length || null,
          status: 'pending',
        }
      ]);

      if (error) throw error;

      toast({
        title: "Brief Submitted Successfully!",
        description: "Your content brief has been submitted. We'll start working on it shortly.",
      });
      
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Submission Error",
        description: error.message || "Failed to submit content brief. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCharCount = (value: string, max: number) => {
    return `${value.length}/${max} characters`;
  };

  const progressPercentage = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between mb-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                    currentStep >= step.id 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-background border-muted text-muted-foreground'
                  }`}
                >
                  <Icon className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                </div>
                <div className="text-center mt-2 hidden md:block">
                  <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-white' : 'text-white/60'}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-white/70">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="border-2 bg-card/95 backdrop-blur-sm shadow-glow border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">{steps[currentStep - 1].title}</CardTitle>
              <CardDescription>{steps[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Project Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Article Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 'How to Build a Successful SaaS Product'" {...field} />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">{getCharCount(field.value, 200)}</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="blog_article">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>Blog Article</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="social_media">
                              <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                <span>Social Media Posts</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="product_description">
                              <div className="flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                <span>Product Description</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="target_keywords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Keywords *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 'SaaS marketing, product launch, customer acquisition' (comma-separated)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Only show word count slider for blog articles */}
                  {contentType === "blog_article" && (
                    <FormField
                      control={form.control}
                      name="word_count"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Word Count: {field.value} words *</FormLabel>
                          <FormControl>
                            <Slider
                              min={500}
                              max={10000}
                              step={100}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="py-4"
                            />
                          </FormControl>
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>500</span>
                            <span>5,000</span>
                            <span>10,000</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Show info for non-blog content types */}
                  {contentType === "social_media" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/50 rounded-lg border border-border">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">Optimal Word Count:</span> 50-120 words (automatically optimized for social media content)
                        </p>
                      </div>

                      {/* YouTube Script Field - Only for Growth+ clients */}
                      {hasGrowthPlus && (
                        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Video className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-foreground">YouTube Video Script (Growth+ Feature)</h3>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="youtube_script"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4 bg-background">
                                <div className="space-y-0.5">
                                  <FormLabel className="text-base">
                                    Include YouTube Video Script
                                  </FormLabel>
                                  <FormDescription>
                                    Add a video script outline for YouTube (3-8 minute videos)
                                  </FormDescription>
                                </div>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          {youtubeScript && (
                            <FormField
                              control={form.control}
                              name="youtube_script_length"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Script Length: {field.value} words</FormLabel>
                                  <FormControl>
                                    <Slider
                                      min={300}
                                      max={800}
                                      step={50}
                                      value={[field.value || 500]}
                                      onValueChange={(value) => field.onChange(value[0])}
                                      className="py-4"
                                    />
                                  </FormControl>
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>300 words</span>
                                    <span>550 words</span>
                                    <span>800 words</span>
                                  </div>
                                  <FormDescription>
                                    Optimal for 3-8 minute videos
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {contentType === "product_description" && (
                    <div className="p-4 bg-muted/50 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">Optimal Word Count:</span> 100-200 words (automatically optimized for product descriptions)
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Content Brief */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="target_audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your target audience (demographics, interests, pain points)..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">{getCharCount(field.value, 500)}</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content_goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Goal *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What do you want to achieve with this content? (e.g., educate, convert, engage)"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">{getCharCount(field.value, 500)}</p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="key_points"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Key Points to Cover *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List the main points or sections you want included..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Brand & Style */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tone *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="professional">
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>Professional</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="casual">
                              <div className="flex items-center gap-2">
                                <Smile className="h-4 w-4" />
                                <span>Casual</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="friendly">
                              <div className="flex items-center gap-2">
                                <Heart className="h-4 w-4" />
                                <span>Friendly</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="authoritative">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                <span>Authoritative</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="conversational">
                              <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4" />
                                <span>Conversational</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="technical">
                              <div className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                <span>Technical</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="brand_voice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand Voice (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your brand's unique voice and personality..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="style_preferences"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Style Preferences (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific formatting, structure, or stylistic preferences..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 4: Additional Notes */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="specific_instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specific Instructions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional instructions or requirements..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reference_links"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reference Links (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Links to reference materials, competitor content, or examples (one per line)..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="avoid_topics"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Topics to Avoid (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any topics, angles, or perspectives to avoid..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto order-2 sm:order-1"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button type="button" onClick={nextStep} className="w-full sm:w-auto order-1 sm:order-2">
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto order-1 sm:order-2">
                {isSubmitting ? "Submitting..." : "Submit Brief"}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
