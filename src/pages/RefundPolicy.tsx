const RefundPolicy = () => {
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

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Refund Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Satisfaction Guarantee</h2>
            <p className="mb-4">
              We stand behind our AI-powered content generation services with a satisfaction guarantee. 
              If we fail to deliver content that meets the agreed specifications or timeline within your subscription plan, 
              you may be eligible for a refund as outlined below.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Monthly Plan Refund Eligibility</h2>
            <p className="mb-4">Refunds may be considered in the following situations:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Content was not delivered within the agreed timeframe (except for force majeure events)</li>
              <li>Delivered content significantly deviates from the agreed project specifications</li>
              <li>Project cancellation before work has commenced (full refund)</li>
              <li>Mutual agreement to terminate the project after consultation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Annual Plan Refund Policy</h2>
            <p className="mb-4">
              Annual plans are eligible for a prorated refund, minus the value of any content already delivered, 
              within the first 30 days of the subscription. After 30 days, annual plans are non-refundable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
            <p className="mb-4">
              To request a refund, please contact our team within 14 days of content delivery 
              with your subscription details and specific concerns. We will work with you to resolve 
              any issues before processing refund requests, as we are committed to client satisfaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Processing Time</h2>
            <p className="mb-4">
              Once your refund is approved, it will be processed within 5-10 business days. 
              The refund will be credited to your original payment method.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Partial Work Completed</h2>
            <p className="mb-4">
              For subscriptions where content has been partially delivered, refunds will be calculated 
              based on the percentage of monthly content delivered and the value provided. We will work 
              with you to find a fair resolution that reflects the content completed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
            <p className="mb-4">
              The following situations are typically not eligible for refunds:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Change of mind after content has been delivered and approved</li>
              <li>Content that meets specifications but doesn't achieve desired business results</li>
              <li>Custom work that has been fully completed according to agreed specifications</li>
              <li>Projects where significant revisions have been provided and accepted</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our refund policy or need to request a refund, 
              please contact us at:
            </p>
            <p className="mb-2">Email: billing@scriptstorm.org</p>
          </section>
        </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;