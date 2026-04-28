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

export default function Home() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('section').forEach((sec: any) => {
        if (sec.id === 'how-it-works' || sec.id === 'hero') return;
        
        // Emulate 'how-it-works-text' (-50x, 0 opacity, power3.out)
        const texts = sec.querySelectorAll('h2, h3, p');
        if (texts.length) {
          gsap.from(texts, {
            scrollTrigger: { trigger: sec, start: 'top 80%', toggleActions: 'play none none reverse' },
            x: -50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          });
        }
        
        // Emulate 'how-it-works-item' for all cards (-30x, stagger 0.2)
        const cards = sec.querySelectorAll('.glass-card, .service-item, .feature-card, .value-card, .news-card');
        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none reverse' },
            x: -30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          });
        }

        // Emulate 'how-it-works-img' (scale 0.8)
        const images = sec.querySelectorAll('img:not(.hero-bg)');
        if (images.length) {
          gsap.from(images, {
            scrollTrigger: { trigger: sec, start: 'top 70%', toggleActions: 'play none none reverse' },
            scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out',
          });
        }
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
      <Section id="about">
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-bold mb-8 uppercase heading-gradient">Our <span className="text-brand-primary">Mission</span></h2>
            <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
              We build enterprise-grade XR solutions that solve real business problems—helping companies visualize better, train faster, and operate more efficiently. Our focus is on delivering practical, scalable immersive technology that drives measurable results across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary heading-gradient">Why We Exist</h3>
              <p className="text-white leading-relaxed">
                Businesses need more than just impressive VR-they need solutions that improve outcomes.<br></br>
                We exist to bridge the gap between immersive technology and real-world applications, enabling industries like real estate, training, and enterprise operations to work smarter and faster.

              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary heading-gradient">Our Vision</h3>
              <p className="text-white leading-relaxed">
                To make high-performance XR a core tool for every industry—empowering businesses to innovate, communicate, and grow through immersive technology.

              </p>
            </div>
          </div>

          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold mb-4 heading-gradient">Core Values</h3>
            <p className="text-white max-w-2xl mx-auto">
              Built on performance, reliability, and real-world impact.

            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard icon={<Users className="w-8 h-8 text-brand-primary" />} title="Excellence" description="Delivering high-quality solutions designed for reliability, precision, and long-term performance." />
            <ValueCard icon={<Zap className="w-8 h-8 text-brand-primary" />} title="Innovation" description="Delivering high-quality solutions designed for reliability, precision, and long-term performance." />
            <ValueCard icon={<Globe className="w-8 h-8 text-brand-primary" />} title="Versatility" description="Adapting XR across industries — from real estate and training to enterprise operations at scale." />
            <ValueCard icon={<Cpu className="w-8 h-8 text-brand-primary" />} title="Performance" description="Optimizing every system for speed, stability, and seamless immersive experiences. 
