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
    <section id="features" className="py-20 sm:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to{' '}
            <span className="text-primary">think clearly</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features that help you capture, organize, and find your ideas — 
            without getting in the way.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border-0 shadow-lg bg-card hover:shadow-xl transition-shadow duration-300"
            >
              <CardContent className="p-6 sm:p-8">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-6">{feature.description}</p>

                {/* Feature Items */}
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 rounded-md bg-secondary/50 flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-primary" />
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
