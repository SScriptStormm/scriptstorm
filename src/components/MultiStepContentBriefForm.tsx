import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { NeonProgress } from "@/components/ui/NeonProgress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight, FileText, Target, Palette, MessageSquare, Zap, Briefcase, Smile, Heart, Shield, MessageCircle, Code, Video, BarChart3 } from "lucide-react";

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
  strategic_goals: z.array(z.string()).optional(),
  kpis_to_track: z.array(z.string()).optional(),
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
      strategic_goals: [],
      kpis_to_track: [],
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

  // Get word count range based on subscription tier
  const getWordCountRange = () => {
    switch(tier) {
      case 'starter':
      case 'growth':
        return { min: 1500, max: 2000, default: 1750, labels: ['1,500', '1,750', '2,000'] };
      case 'scale':
      case 'authority':
        return { min: 2000, max: 3000, default: 2500, labels: ['2,000', '2,500', '3,000'] };
      case 'dominance':
        return { min: 2000, max: 5000, default: 3000, labels: ['2,000', '3,500', '5,000'] };
      default:
        return { min: 1500, max: 2000, default: 1750, labels: ['1,500', '1,750', '2,000'] };
    }
  };

  const wordCountRange = getWordCountRange();

  const getKeywordResearchLabel = () => {
    switch(tier) {
      case 'starter':
        return 'Standard Keyword Research Included';
      case 'growth':
        return 'Advanced Keyword & Competitor Research Included';
      case 'scale':
        return 'Advanced Keyword & Competitor Annihilation Included';
      case 'authority':
        return 'Strategic Keyword & Topic Mapping Included';
      case 'dominance':
        return 'Enterprise Keyword Intelligence Included';
      default:
        return 'Standard Keyword Research Included';
    }
  };

  const getKeywordResearchDescription = () => {
    switch(tier) {
      case 'starter':
        return "We'll research and optimize your target keywords to maximize SEO performance.";
      case 'growth':
        return "We find gaps in competitors' strategies to help you win market share.";
      case 'scale':
        return "We identify and exploit competitor weaknesses to dominate your niche.";
      case 'authority':
        return "We map the competitive landscape to help you own the conversation.";
      case 'dominance':
        return "Proprietary insights to help you discover untapped market opportunities.";
      default:
        return "We'll research and optimize your target keywords to maximize SEO performance.";
    }
  };

  const getTitleLabel = () => {
    switch(contentType) {
      case 'social_media':
        return 'Post Topic/Title *';
      case 'product_description':
        return 'Product Name *';
      default:
        return 'Article Title *';
    }
  };

  const getTitlePlaceholder = () => {
    switch(contentType) {
      case 'social_media':
        return "e.g., 'New product launch announcement'";
      case 'product_description':
        return "e.g., 'Premium Wireless Headphones XL'";
      default:
        return "e.g., 'How to Build a Successful SaaS Product'";
    }
  };

  useEffect(() => {
    if (contentType === "blog_article") {
      // Set to tier-specific default for blog articles
      form.setValue("word_count", wordCountRange.default);
    } else if (contentType) {
      // Set to content-specific default for other types
      const defaultCount = DEFAULT_WORD_COUNTS[contentType as keyof typeof DEFAULT_WORD_COUNTS];
      if (defaultCount) {
        form.setValue("word_count", defaultCount);
      }
    }
  }, [contentType, form, wordCountRange.default]);

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

  const nextStep = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault(); // Prevent any form submission
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
    // Prevent submission if not on the final step
    if (currentStep !== steps.length) {
      return;
    }
    
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

      // Check quota before submission
      const { data: quotaCheck, error: quotaError } = await supabase
        .rpc('can_submit_content', {
          p_user_id: user.id,
          p_content_type: data.content_type
        });

      if (quotaError) {
        console.error('Quota check error:', quotaError);
        throw new Error('Failed to verify quota. Please try again.');
      }

      if (quotaCheck && quotaCheck.length > 0 && !quotaCheck[0].can_submit) {
        toast({
          title: "Monthly Limit Reached",
          description: quotaCheck[0].message || "You've reached your monthly limit for this content type.",
          variant: "destructive",
        });
        setIsSubmitting(false);
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
          strategic_goals: data.strategic_goals || null,
          kpis_to_track: data.kpis_to_track || null,
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
    <div className="w-full">
      {/* Redesigned Progress Steps */}
      <div className="mb-10">
        {/* Step indicators with connecting lines */}
        <div className="flex items-center justify-between mb-3">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isLast = index === steps.length - 1;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step circle with number */}
                <div className="flex flex-col items-center">
                  <div 
                    className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-300 ${
                      isCompleted
                        ? 'bg-primary text-white' 
                        : isActive
                          ? 'bg-primary text-white ring-4 ring-primary/30'
                          : 'bg-white/10 text-white/50 border border-white/20'
                    }`}
                  >
                    {step.id}
                  </div>
                  {/* Step label - always visible */}
                  <p className={`mt-2 text-xs sm:text-sm font-medium text-center transition-colors ${
                    isCompleted || isActive ? 'text-white' : 'text-white/50'
                  }`}>
                    <span className="hidden sm:inline">{step.title}</span>
                    <span className="sm:hidden">{step.title.split(' ')[0]}</span>
                  </p>
                </div>
                
                {/* Connecting line */}
                {!isLast && (
                  <div className="flex-1 mx-2 sm:mx-4">
                    <div className={`h-0.5 w-full transition-colors duration-300 ${
                      isCompleted ? 'bg-primary' : 'bg-white/20'
                    }`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <GlassCard variant="default" className="overflow-hidden bg-black/50 backdrop-blur-xl border-white/15">
            <GlassCardHeader className="border-b border-white/10 pb-6 px-6 sm:px-8">
              <GlassCardTitle className="text-xl sm:text-2xl font-semibold text-white">{steps[currentStep - 1].title}</GlassCardTitle>
              <GlassCardDescription className="text-white/60 mt-1">{steps[currentStep - 1].description}</GlassCardDescription>
            </GlassCardHeader>
          <GlassCardContent className="space-y-6 pt-8 pb-8 px-6 sm:px-8">
              {/* Step 1: Project Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-base">{getTitleLabel()}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={getTitlePlaceholder()} 
                            {...field} 
                            className="bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary h-12 text-base"
                          />
                        </FormControl>
                        <div className="flex justify-end">
                          <span className="text-xs text-white/50">{getCharCount(field.value, 200)}</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-base">Content Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/40 text-white border-white/20 focus:ring-primary focus:border-primary h-12 text-base [&>span]:text-white">
                              <SelectValue placeholder="Select content type" className="text-white/50" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
                            <SelectItem value="blog_article" className="text-white focus:bg-white/10 focus:text-white py-3">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>Blog Article</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="social_media" className="text-white focus:bg-white/10 focus:text-white py-3">
                              <div className="flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                <span>Social Media Posts</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="product_description" className="text-white focus:bg-white/10 focus:text-white py-3">
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
                        <FormLabel className="text-white font-medium text-base">Target Keywords *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., 'SaaS marketing, product launch, customer acquisition' (comma-separated)" 
                            {...field}
                            className="bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary h-12 text-base"
                          />
                        </FormControl>
                        <div className="mt-2 p-3 bg-primary/15 border border-primary/25 rounded-lg">
                          <p className="text-xs text-primary-glow flex items-center gap-2">
                            <Target className="h-3 w-3" />
                            <strong>{getKeywordResearchLabel()}:</strong> {getKeywordResearchDescription()}
                          </p>
                        </div>
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
                          <FormLabel className="text-white font-medium text-base">Word Count: {field.value?.toLocaleString()} words *</FormLabel>
                          <FormControl>
                            <Slider
                              min={wordCountRange.min}
                              max={wordCountRange.max}
                              step={50}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="py-4"
                            />
                          </FormControl>
                          <div className="flex justify-between text-xs text-white/60">
                            <span>{wordCountRange.labels[0]}</span>
                            <span>{wordCountRange.labels[1]}</span>
                            <span>{wordCountRange.labels[2]}</span>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Show info for non-blog content types */}
                  {contentType === "social_media" && (
                    <div className="space-y-4">
                      <div className="p-4 bg-black/30 rounded-lg border border-white/15">
                        <p className="text-sm text-white/80">
                          <span className="font-semibold text-white">Optimal Word Count:</span> 50-120 words (automatically optimized for social media content)
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
                    <div className="p-4 bg-black/30 rounded-lg border border-white/15">
                      <p className="text-sm text-white/80">
                        <span className="font-semibold text-white">Optimal Word Count:</span> 100-200 words (automatically optimized for product descriptions)
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Content Brief */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="target_audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-base">Target Audience *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your target audience (demographics, interests, pain points)..."
                            className="min-h-[100px] bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary text-base"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-end">
                          <span className="text-xs text-white/50">{getCharCount(field.value, 500)}</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content_goal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-base">Content Goal *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="What do you want to achieve with this content? (e.g., educate, convert, engage)"
                            className="min-h-[100px] bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary text-base"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-end">
                          <span className="text-xs text-white/50">{getCharCount(field.value, 500)}</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="key_points"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-base">Key Points to Cover *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List the main points or sections you want included..."
                            className="min-h-[120px] bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
                />

                  {/* AI Competitor Analysis Message - Growth+ Feature */}
                  {hasGrowthPlus && (
                    <div className="p-4 bg-primary/15 rounded-lg border border-primary/25">
                      <div className="flex items-start gap-3">
                        <Target className="h-5 w-5 text-primary-glow mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-white/80 leading-relaxed">
                          <span className="font-semibold text-white">Don't know your top competitors?</span> No problem. Our AI will automatically analyze the top-ranking pages for your topic to ensure your content outperforms them.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Strategic Goals - Authority+ Feature */}
                  {(subscriptionTier === 'authority' || subscriptionTier === 'dominance') && (
                    <div className="p-4 bg-purple-500/5 rounded-lg border border-purple-500/20 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-purple-500" />
                        <h3 className="font-semibold text-foreground">Strategic Content Goals (Authority+ Feature)</h3>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="strategic_goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Select Your Strategic Goals (Optional)</FormLabel>
                            <div className="space-y-2 mt-2">
                              {[
                                'Establish thought leadership',
                                'Target competitor keywords',
                                'Create pillar content',
                                'Generate leads',
                                'Build brand authority',
                                'Drive organic traffic'
                              ].map((goal) => (
                                <label key={goal} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={field.value?.includes(goal) || false}
                                    onChange={(e) => {
                                      const currentValues = field.value || [];
                                      if (e.target.checked) {
                                        field.onChange([...currentValues, goal]);
                                      } else {
                                        field.onChange(currentValues.filter(v => v !== goal));
                                      }
                                    }}
                                    className="w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-500"
                                  />
                                  <span className="text-sm text-foreground">{goal}</span>
                                </label>
                              ))}
                            </div>
                            <FormDescription>
                              We'll tailor the content strategy to achieve these specific objectives
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* KPI Tracking - Dominance Feature */}
                  {subscriptionTier === 'dominance' && (
                    <div className="p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20 space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-yellow-500" />
                        <h3 className="font-semibold text-foreground">Performance Tracking (Dominance Feature)</h3>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="kpis_to_track"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Key Performance Indicators (KPIs) to Track (Optional)</FormLabel>
                            <div className="space-y-2 mt-2">
                              {[
                                'Organic Traffic Growth',
                                'Lead Conversion Rate',
                                'Keyword Rankings',
                                'Engagement Metrics',
                                'Backlink Acquisition',
                                'Domain Authority'
                              ].map((kpi) => (
                                <label key={kpi} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={field.value?.includes(kpi) || false}
                                    onChange={(e) => {
                                      const currentValues = field.value || [];
                                      if (e.target.checked) {
                                        field.onChange([...currentValues, kpi]);
                                      } else {
                                        field.onChange(currentValues.filter(v => v !== kpi));
                                      }
                                    }}
                                    className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                                  />
                                  <span className="text-sm text-foreground">{kpi}</span>
                                </label>
                              ))}
                            </div>
                            <FormDescription>
                              We'll include these metrics in your AI-Driven Performance Dashboard
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Brand & Style */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="tone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-base">Tone *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-black/40 text-white border-white/20 focus:ring-primary focus:border-primary h-12 text-base [&>span]:text-white">
                              <SelectValue placeholder="Select tone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-black/95 backdrop-blur-xl border-white/20 text-white">
                            <SelectItem value="professional" className="text-white focus:bg-white/10 focus:text-white py-3">
                              <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>Professional</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="casual" className="text-white focus:bg-white/10 focus:text-white py-3">
                              <div className="flex items-center gap-2">
                                <Smile className="h-4 w-4" />
                                <span>Casual</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="friendly" className="text-white focus:bg-white/10 focus:text-white py-3">
                              <div className="flex items-center gap-2">
                                <Heart className="h-4 w-4" />
                                <span>Friendly</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="authoritative" className="text-white focus:bg-white/10 focus:text-white py-3">
                              <div className="flex items-center gap-2">
                                <Shield className="h-4 w-4" />
                                <span>Authoritative</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="conversational" className="text-white focus:bg-white/10 focus:text-white py-3">
                              <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4" />
                                <span>Conversational</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="technical" className="text-white focus:bg-white/10 focus:text-white py-3">
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
                        <FormLabel className="text-white font-medium text-base">Brand Voice (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your brand's unique voice and personality..."
                            className="min-h-[100px] bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary text-base"
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
                        <FormLabel className="text-white font-medium text-base">Style Preferences (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any specific formatting, structure, or stylistic preferences..."
                            className="min-h-[100px] bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary text-base"
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
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="specific_instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-medium text-base">Specific Instructions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any additional instructions or requirements..."
                            className="min-h-[120px] bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary text-base"
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
                        <FormLabel className="text-white font-medium text-base">Reference Links (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Links to reference materials, competitor content, or examples (one per line)..."
                            className="min-h-[100px] bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary text-base"
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
                        <FormLabel className="text-white font-medium text-base">Topics to Avoid (Optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any topics, angles, or perspectives to avoid..."
                            className="min-h-[100px] bg-black/40 text-white placeholder:text-white/50 border-white/20 focus-visible:ring-primary focus-visible:border-primary text-base"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </GlassCardContent>
          </GlassCard>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 mt-8">
            <Button
              type="button"
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto order-2 sm:order-1 border border-white/15 bg-white/[0.05] backdrop-blur-xl text-white/80 hover:text-white hover:bg-white/[0.1] hover:border-white/25 disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-300"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button 
                type="button" 
                onClick={nextStep} 
                className="w-full sm:w-auto order-1 sm:order-2 relative overflow-hidden group bg-gradient-to-r from-primary to-primary-glow text-white font-semibold shadow-[0_0_25px_hsl(221_83%_53%/0.4)] hover:shadow-[0_0_40px_hsl(221_83%_53%/0.6)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full sm:w-auto order-1 sm:order-2 relative overflow-hidden group bg-gradient-to-r from-primary to-primary-glow text-white font-semibold shadow-[0_0_25px_hsl(221_83%_53%/0.4)] hover:shadow-[0_0_40px_hsl(221_83%_53%/0.6)] transition-all duration-300 disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center">
                  {isSubmitting ? "Submitting..." : "Submit Brief"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-glow to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
