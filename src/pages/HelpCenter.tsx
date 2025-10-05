import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Clock, FileText, Users, Zap, Shield, CreditCard, CheckCircle, Ban } from "lucide-react";
import { useState } from "react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqItems = [
    {
      category: "Getting Started",
      icon: <Zap className="h-5 w-5" />,
      questions: [
        {
          q: "How does the 24-hour delivery work?",
          a: "Our automated workflow engine is triggered the moment you submit your content brief. The system handles research, writing, and quality control without manual intervention, guaranteeing your first draft is delivered to your dashboard within 24 hours."
        },
        {
          q: "What if I need revisions?",
          a: "Each package includes AI-assisted revisions: Starter (1 round), Growth (2 rounds), Scale (2 rounds), Authority (3 rounds), Dominance (unlimited, Fair Use policy). Submit revision requests through your client dashboard, and our system will process and deliver the refined content within a few hours."
        },
        {
          q: "What types of content do you create?",
          a: "We specialize in AI-generated SEO articles, social media posts, and product descriptions, optimized for SaaS and eCommerce brands."
        }
      ]
    },
    {
      category: "Process & Quality",
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          q: "How do you ensure content quality?",
          a: "We use a sophisticated, multi-step automated process. Every piece of content is generated based on data-driven SEO research, then rigorously scanned by our quality assurance systems to ensure originality, readability, and SEO optimization before delivery."
        },
        {
          q: "Can you match my brand voice?",
          a: "Absolutely. During the onboarding process, our AI analyzes your brand voice, style, and any existing content you provide. This allows it to maintain perfect consistency with your established tone and guidelines across all deliverables."
        },
        {
          q: "What's your content creation process?",
          a: "Our fully automated 4-step process ensures speed and quality: AI Research & Strategy (Keyword and topic analysis) → AI-Powered Writing (First draft generation) → AI Optimization & Quality Control (SEO and originality checks) → Instant Delivery (Content is posted to your client dashboard)."
        }
      ]
    },
    {
      category: "Billing & Plans",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          q: "Can I cancel anytime?",
          a: "Yes. All plans are month-to-month with no long-term contracts. You can cancel anytime from your dashboard, and your access will continue until the end of that billing cycle."
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 100% satisfaction guarantee. If a piece of content does not meet your expectations after your allotted revisions, we will rewrite it. If we are unable to meet your needs, we will discuss a prorated refund."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards and PayPal. Enterprise annual contracts may be eligible for invoice-based billing."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          q: "How do I access my content?",
          a: "All content is delivered instantly to your dedicated ScriptStorm Client Dashboard. You will also receive an email notification when it is ready for download."
        },
        {
          q: "Can I integrate with my CMS?",
          a: "Currently, content is delivered for download through your dashboard in standard formats (Word, PDF, HTML). You can easily copy and paste into your CMS like WordPress or Shopify."
        },
        {
          q: "Do you provide content analytics?",
          a: "Our higher-tier plans include high-level performance insights and SEO scoring to help you measure content success."
        }
      ]
    }
  ];

  const filteredFAQs = faqItems.map(category => ({
    ...category,
    questions: category.questions.filter(
      item => 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-primary/20 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-glow transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono tracking-wide">Back to ScriptStorm</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-white via-white/95 to-muted/50 overflow-hidden">
        {/* AI Neural Network Background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
        <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-20" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-glow) / 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" />
        <div className="absolute top-40 right-20 w-12 h-12 border-2 border-primary-glow/25 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-10 h-10 border-2 border-primary-glow/35 rotate-45 animate-float shadow-cyber" style={{ animationDelay: '4s' }} />
        
        {/* Multiple scanning line effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-40" />
          <div className="absolute bottom-0 h-px w-full bg-gradient-cyber animate-scan-line opacity-30" style={{ animationDelay: '2s' }} />
          <div className="absolute left-0 w-px h-full bg-gradient-neural animate-scan-line opacity-25" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* Particle effect overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }} />
          <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-40" style={{ animationDelay: '3s' }} />
          <div className="absolute bottom-1/4 left-1/2 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-35" style={{ animationDelay: '5s' }} />
        </div>
        
        <div className="relative z-10">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 bg-primary text-white border-0 px-4 py-2 text-sm font-medium">
            SCRIPTSTORM
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-foreground leading-tight">
            Help Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
            Find answers to common questions about our fully automated, AI-powered content creation service.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border-2 border-gray-200 focus:border-primary/50 text-foreground placeholder:text-muted-foreground pl-12 py-6 text-lg shadow-lg"
            />
          </div>
        </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-3">~24 HOURS</h3>
                <p className="text-muted-foreground font-medium">Guaranteed Delivery Time</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-3">100%</h3>
                <p className="text-muted-foreground font-medium">Satisfaction Guarantee</p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Ban className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-3">0</h3>
                <p className="text-muted-foreground font-medium">Meetings or Calls Required</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-16">
            {searchQuery && filteredFAQs.length === 0 ? (
              <Card className="bg-white border-2 border-gray-100 shadow-lg p-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No help articles found for "<span className="font-semibold text-foreground">{searchQuery}</span>". 
                  Try different keywords or{" "}
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="text-primary hover:text-primary-glow underline font-medium"
                  >
                    clear your search
                  </button>.
                </p>
              </Card>
            ) : (
              <>
                {searchQuery && (
                  <div className="text-center mb-8">
                    <p className="text-muted-foreground text-lg">
                      Found <span className="font-bold text-primary">{filteredFAQs.reduce((acc, cat) => acc + cat.questions.length, 0)}</span> result(s) for "<span className="font-semibold text-foreground">{searchQuery}</span>"
                      {" "}<button 
                        onClick={() => setSearchQuery("")}
                        className="text-primary hover:text-primary-glow underline font-medium ml-2"
                      >
                        Clear search
                      </button>
                    </p>
                  </div>
                )}
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="flex items-center gap-4 mb-12">
                      <div className="p-4 bg-primary/10 rounded-xl text-primary">
                        {category.icon}
                      </div>
                      <h2 className="text-4xl font-bold text-foreground">{category.category}</h2>
                    </div>
                    
                    <div className="space-y-6">
                      {category.questions.map((item, itemIndex) => (
                        <Card key={itemIndex} className="bg-white border-2 border-gray-100 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="text-foreground text-xl font-bold">{item.q}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed text-lg">{item.a}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary-glow shadow-2xl max-w-4xl mx-auto">
            <CardContent className="p-16 text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">Still need help?</h3>
              <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Can't find the answer you're looking for? Our support system is here for you.
              </p>
              <Link to="/support">
                <button className="bg-white text-primary hover:bg-gray-50 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                  Contact Support
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;