import React from 'react';
import Image from 'next/image';

interface ClassicMobileMockupProps {
  imageUrl?: string;
  className?: string;
  type?: 'iphone' | 'android';
}

export function ClassicMobileMockup({ imageUrl, className = '', type = 'iphone' }: ClassicMobileMockupProps) {
  if (type === 'android') {
    return (
      <div className={`relative shrink-0 w-[200px] md:w-[280px] lg:w-[320px] aspect-[1/2] rounded-[2.5rem] bg-gradient-to-b from-[#1a1a1a] to-[#050505] border-[1px] border-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,1)] flex flex-col p-[8px] ${className}`}>
        {/* Hole-punch Camera */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#050505] rounded-full border border-white/5 z-50 shadow-inner" />
        
        {/* Screen */}
        <div className="flex-1 w-full bg-black rounded-[2rem] overflow-hidden relative border border-white/5 mx-auto">
          <div className="absolute inset-0 transform -translate-y-[10px] scale-[1.05]">
            {imageUrl && (
              <Image 
                src={imageUrl} 
                alt="Android App Screen" 
                fill 
                className="object-cover object-top"
              />
            )}
          </div>
          {/* Screen Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative shrink-0 w-[200px] md:w-[280px] lg:w-[320px] aspect-[1/2] rounded-[3rem] bg-gradient-to-b from-[#1a1f2e] to-[#0a0a0a] border-[1px] border-white/10 shadow-[0_30px_70px_-20px_rgba(0,0,0,1),inset_0_1px_2px_rgba(255,255,255,0.1)] flex flex-col p-[4px] ${className}`}>
      {/* Side Buttons (Simulated) */}
      <div className="absolute -left-[2px] top-24 w-[3px] h-12 bg-white/10 rounded-r-sm" />
      <div className="absolute -right-[2px] top-32 w-[3px] h-16 bg-white/10 rounded-l-sm" />

      {/* Top Bezel */}
      <div className="h-[10%] w-full flex items-center justify-center relative">
        <div className="w-10 h-1 bg-zinc-800/80 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" /> {/* Speaker */}
        <div className="absolute left-1/2 -translate-x-14 w-2 h-2 bg-[#050505] rounded-full border border-white/5 shadow-inner" /> {/* Camera */}
      </div>

      {/* Screen */}
      <div className="flex-1 w-full bg-black rounded-[0.5rem] overflow-hidden relative border border-white/5 mx-auto">
        <div className="absolute inset-0 transform -translate-y-[15px] scale-[1.05]">
          {imageUrl && (
            <Image 
              src={imageUrl} 
              alt="iPhone App Screen" 
              fill 
              className="object-cover object-top"
            />
          )}
        </div>
        {/* Screen Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      </div>

      {/* Bottom Bezel */}
      <div className="h-[12%] w-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center shadow-lg group">
          <div className="w-10 h-10 rounded-full border-[0.5px] border-white/5 bg-[#0a0a0a] flex items-center justify-center">
             <div className="w-4 h-4 rounded-sm border border-white/10 opacity-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
