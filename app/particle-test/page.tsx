'use client';

// ─────────────────────────────────────────────────────────────────────────────
// /particle-test  —  Particle Preview Page
// Zero content. Nothing but the global AnimatedBackground from layout.tsx.
// Navigate to http://localhost:3000/particle-test to test particles in isolation.
// ─────────────────────────────────────────────────────────────────────────────

export default function ParticleTestPage() {
  return (
    // Full-viewport pitch-black canvas — nothing else renders here.
    // The AnimatedBackground (fixed inset-0 z-1) from layout.tsx is fully
    // visible against this empty black surface.
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'black',
        position: 'relative',
      }}
    />
  );
}
