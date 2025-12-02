'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function LandingCTA() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 sm:px-12 sm:py-20 lg:px-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            {/* ARCS Formula */}
            {/* Ask */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Ready to finally organize your thoughts?
            </h2>
            
            {/* Reveal */}
            <p className="text-lg sm:text-xl text-primary-foreground/80 mb-4">
              No more lost ideas or scattered notes.
            </p>
            
            {/* Call */}
            <p className="text-lg text-primary-foreground/80 mb-8">
              Notist keeps everything in one place — accessible anywhere, anytime.
            </p>

            {/* Send (CTA) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                asChild 
                className="text-base px-8 h-12 font-semibold"
              >
                <Link href="/auth">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="text-sm text-primary-foreground/60 mt-6">
              Free forever • No credit card required • Set up in 30 seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
