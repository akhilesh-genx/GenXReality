'use client';

import React, { useState, useEffect } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  delay?: number;
}

export function ServiceCard({ title, description, icon, imageUrl, delay = 0 }: ServiceCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Elegant delayed entrance to simulate dynamic asynchronous loading
    const timer = setTimeout(() => setIsLoaded(true), 150 + delay * 150);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`service-card-wrapper group relative w-full h-[400px] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform
        ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'}
        hover:-translate-y-2 hover:border-white/20 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_30px_70px_-15px_rgba(0,0,0,0.7)]
      `}
    >
      {/* Loading Skeleton / Solid Shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 bg-zinc-900 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-white/5" />
        </div>
      )}

      {/* Visual Media Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-70"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      {/* Solid Overlays for readability and depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 transition-opacity duration-[800ms] group-hover:opacity-80" />

      {/* Interactive Content — marked as service-card-internal so GSAP global animations skip it */}
      <div className="service-card-internal relative z-10 p-8 h-full w-full flex flex-col justify-end">
        <div className="w-fit p-4 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10 text-white transform transition-all duration-500 group-hover:scale-110 group-hover:text-brand-primary group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 shadow-2xl mb-auto">
          {icon}
        </div>

        {/* Title and Description — title always visible, slides up on hover */}
        <div className="w-full transition-transform duration-700 ease-in-out group-hover:-translate-y-2">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight !opacity-100">{title}</h3>
          
          {/* Description reveal on hover (Laptops/Desktops) or always visible (Phones/Tablets) — smooth slide + fade */}
          <div className="max-h-[200px] opacity-100 lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-[200px] lg:group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
            <div className="w-8 h-[2px] bg-brand-primary/60 mt-3 mb-3 rounded-full" />
            <p className="text-white/70 text-sm leading-relaxed pb-1">
              {description}
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