" />
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* PRODUCT — GenX One */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="product">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center px-4 md:px-0">
            <div>
              <h3 className="text-3xl md:text-5xl font-bold mb-6 uppercase heading-gradient">Innovations & <br /><span className="text-brand-primary">Showcase.</span></h3>
              <p className="text-lg text-white mb-8 font-light leading-relaxed">
                GenXEdu is a high-performance PC-powered VR system under development, focused on delivering scalable, low-latency immersive environments for education, training, and enterprise applications—designed and built in India.

              </p>
              <Link href="/product">
                <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-black uppercase tracking-wider flex items-center gap-2">
                  Explore GenXEdu <ArrowRight className="w-4 h-4" />
                </Button> 
              </Link>
            </div>
            <div className="relative w-[80%] mx-auto rounded-2xl overflow-hidden" style={{ height: '380px' }}>
              <img src="/vr-images/v3-4-c.png" alt="GenXReality Innovations." className="w-full h-full object-contain" />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SERVICES — Enterprise XR Solutions */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="services">
        <Container>
          <div className="px-4 md:px-0">
            <div className="max-w-3xl mb-16">
            <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-bold mb-6 uppercase heading-gradient">Enterprise <span className="text-brand-primary">XR Solutions</span></h2>
            <p className="text-xl text-white">
              We help forward-thinking companies integrate immersive XR technologies into their workflows to improve efficiency, training, and digital experiences.

            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {services.slice(0, 3).map((service) => (
              <div key={service.id} className="service-item glass-card p-8 rounded-2xl border border-white/10 group">
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit border border-white/10 group-hover:bg-brand-primary/10 transition-colors">
                  {serviceIconMap[service.icon] || <Building className="w-12 h-12 text-brand-primary" />}
                </div>
                <h3 className="text-xl font-bold mb-3 heading-gradient">{service.title}</h3>
                <p className="text-white text-sm  mb-6">{service.description}</p>
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
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HOW IT WORKS */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="how-it-works">
        <Container>
          <div className="flex flex-col md:flex-row items-center gap-12 px-4 md:px-0">
            <div className="flex-1 how-it-works-text">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 heading-gradient">How It Works</h2>
              <div className="space-y-8">
                <div className="how-it-works-item flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Settings className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 heading-gradient">Consult & Understand</h3>
                    <p className="text-white"> We analyze your business needs, workflows, and goals to design the right XR, AI, and voice solution.</p>
                  </div>
                </div>
                <div className="how-it-works-item flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 heading-gradient">Design & Develop</h3>
                    <p className="text-white"> We create immersive XR environments, integrate AI intelligence, and build voice-enabled interactions tailored to your use case.</p>
                  </div>
                </div>
                <div className="how-it-works-item flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 heading-gradient">Deploy & Scale</h3>
                    <p className="text-white">We deploy your solution across devices and platforms, ensuring seamless performance and scalability for real-world use.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="how-it-works-img flex-1 relative h-[400px] w-full rounded-2xl overflow-hidden border border-white/10 group bg-black/40 backdrop-blur-md">
              <div className="absolute inset-0 bg-brand-primary/10 z-0 opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
              <Image
                src="/how-it-works.webp"
                alt="GenX One VR Headset Preview"
                fill
                className="object-contain p-4 z-10 hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FOUNDER */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="founder">
        <Container>
          <div className="max-w-6xl mx-auto px-4 md:px-0">
            {/* Section Label */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-bold uppercase heading-gradient">Founder</h2>
            </div>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Portrait */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[360px] md:max-w-[450px] lg:max-w-[550px] h-[350px] md:h-[400px] rounded-2xl overflow-hidden border border-white/10 group transition-all duration-500 hover:border-brand-primary/40">
                  {/* Subtle glow on hover */}
                  <div className="absolute -inset-1 rounded-2xl bg-brand-primary/0 group-hover:bg-brand-primary/10 blur-xl transition-all duration-700 z-0" />
                  <Image
                    src="/founder.jpeg"
                    alt="Krishna Vamshi — Founder & CEO, GenXReality"
                    fill
                    className="object-cover z-10 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  {/* Removed bottom vignette */}
                </div>
              </div>

              {/* Right — Text Content */}
              <div className="lg:col-span-1">
                <h3 className="text-3xl md:text-4xl font-bold mb-1 text-white" style={{ WebkitTextFillColor: 'white', background: 'none', backgroundClip: 'unset', WebkitBackgroundClip: 'unset' }}>
                  Krishna Vamshi
                </h3>
                <p className="text-sm md:text-base text-white/50 uppercase tracking-wider mb-8 font-medium">
                  Founder &amp; CEO, GenXReality
                </p>

                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 font-light">
                  Krishna Vamshi brings experience in hardware development, AI, and product design, with a focus on XR technologies. His work is centered on building efficient and scalable systems that can be used across different industries.
                </p>

                {/* Quote */}
                <div className="relative pl-6 border-l-2 border-brand-primary/40">
                  <p className="text-base md:text-lg text-white/50 italic leading-relaxed">
                    &ldquo;We focus on building practical XR solutions that can be used in real-world applications.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* COMPANY UPDATES */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <Section id="news">
        <Container>
          <div id="blogs" className="text-center px-4 md:px-0">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-[clamp(1.8rem,5vw,4rem)] font-bold mb-6 uppercase heading-gradient">Recent <span className="text-brand-primary">Posts</span></h2>
              <p className="text-lg text-white font-light leading-relaxed">
                Explore our latest posts, product updates, and insights-directly from our LinkedIn feed.
              </p>
            </div>

            <div className="w-full glass-card p-0 md:p-8 rounded-3xl border border-white/10 min-h-[600px] md:min-h-[500px] mb-8 relative text-left elfsight-feed-wrapper">
              <div className="absolute inset-0 bg-transparent pointer-events-none" />
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
      <h3 className="text-xl font-bold mb-2 heading-gradient">{title}</h3>
      <p className="text-white text-sm">{description}</p>
    </div>
  );
}

function SpecCard({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) {
  return (
    <div className="spec-card glass-card p-8 rounded-2xl border-brand-primary/10 hover:border-brand-primary/50">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white text-sm uppercase tracking-wider mb-1 heading-gradient">{title}</h3>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-white text-sm">{description}</p>
    </div>
  );
}


