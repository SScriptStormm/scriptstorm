const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
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
              ScriptStorm provides custom content creation services for businesses, delivering personalized 
              content solutions including blog posts, marketing copy, social media content, and email campaigns. 
              Each project is tailored to your specific brand requirements with professional consultation and 
              24-hour delivery commitment.
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
              Payment terms are established during project consultation and outlined in your custom quote. 
              Payment is typically required before work begins. We accept major credit cards and process 
              payments through secure payment processors. All prices are in USD unless otherwise specified.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Delivery and Revisions</h2>
            <p>
              Delivery timelines are specified during project consultation, with our standard commitment being 
              24-hour delivery for most content projects. Two rounds of minor revisions are included within 7 days 
              of delivery. Additional revisions or major changes may incur additional charges as outlined in your project agreement.
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
              For questions regarding these Terms of Service, please contact us at support@scriptstorm.com
            </p>
          </section>

          <div className="text-sm text-muted-foreground mt-12 pt-8 border-t">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;