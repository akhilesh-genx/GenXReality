'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 0.6, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
