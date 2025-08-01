import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Star, Crown } from "lucide-react";

const Pricing = () => {
  const handleStripeCheckout = (planType: string) => {
    // This will be replaced with actual Stripe integration
    console.log(`Starting ${planType} subscription flow...`);
    alert(`Stripe integration will be set up for ${planType} plan! Please provide your Stripe Secret Key to complete the payment setup.`);
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Simple, Transparent <span className="text-[#3498DB]">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to scale your content marketing. 
            No hidden fees, no contracts, cancel anytime.
          </p>
        </div>

        {/* Main Pricing Comparison Grid */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Choose Your <span className="text-[#3498DB]">Content Plan</span>
            </h3>
            <p className="text-muted-foreground">
              Compare per-article pricing vs subscription savings
            </p>
          </div>

          <Card className="shadow-elegant bg-card">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-lg">Service</TableHead>
                    <TableHead className="font-semibold text-lg">Per-Article</TableHead>
                    <TableHead className="font-semibold text-lg text-[#3498DB]">Subscription</TableHead>
                    <TableHead className="font-semibold text-lg text-[#2ECC71]">Savings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b">
                    <TableCell className="font-medium text-base">SEO Blog</TableCell>
                    <TableCell className="text-base">$60 USD</TableCell>
                    <TableCell className="font-bold text-[#3498DB] text-base">$497 USD/month ($49.70/article)</TableCell>
                    <TableCell className="font-bold text-[#2ECC71] text-base">Save 17%</TableCell>
                  </TableRow>
                  <TableRow className="border-b">
                    <TableCell className="font-medium text-base">Social Posts</TableCell>
                    <TableCell className="text-base">$15 USD</TableCell>
                    <TableCell className="font-bold text-[#3498DB] text-base">$300 USD/month (50 posts)</TableCell>
                    <TableCell className="font-bold text-[#2ECC71] text-base">Save 10%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-base">Product Descriptions</TableCell>
                    <TableCell className="text-base">$10 USD</TableCell>
                    <TableCell className="font-bold text-[#3498DB] text-base">$400 USD/month (100 products)</TableCell>
                    <TableCell className="font-bold text-[#2ECC71] text-base">Save 20%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Main Subscription Button - Best Value */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="shadow-elegant border-2 border-[#2ECC71]/30 bg-card relative overflow-visible">
            {/* Most Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-[#2ECC71] text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                <Crown className="h-4 w-4" />
                Most Popular
              </div>
            </div>

            <CardHeader className="text-center pt-12 pb-8">
              <CardTitle className="text-2xl font-bold mb-4">
                🔥 BEST VALUE: 10 SEO Articles = $497 USD/mo
              </CardTitle>
              <CardDescription className="text-lg mb-6 text-[#2ECC71] font-semibold">
                Save $103 USD compared to per-article pricing!
              </CardDescription>
              
              <Button 
                className="w-full text-xl py-6 h-auto bg-[#2ECC71] hover:bg-[#27AE60] text-white font-bold"
                size="lg" 
                onClick={() => handleStripeCheckout('SEO Blog Subscription')}
              >
                Start SEO Blog Subscription
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                ✨ 7-day free trial • Cancel anytime • Money-back guarantee
              </p>
            </CardHeader>
          </Card>
        </div>

        {/* Other Subscription Options */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          <Card className="p-6 border border-[#3498DB]/20">
            <h4 className="text-xl font-bold mb-2 text-[#3498DB]">Social Media Package</h4>
            <p className="text-2xl font-bold mb-4">$300 USD/month</p>
            <p className="text-muted-foreground mb-4">50 social posts • Save 10%</p>
            <Button 
              className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white"
              onClick={() => handleStripeCheckout('Social Media Package')}
            >
              Start Social Package
            </Button>
          </Card>

          <Card className="p-6 border border-[#3498DB]/20">
            <h4 className="text-xl font-bold mb-2 text-[#3498DB]">Product Description Package</h4>
            <p className="text-2xl font-bold mb-4">$400 USD/month</p>
            <p className="text-muted-foreground mb-4">100 descriptions • Save 20%</p>
            <Button 
              className="w-full bg-[#3498DB] hover:bg-[#2980B9] text-white"
              onClick={() => handleStripeCheckout('Product Description Package')}
            >
              Start Product Package
            </Button>
          </Card>
        </div>

        {/* Upsell Modules */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
              Premium <span className="text-[#3498DB]">Add-Ons</span>
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border border-[#3498DB]/20">
              <div className="flex items-center gap-3 mb-4">
                <Checkbox id="seo-addon" />
                <label htmlFor="seo-addon" className="text-lg font-semibold cursor-pointer">
                  + Professional SEO Optimization (<span className="line-through text-muted-foreground">$220</span> $197/month)
                </label>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                Keyword research, SurferSEO integration, ranking reports
              </p>
            </Card>

            <Card className="p-6 border border-[#3498DB]/20">
              <div className="flex items-center gap-3 mb-4">
                <Checkbox id="editing-addon" />
                <label htmlFor="editing-addon" className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                  + Native-Language Editing (+$147/month)
                  <Badge style={{ backgroundColor: '#00C4CC', color: 'white' }} className="text-xs">
                    Most Popular
                  </Badge>
                </label>
                <Badge variant="secondary" className="text-xs bg-[#2ECC71] text-white">
                  Save 12%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground ml-8">
                Human polish for US/UK/EU/Asia markets 🇺🇸🇬🇧🇪🇺🇭🇰🇲🇽
              </p>
            </Card>
          </div>
        </div>

        {/* Annual Plan CTA */}
        <div className="max-w-md mx-auto mb-12">
          <Card className="p-6 bg-gradient-to-br from-[#FFD700]/10 to-[#FFD700]/5 border-2 border-[#FFD700]/30">
            <div className="text-center">
              <h4 className="text-xl font-bold mb-2 text-foreground">
                ⚡ YEARLY DEAL: $4,970 USD/year (2 Months FREE)
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Save $994 USD vs paying monthly → 30-day guarantee
              </p>
              <Button 
                className="w-full font-bold text-black"
                style={{ backgroundColor: '#FFD700', borderColor: '#FFD700' }}
                onClick={() => handleStripeCheckout('Annual Plan')}
              >
                Get Annual Deal
              </Button>
            </div>
          </Card>
        </div>

        {/* Footnote */}
        <div className="text-center max-w-3xl mx-auto">
          <Card className="p-6 bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong>All subscriptions include:</strong> 24-hr delivery, 2 free revisions, and content calendar access. Cancel anytime.
            </p>
          </Card>
        </div>

        {/* Contact Sales */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Need a custom plan? Enterprise solutions available.
          </p>
          <Button variant="ghost" className="text-[#3498DB] hover:text-[#2980B9]">
            Contact Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
