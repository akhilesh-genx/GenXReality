'use client';

import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

export function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Sparkles 
          count={500} 
          scale={2} 
          size={2} 
          speed={0.4} 
          opacity={0.5} 
          color="#00ff41"
        />
        <Sparkles 
          count={300} 
          scale={3} 
          size={3} 
          speed={0.2} 
          opacity={0.3} 
          color="#008f11"
        />
      </Canvas>
    </div>
  );
}
