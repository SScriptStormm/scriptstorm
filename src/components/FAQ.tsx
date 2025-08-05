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
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-radial from-primary/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/10 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block p-1 rounded-full bg-gradient-primary mb-6">
            <div className="bg-background rounded-full px-6 py-2">
              <span className="text-sm font-medium text-primary">Knowledge Base</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our content services and how we can help grow your business.
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="mx-4 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="group relative border-0 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow hover:bg-card/80"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-[1px]">
                  <div className="bg-background rounded-2xl h-full w-full"></div>
                </div>
                
                <div className="relative z-10 px-8 py-6">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary text-lg group-hover:text-primary transition-colors duration-300 [&>svg]:text-primary">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-background font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="flex-1">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-4 ml-12 text-base">
                    {faq.answer}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-16">
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-border/50">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-muted-foreground mb-4 font-medium">Still have questions?</p>
            <a 
              href="mailto:support@aicontentag.com" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-smooth group"
            >
              Contact our support team 
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;