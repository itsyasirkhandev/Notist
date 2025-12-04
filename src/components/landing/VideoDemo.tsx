'use client';

import { Play, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <section id="demo" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Volume2 className="h-3.5 w-3.5" />
            <span>See it in action</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Watch how you'll{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              organize your thoughts
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            See how Notist turns your scattered ideas into organized notes you can actually find. This 2-minute demo shows you everything you need to know.
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-black aspect-video">
            {!isPlaying ? (
              <>
                {/* YouTube Thumbnail */}
                <img
                  src="https://img.youtube.com/vi/6JB2v4oabrk/maxresdefault.jpg"
                  alt="Notist Demo Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={handlePlayVideo}
                    className="w-20 h-20 rounded-full bg-primary/90 hover:bg-primary transition-all duration-300 hover:scale-110 shadow-2xl group"
                  >
                    <Play className="h-8 w-8 text-primary-foreground group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                </div>

                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-3 text-white">
                    <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                      <span>2:19</span>
                    </div>
                    <h3 className="text-lg font-semibold">Getting started with notist</h3>
                  </div>
                  <p className="text-white/80 text-sm mt-2">Watch how you'll go from scattered to organized in minutes</p>
                </div>
              </>
            ) : (
              /* YouTube Embed */
              <iframe
                src="https://www.youtube.com/embed/6JB2v4oabrk?autoplay=1&rel=0&showinfo=0"
                title="Notist Demo Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>

          {/* Key Features Highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="text-center p-6 rounded-xl bg-muted/30 border border-border/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Start in 30 seconds</h4>
              <p className="text-sm text-muted-foreground">See how fast you can create your first note</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-muted/30 border border-border/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Rich text editing</h4>
              <p className="text-sm text-muted-foreground">Format your notes beautifully with ease</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-muted/30 border border-border/20">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Find anything instantly</h4>
              <p className="text-sm text-muted-foreground">Watch the search feature in action</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
