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
      className={`group relative w-full h-[400px] rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform
        ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]'}
        hover:-translate-y-2 hover:border-brand-primary/40 hover:shadow-[0_20px_50px_-15px_rgba(0,255,65,0.25)]
      `}
    >
      {/* Loading Skeleton / Shimmer Effect */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 bg-zinc-900 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>
      )}

      {/* Visual Media Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-50 mix-blend-screen"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Deep Gradient Overlays for readability and depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent transition-opacity duration-[800ms] group-hover:opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/0 via-transparent to-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-[1s]" />
      
      {/* Interactive Content */}
      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div className="p-3 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 text-white/70 w-fit transform transition-all duration-500 group-hover:scale-110 group-hover:text-brand-primary group-hover:bg-brand-primary/10 group-hover:border-brand-primary/30 shadow-2xl">
          {icon}
        </div>
        
        {/* Title and Description Slide-Up Interaction */}
        <div className="transform transition-transform duration-500 translate-y-12 group-hover:translate-y-0">
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-white tracking-widest uppercase origin-left">{title}</h3>
          <p className="text-white/60 text-sm md:text-base leading-relaxed font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {description}
          </p>
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
