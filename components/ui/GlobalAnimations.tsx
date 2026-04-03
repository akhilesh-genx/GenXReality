'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export function GlobalAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // We defer slightly to ensure the React DOM and all nested client child components are fully painted
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Target virtually all content outside of Hero and Nav sections
        const textElements = gsap.utils.toArray('section h2, section h3, section p, li, .fade-in-section');
        const cardElements = gsap.utils.toArray('.glass-card, .feature-card, .service-item, .value-card, .news-card, .spec-card');
        const imgElements = gsap.utils.toArray('section img');

        // Apply smooth X-slide to text
        textElements.forEach((el: any) => {
          // exclude hero content to avoid timeline conflicts, and specific custom ones
          if (el.closest('.h-[70vh]') || el.closest('.h-screen') || el.closest('#hero') || el.closest('.hero-bg') || el.classList.contains('how-it-works-text')) return;
          
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        });

        // Apply smoother, tighter X-slide to cards
        cardElements.forEach((el: any) => {
          if (el.closest('.h-screen') || el.closest('.h-[70vh]') || el.closest('#hero') || el.classList.contains('how-it-works-item')) return;
          
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        });

        // Apply gentle scale to images
        imgElements.forEach((el: any) => {
          // Exclude hero images or full-screen backgrounds which are usually fixed/absolute
          if (el.classList.contains('how-it-works-img') || el.closest('.absolute') || el.closest('.hero-bg')) return;
          
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          });
        });
      });

      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
