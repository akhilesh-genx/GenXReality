'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { MobileMockup } from '@/components/ui/MobileMockup';
import { Box, Mic, Layers, Smartphone, Sparkles, PhoneCall } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in sections on scroll
      gsap.from('.fade-in-section', {
        scrollTrigger: {
          trigger: '.services-content',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });

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
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[60vh] w-full overflow-hidden mb-12 flex items-center">
        <div className="hero-banner-image absolute inset-0 -z-10 h-[120%] -top-[10%]">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80"
            alt="XR Services Hero"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <Container className="relative z-10 w-full">
          <div className="max-w-4xl pt-20">
            <div className="inline-block px-4 py-1 border border-brand-primary/30 rounded-full text-brand-primary text-sm font-mono mb-6 backdrop-blur-md bg-brand-primary/5 uppercase tracking-widest">
              Our Services
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 uppercase tracking-tighter leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Business Reality</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl font-light leading-relaxed">
              We specialize in WebXR Real Estate mapping and autonomous AI calling agents. Cutting-edge technology, zero friction.
            </p>
          </div>
        </Container>
      </div>

      <div className="services-content">
        {/* Real Estate WebXR Section */}
        <Section id="3d-tours" className="relative py-20 bg-black/50 border-t border-white/5">
          <Container>
            <div className="fade-in-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
                  3D Real Estate <br /><span className="text-brand-primary">Virtual Tours</span>
                </h2>
                <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
                  Transform simple property listings into fully interactive, photorealistic WebXR immersive experiences. Our technology runs instantly in the browser—no app downloads required. Give your clients the freedom to walk through properties from anywhere in the world.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-brand-primary text-black font-bold uppercase tracking-wider rounded border border-brand-primary hover:bg-brand-secondary transition-colors">
                    View Demo Tour
                  </button>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border-white/10 group">
                <Image
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
                  alt="3D WebXR Virtual Tour Interface"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                {/* Visual completely unencumbered by raw UI text for maximum immersion */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in-section">
              <div className="ServiceCardWrapper">
                <ServiceCard
                  title="Browser Native"
                  description="Zero friction loading. Our WebXR viewer works directly in Safari, Chrome, and Edge instantly."
                  icon={<Smartphone className="w-6 h-6 text-white" />}
                  imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                  delay={0}
                />
              </div>
              <div className="ServiceCardWrapper">
                <ServiceCard
                  title="Photorealistic Quality"
                  description="High-fidelity rendering ensures textures, lighting, and scale perfectly match the physical property."
                  icon={<Sparkles className="w-6 h-6 text-white" />}
                  imageUrl="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
                  delay={1}
                />
              </div>
              <div className="ServiceCardWrapper">
                <ServiceCard
                  title="Spatial Floorplans"
                  description="Integrated dollhouse views and dynamic spatial floorplans for ultimate navigation."
                  icon={<Layers className="w-6 h-6 text-white" />}
                  imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                  delay={2}
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* Mobile App Showcase Section */}
        <Section className="relative py-24 bg-zinc-950/50 border-t border-white/5 overflow-hidden">
          <Container>
            <div className="fade-in-section grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
              
              {/* Text Side (Left) */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center text-center lg:text-left pt-8 lg:pt-0">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight leading-tight">
                  Let your virtual tours <br className="hidden lg:block"/><span className="text-brand-primary">shine on mobile</span>
                </h2>
                <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                  <strong className="font-semibold text-white">Over 50% of your users are on mobile. Give them the best experience!</strong><br /><br />
                  With GenXReality, you get a virtual tour experience completely optimized for mobile devices. Viewers will enjoy your 360&deg; content on a small screen as effortlessly as they do on a large one.
                </p>
              </div>

              {/* Three Phones Side (Right) */}
              <div className="lg:col-span-7 order-1 lg:order-2 w-full flex items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 mx-auto">
                 
                 {/* Phone 1 (Search/List View) */}
                 <div className="transform translate-y-4 md:translate-y-8 hover:z-30 transition-all">
                   <MobileMockup imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=1200&q=80">
                     <div className="absolute top-0 inset-x-0 h-10 md:h-14 bg-zinc-900/90 backdrop-blur flex flex-col justify-end pb-2 items-center z-10">
                        <span className="text-brand-primary text-[10px] md:text-xs font-bold tracking-widest">GenXReality</span>
                     </div>
                     <div className="absolute top-12 md:top-16 inset-x-2 md:inset-x-4 h-6 md:h-8 bg-white/10 rounded-full flex items-center px-3 border border-white/5">
                        <span className="text-[8px] md:text-[10px] text-white/40">Search tags & users...</span>
                     </div>
                     <div className="absolute bottom-4 left-2 right-2 md:left-4 md:right-4 bg-black/60 backdrop-blur rounded-xl p-2 md:p-3 border border-white/5">
                        <div className="w-10 md:w-16 h-1 md:h-2 bg-white/20 rounded-full mb-1.5 md:mb-2" />
                        <div className="w-8 md:w-10 h-1 md:h-1.5 bg-white/10 rounded-full" />
                     </div>
                   </MobileMockup>
                 </div>

                 {/* Phone 2 (Immersive 360 View - Highlighted) */}
                 <div className="transform z-20 scale-105 md:scale-[1.15] lg:scale-110 shadow-[0_0_50px_rgba(0,255,65,0.15)] ring-1 ring-brand-primary/30 rounded-[1.75rem] md:rounded-[3rem] hover:scale-110 md:hover:scale-125 transition-transform duration-500">
                   <MobileMockup imageUrl="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=600&h=1200&q=80">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-between p-2 pb-4 md:pb-6 z-10">
                       <div className="flex justify-between items-center px-1 md:px-2 pt-4 md:pt-6">
                         <span className="text-[8px] md:text-[10px] font-mono border border-white/20 py-0.5 px-2 rounded-full text-white/50">XR VIEW</span>
                         <span className="text-[8px] md:text-[10px] text-white/50">Close ✕</span>
                       </div>
                       
                       <div className="flex justify-center gap-2 md:gap-4 mb-2">
                          <div className="w-4 md:w-6 h-4 md:h-6 rounded-full bg-black/40 backdrop-blur flex items-center justify-center border border-white/10"><Box className="w-2 md:w-3 text-white" /></div>
                          <div className="w-4 md:w-6 h-4 md:h-6 rounded-full bg-brand-primary/40 backdrop-blur flex items-center justify-center border border-brand-primary/50"><Sparkles className="w-2 md:w-3 text-brand-primary" /></div>
                          <div className="w-4 md:w-6 h-4 md:h-6 rounded-full bg-black/40 backdrop-blur flex items-center justify-center border border-white/10"><Layers className="w-2 md:w-3 text-white" /></div>
                       </div>
                     </div>
                   </MobileMockup>
                 </div>

                 {/* Phone 3 (Filter/Edit View) */}
                 <div className="transform translate-y-4 md:translate-y-8 hover:z-30 transition-all">
                   <MobileMockup imageUrl="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&h=1200&q=80">
                     <div className="absolute bottom-0 inset-x-0 h-20 md:h-28 bg-zinc-950/90 backdrop-blur-xl border-t border-white/10 flex flex-col gap-1 md:gap-2 p-2 px-3 md:pb-4 z-10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[8px] md:text-[10px] text-white/50 uppercase tracking-widest w-full text-center">Settings</span>
                        </div>
                        <div className="flex gap-1.5 md:gap-2 justify-center">
                          <div className="w-8 md:w-12 h-10 md:h-14 bg-white/10 rounded overflow-hidden border border-brand-primary/50 flex flex-col justify-end p-0.5"><span className="text-[6px] text-white text-center w-full block">NATIVE</span></div>
                          <div className="w-8 md:w-12 h-10 md:h-14 bg-white/5 rounded overflow-hidden border border-white/5 flex flex-col justify-end p-0.5"><span className="text-[6px] text-white/50 text-center w-full block">GRAY</span></div>
                          <div className="w-8 md:w-12 h-10 md:h-14 bg-white/5 rounded overflow-hidden border border-white/5 hidden sm:flex flex-col justify-end p-0.5"><span className="text-[6px] text-white/50 text-center w-full block">WARM</span></div>
                        </div>
                     </div>
                   </MobileMockup>
                 </div>

              </div>
            </div>
          </Container>
        </Section>

        {/* AI Calling Agents Section */}
        <Section id="ai-agents" className="relative py-24 bg-zinc-900/30 border-t border-white/5">
          <Container>
            <div className="fade-in-section grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
              <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-2xl overflow-hidden glass-panel border-white/10 group flex items-center justify-center bg-black">
                {/* Abstract AI Audio Wave visualization placeholder */}
                <Image
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
                  alt="AI Voice Agent Graphic"
                  fill
                  className="object-cover opacity-40 transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="relative z-10 w-full px-12 flex justify-center opacity-90 mix-blend-screen scale-y-150 transform transition-transform duration-[3000ms] group-hover:scale-y-[2]">
                  <div className="flex items-center justify-center h-24 gap-3">
                    {[40, 70, 45, 100, 60, 30, 80, 50, 75, 40].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(0,255,65,0.6)] animate-pulse"
                        style={{ height: `${h}%`, animationDelay: `${i * 120}ms`, animationDuration: '1.5s' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
                  Autonomous <br /><span className="text-brand-primary">AI Agents</span>
                </h2>
                <p className="text-lg text-white/60 leading-relaxed font-light mb-8">
                  Scale your outreach and customer service instantly. Our voice-native AI agents can handle thousands of concurrent calls, book appointments, perform real estate lead generation, and provide 24/7 intelligent customer interactions with human-like latency.
                </p>
                <div className="flex gap-4">
                  <button className="px-8 py-4 bg-brand-primary text-black font-bold uppercase tracking-wider rounded border border-brand-primary hover:bg-brand-secondary transition-colors">
                    Listen to Agent
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 fade-in-section">
              <div className="ServiceCardWrapper">
                <ServiceCard
                  title="Inbound Customer Service"
                  description="Never miss a lead. The AI answers immediately, qualifies prospects, and books showings directly to your calendar."
                  icon={<PhoneCall className="w-6 h-6 text-white" />}
                  imageUrl="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&w=800&q=80"
                  delay={0}
                />
              </div>
              <div className="ServiceCardWrapper">
                <ServiceCard
                  title="Outbound Outreach"
                  description="Cold calling entirely automated. The agent dials a list of numbers, holds contextual conversations, and transfers hot leads directly to you."
                  icon={<Mic className="w-6 h-6 text-white" />}
                  imageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                  delay={1}
                />
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
