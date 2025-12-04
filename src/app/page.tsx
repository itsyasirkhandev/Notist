'use client';

import {
  LandingNav,
  LandingHero,
  FeatureSection,
  VideoDemo,
  HowItWorks,
  PricingSection,
  LandingCTA,
  LandingFooter,
} from '@/components/landing';

export default function Home() {
  return (
    <div className="min-h-screen bg-background scroll-smooth">
      <LandingNav />
      <main>
        <LandingHero />
        <FeatureSection />
        <VideoDemo />
        <HowItWorks />
        <PricingSection />
        <LandingCTA />
      </main>
      <LandingFooter />
    </div>
  );
}
