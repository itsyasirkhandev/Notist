'use client';

import { UserPlus, PenTool, Globe } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Sign up in seconds',
    description: 'Create your free account with Google or email. No credit card required.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Start writing',
    description: 'Use our rich text editor with formatting, tags, and task lists.',
  },
  {
    number: '03',
    icon: Globe,
    title: 'Access anywhere',
    description: 'Your notes sync automatically across all your devices in real-time.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Get started in{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              3 simple steps
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From zero to organized in under a minute. No complicated setup required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Desktop Connector Line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="text-center flex flex-col items-center">
                {/* Step Number & Icon */}
                <div className="relative mb-8">
                  <div className="w-24 h-24 rounded-3xl bg-background border-2 border-primary/10 shadow-xl shadow-primary/5 flex items-center justify-center group-hover:border-primary/30 group-hover:scale-110 transition-all duration-500 z-10 relative">
                    <step.icon className="h-10 w-10 text-primary/80 group-hover:text-primary transition-colors" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-lg ring-4 ring-background z-20">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
