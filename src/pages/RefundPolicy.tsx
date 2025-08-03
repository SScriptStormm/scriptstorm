const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-glow py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Refund Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">30-Day Money-Back Guarantee</h2>
            <p className="mb-4">
              We offer a 30-day money-back guarantee on all our services. If you're not completely 
              satisfied with your purchase, you can request a full refund within 30 days of your order.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Refund Eligibility</h2>
            <p className="mb-4">To be eligible for a refund, you must:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Request the refund within 30 days of purchase</li>
              <li>Provide a valid reason for the refund request</li>
              <li>Have made a good faith effort to work with our team to resolve any issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How to Request a Refund</h2>
            <p className="mb-4">
              To request a refund, please contact our support team with your order details 
              and reason for the refund request. We will review your request within 2-3 business days.
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
              If work has already been completed on your project, we may offer a partial refund 
              based on the amount of work completed and delivered.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Non-Refundable Items</h2>
            <p className="mb-4">
              The following items are non-refundable:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Third-party costs (hosting, domains, licenses)</li>
              <li>Work completed and delivered beyond the refund period</li>
              <li>Custom work that has been fully delivered and approved</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our refund policy or need to request a refund, 
              please contact us at:
            </p>
            <p className="mb-2">Email: refunds@scriptstorm.com</p>
            <p className="mb-2">Phone: (555) 123-4567</p>
            <p className="mb-2">Address: 123 Business Ave, Suite 100, City, State 12345</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;