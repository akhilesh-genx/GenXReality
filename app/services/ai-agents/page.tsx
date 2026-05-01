'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { Mic, PhoneCall, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function AiAgentsPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('section').forEach((sec: any) => {
        const texts = Array.from(sec.querySelectorAll('h2, h3, p, li')).filter((el: any) => !el.closest('.service-card-internal'));
        if (texts.length) {
          gsap.from(texts, {
            scrollTrigger: { trigger: sec, start: 'top 80%', toggleActions: 'play none none reverse' },
            x: -50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          });
        }
        
        const cards = Array.from(sec.querySelectorAll('.feature-card, .glass-card, .glass-panel')).filter((el: any) => !el.closest('.service-card-internal'));
        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none reverse' },
            x: -30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          });
        }

        const images = sec.querySelectorAll('img:not(.hero-bg)');
        if (images.length) {
          gsap.from(images, {
            scrollTrigger: { trigger: sec, start: 'top 70%', toggleActions: 'play none none reverse' },
            scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out',
          });
        }
      });

      gsap.to('.hero-bg', {
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
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black" />
        <div className="absolute inset-0 bg-black/50" />
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2rem,8vw,6rem)] font-bold mb-6 uppercase tracking-tight leading-tight heading-gradient pl-1">
              Autonomous <br />
              <span className="text-brand-primary">AI Agents</span>
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl font-light leading-relaxed mb-8">
              Scale your outreach and customer service with human-like, voice-native AI agents available 24/7.
            </p>
            <div className="flex items-center gap-6">
              <Button>
                Listen to Agent
              </Button>
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-6 bg-brand-primary/50 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
                <span className="text-brand-primary text-xs font-sans uppercase tracking-widest">Live Demo Available</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <div className="content-wrap">
        {/* Main Value Prop */}
        <Section className="py-24 border-t border-white/5 bg-transparent">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center fade-in-section">
              <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel border-white/10 flex items-center justify-center p-12">
                <div className="flex items-center justify-center h-32 gap-4 w-full">
                  {[30, 60, 40, 90, 100, 70, 85, 45, 60, 35].map((h, i) => (
                    <div
                      key={i}
                      className="w-3 rounded-full bg-brand-primary shadow-[0_0_30px_rgba(0,255,26,0.6)] animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 100}ms`, animationDuration: '1.2s' }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-[clamp(1.1rem,4vw,3.5rem)] font-bold mb-6 uppercase leading-tight heading-gradient">
                  AI VOICE AGENTS <br /><span className="text-brand-primary">FOR REAL BUSINESS CONVERSATIONS</span>
                </h2>
                <p className="text-white text-lg font-light leading-relaxed mb-6">
                  Handle customer calls automatically with AI voice agents that understand, respond, and convert—without scripts or delays.

                </p>
                <ul className="space-y-4 text-white">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    </div>
                    <span>Answer calls instantly and engage naturally
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    </div>
                    <span>Support multiple languages for wider reach
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-brand-primary" />
                    </div>
                    <span>Capture leads and sync directly with your CRM </span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </Section>

        {/* Use Cases */}
        <Section className="py-24 border-t border-white/5">
          <Container>
            <div className="text-center mb-16 fade-in-section">
              <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-bold mb-6 uppercase heading-gradient">Enterprise Use Cases</h2>
              <p className="text-white max-w-2xl mx-auto">
                Deploy AI agents that handle the heavy lifting of your customer acquisition and support pipeline.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 fade-in-section">
              <ServiceCard
                title="Inbound Customer Service"
                description="Never miss a lead. The AI answers immediately, qualifies prospects, and books showings directly to your calendar."
                icon={<PhoneCall className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=800&q=80"
                delay={0}
              />
              <ServiceCard
                title="Outbound Outreach"
                description="Cold calling entirely automated. The agent dials a list of numbers, holds contextual conversations, and transfers hot leads directly to you."
                icon={<Mic className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                delay={1}
              />
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
