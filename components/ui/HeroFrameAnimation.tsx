'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

// Total scroll height for the hero (in vh units)
const HERO_SCROLL_HEIGHT = '310vh';

interface FrameData {
    sequence1: { count: number; files: string[]; basePath: string };
}

export default function HeroFrameAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const canvasWrapperRef = useRef<HTMLDivElement>(null);

    // Removed old lock code to avoid duplication

    // Refs for animation state (avoid re-renders)
    const seq1ImagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef({ index: 0 });
    const animFrameRef = useRef<number>(0);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isReady, setIsReady] = useState(false);

    // Overlay refs
    const titleOverlayRef = useRef<HTMLDivElement>(null);
    const blurOverlayRef = useRef<HTMLDivElement>(null);
    const textOverlayRef = useRef<HTMLDivElement>(null);
    const blackOverlayRef = useRef<HTMLDivElement>(null);
    const ambientGlowsRef = useRef<HTMLDivElement>(null);

    // Intro Sequence State
    // 0 = Init/Fade Title
    // 1 = Typewriter typing
    // 2 = Canvas/Glows fade in
    // 3 = Scroll Unlocked
    const [loadStage, setLoadStage] = useState(0);
    const introCompleteRef = useRef(false);

    // Lock scrolling globally until loadStage 3
    const lenis = useLenis();
    useEffect(() => {
        if (!lenis) return;
        if (loadStage < 3) {
            lenis.stop();
        } else {
            introCompleteRef.current = true;
            lenis.start();
            // Dispatch a window event to let other components know intro is done
            window.dispatchEvent(new Event('heroIntroComplete'));
        }
    }, [lenis, loadStage]);

    // Mouse parallax handler for depth-based cursor tracking
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mouseRef.current = {
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
        };
    }, []);

    // Draw function — ENHANCED with 1.2x scale for bolder, more immersive frames
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const images = seq1ImagesRef.current;
        const clampedIndex = Math.max(0, Math.min(index, images.length - 1));
        const img = images[clampedIndex];

        if (!img || !img.complete || img.naturalWidth === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const cssW = canvas.width / dpr;
        const cssH = canvas.height / dpr;

        ctx.clearRect(0, 0, cssW, cssH);

        const imgW = img.naturalWidth;
        const imgH = img.naturalHeight;

        // 1.0x scale: frames are now smaller and better fit the viewport
        const scale = Math.min(cssW / imgW, cssH / imgH) * 1.0;
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
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

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

                const loadImage = (src: string): Promise<HTMLImageElement> => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => resolve(img);
                        img.onerror = reject;
                        img.src = src;
                    });
                };

                const seq1Promises = data.sequence1.files.map((f: string) =>
                    loadImage(f)
                );

                // Filter to start from index 8 onwards
                const seq1Images = (await Promise.all(seq1Promises)).slice(8);

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

        resizeCanvas();
        drawFrame(0);

        window.addEventListener('resize', resizeCanvas);

        const container = containerRef.current;
        const canvasWrapper = canvasWrapperRef.current;
        const titleOverlay = titleOverlayRef.current;
        const blurOverlay = blurOverlayRef.current;
        const textOverlay = textOverlayRef.current;
        const blackOverlay = blackOverlayRef.current;

        if (!container || !canvasWrapper || !titleOverlay || !blurOverlay || !textOverlay || !blackOverlay) return;

        // Abstracted rendering logic
        const updateFrame = (progress: number) => {
            const totalFrames = seq1ImagesRef.current.length;
            if (totalFrames === 0) return;

            // Cursor-based parallax (subtle depth reaction)
            const mx = mouseRef.current.x * 12;
            const my = mouseRef.current.y * 8;

            // ────────────────────────────────────────────────
            // PHASE A: Title Fade-Out + Headset Centers (0% → 13%)
            // ────────────────────────────────────────────────
            if (progress < 0.13) {
                const p = progress / 0.13; // 0 → 1

                // Title: Only allow ScrollTrigger to manipulate the title opacity/transform
                // IF the intro timeline is fully complete, preventing collision glitches.
                if (introCompleteRef.current) {
                    titleOverlay.style.opacity = `${1 - p}`;
                    titleOverlay.style.transform = `translateY(${-p * 40}px)`;
                }
                canvasWrapper.style.transform = `scale(1.0) translate(${mx}px, ${my}px)`;

                // Hold first frame, blur active
                drawFrame(0);
                blackOverlay.style.opacity = '0';
                textOverlay.style.opacity = '0';

                blurOverlay.style.backdropFilter = 'blur(4px)';
                (blurOverlay.style as any).webkitBackdropFilter = 'blur(4px)';
                blurOverlay.style.opacity = '1';

                // ────────────────────────────────────────────────
                // PHASE B: Frame Sequence Animation (13% → 84%)
                // ────────────────────────────────────────────────
            } else if (progress < 0.84) {
                if (introCompleteRef.current) {
                    titleOverlay.style.opacity = '0';
                }

                const p = (progress - 0.13) / 0.71; // 0 → 1
                const frameIndex = Math.floor(p * (totalFrames - 1));

                // Canvas centered with only parallax
                canvasWrapper.style.transform = `scale(1.0) translate(${mx}px, ${my}px)`;

                drawFrame(frameIndex);
                blackOverlay.style.opacity = '0';
                textOverlay.style.opacity = '0';

                // Blur: cinematic rack-focus fade (frames 140 → 190)
                const BLUR_START = 140;
                const BLUR_END = 190;

                if (frameIndex <= BLUR_START) {
                    blurOverlay.style.backdropFilter = 'blur(4px)';
                    (blurOverlay.style as any).webkitBackdropFilter = 'blur(4px)';
                    blurOverlay.style.opacity = '1';
                } else if (frameIndex < BLUR_END) {
                    const pFade = (frameIndex - BLUR_START) / (BLUR_END - BLUR_START);
                    const blurVal = 4 * (1 - pFade);
                    blurOverlay.style.backdropFilter = `blur(${blurVal}px)`;
                    (blurOverlay.style as any).webkitBackdropFilter = `blur(${blurVal}px)`;
                    blurOverlay.style.opacity = `${1 - pFade}`;
                } else {
                    blurOverlay.style.backdropFilter = 'blur(0px)';
                    (blurOverlay.style as any).webkitBackdropFilter = 'blur(0px)';
                    blurOverlay.style.opacity = '0';
                }

                // ────────────────────────────────────────────────
                // PHASE C: Mission Statement (84% → 100%)
                // ────────────────────────────────────────────────
            } else {
                if (introCompleteRef.current) {
                    titleOverlay.style.opacity = '0';
                }
                canvasWrapper.style.transform = `scale(1.0) translate(${mx}px, ${my}px)`;
                drawFrame(totalFrames - 1);

                const p = (progress - 0.84) / 0.16; // 0 → 1

                // Staged: black fades in, then text reveals
                if (p < 0.3) {
                    const blackP = p / 0.3;
                    blackOverlay.style.opacity = `${blackP}`;
                    textOverlay.style.opacity = '0';
                } else if (p < 0.8) {
                    blackOverlay.style.opacity = '1';
                    const textP = (p - 0.3) / 0.5;
                    textOverlay.style.opacity = `${textP}`;
                } else {
                    blackOverlay.style.opacity = '1';
                    textOverlay.style.opacity = '1';
                }

                blurOverlay.style.backdropFilter = 'blur(0px)';
                (blurOverlay.style as any).webkitBackdropFilter = 'blur(0px)';
                blurOverlay.style.opacity = '0';
            }
        };

        const st = ScrollTrigger.create({
            trigger: container,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
            onUpdate: (self) => updateFrame(self.progress)
        });

        // ─── Intro Sequence Animation Timeline ──────────────────────
        const introTl = gsap.timeline({
            onComplete: () => setLoadStage(3)
        });

        // Initial hidden states
        gsap.set(titleOverlay, { opacity: 0, y: -40 });
        gsap.set(canvasWrapper, { opacity: 0 });
        if (ambientGlowsRef.current) gsap.set(ambientGlowsRef.current, { opacity: 0 });

        // Step A (0.0s -> 1.5s): Title slowly fades in and drifts down to 0
        introTl.to(titleOverlay, {
            opacity: 1, y: 0, duration: 1.5, ease: "power2.out"
        }, 0);

        // Step B (1.5s): TypewriterText begins typing via state flip
        introTl.call(() => setLoadStage(1), [], 1.5);

        // Step C (3.0s -> 4.5s): Background VR Frame & Orbs fade in 
        introTl.to(canvasWrapper, {
            opacity: 1, duration: 1.5, ease: "power2.inOut"
        }, 3.0);
        if (ambientGlowsRef.current) {
            introTl.to(ambientGlowsRef.current, {
                opacity: 1, duration: 1.5, ease: "power2.inOut"
            }, 3.0);
        }

        // Dispatch a custom event so navbar knows to hide originally
        const navEvent = new CustomEvent('heroScrollProgress', { detail: { active: true } });
        window.dispatchEvent(navEvent);

        const currentAnimFrame = animFrameRef.current;

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (currentAnimFrame) cancelAnimationFrame(currentAnimFrame);
            introTl.kill();
            st.kill();
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
                className="sticky top-0 w-full h-screen overflow-hidden bg-transparent"
                style={{ zIndex: 20 }}
                onMouseMove={handleMouseMove}
            >
                {/* ── Canvas Wrapper: scroll-driven transform + parallax ── */}
                <div
                    ref={canvasWrapperRef}
                    className="absolute inset-0"
                    style={{
                        transform: 'translateY(0vh) scale(1.0)',
                        willChange: 'transform',
                    }}
                >
                    {/* Floating inner layer (CSS animation — subtle oscillation) */}
                    <div className="absolute inset-0 hero-float-animation">
                        {/* The Canvas */}
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full bg-transparent"
                            style={{ background: 'transparent' }}
                        />

                        {/* Holographic light sweep across the headset surface */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
                            <div
                                className="absolute top-0 left-0 w-[25%] h-full hero-holo-sweep"
                                style={{
                                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ── Blur Overlay (phase 1 & 2 rack focus) ── */}
                <div
                    ref={blurOverlayRef}
                    className="absolute inset-0 z-10"
                    style={{
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        background: 'rgba(0,0,0,0.3)',
                    }}
                />

                {/* ── Title Overlay — TOP CENTER (phase 1) ── */}
                <div
                    ref={titleOverlayRef}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 opacity-0"
                >
                    <div className="text-center w-full max-w-7xl mx-auto overflow-visible">
                        <h1 className="inline-block pr-6 pl-2 py-4 text-[clamp(1.8rem,8vw,6rem)] font-bold tracking-tighter leading-tight text-brand-primary heading-gradient">
                            GenXReality
                        </h1>
                        <TypewriterText text="Beyond Boundaries" startTyping={loadStage >= 1} />
                        <div className="mt-10 animate-bounce">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-white">
                                <path d="M12 5v14M19 12l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* ── Ambient Glow Orbs (visible throughout, depth feel) ── */}
                <div ref={ambientGlowsRef} className="absolute inset-0 pointer-events-none z-[5] opacity-0">
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: 'min(350px, 80vw)', height: 'min(350px, 80vw)',
                            background: 'radial-gradient(circle, rgba(0,255,26,0.06) 0%, transparent 70%)',
                            top: '15%', left: '10%',
                            filter: 'blur(40px)',
                            animation: 'heroFloat 10s ease-in-out infinite',
                        }}
                    />
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: 'min(250px, 60vw)', height: 'min(250px, 60vw)',
                            background: 'radial-gradient(circle, rgba(0,255,26,0.05) 0%, transparent 70%)',
                            bottom: '20%', right: '15%',
                            filter: 'blur(35px)',
                            animation: 'heroFloat 8s ease-in-out infinite',
                            animationDelay: '2s',
                        }}
                    />
                </div>

                {/* ── Black overlay with animated particles (phase 3) ── */}
                <div
                    ref={blackOverlayRef}
                    className="absolute inset-0"
                    style={{ opacity: 0, zIndex: 15 }}
                >
                    {/* Base dark background */}
                    <div className="absolute inset-0 bg-black/95" />

                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,255,26,0.03) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,255,26,0.03) 1px, transparent 1px)
                            `,
                            backgroundSize: '60px 60px',
                        }}
                    />

                    {/* Floating glowing orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: 'min(400px, 80vw)', height: 'min(400px, 80vw)',
                                background: 'radial-gradient(circle, rgba(0,255,26,0.3) 0%, rgba(0,255,26,0.1) 40%, transparent 70%)',
                                top: '10%', left: '15%',
                                animation: 'floatOrb1 12s ease-in-out infinite',
                                boxShadow: '0 0 40px rgba(0,255,26,0.1)',
                            }}
                        />
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: 'min(300px, 70vw)', height: 'min(300px, 70vw)',
                                background: 'radial-gradient(circle, rgba(0,204,21,0.3) 0%, rgba(0,204,21,0.1) 40%, transparent 70%)',
                                bottom: '15%', right: '10%',
                                animation: 'floatOrb2 10s ease-in-out infinite',
                                boxShadow: '0 0 50px rgba(0,204,21,0.15)',
                            }}
                        />
                        <div
                            className="absolute rounded-full"
                            style={{
                                width: 'min(200px, 50vw)', height: 'min(200px, 50vw)',
                                background: 'radial-gradient(circle, rgba(0,255,26,0.1) 0%, transparent 60%)',
                                top: '50%', left: '60%',
                                animation: 'floatOrb3 8s ease-in-out infinite',
                            }}
                        />
                    </div>

                    {/* Vignette effect */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
                        }}
                    />

                    {/* CSS Keyframes for phase 3 orbs */}
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
                    `}</style>
                </div>

                {/* ── Mission Text Overlay (phase 3) ── */}
                <div
                    ref={textOverlayRef}
                    className="absolute inset-0 z-20 flex items-center justify-center px-6"
                    style={{ opacity: 0 }}
                >
                    <div className="text-center max-w-4xl mx-auto p-8 md:p-12">
                        <h2 className="text-[clamp(1.1rem,4vw,3.5rem)] font-bold tracking-tighter mb-6 text-white"
                        >
                            XR THAT DRIVES REAL RESULTS

                        </h2>
                        <p className="text-base sm:text-lg text-white mb-6 leading-relaxed">
                            We create immersive solutions that help businesses sell faster, train smarter, and operate better using advanced VR and AI technologies.

                        </p>
                        <p className="text-sm sm:text-base text-white leading-relaxed">

                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TypewriterText({ text, startTyping }: { text: string, startTyping: boolean }) {
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

        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible || !startTyping) return;

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
    }, [text, isVisible, startTyping]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="-mt-2 text-[clamp(1rem,2vw,1.5rem)] text-white max-w-3xl mx-auto leading-relaxed h-[36px] text-center"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
            <span>{displayedText}</span><span className={`text-brand-primary font-bold transition-opacity duration-75 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
        </div>
    );
}
