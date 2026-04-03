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
          drawWidth = canvas.width;
          drawHeight = canvas.width / videoRatio;
          startX = 0;
          startY = (canvas.height - drawHeight) / 2;
        } else {
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
    <main className="w-full min-h-screen bg-black overflow-x-hidden">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="/VR-Images/blurred-vr.webp"
            alt="3D Virtual Tours Architecture"
            fill
            className="hero-bg object-cover opacity-50"
            priority
          />
          
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
            className="absolute inset-0 w-full h-full object-cover z-10 opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-20" />
        <Container className="relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-[clamp(2rem,8vw,6rem)] font-bold mb-6 uppercase tracking-tighter leading-tight heading-gradient">
              3D Real Estate <br />
              <span className="text-brand-primary">Virtual Tours</span>
            </h1>
            <p className="text-lg md:text-2xl text-white max-w-2xl font-light leading-relaxed mb-8">
              Turn Property Listings into Interactive 3D Experiences That Sell Faster. <p className="text-lg md:text-s text-white max-w-xl font-light leading-relaxed mb-6"> Deliver high-quality, browser-based virtual tours that work instantly across devices-no apps, no friction.</p>
            </p>

            <Button>
              View Demo Tour
            </Button>
          </div>
        </Container>
      </section>

      <div className="content-wrap">
        {/* Core Features */}
        <Section className="py-24 border-t border-white/5">
          <Container>
            <div className="text-center mb-16 fade-in-section">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase heading-gradient">Key Features</h2>
              <p className="text-white max-w-2xl mx-auto">
                Built for real estate teams, developers, and architects to showcase, sell, and scale faster.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-section">
              <ServiceCard
                title="Browser Native"
                description="Zero friction loading. Our WebXR viewer works directly in Safari, Chrome, and Edge instantly."
                icon={<Smartphone className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
                delay={0}
              />
              <ServiceCard
                title="Photorealistic Quality"
                description="High-fidelity rendering ensures textures, lighting, and scale perfectly match the physical property."
                icon={<Sparkles className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80"
                delay={1}
              />
              <ServiceCard
                title="Spatial Floorplans"
                description="Integrated dollhouse views and dynamic spatial floorplans for ultimate navigation."
                icon={<Layers className="w-6 h-6" />}
                imageUrl="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80"
                delay={2}
              />
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col justify-end p-6">
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
