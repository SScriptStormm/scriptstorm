
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Award, Shield, Users, Target, Zap, Star, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const WhyChooseUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-primary-glow/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary font-mono">
              ScriptStorm
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/why-choose-us" className="text-primary font-medium">
                Why Choose Us
              </Link>
              <Link to="/onboarding-process" className="text-muted-foreground hover:text-primary transition-colors">
                Our Process
              </Link>
              <Link to="/#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* AI Neural Network Background */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-25" />
        <div className="absolute inset-0 bg-gradient-neural animate-neural-pulse opacity-15" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-glow) / 0.1) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-primary-glow/25 rotate-45 animate-float shadow-cyber" />
        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-primary-glow/20 rotate-12 animate-float shadow-cyber" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 border-2 border-primary-glow/30 rotate-45 animate-float shadow-cyber" style={{ animationDelay: '4s' }} />
        
        {/* Scanning line effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 h-px w-full bg-gradient-neural animate-scan-line opacity-30" />
          <div className="absolute bottom-0 h-px w-full bg-gradient-cyber animate-scan-line opacity-25" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground font-mono tracking-wide">
            Why Choose <span className="text-primary">ScriptStorm</span>?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            While others offer tools that require your time and expertise, we deliver 
            professional AI-generated content that drives results—without any effort on your part.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-15" />
        <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-25" style={{ animationDelay: '1s' }} />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-primary-glow rounded-full animate-ping opacity-30" style={{ animationDelay: '3s' }} />
        
        {/* Unified Full-Width Dotted Background for Both Comparison Charts */}
        <div className="absolute left-0 right-0 top-0 bottom-[280px] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,hsl(var(--primary-glow)/0.03)_2px,hsl(var(--primary-glow)/0.03)_4px)] pointer-events-none" />
        <div className="absolute left-0 right-0 top-0 bottom-[280px] bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,hsl(var(--primary-glow)/0.03)_2px,hsl(var(--primary-glow)/0.03)_4px)] pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* ScriptStorm vs Generic AI Comparison */}
          <div className="mb-20 relative">
            
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-mono relative">
              <span className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary-glow))] brightness-110" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>ScriptStorm</span> 
              <span className="text-muted-foreground mx-2">vs</span> 
              <span className="text-[#F39C12] drop-shadow-[0_0_20px_rgba(243,156,18,0.6)]" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>Generic AI Assistants</span>
              <div className="text-lg mt-2 text-muted-foreground/90">(e.g., ChatGPT)</div>
            </h2>
            
            <Card className="max-w-6xl mx-auto border-2 border-primary/70 bg-gradient-to-br from-black/5 via-primary/5 to-black/10 backdrop-blur-md shadow-[0_0_50px_-10px_hsl(var(--primary-glow)/0.5),inset_0_0_30px_-10px_hsl(var(--primary-glow)/0.1)] hover:shadow-[0_0_70px_-10px_hsl(var(--primary-glow)/0.7),inset_0_0_40px_-10px_hsl(var(--primary-glow)/0.2)] transition-all duration-500 relative overflow-hidden">
              {/* Animated circuit lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-primary opacity-60" />
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary opacity-60" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary opacity-60" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-primary opacity-60" />
              
              <CardContent className="p-8 overflow-x-auto relative z-10">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-primary/50 hover:bg-transparent">
                      <TableHead className="font-bold text-foreground text-lg w-1/4 py-6 font-mono">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          Feature
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-[#F39C12] text-lg w-3/8 text-center py-6 font-mono">
                        <div className="drop-shadow-[0_0_15px_rgba(243,156,18,0.5)] border-b-2 border-[#F39C12]/30 pb-2">
                          Generic AI Assistant
                          <div className="text-sm font-normal mt-1 opacity-80">(e.g., ChatGPT)</div>
                        </div>
                      </TableHead>
                      <TableHead className="font-bold text-primary text-lg w-3/8 text-center py-6 font-mono">
                        <div className="drop-shadow-[0_0_15px_hsl(var(--primary-glow)/0.7)] border-b-2 border-primary/40 pb-2">
                          ScriptStorm
                          <div className="text-sm font-normal mt-1 opacity-80">(AI-Powered Solution)</div>
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-primary/10 transition-all duration-300 border-b border-primary/20 group">
                      <TableCell className="font-semibold text-base py-6 font-mono relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                        <span className="ml-2">Result</span>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-4 px-4">
                          <X className="h-10 w-10 text-[#E74C3C] drop-shadow-[0_0_15px_rgba(231,76,60,0.8)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm text-left">A generic text draft that requires heavy editing</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 bg-primary/5">
                        <div className="flex items-center gap-4 px-4">
                          <CheckCircle className="h-10 w-10 text-[#2ECC71] drop-shadow-[0_0_20px_rgba(46,204,113,0.9)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm font-medium text-left">A finished, polished, and published-ready piece of content</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="hover:bg-primary/10 transition-all duration-300 border-b border-primary/20 group">
                      <TableCell className="font-semibold text-base py-6 font-mono relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                        <span className="ml-2">Process</span>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-4 px-4">
                          <X className="h-10 w-10 text-[#E74C3C] drop-shadow-[0_0_15px_rgba(231,76,60,0.8)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm text-left">Manual. You write prompts, edit, fact-check, and optimize</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 bg-primary/5">
                        <div className="flex items-center gap-4 px-4">
                          <CheckCircle className="h-10 w-10 text-[#2ECC71] drop-shadow-[0_0_20px_rgba(46,204,113,0.9)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm font-medium text-left">Fully automated. You submit a brief; we deliver the final product</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="hover:bg-primary/10 transition-all duration-300 border-b border-primary/20 group">
                      <TableCell className="font-semibold text-base py-6 font-mono relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                        <span className="ml-2">Time Investment</span>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-4 px-4">
                          <X className="h-10 w-10 text-[#E74C3C] drop-shadow-[0_0_15px_rgba(231,76,60,0.8)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm text-left">1-2 hours per piece (your time + AI's time)</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 bg-primary/5">
                        <div className="flex items-center gap-4 px-4">
                          <CheckCircle className="h-10 w-10 text-[#2ECC71] drop-shadow-[0_0_20px_rgba(46,204,113,0.9)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm font-medium text-left">Just 5 minutes to submit a brief</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="hover:bg-primary/10 transition-all duration-300 border-b border-primary/20 group">
                      <TableCell className="font-semibold text-base py-6 font-mono relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                        <span className="ml-2">Required Expertise</span>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-4 px-4">
                          <X className="h-10 w-10 text-[#E74C3C] drop-shadow-[0_0_15px_rgba(231,76,60,0.8)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm text-left">Needs prompt engineering, SEO, and editing skills</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 bg-primary/5">
                        <div className="flex items-center gap-4 px-4">
                          <CheckCircle className="h-10 w-10 text-[#2ECC71] drop-shadow-[0_0_20px_rgba(46,204,113,0.9)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm font-medium text-left">Zero expertise needed. Our system handles everything</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="hover:bg-primary/10 transition-all duration-300 border-b border-primary/20 group">
                      <TableCell className="font-semibold text-base py-6 font-mono relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                        <span className="ml-2">Quality Control</span>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-4 px-4">
                          <X className="h-10 w-10 text-[#E74C3C] drop-shadow-[0_0_15px_rgba(231,76,60,0.8)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm text-left">None. You are responsible for final checks</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 bg-primary/5">
                        <div className="flex items-center gap-4 px-4">
                          <CheckCircle className="h-10 w-10 text-[#2ECC71] drop-shadow-[0_0_20px_rgba(46,204,113,0.9)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm font-medium text-left">Built-in verification for plagiarism, AI-detection, and SEO</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="hover:bg-primary/10 transition-all duration-300 group">
                      <TableCell className="font-semibold text-base py-6 font-mono relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover:h-full transition-all duration-300" />
                        <span className="ml-2">Consistency</span>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-4 px-4">
                          <X className="h-10 w-10 text-[#E74C3C] drop-shadow-[0_0_15px_rgba(231,76,60,0.8)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm text-left">Unpredictable. Varies with every prompt</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 bg-primary/5">
                        <div className="flex items-center gap-4 px-4">
                          <CheckCircle className="h-10 w-10 text-[#2ECC71] drop-shadow-[0_0_20px_rgba(46,204,113,0.9)] flex-shrink-0" strokeWidth={3.5} />
                          <span className="text-sm font-medium text-left">Reliably high-quality every time</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Section */}
          <div className="mb-20 relative">
            
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 font-mono relative">
              <span className="text-primary drop-shadow-[0_0_30px_hsl(var(--primary-glow))] brightness-110" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>ScriptStorm</span> 
              <span className="text-muted-foreground mx-2">vs</span> 
              <span className="text-[#E74C3C] drop-shadow-[0_0_20px_rgba(231,76,60,0.6)]" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>The Old Way</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* The Old Way */}
              <Card className="border-2 border-[#E74C3C]/70 bg-gradient-to-br from-black/5 via-[#E74C3C]/5 to-black/10 backdrop-blur-md shadow-[0_0_50px_-10px_rgba(231,76,60,0.5),inset_0_0_30px_-10px_rgba(231,76,60,0.1)] hover:shadow-[0_0_70px_-10px_rgba(231,76,60,0.7),inset_0_0_40px_-10px_rgba(231,76,60,0.2)] transition-all duration-500 relative overflow-hidden">
                {/* Animated circuit lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E74C3C] to-transparent opacity-50 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E74C3C] to-transparent opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#E74C3C] opacity-60" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#E74C3C] opacity-60" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#E74C3C] opacity-60" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#E74C3C] opacity-60" />
                
                <CardHeader className="text-center relative z-10">
                  <CardTitle className="text-2xl text-[#E74C3C] font-mono drop-shadow-[0_0_15px_rgba(231,76,60,0.5)]">
                    ❌ The Old Way (Freelancers, Agencies, or In-House)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <span className="text-[#E74C3C] mt-1 drop-shadow-[0_0_10px_rgba(231,76,60,0.7)]">•</span>
                      <span className="text-sm"><strong>Slow:</strong> Weeks of back-and-forth revisions</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <span className="text-[#E74C3C] mt-1 drop-shadow-[0_0_10px_rgba(231,76,60,0.7)]">•</span>
                      <span className="text-sm"><strong>Expensive:</strong> $100-$500/article for quality</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <span className="text-[#E74C3C] mt-1 drop-shadow-[0_0_10px_rgba(231,76,60,0.7)]">•</span>
                      <span className="text-sm"><strong>Unpredictable:</strong> Varies by writer's skill</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <span className="text-[#E74C3C] mt-1 drop-shadow-[0_0_10px_rgba(231,76,60,0.7)]">•</span>
                      <span className="text-sm"><strong>Hard to Scale:</strong> Need to hire more writers = more $$$</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <span className="text-[#E74C3C] mt-1 drop-shadow-[0_0_10px_rgba(231,76,60,0.7)]">•</span>
                      <span className="text-sm">Endless project management and coordination</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <span className="text-[#E74C3C] mt-1 drop-shadow-[0_0_10px_rgba(231,76,60,0.7)]">•</span>
                      <span className="text-sm">No guarantees on delivery times or quality</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ScriptStorm */}
              <Card className="border-2 border-[#2ECC71]/70 bg-gradient-to-br from-black/5 via-[#2ECC71]/5 to-black/10 backdrop-blur-md shadow-[0_0_50px_-10px_rgba(46,204,113,0.5),inset_0_0_30px_-10px_rgba(46,204,113,0.1)] hover:shadow-[0_0_70px_-10px_rgba(46,204,113,0.7),inset_0_0_40px_-10px_rgba(46,204,113,0.2)] transition-all duration-500 relative overflow-hidden">
                {/* Animated circuit lines */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent opacity-50 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#2ECC71] opacity-60" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-[#2ECC71] opacity-60" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-[#2ECC71] opacity-60" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#2ECC71] opacity-60" />
                
                <CardHeader className="text-center relative z-10">
                  <CardTitle className="text-2xl text-[#2ECC71] font-mono drop-shadow-[0_0_15px_rgba(46,204,113,0.6)]">
                    ✅ ScriptStorm
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-6 w-6 text-[#2ECC71] mt-0.5 drop-shadow-[0_0_15px_rgba(46,204,113,0.8)] flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm">Professional AI content delivered in 24 hours</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-6 w-6 text-[#2ECC71] mt-0.5 drop-shadow-[0_0_15px_rgba(46,204,113,0.8)] flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm">AI-generated, engaging, conversion-focused</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-6 w-6 text-[#2ECC71] mt-0.5 drop-shadow-[0_0_15px_rgba(46,204,113,0.8)] flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm">Full SEO optimization and keyword research included</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-6 w-6 text-[#2ECC71] mt-0.5 drop-shadow-[0_0_15px_rgba(46,204,113,0.8)] flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm">Transparent monthly subscriptions, starting at $297</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-6 w-6 text-[#2ECC71] mt-0.5 drop-shadow-[0_0_15px_rgba(46,204,113,0.8)] flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm">Zero effort required from you</span>
                    </div>
                    <div className="flex items-start gap-3 group hover:translate-x-1 transition-transform duration-200">
                      <CheckCircle className="h-6 w-6 text-[#2ECC71] mt-0.5 drop-shadow-[0_0_15px_rgba(46,204,113,0.8)] flex-shrink-0" strokeWidth={3} />
                      <span className="text-sm">AI-assisted revisions included (1-3 rounds per package)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Key Advantages */}
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-mono">
              Our Key <span className="text-[#3498DB]">Advantages</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="relative text-center p-6 border-2 border-[#3498DB]/40 hover:border-[#3498DB]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Clock className="h-12 w-12 text-[#3498DB] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Lightning Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Get professional AI content in 24 hours, not 24 days. We understand that time is money in business.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#2ECC71]/40 hover:border-[#2ECC71]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Award className="h-12 w-12 text-[#2ECC71] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">AI Automation Expert</h3>
                <p className="text-muted-foreground">
                  Advanced AI automation systems specialized in SaaS and eCommerce content, with proven track records of driving conversions.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#9B59B6]/40 hover:border-[#9B59B6]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Shield className="h-12 w-12 text-[#9B59B6] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Risk-Free Guarantee</h3>
                <p className="text-muted-foreground">
                  Not satisfied? We'll revise until you're happy or provide a full refund. Your success is our priority.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#E67E22]/40 hover:border-[#E67E22]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Users className="h-12 w-12 text-[#E67E22] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Email-Only Workflow</h3>
                <p className="text-muted-foreground">
                  Streamlined email communication. No meetings, no delays—just efficient content delivery through your portal.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#E74C3C]/40 hover:border-[#E74C3C]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Target className="h-12 w-12 text-[#E74C3C] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Results-Driven</h3>
                <p className="text-muted-foreground">
                  Every AI-generated piece is crafted to drive traffic, engage readers, and convert visitors into customers.
                </p>
              </Card>

              <Card className="relative text-center p-6 border-2 border-[#3498DB]/40 hover:border-[#3498DB]/70 bg-white/95 backdrop-blur-sm transition-all duration-500 shadow-neural hover:shadow-cyber">
                <Zap className="h-12 w-12 text-[#3498DB] mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Complete SEO Package</h3>
                <p className="text-muted-foreground">
                  Keyword research, meta tags, headers, internal linking—everything needed for search engine success.
                </p>
              </Card>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mb-20">
            <Card className="relative max-w-4xl mx-auto p-8 bg-gradient-to-r from-[#3498DB]/10 to-[#2ECC71]/10 border-2 border-[#3498DB]/40 shadow-hologram">
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-[#3498DB]/30 rotate-45" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-[#2ECC71]/30 rotate-45" />
              
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-[#F39C12] fill-current" />
                ))}
              </div>
              <blockquote className="text-xl italic text-center mb-6 font-medium">
                "ScriptStorm's approach to AI content automation represents the future of content marketing. 
                Their friction-free email workflow eliminates the typical delays and complexity of traditional content agencies."
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-lg">Coming Soon</p>
                <p className="text-muted-foreground">Real client testimonials after launch</p>
              </div>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center relative">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-cyber opacity-10 rounded-3xl" />
            <div className="relative z-10 py-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-mono">
                Ready to See the <span className="text-[#3498DB]">Difference</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Stop wasting time with DIY tools. Get professional AI content that actually converts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#pricing">
                  <Button size="lg" className="bg-[#3498DB] hover:bg-[#2980B9] text-white px-8 py-4 shadow-cyber hover:shadow-hologram transition-all duration-300">
                    Start your First Draft
                  </Button>
                </Link>
                <Link to="/onboarding-process">
                  <Button variant="outline" size="lg" className="px-8 py-4 border-[#3498DB]/50 hover:border-[#3498DB] hover:shadow-neural transition-all duration-300">
                    Learn Our Process
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
