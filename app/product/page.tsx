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
        } catch(err) {
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
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '#features',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section 
        ref={heroRef} 
        className="relative h-screen flex items-center justify-center overflow-hidden select-none"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <motion.div style={{ y, opacity }} className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 uppercase">
              GENX ONE
            </h1>
            <p className="text-xl md:text-2xl text-brand-primary font-mono mt-4 uppercase tracking-widest">
              Enterprise-Grade, High-Performance VR
            </p>
          </motion.div>

          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-brand-primary text-black hover:bg-brand-secondary font-bold uppercase tracking-wider">
                Pre-order Now
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Background Canvas Video */}
        <div className="absolute inset-0 -z-10 bg-black">
          <video 
            ref={videoRef}
            src="/plots.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hidden"
          />
          <canvas 
            ref={canvasRef}
            className="w-full h-full opacity-60 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />
        </div>
      </section>

      {/* Product Vision */}
      <Section id="product" className="bg-zinc-900/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">Innovations & <br /><span className="text-brand-primary">Showcase.</span></h2>
              <p className="text-lg text-white/70 mb-6 font-light leading-relaxed">
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
            <div className="relative aspect-square rounded-2xl overflow-hidden glass-panel border-brand-primary/20 bg-black">
              <Image
                src="https://picsum.photos/seed/vrtech/800/800"
                alt="Technology"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Grid */}
      <Section id="features">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 uppercase">Technical Specifications</h2>
            <p className="text-white/60">Engineered for absolute performance without compromise.</p>
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
      <h3 className="text-white/60 text-sm uppercase tracking-wider mb-1">{title}</h3>
      <div className="text-2xl font-bold mb-2">{value}</div>
      <p className="text-white/50 text-sm">{description}</p>
    </div>
  );
}
