'use client';

import { useEffect, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  tx: string;
  ty: string;
  size: number;
}

export default function GlobalSparkle() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Prevent overlapping delays for the exact same DOM node to avoid spamming route pushes
    const activeTargets = new Set<Element>();

    const handleClick = (e: MouseEvent) => {
      // If this is our synthetic delayed click, let it pass natively through React and the browser
      if ((e as any)._isBypassed) return;

      // Trigger burst and delay on any clickable button, anchor tag (Navbar, Footer, brand logo), or role="button" globally
      const target = (e.target as HTMLElement).closest('button, a, [role="button"]');
      if (!target) return;

      // Prevent native navigation, form submission, and React synthetic events instantly
      e.preventDefault();
      e.stopPropagation();

      if (activeTargets.has(target)) return;
      activeTargets.add(target);

      // Ensure burst happens physically exactly where the cursor touched down
      const x = e.clientX;
      const y = e.clientY;

      // Significantly increased particle count and spread for stronger visibility
      const newSparkles = Array.from({ length: 24 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 24 + Math.random() * 0.5;
        const distance = Math.random() * 100 + 40; // Massive 40px to 140px outward flow
        return {
          id: Date.now() + i + Math.random(),
          x,
          y,
          tx: `${Math.cos(angle) * distance}px`,
          ty: `${Math.sin(angle) * distance}px`,
          size: Math.random() * 6 + 4, // Larger 4px to 10px particle sizing
        };
      });

      setSparkles((prev) => [...prev, ...newSparkles]);

      // Delay action execution by exactly 1s
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => !newSparkles.includes(s)));
        activeTargets.delete(target);
        
        // Dispatch a synthetic native clone that explicitly bypasses our interceptor
        // This flawlessly maintains original React 'onClick' bindings (like closing mobile menus) 
        // AND cleanly fires Next.js '<Link>' route transitions 1000ms later
        const newEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
          clientX: x,
          clientY: y,
          button: e.button,
          buttons: e.buttons
        });
        (newEvent as any)._isBypassed = true;
        target.dispatchEvent(newEvent);
        
      }, 200); // 1-second delay
    };

    // Use capture phase to intercept the click instantly, BEFORE React or the browser can process it
    window.addEventListener('click', handleClick, { capture: true });
    return () => window.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-brand-primary pointer-events-none animate-sparkle-burst"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            boxShadow: '0 0 15px #00ff1A, 0 0 8px rgba(255,255,255,0.9)', // Upgraded hyper-neon halo
            marginLeft: -(s.size / 2),
            marginTop: -(s.size / 2),
            '--tx': s.tx,
            '--ty': s.ty,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
