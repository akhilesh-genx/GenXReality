'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { usePathname } from 'next/navigation';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;          // natural drift velocity X
  baseVy: number;          // natural drift velocity Y
  size: number;
  baseOpacity: number;
  opacity: number;
  layer: number;           // 0 = far/dim, 1 = mid, 2 = near/bright
  glowIntensity: number;   // 0–1, driven by cursor proximity
  phaseOffset: number;     // random offset for pulsing
}

interface AnimatedBackgroundProps {
  className?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NEON = '0, 255, 26';       // #00FF1A — brand neon green
const ATTRACT_RADIUS = 200;      // px — cursor magnetic field radius
const ATTRACT_FORCE  = 0.055;    // acceleration per frame toward cursor
const LINK_DISTANCE  = 140;      // px — max distance for connecting lines
const DAMPING        = 0.91;     // velocity decay per frame (1 = no decay)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCount(): number {
  if (typeof window === 'undefined') return 110;
  const w = window.innerWidth;
  if (w < 640)  return 55;   // mobile
  if (w < 1024) return 80;   // tablet
  return 110;                // desktop
}

function makeParticle(W: number, H: number, index: number): Particle {
  const layer       = index % 3;                          // 0, 1, 2
  const speedBase   = 0.08 + (layer / 2) * 0.2;          // far=slow, near=faster
  const speed       = speedBase * (0.5 + Math.random());
  const angle       = Math.random() * Math.PI * 2;
  const vx          = Math.cos(angle) * speed;
  const vy          = Math.sin(angle) * speed;
  const baseOpacity = 0.18 + layer * 0.13 + Math.random() * 0.12;

  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx, vy,
    baseVx: vx,
    baseVy: vy,
    size:        1.1 + layer * 0.55 + Math.random() * 0.5,
    baseOpacity,
    opacity:     baseOpacity,
    layer,
    glowIntensity: 0,
    phaseOffset: Math.random() * Math.PI * 2,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className }) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef     = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
  const rafRef       = useRef<number>(0);
  const timeRef      = useRef(0);
  const isMobileRef  = useRef(false);
  
  const pathname     = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  // ── Init canvas & particles ──────────────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2× for perf
    const W   = window.innerWidth;
    const H   = window.innerHeight;

    canvas.width        = W * dpr;
    canvas.height       = H * dpr;
    canvas.style.width  = `${W}px`;
    canvas.style.height = `${H}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count    = getCount();
    particlesRef.current = Array.from({ length: count }, (_, i) => makeParticle(W, H, i));
  }, []);

  // ── Main render loop ─────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) { rafRef.current = requestAnimationFrame(draw); return; }

    const ctx = canvas.getContext('2d');
    if (!ctx)  { rafRef.current = requestAnimationFrame(draw); return; }

    if (!isVisibleRef.current) {
      rafRef.current = requestAnimationFrame(draw);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W   = canvas.width  / dpr;
    const H   = canvas.height / dpr;

    timeRef.current += 0.016;
    const t = timeRef.current;

    // Mouse speed (drives ripple burst strength)
    const m   = mouseRef.current;
    const dxM = m.x - m.prevX;
    const dyM = m.y - m.prevY;
    m.speed   = Math.min(Math.sqrt(dxM * dxM + dyM * dyM), 40);
    m.prevX   = m.x;
    m.prevY   = m.y;

    ctx.clearRect(0, 0, W, H);

    const ps = particlesRef.current;

    // ── Physics update ──────────────────────────────────────────────────
    for (const p of ps) {
      // Only apply cursor attraction on desktop (not mobile/tablet)
      if (!isMobileRef.current) {
        const dx   = m.x - p.x;
        const dy   = m.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACT_RADIUS && m.x > -1000) {
          const proximity   = 1 - dist / ATTRACT_RADIUS;
          p.glowIntensity = Math.min(1, p.glowIntensity + 0.1 * proximity);
        } else {
          p.glowIntensity = Math.max(0, p.glowIntensity - 0.035);
        }
      } else {
        // On mobile: no glow, particles just drift freely
        p.glowIntensity = 0;
      }

      // Damping + spring-return to natural drift velocity
      p.vx = p.vx * DAMPING + p.baseVx * (1 - DAMPING);
      p.vy = p.vy * DAMPING + p.baseVy * (1 - DAMPING);

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges (with buffer so particles don't pop)
      if (p.x < -25)    p.x = W + 25;
      else if (p.x > W + 25) p.x = -25;
      if (p.y < -25)    p.y = H + 25;
      else if (p.y > H + 25) p.y = -25;

      // Subtle pulsing opacity (gives "breathing" feel)
      const pulse = Math.sin(t * 0.9 + p.phaseOffset) * 0.045;
      p.opacity   = Math.min(0.95, p.baseOpacity + pulse + p.glowIntensity * 0.38);
    }

    // ── Draw connecting lines ────────────────────────────────────────────
    const linkDistSq = LINK_DISTANCE * LINK_DISTANCE;
    for (let i = 0; i < ps.length; i++) {
      const a = ps[i];
      for (let j = i + 1; j < ps.length; j++) {
        const b     = ps[j];
        const dx    = a.x - b.x;
        const dy    = a.y - b.y;
        const distSq = dx * dx + dy * dy;
        if (distSq > linkDistSq) continue;

        const proximity   = 1 - Math.sqrt(distSq) / LINK_DISTANCE;
        const avgOpacity  = (a.opacity + b.opacity) * 0.5;
        const glowBoost   = Math.max(a.glowIntensity, b.glowIntensity);
        const lineAlpha   = Math.min(0.55, proximity * 0.32 * avgOpacity + glowBoost * 0.18);

        ctx.strokeStyle = `rgba(${NEON}, ${lineAlpha})`;
        ctx.lineWidth   = 0.4 + glowBoost * 0.9;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    // ── Draw particles ───────────────────────────────────────────────────
    for (const p of ps) {
      // Outer glow halo — simple solid circle with alpha (no gradient)
      if (p.glowIntensity > 0.04) {
        const haloR = p.size * (3 + p.glowIntensity * 4);
        ctx.beginPath();
        ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NEON}, ${(p.glowIntensity * 0.12).toFixed(3)})`;
        ctx.fill();
      }

      // Core — always drawn
      const coreR = p.size * (1 + p.glowIntensity * 0.7);
      ctx.beginPath();
      ctx.arc(p.x, p.y, coreR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${NEON}, ${Math.min(0.95, p.opacity)})`;
      ctx.fill();
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  // ── Lifecycle ────────────────────────────────────────────────────────────
  useEffect(() => {
    // Detect mobile/tablet (< 1024px)
    const checkMobile = () => { isMobileRef.current = window.innerWidth < 1024; };
    checkMobile();

    initCanvas();

    const onMove = (e: MouseEvent) => {
      if (isMobileRef.current) return; // no cursor tracking on mobile
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const onLeave = () => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    const onResize = () => {
      checkMobile();
      // Reset mouse on mobile so particles aren't stuck attracted
      if (isMobileRef.current) {
        mouseRef.current.x = -9999;
        mouseRef.current.y = -9999;
      }
      cancelAnimationFrame(rafRef.current);
      initCanvas();
      rafRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove',  onMove,   { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize',     onResize, { passive: true });

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize',     onResize);
    };
  }, [initCanvas, draw]);

  // ── Global Background Particle Constraint ─────────────────────────────────
  useEffect(() => {
    const handleScrollVisibility = () => {
      if (pathname !== '/') {
        setIsVisible(true);
        isVisibleRef.current = true;
        return;
      }
      
      // Rule 2: On Home, ONLY show particles starting from Mission section
      // Dynamically calculate the end of the hero section since its height varies (100vh to 400vh)
      const hero = document.getElementById('hero-frame-animation');
      let triggerOffset = window.innerHeight * 0.9;
      
      if (hero) {
        // The hero is sticky and long. We want to show particles when the user has scrolled past
        // the bottom of the hero. So scrollY > hero's bottom offset minus a screen-sized buffer.
        triggerOffset = hero.offsetHeight - (window.innerHeight * 0.2); 
      }
      
      if (window.scrollY > triggerOffset) {
        setIsVisible(true);
        isVisibleRef.current = true;
      } else {
        setIsVisible(false);
        isVisibleRef.current = false;
      }
    };

    handleScrollVisibility(); // run once on mount/route change

    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, [pathname]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${className ?? ''}`}
      style={{ zIndex: 1, opacity: isVisible ? 1 : 0 }}
    >
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default AnimatedBackground;
