'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Box, Layers, Globe, Cpu, Zap, Brain, Thermometer,
  Settings, Users, DollarSign, Check, Eye, Wifi, Battery,
  Building, Code, Briefcase, GraduationCap, Mail, MapPin, Phone,
  ArrowUpRight
} from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import HeroFrameAnimation from '@/components/ui/HeroFrameAnimation';
import { articles, services } from '@/lib/cms';

gsap.registerPlugin(ScrollTrigger);

const serviceIconMap: Record<string, React.ReactNode> = {
  'Building': <Building className="w-12 h-12 text-brand-primary" />,
  'Code': <Code className="w-12 h-12 text-brand-primary" />,
  'Briefcase': <Briefcase className="w-12 h-12 text-brand-primary" />,
  'GraduationCap': <GraduationCap className="w-12 h-12 text-brand-primary" />,
};

export default function Home() {  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scrub fade-in for the entire Mission section
      gsap.from('#about', {
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top 30%', scrub: 1 },
        opacity: 0, ease: 'none',
      });

      gsap.from('.feature-card', {
        scrollTrigger: { trigger: '#innovations', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
      });

      gsap.from('.value-card', {
        scrollTrigger: { trigger: '#about', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      });

      gsap.from('.spec-card', {
        scrollTrigger: { trigger: '#product', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.1,
      });

      gsap.from('.service-item', {
        scrollTrigger: { trigger: '#services', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
      });

      gsap.from('.news-card', {
        scrollTrigger: { trigger: '#news', start: 'top 80%', toggleActions: 'play none none reverse' },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      });

      gsap.from('.how-it-works-text', {
        scrollTrigger: { trigger: '#how-it-works', start: 'top 80%', toggleActions: 'play none none reverse' },
        x: -50, opacity: 0, duration: 0.8, ease: 'power3.out',
      });
      gsap.from('.how-it-works-item', {
        scrollTrigger: { trigger: '#how-it-works', start: 'top 75%', toggleActions: 'play none none reverse' },
        x: -30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
      });
      gsap.from('.how-it-works-img', {
        scrollTrigger: { trigger: '#how-it-works', start: 'top 70%', toggleActions: 'play none none reverse' },
        scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative">
      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO — Scroll-Driven Frame Animation */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <HeroFrameAnimation />

      {/* Anchor to skip animation when clicking Home */}
      <div id="home" className="absolute" style={{ top: '600vh' }} />

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* ABOUT — Mission & Core Values */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="about" className="bg-black/50 backdrop-blur-sm">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase">Our <span className="text-brand-primary">Mission</span></h2>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed font-light">
              We recognized the need for true enterprise-grade XR performance. We are committed to engineering unparalleled immersive experiences and unlocking advanced use cases for VR across diverse professional sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary">Why We Exist</h3>
              <p className="text-white/70 leading-relaxed">
                VR technology must be powerful and versatile. By engineering cutting-edge hardware and ensuring absolute precision, we unlock transformative opportunities for enterprise, healthcare, and advanced training.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To pioneer a world where high-fidelity immersive technology serves as the ultimate professional tool for innovation, advanced engineering, and deep global connection.
              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold mb-4">Core Values</h3>
            <p className="text-white/60 max-w-2xl mx-auto">
              Engineering the absolute highest standard of performance and enterprise versatility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard icon={<Users className="w-8 h-8 text-brand-primary" />} title="Excellence" description="Delivering premium solutions engineered for robust reliability." />
            <ValueCard icon={<Zap className="w-8 h-8 text-brand-primary" />} title="Innovation" description="Advancing VR technology for high-impact real-world applications." />
            <ValueCard icon={<Globe className="w-8 h-8 text-brand-primary" />} title="Versatility" description="Expanding enterprise VR into healthcare, engineering, and scale." />
            <ValueCard icon={<Cpu className="w-8 h-8 text-brand-primary" />} title="Performance" description="Deploying state-of-the-art architecture without compromise." />
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PRODUCT — GenX One */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="product" className="bg-zinc-900/30">
        <Container>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 uppercase">Innovations & <br /><span className="text-brand-primary">Showcase.</span></h3>
              <p className="text-lg text-white/70 mb-8 font-light leading-relaxed">
                Advanced display technology engineered for the future. The GenX One offers stunning visual clarity, seamless AI integration, and robust enterprise thermal performance built to redefine industry standards.
              </p>
              <Link href="/product">
                <Button className="bg-brand-primary text-black hover:bg-brand-secondary font-bold uppercase tracking-wider flex items-center gap-2">
                  Explore Genx One <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel border-brand-primary/20">
              <Image src="https://picsum.photos/seed/vrtech/800/800" alt="Technology" fill className="object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SERVICES — Enterprise XR Solutions */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="services" className="bg-black/50">
        <Container>
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">Enterprise <span className="text-brand-primary">XR Solutions</span></h2>
            <p className="text-xl text-white/60">
              We help forward-thinking companies integrate spatial computing into their workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="service-item glass-card p-8 rounded-2xl border border-white/10 group">
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit border border-white/10 group-hover:bg-brand-primary/10 transition-colors">
                  {serviceIconMap[service.icon] || <Building className="w-12 h-12 text-brand-primary" />}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/70 text-sm line-clamp-3 mb-6">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link href="/services">
              <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-black uppercase tracking-wider flex items-center gap-2">
                View All Services <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="how-it-works" className="bg-zinc-900/30">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 how-it-works-text">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
              <div className="space-y-8">
                <div className="how-it-works-item flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Settings className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Premium Architecture</h3>
                    <p className="text-white/60">State-of-the-art components precision-engineered for maximum output.</p>
                  </div>
                </div>
                <div className="how-it-works-item flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Seamless Integration</h3>
                    <p className="text-white/60">Software and hardware working in harmony for a smooth experience.</p>
                  </div>
                </div>
                <div className="how-it-works-item flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">End-user Experience</h3>
                    <p className="text-white/60">Intuitive and immersive interaction designed for everyone.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="how-it-works-img flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-purple-500/20 z-0 opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
              <Image 
                src="/VR-Images/V3_-13-removebg-preview.png"
                alt="GenX One VR Headset Preview"
                fill
                className="object-contain p-4 z-10 hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* COMPANY UPDATES */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="news" className="bg-black/50">
        <Container>
          <div id="blogs" className="text-center">
             <div className="max-w-4xl mx-auto text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">Company <span className="text-brand-primary">Updates</span></h2>
                 <p className="text-lg text-white/60 font-light leading-relaxed">
                     We frequently share deep dives into spatial computing, engineering challenges we&apos;ve solved, and announcements about the GenX One. Read our latest updates directly from our LinkedIn feed below.
                 </p>
             </div>

             <div className="w-full glass-card p-4 md:p-8 rounded-3xl border border-white/10 overflow-hidden min-h-[500px] mb-8 relative text-left">
                 <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 to-transparent pointer-events-none" />
                 <div className="elfsight-app-b6304e32-de05-494e-8860-97a1974ef9f5 relative z-10" data-elfsight-app-lazy></div>
                 <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
             </div>
          </div>
        </Container>
      </Section>



    </div>
  );
}

// ─── Sub-Components ──────────────────────────────────────────────

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="value-card glass-card p-6 rounded-2xl border border-white/5 hover:border-brand-primary/30 transition-all duration-300 group hover:-translate-y-1">
      <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit group-hover:bg-brand-primary/20 transition-colors">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}

function SpecCard({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) {
  return (
    <div className="spec-card glass-card p-8 rounded-2xl border-brand-primary/10 hover:border-brand-primary/50">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white/60 text-sm uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-white/50 text-sm">{description}</p>
    </div>
  );
}


