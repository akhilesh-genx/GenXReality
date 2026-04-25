'use client';

import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  
  // Mouse position targets
  const mouseX = useRef<number>(0);
  const mouseY = useRef<number>(0);
  
  // Ring current positions (for lerp)
  const ringX = useRef<number>(0);
  const ringY = useRef<number>(0);

  // Hover state (for scaling)
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isOverWidget, setIsOverWidget] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const checkTouch = () => {
      // Use width-based detection instead of touch capability to avoid false positives on touch-enabled laptops
      const isMobileWidth = window.innerWidth <= 1024;
      setIsTouchDevice(isMobileWidth);
    };
    // Run exactly once on mount, then listen for resizes
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return; // Disable all logic on touch devices

    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      // Initial visibility once mouse moves
      if (!isVisible) setIsVisible(true);
      
      // Update dot position instantly using translate3d for better performance
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      // Lerp (Linear Interpolation) calculation
      const easing = 0.85;
      
      ringX.current += (mouseX.current - ringX.current) * easing;
      ringY.current += (mouseY.current - ringY.current) * easing;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX.current}px, ${ringY.current}px, 0) translate(-50%, -50%)`;
      }
      
      requestRef.current = requestAnimationFrame(animateRing);
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Hover detection for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.closest) return;

      const overWidget = !!(
        target.closest('iframe') ||
        target.closest('[class*="elfsight"]') ||
        target.closest('[class*="eapps"]') ||
        target.closest('.panorama-viewer-wrapper')
      );
      setIsOverWidget(overWidget);

      const interactiveElements = ['A', 'BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
      const isInteractive = interactiveElements.includes(target.tagName) || 
                          target.closest('button') || 
                          target.closest('a') ||
                          target.getAttribute('role') === 'button' ||
                          window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('pointermove', onMouseMove, { capture: true });
    window.addEventListener('mousemove', onMouseMove, { capture: true });
    window.addEventListener('dragover', onMouseMove, { capture: true });
    window.addEventListener('mouseenter', onMouseEnter, { capture: true });
    window.addEventListener('mouseleave', onMouseLeave, { capture: true });
    window.addEventListener('mouseover', handleMouseOver, { capture: true });
    
    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('pointermove', onMouseMove, { capture: true });
      window.removeEventListener('mousemove', onMouseMove, { capture: true });
      window.removeEventListener('dragover', onMouseMove, { capture: true });
      window.removeEventListener('mouseenter', onMouseEnter, { capture: true });
      window.removeEventListener('mouseleave', onMouseLeave, { capture: true });
      window.removeEventListener('mouseover', handleMouseOver, { capture: true });
      cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible, isTouchDevice]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main Cursor Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none rounded-full transition-all duration-300 ease-out z-[9999] 
          ${isVisible && !isOverWidget ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: isHovering ? '22px' : '14px',
          height: isHovering ? '22px' : '14px',
          background: '#00ff41',
          boxShadow: '0 0 10px #00ff41, 0 0 20px #00ff41',
          border: '2px solid rgba(255, 255, 255, 0.4)',
        }}
      />
      
      {/* Secondary Cursor Ring */}
      <div
        ref={ringRef}
        
        className={`fixed top-0 left-0 pointer-events-none rounded-full border-2 transition-all duration-500 ease-out z-[9998]
          ${isVisible && !isOverWidget ? 'opacity-100' : 'opacity-0'}`}
        style={{
          width: isHovering ? '60px' : '40px',
          height: isHovering ? '60px' : '40px',
          borderColor: 'rgba(0, 255, 65, 0.4)',
          background: 'transparent',
          boxShadow: isHovering ? '0 0 15px rgba(0, 255, 65, 0.2)' : 'none',
        }}
      />

      {/* Hide native cursor globally ONLY when this component is active (non-touch) */}
      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: none !important; }
        iframe, iframe *, [class*="elfsight"], [class*="elfsight"] *, [class*="eapps"], [class*="eapps"] *,
        .panorama-viewer-wrapper, .panorama-viewer-wrapper * {
          cursor: auto !important;
        }
        .panorama-viewer-wrapper canvas {
          cursor: pointer !important;
        }
      ` }} />
    </>
  );
};

export default CustomCursor;
