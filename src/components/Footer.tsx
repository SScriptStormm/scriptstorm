import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="text-center mb-12 pb-12 border-b border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Content Marketing?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Stop the endless wait for quality content. Get premium, AI-powered content that converts—delivered in 24 hours.
            Start Your First Draft
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-lg px-8 py-4 h-auto"
          >
            🚀 Start My 24-Hour Draft
          </Button>
        </div>

        {/* Footer Links */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ScriptStorm</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Premium content marketing services for SaaS and eCommerce brands. 
              Delivered fast, optimized for SEO, guaranteed to convert.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="/#services" className="hover:text-white transition-smooth">SEO Blog Articles</a></li>
              <li><a href="/#services" className="hover:text-white transition-smooth">Social Media Content</a></li>
              <li><a href="/#services" className="hover:text-white transition-smooth">Email Copy</a></li>
              <li><a href="/#services" className="hover:text-white transition-smooth">Content Strategy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/about-us" className="hover:text-white transition-smooth">About Us</Link></li>
              <li><Link to="/onboarding-process" className="hover:text-white transition-smooth">Our Process</Link></li>
              <li><a href="#" className="hover:text-white transition-smooth">Case Studies</a></li>
              <li><Link to="/contact" className="hover:text-white transition-smooth">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/help-center" className="hover:text-white transition-smooth">Help Center</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-smooth">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-white transition-smooth">Terms of Service</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white transition-smooth">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center py-6 border-t border-white/20">
          <p className="text-white/60 text-sm italic">
            * Limited to 20 clients/month for 24-hr delivery
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2025 ScriptStorm. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-smooth">
              LinkedIn
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-smooth">
              Twitter
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-smooth">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;