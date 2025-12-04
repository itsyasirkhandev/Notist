'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, CheckCircle2, Star, Command, Search } from 'lucide-react';

const benefits = [
  { text: 'Structured notes, clear outcomes', type: 'Thinkers' },
  { text: 'Finally stay on top of everything', type: 'Harmonizers' },
  { text: 'One click to capture, instant organization', type: 'Promoters' },
  { text: 'Quality notes you can trust', type: 'Persisters' },
];

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-20">
      {/* Modern Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
          {/* Animated Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
            <Badge variant="outline" className="mb-8 px-4 py-1.5 text-sm border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors cursor-default">
              <Sparkles className="h-3.5 w-3.5 mr-2 fill-primary/20" />
              <span>Reimagined for modern thinkers</span>
            </Badge>
          </div>

          {/* Hero Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 leading-[1.1]">
            Your brain has <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-blue-600 animate-gradient-x">
              too many tabs open
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200 leading-relaxed">
            Finally, a place for YOUR ideas. We help you turn scattered thoughts into organized notes you can actually find when you need them.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mb-16 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300">
            <Button size="lg" asChild className="text-base px-8 h-12 rounded-full shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 transition-all duration-300">
              <Link href="/auth">
                Start organizing your thoughts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 h-12 rounded-full border-primary/20 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-300">
              <Link href="#demo">
                Watch the 2-min demo
              </Link>
            </Button>
          </div>

          {/* Social Proof / Benefits */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-7 duration-700 delay-400 border-t border-border/40 pt-8 w-full max-w-3xl">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-br from-primary/20 to-muted" />
                  </div>
                ))}
              </div>
              <span className="font-medium text-foreground">You'll join 1000+ organized thinkers</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/60 self-center" />
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span>You'll love the 4.9/5 rating</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border/60 self-center" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>You can start free, forever</span>
            </div>
          </div>
        </div>

        {/* Real App Preview */}
        <div className="mt-24 relative perspective-1000 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          {/* Glow effect behind preview */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />
          
          <div className="relative mx-auto max-w-6xl transform-gpu hover:scale-105 transition-transform duration-1000 ease-out">
            <div className="rounded-xl border border-white/10 bg-background/50 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10 dark:ring-white/5">
              {/* Browser Header */}
              <div className="bg-muted/80 px-4 py-3 border-b flex items-center justify-between backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 bg-background/50 px-3 py-1 rounded-md text-xs text-muted-foreground border border-white/5 min-w-[200px] justify-center">
                  <span className="opacity-50">notist.app/dashboard</span>
                </div>
                <div className="w-12" /> {/* Spacer */}
              </div>

              {/* Dashboard Screenshots */}
              <div className="relative">
                {/* Main Dashboard Image */}
                <img 
                  src="https://i.postimg.cc/KY2jFzrn/Notist-light-dashboard.png" 
                  alt="Notist Dashboard - Light Mode"
                  className="w-full h-auto"
                />
                
                {/* Note Editor Overlay */}
                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 w-1/3 min-w-[200px] hidden md:block">
                  <div className="relative group">
                    <img 
                      src="https://i.postimg.cc/6QXqw3LC/note-creation-editing-light.png" 
                      alt="Rich Text Editor"
                      className="w-full h-auto rounded-lg shadow-2xl border border-white/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                        Rich Text Editor
                      </div>
                    </div>
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
