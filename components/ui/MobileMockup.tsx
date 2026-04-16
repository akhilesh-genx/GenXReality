import React from 'react';
import Image from 'next/image';

interface MobileMockupProps {
  children?: React.ReactNode;
  imageUrl?: string;
  className?: string;
}

export function MobileMockup({ children, imageUrl, className = '' }: MobileMockupProps) {
  return (
    <div
      className={`relative shrink-0 w-[110px] sm:w-[160px] md:w-[210px] lg:w-[230px] h-[240px] sm:h-[340px] md:h-[450px] lg:h-[480px] rounded-[1.5rem] md:rounded-[2.5rem] border-[4px] md:border-[6px] border-zinc-900 bg-black shadow-2xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,255,65,0.3)] transition-all duration-500 ${className}`}
    >
      {/* Dynamic Notch */}
      <div className="absolute top-0 inset-x-0 h-3 md:h-5 w-16 md:w-24 mx-auto bg-zinc-900 rounded-b-xl md:rounded-b-2xl z-30 flex justify-center items-end pb-0.5 md:pb-1 shadow-[inset_0_-1px_3px_rgba(0,0,0,0.5)]">
        <div className="w-5 md:w-8 h-0.5 md:h-1 bg-black rounded-full" />
      </div>

      <div className="relative w-full h-full rounded-[1.2rem] md:rounded-[2rem] overflow-hidden bg-zinc-950 isolate">
        {imageUrl && (
          <Image src={imageUrl} alt="Mobile App Screen" fill className="object-cover" />
        )}
        {children}

        {/* Removed screen ambient gloss overlay */}
        <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] pointer-events-none z-50" />
      </div>
    </div>
  );
}
