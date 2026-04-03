'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import { Linkedin, Users, Zap, Globe, Cpu } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Banner Section */}
      <div className="relative z-[2] h-[50vh] w-full overflow-hidden mb-12">
        <Image
          src="https://picsum.photos/seed/vrabout/1920/800"
          alt="About GenXReality"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <Container>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter heading-gradient">ABOUT <span className="text-brand-primary">GenXReality</span></h1>
            <p className="text-xl text-white max-w-2xl">
              Pioneering Enterprise-Grade Immersive XR Solutions.
            </p>
          </Container>
        </div>
      </div>

      <Section>
        <Container>
          <div className="max-w-4xl mx-auto text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 uppercase heading-gradient">Our Mission</h2>
            <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
              We recognized the need for true enterprise-grade XR performance. We are committed to engineering unparalleled immersive experiences and unlocking advanced use cases for VR across diverse professional sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary heading-gradient">Why We Exist</h3>
              <p className="text-white leading-relaxed">
                VR technology must be absolute in power and versatility. By engineering cutting-edge hardware and ensuring absolute precision, we unlock transformative opportunities for enterprise, healthcare, and advanced training.
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary heading-gradient">Our Vision</h3>
              <p className="text-white leading-relaxed">
                To pioneer a world where high-fidelity immersive technology serves as the ultimate professional tool for innovation, advanced engineering, and deep global connection.
              </p>
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center heading-gradient">Core Pillars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ValueItem
                icon={<Users className="w-8 h-8 text-brand-primary" />}
                title="Excellence"
                description="Delivering premium solutions engineered for robust reliability."
              />
              <ValueItem
                icon={<Zap className="w-8 h-8 text-brand-primary" />}
                title="Innovation"
                description="Advancing VR technology for high-impact real-world applications."
              />
              <ValueItem
                icon={<Globe className="w-8 h-8 text-brand-primary" />}
                title="Versatility"
                description="Expanding enterprise VR into healthcare, engineering, and scale."
              />
              <ValueItem
                icon={<Cpu className="w-8 h-8 text-brand-primary" />}
                title="Performance"
                description="Deploying state-of-the-art architecture without compromise."
              />
            </div>
          </div>

          {/* Team Section Placeholder - Keeping generic structure but removing specific names unless provided */}
          <div className="text-center border-t border-brand-primary/20 pt-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 heading-gradient">Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Placeholder for team members */}
              <TeamMember title="Founder & CEO" />
              <TeamMember title="CTO" />
              <TeamMember title="Head of Design" />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function ValueItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-brand-primary/30 transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 heading-gradient">{title}</h3>
      <p className="text-white text-sm">{description}</p>
    </div>
  );
}

function TeamMember({ title }: { title: string }) {
  return (
    <div className="group">
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-white/5">
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
          <Users size={48} />
        </div>
      </div>
      <h3 className="text-xl font-bold mb-1 heading-gradient">Team Member</h3>
      <p className="text-brand-primary text-sm uppercase tracking-wider">{title}</p>
    </div>
  );
}
