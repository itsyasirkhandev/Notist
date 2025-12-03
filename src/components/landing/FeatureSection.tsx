'use client';

import { Card, CardContent } from '@/components/ui/card';
import { 
  Sparkles, 
  FolderSearch, 
  WifiOff, 
  Type, 
  Tags, 
  RefreshCw,
  GripVertical,
  Pin,
  Search,
  Cloud,
  Zap,
  Shield
} from 'lucide-react';

const features = [
  {
    title: 'Chaos → Clarity',
    description: 'Transform scattered thoughts into organized, beautiful notes.',
    icon: Sparkles,
    items: [
      { icon: Type, text: 'Rich text editing with formatting' },
      { icon: Tags, text: 'Tags & instant filtering' },
      { icon: RefreshCw, text: 'Real-time sync across devices' },
    ],
  },
  {
    title: 'Scattered → Organized',
    description: 'Find what you need, when you need it.',
    icon: FolderSearch,
    items: [
      { icon: GripVertical, text: 'Drag-and-drop reordering' },
      { icon: Pin, text: 'Pin important notes to top' },
      { icon: Search, text: 'Search everything instantly' },
    ],
  },
  {
    title: 'Offline → Always Available',
    description: 'Never lose a thought, even without internet.',
    icon: WifiOff,
    items: [
      { icon: Zap, text: 'Works without internet' },
      { icon: Cloud, text: 'Auto-sync when connected' },
      { icon: Shield, text: 'Your data, always safe' },
    ],
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Features</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Everything you need to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              think clearly
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Powerful features that help you capture, organize, and find your ideas — 
            without getting in the way.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden border bg-background/50 backdrop-blur-sm hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="p-8 relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">{feature.description}</p>

                {/* Feature Items */}
                <ul className="space-y-4">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3 text-sm font-medium text-muted-foreground/80">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
