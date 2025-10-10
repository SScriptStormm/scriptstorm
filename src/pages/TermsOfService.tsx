const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with AI Background */}
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

        <div className="relative z-10 container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using ScriptStorm's services, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
            <p>
              ScriptStorm provides AI-powered content generation services through monthly subscriptions, delivering 
              SEO articles, social media posts, and product descriptions optimized for SaaS and eCommerce businesses. 
              Each subscription includes 24-hour orchestrated delivery and AI-assisted revisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Responsibilities</h2>
            <p>Users are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing accurate and complete information when placing orders</li>
              <li>Ensuring content requirements are clearly communicated</li>
              <li>Reviewing and approving delivered content within the specified timeframe</li>
              <li>Making timely payments for services rendered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Payment Terms</h2>
            <p>
              Payment is processed monthly for subscription plans. We accept major credit cards and process 
              payments through secure payment processors. All prices are in USD. Monthly subscriptions renew 
              automatically unless cancelled before the next billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Delivery and Revisions</h2>
            <p>
              Content is delivered within 24 hours through our orchestrated AI workflow. Each subscription plan 
              includes specific revision rounds: Starter (1), Growth (2), Scale (2), Authority (3), Dominance (unlimited with Fair Use). 
              Revisions are completed within 24 hours of request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Intellectual Property</h2>
            <p>
              Upon full payment, clients receive full ownership and rights to the delivered content. 
              ScriptStorm retains the right to showcase work samples for portfolio purposes unless 
              otherwise agreed upon.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Refund Policy</h2>
            <p>
              Refunds may be issued if we fail to deliver content within the promised timeframe or 
              if the delivered content significantly deviates from the agreed specifications. 
              Refund requests must be made within 14 days of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Limitation of Liability</h2>
            <p>
              ScriptStorm's liability is limited to the amount paid for the specific service. 
              We are not liable for any indirect, incidental, or consequential damages arising 
              from the use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Privacy Policy</h2>
            <p>
              We respect your privacy and are committed to protecting your personal information. 
              We will not share, sell, or distribute your personal information to third parties 
              without your consent, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Modifications to Terms</h2>
            <p>
              ScriptStorm reserves the right to modify these terms at any time. Users will be 
              notified of significant changes via email or through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">11. Contact Information</h2>
            <p>
              For questions regarding these Terms of Service, please contact us at hello@scriptstorm.org
            </p>
          </section>

          <div className="text-sm text-muted-foreground mt-12 pt-8 border-t">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;