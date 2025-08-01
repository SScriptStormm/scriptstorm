import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CMO at CloudTech SaaS",
      content: "ScriptStorm transformed our content strategy. We went from 10K to 100K monthly organic visitors in just 6 months. Their SEO articles are incredibly well-researched and convert beautifully.",
      rating: 5,
      company: "CloudTech"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Founder at EcomGrow",
      content: "The 24-hour delivery is no joke. I needed 5 product descriptions urgently for a launch, and they delivered perfectly optimized content that helped us achieve a 35% conversion rate increase.",
      rating: 5,
      company: "EcomGrow"
    },
    {
      name: "Jessica Wang",
      role: "Marketing Director at FinanceApp",
      content: "Their email sequences are phenomenal. Our welcome series now has a 40% open rate and 12% click-through rate. The ROI on their content is incredible - easily 10x our investment.",
      rating: 5,
      company: "FinanceApp"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What Our Clients <span className="text-primary">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join hundreds of successful SaaS and eCommerce brands who trust us with their content marketing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="shadow-card hover:shadow-elegant transition-smooth border-0 bg-card">
              <CardContent className="p-6">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="border-t pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs text-primary font-medium mt-1">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 text-center">
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "10,000+", label: "Articles Delivered" },
            { number: "4.9/5", label: "Average Rating" },
            { number: "24hrs", label: "Delivery Time" }
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;