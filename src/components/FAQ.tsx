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
      {/* Advanced futuristic background */}
      <div className="absolute inset-0">
        {/* Hexagonal grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-radial from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl animate-float" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-gradient-radial from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl animate-float" style={{animationDuration: '12s', animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-gradient-radial from-primary/6 to-transparent rounded-full blur-2xl animate-pulse-glow" style={{animationDuration: '6s'}}></div>
        
        {/* Geometric lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent"></div>
        
        {/* Circuit-like paths */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-primary/10 rotate-45 rounded-lg"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 border border-accent/10 rotate-12 rounded-lg"></div>
        
        {/* Concentric circles */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-[900px] h-[900px] border border-primary/5 rounded-full animate-neural-pulse" style={{animationDuration: '15s'}}></div>
          <div className="absolute inset-12 border border-accent/8 rounded-full animate-neural-pulse" style={{animationDuration: '20s', animationDelay: '3s'}}></div>
          <div className="absolute inset-24 border border-primary/6 rounded-full animate-neural-pulse" style={{animationDuration: '18s', animationDelay: '6s'}}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-primary/40 rounded-full animate-float" style={{animationDuration: '10s'}}></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-accent/60 rounded-full animate-float" style={{animationDuration: '14s', animationDelay: '4s'}}></div>
        <div className="absolute top-1/6 right-1/6 w-1.5 h-1.5 bg-primary/30 rounded-full animate-float" style={{animationDuration: '16s', animationDelay: '7s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block p-1 rounded-full bg-gradient-primary mb-6 shadow-glow">
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
          
          {/* Enhanced decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <div className="mx-4 w-3 h-3 bg-gradient-primary rounded-full animate-pulse-glow shadow-glow"></div>
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="group relative border border-primary/10 bg-card/40 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-glow hover:bg-card/60 hover:backdrop-blur-lg hover:border-primary/40"
              >
                {/* Circuit-like corner accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-primary/20 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-primary/20 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10 px-8 py-5">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary text-lg group-hover:text-primary transition-colors duration-300 [&>svg]:text-primary [&>svg]:group-hover:rotate-180 [&>svg]:transition-transform [&>svg]:duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-background font-bold text-sm shadow-lg group-hover:shadow-glow transition-shadow duration-300">
                        {index + 1}
                      </div>
                      <span className="flex-1">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-3 ml-12 text-base">
                    {faq.answer}
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <div className="relative bg-card/40 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto border border-primary/20 shadow-glow overflow-hidden group hover:bg-card/60 hover:border-primary/30 transition-all duration-300">
            {/* Background pattern for contact box */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-16 h-16 border border-primary/30 rotate-45 rounded-lg"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border border-accent/30 -rotate-12 rounded-lg"></div>
            </div>
            
            {/* Glowing corner accents */}
            <div className="absolute top-0 right-0 w-6 h-6 border-r border-t border-primary/40 rounded-tr-2xl group-hover:border-primary/60 transition-colors duration-300"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-l border-b border-primary/40 rounded-bl-2xl group-hover:border-primary/60 transition-colors duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow group-hover:shadow-elegant transition-shadow duration-300">
                <svg className="w-6 h-6 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-muted-foreground mb-4 font-medium">Still have questions?</p>
              <a 
                href="mailto:support@aicontentag.com" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-smooth group/link"
              >
                Contact our support team 
                <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;