'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const benefits = [
  { text: 'Structured notes, clear outcomes', type: 'Thinkers' },
  { text: 'Finally stay on top of everything', type: 'Harmonizers' },
  { text: 'One click to capture, instant organization', type: 'Promoters' },
  { text: 'Quality notes you can trust', type: 'Persisters' },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            Free forever. No credit card required.
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            Capture Ideas.{' '}
            <span className="text-primary">Organize Thoughts.</span>{' '}
            Get Things Done.
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-500 delay-200">
            The note-taking app that works the way your mind does. 
            Rich text editing, real-time sync, and offline support — all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-in fade-in slide-in-from-bottom-6 duration-500 delay-300">
            <Button size="lg" asChild className="text-base px-8 h-12">
              <Link href="/auth">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 h-12">
              <Link href="#how-it-works">
                See How It Works
              </Link>
            </Button>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-7 duration-500 delay-400">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* App Preview */}
        <div className="mt-16 relative animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="relative mx-auto max-w-5xl">
            <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-green-500/60" />
                </div>
                <div className="flex-1 text-center text-sm text-muted-foreground">
                  Notist - Your Notes
                </div>
              </div>
              <div className="p-6 sm:p-8 min-h-[300px] bg-gradient-to-br from-card to-muted/20">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Sample Note Cards */}
                  <div className="p-4 rounded-lg bg-background border shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">Work</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Project Ideas</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Brainstorm session notes from today's meeting...
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">Personal</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Book Notes</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Key takeaways from Atomic Habits...
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-background border shadow-sm hidden sm:block">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">Tasks</Badge>
                    </div>
                    <h3 className="font-medium mb-1">Weekly Goals</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      Complete the landing page design...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
