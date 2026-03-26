'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

// Total scroll height for the hero (in vh units)
const HERO_SCROLL_HEIGHT = '400vh';

interface FrameData {
    sequence1: { count: number; files: string[]; basePath: string };
}

export default function HeroFrameAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);

    // Lock scrolling until the intro sequence completes
    const lenis = useLenis();
    const hasLocked = useRef(false);

    useEffect(() => {
        if (lenis && !hasLocked.current) {
            hasLocked.current = true;
            lenis.stop();
            // 2.5s typewriter duration = 2500ms
            const unlockTimeout = setTimeout(() => {
                lenis.start();
            }, 2500);

            return () => {
                clearTimeout(unlockTimeout);
                lenis.start();
            };
        }
    }, [lenis]);

    // Refs for animation state (avoid re-renders)
    const seq1ImagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef({ index: 0 });
    const animFrameRef = useRef<number>(0);
    const [isReady, setIsReady] = useState(false);

    // Overlay refs
    const titleOverlayRef = useRef<HTMLDivElement>(null);
    const blurOverlayRef = useRef<HTMLDivElement>(null);
    const textOverlayRef = useRef<HTMLDivElement>(null);
    const blackOverlayRef = useRef<HTMLDivElement>(null);

    // Draw function
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const images = seq1ImagesRef.current;
        const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
        const img = images[clampedIndex];

        if (!img || !img.complete || img.naturalWidth === 0) return;

        // Use CSS pixel dimensions (context is already scaled by dpr via setTransform)
        const dpr = window.devicePixelRatio || 1;
        const cssW = canvas.width / dpr;
        const cssH = canvas.height / dpr;

        // Clear the full canvas in CSS coordinate space
        ctx.clearRect(0, 0, cssW, cssH);

        // Calculate object-fit: contain sizing to center the image
        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        const scale = Math.min(cssW / imgW, cssH / imgH);
        const scaledW = imgW * scale;
        const scaledH = imgH * scale;
        const offsetX = (cssW - scaledW) / 2;
        const offsetY = (cssH - scaledH) / 2;

        ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
        currentFrameRef.current = { index: clampedIndex };
    }, []);

    // Resize canvas for high-DPI
    const resizeCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        const sticky = stickyRef.current;
        if (!canvas || !sticky) return;

        const dpr = window.devicePixelRatio || 1;
        const rect = sticky.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            // Fix: reset and scale properly
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        // Redraw current frame
        const { index } = currentFrameRef.current;
        drawFrame(index);
    }, [drawFrame]);

    // Load all frames
    useEffect(() => {
        let cancelled = false;

        async function loadFrames() {
            try {
                const res = await fetch('/api/frames');
                const data: FrameData = await res.json();

                // Create image objects for both sequences
                const loadImage = (src: string): Promise<HTMLImageElement> => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                        img.src = src;
                    });
                };

                // Load all frames concurrently
                const seq1Promises = data.sequence1.files.map(f =>
                    loadImage(`${data.sequence1.basePath}/${f}`)
                );

                const seq1Images = await Promise.all(seq1Promises);

                if (cancelled) return;

                seq1ImagesRef.current = seq1Images;

                setIsReady(true);
            } catch (err) {
                console.error('Failed to load frame images:', err);
            }
        }

        loadFrames();
        return () => { cancelled = true; };
    }, []);

    // Setup canvas, resize listener, and GSAP ScrollTrigger
    useEffect(() => {
        if (!isReady) return;

        // Initial canvas setup
        resizeCanvas();
        drawFrame(0);

        // Resize listener
        window.addEventListener('resize', resizeCanvas);

        const container = containerRef.current;
        const titleOverlay = titleOverlayRef.current;
        const blurOverlay = blurOverlayRef.current;
        const textOverlay = textOverlayRef.current;

        const blackOverlay = blackOverlayRef.current;
        if (!container || !titleOverlay || !blurOverlay || !textOverlay || !blackOverlay) return;

        // Master ScrollTrigger
        const st = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            onUpdate: (self) => {
                const progress = self.progress; // 0 → 1
                const totalFrames = seq1ImagesRef.current.length;
                if (totalFrames === 0) return;

                // 1) Calculate logical frame index across the entire scroll
                let frameIndex = 0;
                if (progress >= 0.075 && progress < 0.60) {
                    const p = (progress - 0.075) / 0.525;
                    frameIndex = Math.floor(p * (totalFrames - 1));
                } else if (progress >= 0.60) {
                    frameIndex = totalFrames - 1;
                }

                // 2) Title logic (Phase 1: 0% → 7.5%)
                if (progress < 0.075) {
                    const p = progress / 0.075; // 0→1
                    titleOverlay.style.opacity = `${1 - p}`;
                } else {
                    titleOverlay.style.opacity = '0';
                }

                // 3) Blur logic based on frame index
                const BLUR_START_FADE_FRAME = 150;
                const BLUR_END_FADE_FRAME = 200; // fade out over 50 frames

                if (frameIndex <= BLUR_START_FADE_FRAME) {
                    blurOverlay.style.backdropFilter = 'blur(8px)';
                    (blurOverlay.style as any).webkitBackdropFilter = 'blur(8px)';
                    blurOverlay.style.opacity = '1';
                } else if (frameIndex < BLUR_END_FADE_FRAME) {
                    const pFade = (frameIndex - BLUR_START_FADE_FRAME) / (BLUR_END_FADE_FRAME - BLUR_START_FADE_FRAME);
                    const blurVal = 8 * (1 - pFade);
                    blurOverlay.style.backdropFilter = `blur(${blurVal}px)`;
                    (blurOverlay.style as any).webkitBackdropFilter = `blur(${blurVal}px)`;
                    blurOverlay.style.opacity = `${1 - pFade}`;
                } else {
                    blurOverlay.style.backdropFilter = 'blur(0px)';
                    (blurOverlay.style as any).webkitBackdropFilter = 'blur(0px)';
                    blurOverlay.style.opacity = '0';
                }

                // 4) Draw the frame and handle text/black overlays
                if (progress < 0.60) {
                    textOverlay.style.opacity = '0';
                    drawFrame(frameIndex);
                } else {
                    // Phase 3: Black screen + text (60% → 100%)
                    drawFrame(totalFrames - 1); // keep last frame drawn

                    const p = (progress - 0.60) / 0.40; // 0→1 within this phase

                    if (p < 0.15) {
                        const blackP = p / 0.15;
                        blackOverlay.style.opacity = `${blackP}`;
                        textOverlay.style.opacity = '0';
                    } else if (p < 0.35) {
                        blackOverlay.style.opacity = '1';
                        const textP = (p - 0.15) / 0.20;
                        textOverlay.style.opacity = `${textP}`;
                    } else {
                        blackOverlay.style.opacity = '1';
                        textOverlay.style.opacity = '1';
                    }
                }
            },
        });

        // Dispatch a custom event so navbar knows to hide
        const navEvent = new CustomEvent('heroScrollProgress', { detail: { active: true } });
        window.dispatchEvent(navEvent);

        const currentAnimFrame = animFrameRef.current;

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            st.kill();
            if (currentAnimFrame) cancelAnimationFrame(currentAnimFrame);
        };
    }, [isReady, resizeCanvas, drawFrame]);

    return (
        <div
            ref={containerRef}
            className="relative select-none"
            style={{ height: HERO_SCROLL_HEIGHT }}
            id="hero-frame-animation"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
        >
            {/* Sticky viewport */}
            <div
                ref={stickyRef}
                className="sticky top-0 w-full h-screen overflow-hidden"
                style={{ zIndex: 20 }}
            >
                {/* Canvas fading in after typewriter (2.5s delay + 2.5s fade) */}
                <motion.canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: '#000' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2.5, delay: 2.5, ease: "easeOut" }}
                />

                {/* Blur overlay (phase 1) */}
                <div
                    ref={blurOverlayRef}
                    className="absolute inset-0 z-10"
                    style={{
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        background: 'rgba(0,0,0,0.3)',
                    }}
                />

                {/* Title overlay (phase 1) */}
                <div
                    ref={titleOverlayRef}
                    className="absolute inset-0 z-20 flex items-center justify-center px-6"
                >
                    <div className="text-center max-w-5xl mx-auto">
                        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight text-brand-primary">
                            GenXReality
                        </h1>
                        <TypewriterText text="Powering the Future of Reality" />
                        <div className="mt-10 animate-bounce">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-white/50">
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Animated black overlay with particles (phase 3) */}
                <div
                    ref={blackOverlayRef}
                    className="absolute inset-0"
                    style={{ opacity: 0, zIndex: 15 }}
                >
                    {/* Base dark background */}
                    <div className="absolute inset-0 bg-black" />

                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,255,65,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,255,65,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Floating glowing orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Orb 1 - large, slow */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '400px', height: '400px',
                                background: 'radial-gradient(circle, rgba(0,255,65,0.15) 0%, rgba(0,255,65,0.05) 40%, transparent 70%)',
                                top: '10%', left: '15%',
                                animation: 'floatOrb1 12s ease-in-out infinite',
                            }}
                        />
                        {/* Orb 2 - medium */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '300px', height: '300px',
                                background: 'radial-gradient(circle, rgba(0,143,17,0.2) 0%, rgba(0,143,17,0.05) 40%, transparent 70%)',
                                bottom: '15%', right: '10%',
                                animation: 'floatOrb2 10s ease-in-out infinite',
                            }}
                        />
                        {/* Orb 3 - small accent */}
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: '200px', height: '200px',
                                background: 'radial-gradient(circle, rgba(0,255,65,0.1) 0%, transparent 60%)',
                                top: '50%', left: '60%',
                                animation: 'floatOrb3 8s ease-in-out infinite',
                            }}
                        />

                        {/* Animated particles — deterministic positions to avoid SSR hydration mismatch */}
                        {[
                            { s: 3, l: 5, t: 12, o: 0.4, d: 8, dl: 0.2 },
                            { s: 5, l: 22, t: 78, o: 0.7, d: 10, dl: 1.5 },
                            { s: 2, l: 45, t: 33, o: 0.5, d: 7, dl: 3.1 },
                            { s: 4, l: 67, t: 55, o: 0.6, d: 12, dl: 0.8 },
                            { s: 3, l: 88, t: 21, o: 0.3, d: 9, dl: 2.4 },
                            { s: 5, l: 12, t: 90, o: 0.8, d: 11, dl: 4.0 },
                            { s: 2, l: 34, t: 65, o: 0.4, d: 6, dl: 1.2 },
                            { s: 4, l: 56, t: 8, o: 0.7, d: 13, dl: 3.5 },
                            { s: 3, l: 78, t: 42, o: 0.5, d: 8, dl: 0.6 },
                            { s: 5, l: 91, t: 71, o: 0.6, d: 10, dl: 2.8 },
                            { s: 2, l: 15, t: 50, o: 0.3, d: 7, dl: 4.5 },
                            { s: 4, l: 38, t: 18, o: 0.8, d: 11, dl: 1.0 },
                            { s: 3, l: 60, t: 85, o: 0.4, d: 9, dl: 3.3 },
                            { s: 5, l: 82, t: 30, o: 0.7, d: 12, dl: 0.4 },
                            { s: 2, l: 8, t: 60, o: 0.5, d: 6, dl: 2.0 },
                            { s: 4, l: 28, t: 95, o: 0.6, d: 13, dl: 4.2 },
                            { s: 3, l: 50, t: 15, o: 0.3, d: 8, dl: 1.8 },
                            { s: 5, l: 72, t: 48, o: 0.8, d: 10, dl: 3.7 },
                            { s: 2, l: 95, t: 75, o: 0.4, d: 7, dl: 0.9 },
                            { s: 4, l: 42, t: 38, o: 0.7, d: 11, dl: 2.6 },
                        ].map((p, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full"
                                style={{
                                    width: `${p.s}px`,
                                    height: `${p.s}px`,
                                    background: i % 3 === 0 ? '#00ff41' : 'rgba(0,255,65,0.5)',
                                    left: `${p.l}%`,
                                    top: `${p.t}%`,
                                    opacity: p.o,
                                    animation: `particleFloat ${p.d}s ease-in-out infinite`,
                                    animationDelay: `${p.dl}s`,
                                }}
                            />
                        ))}
                    </div>

                    {/* Vignette effect */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
                        }}
                    />

                    {/* CSS Keyframes */}
                    <style>{`
                        @keyframes floatOrb1 {
                            0%, 100% { transform: translate(0, 0) scale(1); }
                            25% { transform: translate(30px, -40px) scale(1.05); }
                            50% { transform: translate(-20px, 20px) scale(0.95); }
                            75% { transform: translate(15px, 30px) scale(1.03); }
                        }
                        @keyframes floatOrb2 {
                            0%, 100% { transform: translate(0, 0) scale(1); }
                            33% { transform: translate(-40px, -30px) scale(1.08); }
                            66% { transform: translate(25px, 15px) scale(0.92); }
                        }
                        @keyframes floatOrb3 {
                            0%, 100% { transform: translate(0, 0); }
                            50% { transform: translate(-35px, 25px); }
                        }
                        @keyframes particleFloat {
                            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                            25% { opacity: 0.8; }
                            50% { transform: translateY(-30px) translateX(15px); opacity: 0.5; }
                            75% { opacity: 0.9; }
                        }
                    `}</style>
                </div>

                {/* Interstitial text overlay (phase 3) */}
                <div
                    ref={textOverlayRef}
                    className="absolute inset-0 z-20 flex items-center justify-center px-6"
                    style={{ opacity: 0 }}
                >
                    <div className="text-center max-w-4xl mx-auto p-8 md:p-12">
                        <h2
                            className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter mb-6"
                            style={{
                                background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            Transforming Industry With Uncompromising VR Technology
                        </h2>
                        <p className="text-base sm:text-lg text-white/70 mb-6 leading-relaxed">
                            We recognized the need for true enterprise-grade XR performance. We are committed to engineering unparalleled immersive experiences and unlocking advanced use cases for VR across diverse sectors.
                        </p>
                        <p className="text-sm sm:text-base text-white/50 leading-relaxed">
                            VR technology must be absolute in power and versatility. By engineering cutting-edge hardware, we unlock transformative opportunities in enterprise, healthcare, and professional training.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TypewriterText({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                    setDisplayedText(''); // Reset on scroll out
                }
            },
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i <= text.length) {
                setDisplayedText(text.slice(0, i));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 65); // Slower typing speed

        return () => clearInterval(typingInterval);
    }, [text, isVisible]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div 
            ref={containerRef}
            className="mt-4 text-lg sm:text-xl md:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed h-[36px] text-center"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
            <span>{displayedText}</span><span className={`text-brand-primary font-bold transition-opacity duration-75 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
        </div>
    );
}
