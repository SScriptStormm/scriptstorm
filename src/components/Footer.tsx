import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        {/* CTA Section */}
        <div className="text-center mb-12 pb-12 border-b border-white/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Scale Your Content Marketing?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful brands. Get premium content that converts. 
            Start your 7-day free trial today.
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-lg px-8 py-4 h-auto"
          >
            Start Free Trial
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
              <li><a href="#" className="hover:text-white transition-smooth">SEO Blog Articles</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Social Media Content</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Email Copy</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Content Strategy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Our Process</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-smooth">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-smooth">Privacy Policy</a></li>
              <li><Link to="/terms-and-conditions" className="hover:text-white transition-smooth">Terms of Service</Link></li>
              <li><a href="#" className="hover:text-white transition-smooth">Refund Policy</a></li>
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
            © 2024 ScriptStorm. All rights reserved.
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