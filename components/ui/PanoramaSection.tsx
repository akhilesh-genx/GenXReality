'use client';

import { useState, useEffect, useRef } from 'react';
import { Container } from './Container';
import { PanoramaViewer } from './PanoramaViewer';
import gsap from 'gsap';
import { ChevronLeft, ChevronRight, LayoutGrid } from 'lucide-react';

const TABS = [
  { id: 'living-room', label: 'LIVING ROOM', image: '/panaromic/livingroom.jpg' },
  { id: 'bedroom', label: 'BEDROOM', image: '/panaromic/bedroom.jpg' },
  { id: 'outdoor', label: 'OUTDOOR', image: '/panaromic/outdoor.jpg' },
  { id: 'library', label: 'LIBRARY', image: '/panaromic/library.jpg' },
  { id: 'bathroom', label: 'BATHROOM', image: '/panaromic/bathroom.jpg' },
];

export function PanoramaSection() {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const viewerRef = useRef<HTMLDivElement>(null);

  const currentIndex = TABS.findIndex(t => t.id === activeTab.id);
  const goPrev = () => setActiveTab(TABS[(currentIndex - 1 + TABS.length) % TABS.length]);
  const goNext = () => setActiveTab(TABS[(currentIndex + 1) % TABS.length]);

  useEffect(() => {
    if (viewerRef.current) {
      gsap.fromTo(viewerRef.current, 
        { opacity: 0, scale: 1.02 }, 
        { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
  }, [activeTab]);

  return (
    <section className="py-12 md:py-24 bg-transparent relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white/90 tracking-tight font-display uppercase">
            Web-based <span className="text-brand-primary">Virtual Tours</span>
          </h2>
          <p className="text-white/50 max-w-4xl mx-auto font-light text-lg leading-relaxed mb-16">
            Give your team and your prospects an interactive point-to-point tour for projects under construction. 
            Whether showcased on your website, in your sales office, or integrated into marketplaces like Apartments.com, 
            you'll have stunning, immersive visuals for everyone to see.
          </p>

          {/* Tabs Navigation */}
          <div className="mb-16 px-4">
            <div className="flex flex-col md:flex-row justify-center items-center md:gap-x-12 lg:gap-x-20 border-t border-white/5 md:border-t-0 md:border-b border-white/5 max-w-6xl mx-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`relative w-full md:w-auto py-6 md:py-4 text-xs md:text-sm font-bold tracking-[0.2em] transition-all duration-500 border-b border-white/5 md:border-b-0 ${
                    activeTab.id === tab.id 
                      ? 'text-brand-primary' 
                      : 'text-white/30 hover:text-white/60'
                  }`}
                >
                  {tab.label}
                  {activeTab.id === tab.id && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-primary shadow-[0_0_10px_rgba(0,255,26,0.5)]"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Viewer & Navigation Wrapper */}
        <div className="panorama-viewer-wrapper relative max-w-6xl mx-auto flex items-center justify-center gap-4 md:gap-8 px-4">
          
          {/* Side Arrow - Left (Desktop/Tablet Only) */}
          <button
            onClick={goPrev}
            className="hidden md:flex items-center justify-center text-white hover:text-brand-primary transition-colors duration-300 text-7xl font-bold cursor-pointer select-none"
            aria-label="Previous tab"
          >
            ‹
          </button>

          {/* Viewer Container (aligned with text) */}
          <div className="flex-1 flex flex-col items-center gap-4 md:gap-0 max-w-4xl w-full">
            <div className="relative group w-full">
              <div className="absolute -inset-[1px] bg-gradient-to-b from-white/20 via-transparent to-transparent rounded-xl pointer-events-none opacity-20" />
              
              <div className="relative aspect-square md:aspect-[7/4] lg:aspect-[1.8/1] w-full bg-zinc-950 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5">
                <div
                  key={activeTab.id}
                  ref={viewerRef}
                  className="absolute inset-0"
                >
                  {activeTab.image ? (
                    <PanoramaViewer imageUrl={activeTab.image} />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900/50 backdrop-blur-3xl">
                       <div className="p-6 rounded-full bg-white/5 border border-white/10 mb-6">
                          <LayoutGrid className="w-8 h-8 text-brand-primary" />
                       </div>
                       <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Coming Soon</h3>
                       <p className="text-white/40 text-sm font-light">We're rendering this space for you.</p>
                    </div>
                  )}
                </div>

                {/* Label overlay */}
                <div className="absolute top-8 left-8 flex flex-col gap-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded text-[10px] text-white/80 font-bold uppercase tracking-widest">
                    {activeTab.label}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Arrows (Mobile Only) */}
            <div className="flex md:hidden items-center gap-10 mt-2">
              <button
                onClick={goPrev}
                className="flex items-center justify-center text-white hover:text-brand-primary transition-colors duration-300 text-6xl font-bold cursor-pointer select-none"
                aria-label="Previous tab"
              >
                ‹
              </button>
              <button
                onClick={goNext}
                className="flex items-center justify-center text-white hover:text-brand-primary transition-colors duration-300 text-6xl font-bold cursor-pointer select-none"
                aria-label="Next tab"
              >
                ›
              </button>
            </div>
          </div>

          {/* Side Arrow - Right (Desktop/Tablet Only) */}
          <button
            onClick={goNext}
            className="hidden md:flex items-center justify-center text-white hover:text-brand-primary transition-colors duration-300 text-7xl font-bold cursor-pointer select-none"
            aria-label="Next tab"
          >
            ›
          </button>
        </div>
      </Container>
    </section>
  );
}
