'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function LandingCTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/80 dark:from-primary/90 dark:to-primary/70 px-6 py-20 sm:px-12 sm:py-24 lg:px-20 shadow-2xl border border-primary/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid-cta" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid-cta)" />
            </svg>
          </div>

          {/* Floating Shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

          <div className="relative text-center max-w-3xl mx-auto">
            {/* Ask */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 tracking-tight">
              Ready to finally organize your thoughts?
            </h2>
            
            {/* Call */}
            <p className="text-xl text-primary-foreground/90 mb-10 font-medium max-w-2xl mx-auto">
              Join thousands of thinkers who use Notist to capture ideas and get things done.
            </p>

            {/* Send (CTA) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                asChild 
                className="text-base px-8 h-14 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-background text-foreground hover:bg-background/90"
              >
                <Link href="/auth">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/70 mt-8 font-medium tracking-wide uppercase">
              Free forever • No credit card required • Set up in 30s
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
