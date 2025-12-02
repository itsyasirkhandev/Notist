'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';

const features = [
  'Unlimited notes',
  'Full rich-text editing',
  'Real-time sync across devices',
  'Offline support',
  'Tags & organization',
  'Task lists & checkboxes',
  'Dark & light themes',
  'Secure cloud storage',
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple pricing.{' '}
            <span className="text-primary">Free forever.</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No hidden fees. No premium tiers. Just a great note-taking experience.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <Card className="relative overflow-hidden border-2 border-primary/20 shadow-xl">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0">
              <Badge className="rounded-none rounded-bl-lg px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                100% Free
              </Badge>
            </div>

            <CardHeader className="text-center pb-4 pt-8">
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <div className="mt-4">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground ml-2">/forever</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                No credit card required
              </p>
            </CardHeader>

            <CardContent className="pt-4 pb-8">
              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button size="lg" className="w-full text-base h-12" asChild>
                <Link href="/auth">
                  Start Taking Notes — It's Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
