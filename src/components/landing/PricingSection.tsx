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
    <section id="pricing" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Everything you need,{' '}
            <span className="text-primary">forever free</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            You get all the features without paying a dime. No catches, no upgrades, no limits.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <Card className="relative overflow-hidden border border-primary/20 bg-background/50 backdrop-blur-xl shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-1 ring-1 ring-white/10">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0">
              <Badge className="rounded-none rounded-bl-xl px-4 py-1.5 bg-primary text-primary-foreground font-medium text-sm border-none">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                100% Free
              </Badge>
            </div>

            <CardHeader className="text-center pb-8 pt-10 border-b border-border/50 bg-muted/20">
              <CardTitle className="text-3xl font-bold">Free Plan</CardTitle>
              <div className="mt-6 flex items-baseline justify-center gap-1">
                <span className="text-6xl font-extrabold tracking-tight">$0</span>
                <span className="text-xl text-muted-foreground font-medium">/forever</span>
              </div>
              <p className="text-sm font-medium text-primary/80 mt-4 px-3 py-1 rounded-full bg-primary/10 inline-block mx-auto">
                No credit card required
              </p>
            </CardHeader>

            <CardContent className="pt-10 pb-10 px-8 sm:px-12">
              {/* Features List */}
              <ul className="space-y-4 mb-10">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-muted-foreground font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button size="lg" className="w-full text-base h-14 rounded-full shadow-lg hover:shadow-primary/25 font-semibold" asChild>
                <Link href="/auth">
                  Start Taking Notes — It's Always Free
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
