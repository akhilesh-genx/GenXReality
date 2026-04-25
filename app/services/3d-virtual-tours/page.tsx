'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { MobileMockup } from '@/components/ui/MobileMockup';
import { Smartphone, Sparkles, Layers, ArrowLeft, Box } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { PanoramaSection } from '@/components/ui/PanoramaSection';

gsap.registerPlugin(ScrollTrigger);

export default function VirtualToursPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let animationFrameId: number;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (ctx && video.readyState >= 2) {
        const canvasRatio = canvas.width / canvas.height;
        const videoRatio = video.videoWidth / video.videoHeight;
        let drawWidth, drawHeight, startX, startY;
        
        if (canvasRatio > videoRatio) {
          // Desktop/wide screens: stretch to fit completely without cropping
          drawWidth = canvas.width;
          drawHeight = canvas.height;
          startX = 0;
          startY = 0;
        } else {
          // Mobile/narrow screens: do not compress horizontally. 
          // Scale to fit height proportionally, let the sides get trimmed.
          drawWidth = canvas.height * videoRatio;
          drawHeight = canvas.height;
          startX = (canvas.width - drawWidth) / 2;
          startY = 0;
        }

        // Draw the raw video frame
        ctx.drawImage(video, startX, startY, drawWidth, drawHeight);

        // Process pixels to remove the green screen background (Chroma key)
        try {
          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = frame.data;
          const length = data.length;

          for (let i = 0; i < length; i += 4) {
            const r = data[i + 0];
            const g = data[i + 1];
            const b = data[i + 2];

            // Detect bright green pixels and set their alpha channel to 0
            if (g > 80 && g > r * 1.2 && g > b * 1.2) {
              data[i + 3] = 0;
            }
          }
          ctx.putImageData(frame, 0, 0);
        } catch (err) {
          // Ignore canvas taint errors if local dev doesn't serve with open CORS
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    video.play().catch(e => console.log("Auto-play blocked", e));
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('section').forEach((sec: any) => {
        const texts = sec.querySelectorAll('h2, h3, p, li');
        if (texts.length) {
          gsap.from(texts, {
            scrollTrigger: { trigger: sec, start: 'top 80%', toggleActions: 'play none none reverse' },
            x: -50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          });
        }
        
        const cards = sec.querySelectorAll('.feature-card, .glass-card, .glass-panel');
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
            opacity: 0, duration: 1, ease: 'power3.out',
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
    <main className="w-full min-h-screen bg-transparent overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] md:h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 bg-black">
          {/* Transparent Video Layer (Chroma Key) */}
          <video
            ref={videoRef}
            src="/plots.mp4"
            loop
            muted
            playsInline
            className="hidden"
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-10 opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-transparent pointer-events-none z-20" />
        <Container className="relative z-30">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2rem,8vw,6rem)] font-bold mb-6 uppercase tracking-tighter leading-tight heading-gradient">
              3D Real Estate <br />
              <span className="text-brand-primary">Virtual Tours</span>
            </h1>
            <div className="mb-8">
              <p className="text-lg md:text-2xl text-white max-w-2xl font-light leading-relaxed mb-4">
                Turn Property Listings into Interactive 3D Experiences That Sell Faster.
              </p>
              <p className="text-base md:text-lg text-white/90 max-w-xl font-light leading-relaxed">
                Deliver high-quality, browser-based virtual tours that work instantly across devices—no apps, no friction.
              </p>
            </div>

            <Button>
              View Demo Tour
            </Button>
          </div>
        </Container>
      </section>

      <div className="content-wrap">
        <PanoramaSection />
        {/* Key Features Section */}
        <Section className="py-32 border-y border-white/5 relative overflow-hidden bg-transparent">

          {/* Enhanced Neon Glows for Depth */}
          <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[180px] pointer-events-none mix-blend-screen z-0" />
          <div className="absolute bottom-1/4 left-[-10%] w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[180px] pointer-events-none mix-blend-screen z-0" />
          
          {/* Subtle Grid Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-50" />

          <Container className="relative z-10">
            {/* STEP 1 — HEADER UPDATE */}
            <div className="text-center mb-24 fade-in-section">

              <h2 className="text-5xl md:text-7xl font-bold mb-6 uppercase tracking-tighter heading-gradient drop-shadow-2xl">Key Features</h2>
              <p className="text-brand-primary/80 max-w-2xl mx-auto font-light text-xl md:text-2xl tracking-[0.2em] uppercase">
                Built for developers, builders, and sales teams
              </p>
            </div>

            {/* STEP 3 — CORE PLATFORM (PRIMARY FOCUS BLOCK) */}
            <div className="mb-24 fade-in-section">
              <div className="glass-card group relative w-full rounded-[3rem] overflow-hidden bg-zinc-950/60 backdrop-blur-3xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 hover:border-brand-primary/40 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(0,255,65,0.15)] p-10 md:p-16">
                
                {/* Internal Glow on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="p-3 bg-brand-primary/20 backdrop-blur-xl rounded-xl border border-brand-primary/30 text-brand-primary shadow-[0_0_20px_rgba(0,255,65,0.2)]">
                        <Layers className="w-6 h-6" />
                      </div>
                      <span className="text-white/60 font-semibold uppercase tracking-[0.2em] text-sm">Platform Foundation</span>
                    </div>
                    
                    <h3 className="text-4xl md:text-6xl font-bold mb-10 text-white tracking-widest uppercase leading-[1.1]">
                      Smart <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(0,255,65,0.5)]">CRM</span>
                    </h3>
                    
                    <div className="space-y-8">
                      {[
                        'Manage all leads in one place',
                        'Track buyer activity',
                        'Keep your team in sync'
                      ].map((text, i) => (
                        <div key={i} className="flex items-center text-white/90 font-light text-xl md:text-2xl group/item">
                          <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mr-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-all duration-500 group-hover/item:bg-brand-primary/20 group-hover/item:border-brand-primary/40">
                            <div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
                          </div>
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 hidden lg:block perspective-[2000px]">
                    <div className="relative p-8 rounded-[2rem] bg-zinc-900/80 border border-white/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_30px_60px_-20px_rgba(0,0,0,0.8)] transform rotate-y-[-10deg] rotate-x-[5deg] group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-1000 ease-out">
                      {/* Fake UI Header */}
                      <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-3">
                           <div className="w-3 h-3 rounded-full bg-red-500/80" />
                           <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                           <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-brand-primary/30 flex items-center justify-center border border-brand-primary/50">
                           <Sparkles className="w-4 h-4 text-brand-primary" />
                        </div>
                      </div>
                      
                      {/* Fake UI Body */}
                      <div className="space-y-6">
                        <div className="h-40 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-zinc-900/50 border border-brand-primary/20 flex flex-col items-center justify-center gap-4 relative overflow-hidden group-hover:border-brand-primary/50 transition-colors duration-700">
                          <Smartphone className="w-16 h-16 text-brand-primary/60 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                          <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-16 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/10" />
                             <div className="flex-1 space-y-2">
                               <div className="h-2 w-full bg-white/20 rounded-full" />
                               <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                             </div>
                          </div>
                          <div className="h-16 rounded-xl bg-white/5 border border-white/5 flex items-center px-4 gap-3">
                             <div className="w-8 h-8 rounded-full bg-white/10" />
                             <div className="flex-1 space-y-2">
                               <div className="h-2 w-full bg-white/20 rounded-full" />
                               <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                             </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4 — EXPERIENCE LAYER (3-COLUMN GRID) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 fade-in-section relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-brand-primary/5 blur-[100px] pointer-events-none z-0" />
              <div className="relative z-10 w-full h-full">
                <ServiceCard
                  title="AI Visuals"
                  description="Create property visuals quickly. Useful even before construction."
                  icon={<Sparkles className="w-6 h-6" />}
                  imageUrl="/photo-reality.avif"
                  delay={0}
                />
              </div>
              <div className="relative z-10 w-full h-full">
                <ServiceCard
                  title="Walkthroughs"
                  description="Explore properties directly in the browser. Move freely, no app needed."
                  icon={<Box className="w-6 h-6" />}
                  imageUrl="/browser-native.avif"
                  delay={1}
                />
              </div>
              <div className="relative z-10 w-full h-full">
                <ServiceCard
                  title="Video Renders"
                  description="Simple previews for sharing. Works well for marketing."
                  icon={<Smartphone className="w-6 h-6" />}
                  imageUrl="/spatial.avif"
                  delay={2}
                />
              </div>
            </div>

            {/* STEP 5 — SALES IMPACT STRIP */}
            <div className="relative mb-32 py-20 px-10 fade-in-section rounded-3xl bg-zinc-950/50 border border-white/5 backdrop-blur-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="flex-shrink-0">
                  <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.2em] text-white leading-tight text-center lg:text-left">
                    Built to Help You <br /> 
                    <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(0,255,65,0.3)] mt-2 block">Sell Faster</span>
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
                  {[
                    { icon: Sparkles, text: 'Buyers understand spaces better' },
                    { icon: Layers, text: 'More engagement than static images' },
                    { icon: Box, text: 'Faster decisions' }
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center lg:items-start group">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 mb-6 transition-all duration-500 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 group-hover:text-brand-primary group-hover:scale-110 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,255,65,0.2)]">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <p className="text-white/70 font-light text-center lg:text-left text-lg leading-relaxed max-w-[220px] transition-colors duration-300 group-hover:text-white">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>



            {/* STEP 7 — FINAL STATEMENT (FULL-WIDTH TEXT) */}
            <div className="text-center py-20 fade-in-section relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent" />
              <p className="relative z-10 text-3xl md:text-5xl text-white/90 font-light tracking-tight leading-tight max-w-4xl mx-auto font-bricolage">
                "From first enquiry to final sale, everything works in <span className="text-brand-primary font-semibold tracking-normal drop-shadow-[0_0_15px_rgba(0,255,65,0.4)]">one place</span>"
              </p>
            </div>
          </Container>
        </Section>

        {/* Zero Friction / Cross-Device Section */}
        <Section className="py-12 relative overflow-hidden">
          <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none z-0" />
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              <div className="order-2 lg:order-1 flex flex-col justify-center py-2 px-6 md:px-0">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter heading-gradient leading-tight">
                  Any Device. Any Browser. <br />
                  <span className="text-brand-primary">Zero Friction.</span>
                </h2>
                
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                    Skip the app store. Our 3D walkthroughs are engineered to run natively in any modern web browser.
                  </p>
                  
                  <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                    Whether your clients are on a morning commute with their smartphone or at their desk on a laptop, they can step into the experience instantly. One tap, and they're inside—no downloads, no accounts, and no barriers to engagement.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative group px-4 md:px-0">
                <div className="relative h-[240px] md:h-[300px] lg:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/mobile-accessibility.png"
                    alt="Virtual tour experience on a mobile device"
                    fill
                    className="object-cover transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Beyond 360 / Detail Showcase Section */}
        <Section className="py-12 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none z-0" />
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              {/* Image Left */}
              <div className="relative group px-4 md:px-0">
                <div className="relative h-[240px] md:h-[300px] lg:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/interior-details.png"
                    alt="High-fidelity interior rendering details"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

              {/* Text Right */}
              <div className="flex flex-col justify-center py-2 px-6 md:px-0">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter heading-gradient leading-tight">
                  Beyond 360. <br />
                  <span className="text-brand-primary">Total Exploration.</span>
                </h2>
                
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                    Static panoramas only tell half the story. Our walkthroughs offer complete freedom of movement.
                  </p>
                  
                  <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                    Navigate every square inch of your property with photorealistic precision. From the grain of the floorboards to the play of shadows on the walls, every detail is rendered in real-time, giving your audience a true sense of presence and atmosphere.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Pre-Construction / 3D Model Section */}
        <Section className="py-12 relative overflow-hidden">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none z-0" />
          <Container className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              <div className="order-2 lg:order-1 flex flex-col justify-center py-2 px-6 md:px-0">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tighter heading-gradient leading-tight">
                  Pre-Construction. <br />
                  <span className="text-brand-primary">Post-Reality.</span>
                </h2>
                
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-white font-light leading-relaxed">
                    Sell the future before the first brick is laid. Experience upcoming developments today.
                  </p>
                  
                  <p className="text-base md:text-lg text-white/70 font-light leading-relaxed">
                    Our 3D model-based tours allow clients to walk through upcoming projects with total immersion. Eliminate site visits by letting buyers see, feel, and understand finished properties directly from their blueprints.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 relative group px-4 md:px-0">
                <div className="relative h-[240px] md:h-[300px] lg:h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/pre-construction-tour.png"
                    alt="3D model tour visualization"
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Mobile Showcase */}
        <Section className="py-24 bg-transparent border-t border-white/5 overflow-hidden">
          <Container>
            <div className="fade-in-section grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-12 text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase tracking-tight heading-gradient">
                  Optimized for <span className="text-brand-primary">Mobile Experience</span>
                </h2>
                <p className="text-white max-w-3xl mx-auto font-light leading-relaxed">
                  Most buyers are on mobile. Your virtual tours should work flawlessly on every screen—without compromising performance.

                </p>
              </div>

              <div className="lg:col-span-12 w-full flex items-center justify-center gap-4 md:gap-8 overflow-visible py-12">
                {/* Phone 1 */}
                <div className="transform translate-y-8 opacity-80 hover:opacity-100 transition-opacity">
                  <MobileMockup imageUrl="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&h=1200&q=80" />
                </div>

                {/* Phone 2 - Main */}
                <div className="transform z-20 scale-110 shadow-[0_0_50px_rgba(0,255,26,0.2)] ring-1 ring-brand-primary/30 rounded-[3rem]">
                  <MobileMockup imageUrl="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=600&h=1200&q=80">
                    <div className="absolute inset-0 bg-black/60 flex flex-col justify-end p-6">
                      <div className="flex justify-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-brand-primary/20 backdrop-blur flex items-center justify-center border border-brand-primary/50"><Sparkles className="w-4 h-4 text-brand-primary" /></div>
                      </div>
                    </div>
                  </MobileMockup>
                </div>

                {/* Phone 3 */}
                <div className="transform translate-y-8 opacity-80 hover:opacity-100 transition-opacity">
                  <MobileMockup imageUrl="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&h=1200&q=80" />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </main>
  );
}


