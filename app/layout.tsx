import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import CustomCursor from '@/components/ui/CustomCursor';
import GlobalSparkle from '@/components/ui/GlobalSparkle';

export const metadata: Metadata = {
  title: 'GenXReality | Enterprise XR Solutions',
  description: 'Delivering premium, high-performance immersive experiences and unlocking advanced enterprise use cases for VR across diverse sectors.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon-round.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon-round.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <AnimatedBackground />
        <CustomCursor />
        <GlobalSparkle />
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10 min-h-screen bg-transparent">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
