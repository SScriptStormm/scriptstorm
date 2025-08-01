import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Star } from "lucide-react";

const Pricing = () => {
  const handleSubscribe = () => {
    // This will be replaced with actual Stripe integration
    console.log("Starting subscription flow...");
    alert("Stripe integration will be set up next! Please provide your Stripe Secret Key to complete the payment setup.");
  };

  const features = [
    "10 premium articles per month",
    "SEO keyword research included",
    "24-hour delivery guarantee",
    "Unlimited revisions",
    "Dedicated account manager",
    "Content calendar planning",
    "Performance analytics",
    "Money-back guarantee"
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to scale your content marketing. 
            No hidden fees, no contracts, cancel anytime.
          </p>
        </div>

        {/* Individual Service Pricing Table */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Individual Service <span className="text-primary">Pricing</span>
            </h3>
            <p className="text-muted-foreground">
              À la carte pricing for individual content pieces
            </p>
          </div>

          <Card className="shadow-elegant bg-card">
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Service</TableHead>
                    <TableHead className="font-semibold">Base Price</TableHead>
                    <TableHead className="font-semibold text-primary">+SEO ($20)</TableHead>
                    <TableHead className="font-semibold text-primary">+Human Edit ($15)</TableHead>
                    <TableHead className="font-semibold text-primary">Total Upsell Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">SEO Blog Post</TableCell>
                    <TableCell>$60</TableCell>
                    <TableCell className="font-bold text-primary">$80</TableCell>
                    <TableCell className="font-bold text-primary">$75</TableCell>
                    <TableCell className="font-bold text-primary">$95 (both)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Social Media Post</TableCell>
                    <TableCell>$15</TableCell>
                    <TableCell className="font-bold text-primary">$35</TableCell>
                    <TableCell className="font-bold text-primary">$30</TableCell>
                    <TableCell className="font-bold text-primary">$50 (both)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Product Description</TableCell>
                    <TableCell>$10</TableCell>
                    <TableCell className="font-bold text-primary">$30</TableCell>
                    <TableCell className="font-bold text-primary">$25</TableCell>
                    <TableCell className="font-bold text-primary">$45 (both)</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-md mx-auto mt-8">
          <Card className="shadow-elegant border-2 border-primary/20 bg-card relative overflow-visible">
            {/* Popular Badge */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-gradient-primary text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="h-4 w-4" />
                Most Popular
              </div>
            </div>

            <CardHeader className="text-center pt-12 pb-8">
              <CardTitle className="text-3xl font-bold mb-2">Content Pro</CardTitle>
              <CardDescription className="text-lg mb-6">
                Perfect for growing SaaS & eCommerce brands
              </CardDescription>
              
              <div className="mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-primary">$497</span>
                  <span className="text-xl text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  That's just $49.70 per article
                </p>
              </div>

              <Button 
                variant="cta" 
                size="lg" 
                onClick={handleSubscribe}
                className="w-full text-xl py-6 h-auto"
              >
                Start Your Subscription
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                ✨ 7-day free trial • Cancel anytime • Money-back guarantee
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg mb-4">Everything included:</h4>
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-center">
                  <strong>Bonus:</strong> Get a free content audit worth $297 when you subscribe today!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            Need a custom plan? Enterprise solutions available.
          </p>
          <Button variant="ghost" className="text-primary hover:text-primary-dark">
            Contact Sales Team
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;