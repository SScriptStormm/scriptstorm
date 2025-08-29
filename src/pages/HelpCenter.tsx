import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Clock, FileText, Users, Zap, Shield, CreditCard } from "lucide-react";
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
          a: "We start working on your content immediately after order confirmation. Our AI-powered workflow and expert team ensure delivery within 24 hours for standard orders."
        },
        {
          q: "What if I need revisions?",
          a: "Each package includes AI-assisted revisions: Starter (1 round), Growth (2 rounds), Scale (2 rounds), Authority (3 rounds), Dominance (unlimited). Revisions delivered within 24 hours."
        },
        {
          q: "What types of content do you create?",
          a: "We create AI-generated SEO articles, social media posts, and product descriptions specifically optimized for SaaS and eCommerce brands."
        }
      ]
    },
    {
      category: "Process & Quality",
      icon: <FileText className="h-5 w-5" />,
      questions: [
        {
          q: "How do you ensure content quality?",
          a: "We use a combination of AI tools (Gemini 1.5, Originality.ai, Frase.io) and human expertise. Every piece is optimized for SEO and passes originality checks."
        },
        {
          q: "Can you match my brand voice?",
          a: "Absolutely! During onboarding, we analyze your existing content and brand guidelines to ensure all deliverables match your unique voice and style."
        },
        {
          q: "What's your content creation process?",
          a: "Our 4-step process includes: Research & Strategy → AI-Powered Writing → Expert Review & SEO Optimization → Quality Assurance & Delivery."
        }
      ]
    },
    {
      category: "Billing & Plans",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          q: "Can I cancel anytime?",
          a: "Yes, all our plans are month-to-month with no long-term contracts. You can cancel anytime before your next billing cycle."
        },
        {
          q: "Do you offer refunds?",
          a: "We offer a 100% money-back guarantee if you're not satisfied with your first delivery. See our refund policy for full details."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, PayPal, and bank transfers for enterprise clients."
        }
      ]
    },
    {
      category: "Technical Support",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          q: "How do I access my content?",
          a: "All content is delivered through your dashboard within 24 hours. You'll also receive email notifications when content is ready."
        },
        {
          q: "Can I integrate with my CMS?",
          a: "Yes, we can deliver content in formats compatible with WordPress, Shopify, HubSpot, and other popular content management systems."
        },
        {
          q: "Do you provide content analytics?",
          a: "Premium plans include performance tracking and SEO analytics to help you measure content success and ROI."
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
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-secondary/95 backdrop-blur-md border-b border-primary/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 text-primary-glow hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="font-mono tracking-wide">Back to ScriptStorm</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Help Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find answers to common questions about ScriptStorm's content creation services
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-secondary/50 border-primary/30 text-foreground placeholder:text-muted-foreground pl-12 py-6 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-secondary/90 border-primary/30 shadow-glow text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary-glow" />
                  <Badge variant="outline" className="border-primary-glow/50 text-primary-glow">24 HOURS</Badge>
                </div>
                <p className="text-muted-foreground text-sm">Average Response Time</p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/90 border-primary/30 shadow-glow text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="h-5 w-5 text-primary-glow" />
                  <Badge variant="outline" className="border-primary-glow/50 text-primary-glow">500+</Badge>
                </div>
                <p className="text-muted-foreground text-sm">Happy Clients Served</p>
              </CardContent>
            </Card>

            <Card className="bg-secondary/90 border-primary/30 shadow-glow text-center">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary-glow" />
                  <Badge variant="outline" className="border-primary-glow/50 text-primary-glow">100%</Badge>
                </div>
                <p className="text-muted-foreground text-sm">Satisfaction Guarantee</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredFAQs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    {category.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                </div>
                
                  <div className="space-y-4">
                    {category.questions.map((item, itemIndex) => (
                      <Card key={itemIndex} className="bg-secondary/90 border-primary/30 shadow-glow">
                        <CardHeader>
                          <CardTitle className="text-foreground text-lg">{item.q}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground leading-relaxed">{item.a}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="max-w-2xl mx-auto mt-16">
            <Card className="bg-secondary/90 border-primary/30 shadow-glow text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Still need help?</h3>
                <p className="text-muted-foreground mb-6">
                  Can't find the answer you're looking for? Our support team is here to help.
                </p>
                <Link to="/contact" className="inline-block">
                  <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-colors shadow-glow">
                    Contact Support
                  </button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;