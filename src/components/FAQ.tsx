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
    <section className="py-20 bg-gradient-dark relative overflow-hidden">
      {/* AI Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-25" />
      <div className="absolute top-16 right-16 w-24 h-24 border border-primary-glow/20 rotate-45 animate-float" />
      <div className="absolute bottom-16 left-16 w-20 h-20 border border-primary-glow/15 rotate-12 animate-float" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white font-mono tracking-wider">
            <span className="bg-gradient-cyber bg-clip-text text-transparent">FREQUENTLY</span> ASKED{" "}
            <span className="text-primary-glow animate-pulse-glow">QUESTIONS</span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-mono tracking-wide">
            &gt; EVERYTHING YOU NEED TO KNOW ABOUT OUR CONTENT SERVICES_
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-neural opacity-20 rounded-lg blur-sm group-hover:opacity-40 transition-all duration-500" />
                <AccordionItem 
                  value={`item-${index}`}
                  className="relative bg-black/40 backdrop-blur-md border-2 border-primary-glow/30 hover:border-primary-glow/60 rounded-lg px-6 py-2 shadow-neural hover:shadow-hologram transition-all duration-500 animate-hologram-flicker"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary-glow text-white font-mono tracking-wide">
                    [ {faq.question.toUpperCase()} ]
                  </AccordionTrigger>
                  <AccordionContent className="text-white/80 leading-relaxed pt-2 font-mono text-sm">
                    &gt; {faq.answer}_
                  </AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-white/70 mb-4 font-mono tracking-wide">[ STILL HAVE QUESTIONS? ]</p>
          <div className="relative group inline-block">
            <div className="absolute inset-0 bg-gradient-cyber opacity-30 rounded-lg blur-sm group-hover:opacity-50 transition-all duration-300" />
            <a 
              href="mailto:support@aicontentag.com" 
              className="relative text-primary-glow hover:text-white font-semibold transition-all duration-300 font-mono tracking-wide px-6 py-3 bg-black/30 backdrop-blur-md border border-primary-glow/40 rounded-lg shadow-neural hover:shadow-hologram hover:border-primary-glow/70 inline-block"
            >
              &gt; CONTACT OUR SUPPORT TEAM_
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;