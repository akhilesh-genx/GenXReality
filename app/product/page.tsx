'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Eye, Brain, Thermometer, Battery, Layers, Cpu, ChevronRight, Zap } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export default function ProductPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in sections smoothly
      gsap.utils.toArray('.scroll-reveal').forEach((elem: any) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
      // Showcase images stagger
      gsap.from('.showcase-image', {
        scrollTrigger: {
          trigger: '.showcase-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={containerRef} className="w-full bg-transparent overflow-x-hidden">
      {/* ── HERO SECTION ── */}
      <section
        ref={heroRef}
        className="relative h-[85vh] md:h-screen flex items-center justify-center overflow-hidden bg-black select-none w-full pt-20"
      >
        {/* Overlay Text */}
        <div className="absolute inset-0 flex flex-col items-start justify-center z-10 px-8 md:px-24 pointer-events-none">
          <div className="z-20 pointer-events-auto flex flex-col items-start">
            <div className="font-bricolage text-[clamp(68px,14vw,200px)] leading-[0.8] mb-4 font-black tracking-[0.02em] flex items-center uppercase ml-[-0.05em]">
              {/* GENX */}
              <span style={{ color: "#00ff1A" }}>GENX</span>
              {/* EDU - fake outline using shadows */}
              <span
                style={{
                  color: "#000000",
                  letterSpacing: "0.08em",
                  textShadow: `2px 0 #00ff1A, -2px 0 #00ff1A, 0 2px #00ff1A, 0 -2px #00ff1A, 2px 2px #00ff1A, -2px -2px #00ff1A, 2px -2px #00ff1A, -2px 2px #00ff1A, 0 0 10px rgba(0,255,26,0.6)`
                }}
              >
                EDU
              </span>
            </div>

            <h2 className="text-brand-primary text-[clamp(14px,1.8vw,28px)] font-medium mb-6 tracking-[0.25em] uppercase font-bricolage px-1">
              AI-Powered VR Learning Platform
            </h2>

            <p className="font-bricolage text-[18px] sm:text-[22px] md:text-[28px] text-white text-left max-w-xl leading-[1.3] font-medium mb-3 px-1">
              Affordable, AI-powered VR for real-world training, design, and education
            </p>

            <p className="text-white/50 text-[clamp(11px,1vw,14px)] font-medium uppercase tracking-[0.15em] mb-10 px-1 border-l-2 border-brand-primary/30 pl-2">
              Built for students, architects, developers, and enterprises
            </p>

            <div className="flex flex-wrap gap-4 md:gap-5 px-1">
              <Button href="/contact" size="lg" className="px-8 md:px-10 h-12 md:h-14 text-base md:text-lg bg-brand-primary text-black hover:bg-brand-primary/90 transition-all duration-500 shadow-[0_0_20px_rgba(0,255,26,0.3)]">
                Get Demo
              </Button>
              <Button href="/services/3d-virtual-tours" size="lg" variant="outline" className="px-8 md:px-10 h-12 md:h-14 text-base md:text-lg border-brand-primary text-brand-primary hover:bg-brand-primary/10 transition-all duration-500">
                View Experiences
              </Button>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full z-0 pointer-events-none hidden md:block">
          <Image
            src="/VR-images/VR-right.png"
            alt="GenXReality Premium VR Headset"
            fill
            className="object-contain object-right scale-90"
            priority
          />
        </div>
      </section>
      {/* ── PRODUCT SHOWCASE ── */}
      <Section
        id="showcase"
        className="pt-8 md:pt-16 pb-12 bg-transparent relative overflow-hidden group/showcase"
      >
        {/* Background Particles */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover/showcase:opacity-70 transition-opacity duration-1000">
          <SectionParticles />
        </div>

        <Container className="relative z-10">
          {/* Title */}
          <div className="scroll-reveal text-center mb-12 md:mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase tracking-tight text-white">
              Designed for Real-World <span className="text-brand-primary">VR</span> Applications
            </h2>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
              Built for learning, architecture walkthroughs, and immersive real-world simulations.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {/* CARD 1 — Front Profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-10 md:p-16 rounded-[4rem] bg-black/60 backdrop-blur-2xl border border-white/10 flex flex-col items-center hover:bg-black/80 hover:border-brand-primary/60 transition-all duration-700 shadow-2xl group hover:-translate-y-4 hover:shadow-brand-primary/20 transform-gpu"
            >
              <div className="mb-10 w-full flex justify-center">
                <Image
                  src="/ezgif-upscaled/ezgif-frame-060.jpg"
                  alt="Front Profile"
                  width={380}     // Increased size
                  height={280}
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide text-center group-hover:text-brand-primary transition-colors duration-300">
                VR Hardware Design
              </h3>
            </motion.div>

            {/* CARD 2 — Industrial Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-10 md:p-16 rounded-[4rem] bg-black/60 backdrop-blur-2xl border border-white/10 flex flex-col items-center hover:bg-black/80 hover:border-brand-primary/60 transition-all duration-700 shadow-2xl group hover:-translate-y-4 hover:shadow-brand-primary/20 transform-gpu"
            >
              <div className="mb-10 w-full flex justify-center">
                <Image
                  src="/Industrial_Design.webp"
                  alt="Industrial Design"
                  width={380}     // Increased size
                  height={280}
                  className="object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide text-center group-hover:text-brand-primary transition-colors duration-300">
                VR Walkthrough Experiences
              </h3>
            </motion.div>

            {/* CARD 3 — Advanced Optics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-14 md:p-16 rounded-[4rem] bg-black/60 backdrop-blur-2xl border border-white/10 flex flex-col items-center hover:bg-black/80 hover:border-brand-primary/60 transition-all duration-700 shadow-2xl group hover:-translate-y-4 hover:shadow-brand-primary/20 transform-gpu"
            >
              {/* Removed extra white pill background and border effect */}
              <div className="mb-10 w-full flex justify-center">
                <Image
                  src="/advanced_Optics.png"
                  alt="Advanced Optics"
                  width={420}     // Largest size for right image
                  height={300}
                  className="object-contain brightness-[1.4] contrast-[1.1] group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <h3 className="text-2xl font-bold text-white tracking-wide text-center group-hover:text-brand-primary transition-colors duration-300">
                Immersive Visual System
              </h3>
            </motion.div>
          </div>
        </Container>
      </Section>
      {/* ── HIGHLIGHTS SECTION ── */}
      <Section id="highlights" className="pt-6 pb-12 md:pb-24 bg-transparent relative overflow-hidden group/highlights">
        {/* Local Particle Effect */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 group-hover/highlights:opacity-70 transition-opacity duration-1000">
          <SectionParticles />
        </div>
        <Container>
          {/* Headset Image Placeholder */}
          <div className="scroll-reveal flex justify-center mb-6">
            <div className="relative w-full max-w-2xl aspect-[2/1]">
              <Image
                src="/VR-Images/v3.png"
                alt="Headset Highlight"
                fill
                className="object-contain"
              />
            </div>
          </div>
          {/* Title */}
          <div className="scroll-reveal text-center mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Powerful, Scalable, and Built for Performance
            </h2>
          </div>
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            <FeatureCard
              icon={<Zap className="w-10 h-10" />}
              title="Performance"
              items={[
                { text: "Optimized for smooth and stalbe VR experiences" },

              ]}
            />
            <FeatureCard
              icon={<Eye className="w-10 h-10" />}
              title="Optics"
              items={[
                { text: "Designed for clear visuals using cost-efficient lens systems" },

              ]}
            />
            <FeatureCard
              icon={<Battery className="w-10 h-10" />}
              title="Battery & storage"
              items={[
                { text: "PC-powered system ensuring consistent performance" },

              ]}
            />
            <FeatureCard
              icon={<Layers className="w-10 h-10" />}
              title="Pass-through"
              items={[

                { text: "Enables interaction between real and visual environments" }
              ]}
            />
          </div>
        </Container>
      </Section>
      {/* ── TECHNICAL SPECIFICATIONS ── */}
      <Section id="specs" className="pt-4 pb-16 md:pt-8 md:pb-24 relative z-20 border-t border-white/5 bg-black/40">

        <Container className="relative z-10">
          <div className="scroll-reveal text-center mb-12 md:mb-24 max-w-3xl mx-auto">
            <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-bold mb-6 uppercase tracking-tight text-white">
              Core Technology & <span className="text-brand-primary">Capabilites</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
              Built with scalable technology for VR, AI, and real-world applications.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            <SpecCard
              delay={0.1}
              icon={<Eye className="w-8 h-8" />}
              subtitle="High-Resolution VR Display"
              description="Uncompromising high-resolution visual fidelity."
            />
            <SpecCard
              delay={0.2}
              icon={<Brain className="w-8 h-8" />}
              subtitle="AI-Powered Processing"
              description="Enhanced user experiences through intelligent computing."
            />
            <SpecCard
              delay={0.3}
              icon={<Thermometer className="w-8 h-8" />}
              subtitle="Efficient System Design"
              description="Optimized hardware design for extended usage."
            />
            <SpecCard
              delay={0.4}
              icon={<Battery className="w-8 h-8" />}
              subtitle="Optimized Power Usage"
              description="Long-lasting power for immersive sessions."
            />
            <SpecCard
              delay={0.5}
              icon={<Layers className="w-8 h-8" />}
              subtitle="Hardware & software Integration"
              description="Software and hardware working in harmony."
            />
            <SpecCard
              delay={0.6}
              icon={<Cpu className="w-8 h-8" />}
              subtitle="Reliable System Architecture"
              description="State-of-the-art components for maximum reliability."
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
function SpecCard({ icon, subtitle, description, delay = 0 }: { icon: React.ReactNode, subtitle: string, description: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="group relative p-8 md:p-10 rounded-[4rem] bg-black/60 backdrop-blur-2xl border border-white/10 hover:border-brand-primary/40 hover:bg-black/80 transition-all duration-700 hover:-translate-y-4 overflow-hidden shadow-2xl transform-gpu"
    >

      <div className="mb-8 inline-flex p-5 rounded-2xl bg-white/10 text-brand-primary group-hover:scale-105 transition-transform duration-500">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-brand-primary transition-colors">{subtitle}</h3>
        <p className="text-white/70 leading-relaxed font-light text-lg">{description}</p>
      </div>
    </motion.div>
  );
}
function SectionParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
    }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };
    const initParticles = () => {
      particles = [];
      const count = Math.floor((canvas.width * canvas.height) / 40000);
      for (let i = 0; i < count; i++) {
        const baseOpacity = Math.random() * 0.3 + 0.1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          opacity: baseOpacity,
          baseOpacity: baseOpacity
        });
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let glow = 0;
        const glowRadius = 200;
        
        // Disable glow on mobile/tablet (touch devices)
        const isMobile = window.innerWidth < 1024;
        if (!isMobile && dist < glowRadius) {
          glow = (1 - dist / glowRadius) ** 2;
        }

        const size = p.size * (1 + glow * 1.5);
        const opacity = p.baseOpacity + glow * 0.6;

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

        if (glow > 0.1) {
          ctx.shadowBlur = 8 * glow;
          ctx.shadowColor = 'rgba(0, 255, 26, 0.8)';
        }

        ctx.fillStyle = `rgba(0, 255, 26, ${opacity})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    resize();
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
}
function FeatureCard({ icon, title, items }: { icon: React.ReactNode, title: string, items: { text: string, subtext?: string }[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-10 md:p-12 rounded-[4rem] bg-black/60 backdrop-blur-2xl border border-white/10 flex flex-col min-h-[320px] hover:bg-black/80 hover:border-brand-primary/60 transition-all duration-700 shadow-2xl group hover:-translate-y-4 hover:shadow-brand-primary/20 transform-gpu"
    >
      <div className="mb-6 text-brand-primary group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-brand-primary mb-6 tracking-tight leading-tight">
        {title}
      </h3>
      <div className="space-y-6 flex-grow">
        {items.map((item, idx) => (
          <div key={idx} className="group/item">
            <p className="text-[17px] font-medium text-white/90 leading-relaxed">
              {item.text}
            </p>
            {item.subtext && (
              <p className="text-[13px] text-white/40 mt-2 font-normal leading-snug italic">
                {item.subtext}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
