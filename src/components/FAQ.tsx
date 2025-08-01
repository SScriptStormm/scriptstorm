import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How does the 24-hour delivery work?",
      answer: "Once you submit your content brief, our AI-powered team gets to work immediately. Most articles are delivered within 24 hours, and rush orders can be completed in as little as 6 hours for an additional fee."
    },
    {
      question: "What makes your content SEO-optimized?",
      answer: "Every piece includes comprehensive keyword research, proper header structure, meta descriptions, internal linking opportunities, and is written to match search intent. We use advanced SEO tools to ensure maximum search visibility."
    },
    {
      question: "Can I request revisions?",
      answer: "Absolutely! We offer unlimited revisions until you're completely satisfied. Our goal is to deliver content that exceeds your expectations and drives real results for your business."
    },
    {
      question: "Do you guarantee results?",
      answer: "Yes! We offer a 100% money-back guarantee. If you're not satisfied with our work within the first 30 days, we'll refund your entire payment. We're confident in the quality of our content."
    },
    {
      question: "What industries do you specialize in?",
      answer: "We focus specifically on SaaS and eCommerce businesses. Our writers have deep expertise in these industries and understand the unique challenges and opportunities in B2B and B2C marketing."
    },
    {
      question: "How do I get started?",
      answer: "Simply choose your subscription plan, provide your content requirements, and we'll assign a dedicated account manager to your project. You'll receive your first piece of content within 24 hours."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time with no penalties or hidden fees. You'll continue to receive service through the end of your current billing period."
    },
    {
      question: "Do you offer custom packages?",
      answer: "Yes! For enterprise clients or businesses with unique needs, we offer custom packages. Contact our sales team to discuss your specific requirements and get a tailored quote."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our content services and how we can help grow your business.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 py-2 shadow-card hover:shadow-elegant transition-smooth"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a 
            href="mailto:support@aicontentag.com" 
            className="text-primary hover:text-primary-dark font-semibold transition-smooth"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;