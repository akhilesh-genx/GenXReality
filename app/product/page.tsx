'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Check, Cpu, Eye, Wifi, Battery, Layers, Box, Thermometer, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProductPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('section:not(:first-child)').forEach((sec: any) => {
        const texts = sec.querySelectorAll('h2, h3, p, li');
        if (texts.length) {
          gsap.from(texts, {
            scrollTrigger: { trigger: sec, start: 'top 80%', toggleActions: 'play none none reverse' },
            x: -50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          });
        }

        const cards = sec.querySelectorAll('.feature-card, .glass-card');
        if (cards.length) {
          gsap.from(cards, {
            scrollTrigger: { trigger: sec, start: 'top 75%', toggleActions: 'play none none reverse' },
            x: -30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          });
        }

        const images = sec.querySelectorAll('img');
        if (images.length) {
          gsap.from(images, {
            scrollTrigger: { trigger: sec, start: 'top 70%', toggleActions: 'play none none reverse' },
            scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out',
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative z-[2] h-screen flex items-center justify-center overflow-hidden select-none bg-black"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <motion.div style={{ y, opacity }} className="relative z-10 w-full h-full flex flex-col items-center justify-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="absolute top-20 left-0 w-full text-center px-4"
          >
            <h1 className="text-[clamp(2.5rem,10vw,8rem)] font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 heading-gradient">
              GenXEdu
            </h1>
            <p className="text-[clamp(1rem,3vw,1.5rem)] leading-snug text-brand-primary font-mono -mt-5 uppercase tracking-widest">
              Enterprise-Grade, High-Performance VR
            </p>
          </motion.div>


        </motion.div>

        {/* Background Image */}
        <div className="absolute inset-0 -z-10 bg-transparent flex items-center justify-center">
          <Image
            src="/VR-Images/blurred-vr.webp"
            alt="GenX One Background"
            fill
            className="object-contain scale-[0.9] opacity-60 blur-[3px] pointer-events-none"
            priority
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none z-[1]" />
        </div>
      </section>

      {/* Product Vision */}
      <Section id="product" className="bg-transparent">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-[clamp(1.8rem,5vw,4rem)] leading-tight font-bold mb-6 uppercase heading-gradient">Innovations & <br /><span className="text-brand-primary">Showcase.</span></h2>
              <p className="text-lg text-white mb-6 font-light leading-relaxed">
                We believe that advanced display technology should push the absolute limits of enterprise capability.
                GenX One offers a truly zero-compromise immersive experience. We are redefining what is possible in premium VR hardware, delivering unprecedented clarity for professionals.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Check className="text-brand-primary" /> <span>Advanced Optical Clarity & Display Technology</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-brand-primary" /> <span>Smart AI Processing for Low Latency Tracking</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-brand-primary" /> <span>Optimized Thermal Design for Extended Sessions</span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="text-brand-primary" /> <span>Ergonomic Weight Distribution</span>
                </li>
              </ul>
            </div>
            <div className="relative aspect-square w-[85%] mx-auto rounded-2xl overflow-hidden">
              <Image src="/VR-Images/v3-4-c.png" alt="Technology" fill className="object-contain" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section id="features">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-[clamp(2rem,4vw,2.5rem)] font-bold mb-4 uppercase heading-gradient">Technical Specifications</h2>
            <p className="text-white">Engineered for absolute performance without compromise.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Eye className="w-8 h-8 text-brand-primary" />}
              title="Visual Fidelity"
              value="Advanced Display"
              description="Uncompromising high-resolution visual fidelity."
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-brand-secondary" />}
              title="AI Integration"
              value="Smart Processing"
              description="Enhanced user experiences through intelligent computing."
            />
            <FeatureCard
              icon={<Thermometer className="w-8 h-8 text-white" />}
              title="Efficiency"
              value="Superior Thermals"
              description="Optimized hardware design for extended usage."
            />
            <FeatureCard
              icon={<Battery className="w-8 h-8 text-brand-primary" />}
              title="Battery Life"
              value="Extended Play"
              description="Long-lasting power for immersive sessions."
            />
            <FeatureCard
              icon={<Layers className="w-8 h-8 text-brand-secondary" />}
              title="Integration"
              value="Seamless"
              description="Software and hardware working in harmony."
            />
            <FeatureCard
              icon={<Cpu className="w-8 h-8 text-brand-primary" />}
              title="Architecture"
              value="Precision"
              description="State-of-the-art components for maximum reliability."
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}

function FeatureCard({ icon, title, value, description }: { icon: React.ReactNode, title: string, value: string, description: string }) {
  return (
    <div className="feature-card glass-card p-8 rounded-2xl border-brand-primary/10 hover:border-brand-primary/50">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white text-sm uppercase tracking-wider mb-1 heading-gradient">{title}</h3>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-white text-sm">{description}</p>
    </div>
  );
}
