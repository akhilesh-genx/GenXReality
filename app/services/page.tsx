'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { MobileMockup } from '@/components/ui/MobileMockup';
import { Box, Mic, Layers, Smartphone, Sparkles, PhoneCall } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect for the hero banner
      gsap.to('.hero-banner-image', {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        y: '20%',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-[40vh] md:h-[80vh] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-black" />
        <div className="absolute inset-0 bg-black/40" />
        <Container className="relative z-10 w-full">
          <div className="max-w-4xl pt-4 md:pt-20">
            <h1 className="text-[clamp(2.2rem,8vw,6rem)] font-bold mb-2 md:mb-6 uppercase tracking-tighter leading-tight heading-gradient">
              Elevate Your <br />
              <span className="text-brand-primary">Business Reality</span>
            </h1>
          </div>
        </Container>
      </section>

      <div className="services-content pb-24">
        {/* Real Estate WebXR Overview Card */}
        <Section className="relative py-10 md:py-20 bg-transparent border-t border-white/5 overflow-hidden">
          <Container>
            <div className="fade-in-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border-white/10 group order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                  alt="3D WebXR Virtual Tour"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight heading-gradient">
                  3D Real Estate <br /><span className="text-brand-primary">Virtual Tours</span>
                </h2>
                <p className="text-lg md:text-xl text-white leading-relaxed font-light mb-10">
                  Transform simple property listings into fully interactive, photorealistic WebXR immersive experiences. Our technology runs instantly in the browser—no app downloads required. Give your clients the freedom to walk through properties from anywhere in the world.
                </p>
                <Button href="/services/3d-virtual-tours">
                  View More
                </Button>
              </div>
            </div>
          </Container>

          {/* Decorative background glow */}
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
        </Section>

        {/* AI Calling Agents Overview Card */}
        <Section className="relative py-10 md:py-20 bg-transparent border-t border-white/5 overflow-hidden">
          <Container>
            <div className="fade-in-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 uppercase tracking-tight heading-gradient">
                  Autonomous <br /><span className="text-brand-primary">AI Agents</span>
                </h2>
                <p className="text-lg md:text-xl text-white leading-relaxed font-light mb-10">
                  Scale your outreach and customer service instantly. Our voice-native AI agents can handle thousands of concurrent calls, book appointments, perform real estate lead generation, and provide 24/7 intelligent customer interactions with human-like latency.
                </p>
                <Button href="/services/ai-agents">
                  View More
                </Button>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border-white/10 group flex items-center justify-center bg-transparent">
                <Image
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
                  alt="AI Voice Agent Graphic"
                  fill
                  className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="relative z-10 w-full px-12 flex justify-center opacity-70 scale-y-125 transform transition-transform duration-[3000ms] group-hover:scale-y-150">
                  <div className="flex items-center justify-center h-20 gap-2 md:gap-3">
                    {[30, 60, 40, 90, 50, 25, 75, 45, 65, 35].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 md:w-2 rounded-full bg-brand-primary shadow-[0_0_15px_rgba(0,255,26,0.5)] animate-pulse"
                        style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Decorative background glow */}
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
        </Section>
      </div>
    </div>
  );
}
