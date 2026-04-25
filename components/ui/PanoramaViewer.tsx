'use client';

import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';

interface PanoramaViewerProps {
  imageUrl: string;
}

function Scene({ imageUrl }: { imageUrl: string }) {
  const texture = useTexture(imageUrl);
  
  // Flip the texture horizontally if needed to match real-world orientation
  // texture.wrapS = THREE.RepeatWrapping;
  // texture.repeat.x = -1;

  return (
    <mesh>
      <sphereGeometry args={[500, 64, 32]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-10">
      <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
    </div>
  );
}

export function PanoramaViewer({ imageUrl }: PanoramaViewerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="w-full h-full bg-black" />;

  return (
    <div className="panorama-viewer-wrapper relative w-full h-full bg-zinc-950 overflow-hidden rounded-xl border border-white/10 group shadow-2xl">
      <style dangerouslySetInnerHTML={{ __html: `.panorama-viewer-wrapper canvas { cursor: pointer !important; }` }} />
      <Suspense fallback={<Loader />}>
        <Canvas 
          camera={{ 
            position: [0, 0, 0.1],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
        >
          <Scene imageUrl={imageUrl} />
          <OrbitControls 
            enableZoom={true} 
            enablePan={false} 
            rotateSpeed={-0.4} 
            autoRotate={false}
            minDistance={0.1}
            maxDistance={10}
            zoomSpeed={0.5}
          />
        </Canvas>
      </Suspense>
      
      {/* Help text overlay */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 px-3 md:px-4 py-1.5 md:py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white/60 text-[9px] md:text-xs font-medium tracking-widest uppercase pointer-events-none whitespace-nowrap">
        Drag to explore 360°
      </div>
    </div>
  );
}
