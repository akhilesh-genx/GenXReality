'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Product', href: '/product' },
  { name: 'Services', href: '/services' },
  { name: 'News', href: '/news' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navOpacity, setNavOpacity] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the glass effect only when the navbar overlaps actual scrolling content, 
      // preventing borders from showing over empty hero backgrounds.
      setScrolled(window.scrollY > window.innerHeight * 0.7);

      // On homepage, link navbar opacity directly to scroll progression
      if (isHomePage) {
        const heroEl = document.getElementById('hero-frame-animation');
        if (heroEl) {
          const heroBottom = heroEl.offsetTop + heroEl.offsetHeight;
          const startFade = heroBottom - window.innerHeight;
          const endFade = heroBottom;

          if (window.scrollY <= startFade) {
            setNavOpacity(0);
          } else if (window.scrollY >= endFade) {
            setNavOpacity(1);
          } else {
            const p = (window.scrollY - startFade) / (endFade - startFade);
            setNavOpacity(p);
          }
        } else {
          setNavOpacity(1);
        }
      } else {
        setNavOpacity(1);
      }
    };

    handleScroll();

    if (!isHomePage) {
      setNavOpacity(1);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (isOpen) setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (href: string) => {
    return pathname === href;
  };

  // Glass style for individual elements when scrolled
  const glassStyle = scrolled
    ? 'bg-black/40 backdrop-blur-md border border-white/10'
    : 'bg-transparent border-none';

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'py-4' : 'py-6',
        'bg-transparent'
      )}
      style={{
        opacity: isHomePage ? navOpacity : 1,
        pointerEvents: (isHomePage && navOpacity < 0.1) ? 'none' : 'auto'
      }}
    >
      <Container size="xl" className="flex items-center justify-between">
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 md:gap-3 text-2xl font-display font-bold tracking-tighter z-50 relative group',
            'rounded-full px-3 py-0.5 transition-all duration-300',
            glassStyle
          )}
        >
          <div className="relative w-12 h-12 md:w-14 md:h-14">
            <Image
              src="/logo.png"
              alt="GenXReality Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-brand-primary">GenXReality</span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className={cn(
            'hidden md:flex items-center gap-1.5 rounded-full px-2 py-1.5 transition-all duration-300',
            glassStyle
          )}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-all duration-300 uppercase tracking-wide relative py-1.5 px-4 rounded-full',
                isActive(link.href)
                  ? 'text-brand-primary'
                  : 'text-white hover:text-white hover:bg-white/5'
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* CTA — Contact Us */}
          <Button href="/contact" size="sm">
            Contact Us
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 relative text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden opacity-0"
              />

              {/* Sliding Drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-zinc-950/95 backdrop-blur-md border-l border-white/10 z-40 flex flex-col pt-24 px-6 pb-8 md:hidden shadow-2xl overflow-y-auto"
              >
                <div className="flex flex-col space-y-3 flex-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'text-xl font-display font-bold transition-all duration-300 uppercase px-6 py-4 rounded-xl',
                        isActive(link.href)
                          ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/50 translate-x-2'
                          : 'text-white hover:text-white hover:bg-white/5 border border-transparent'
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto pt-8">
                  <div className="flex justify-center w-full">
                    <Button href="/contact" size="lg" onClick={() => setIsOpen(false)}>
                      Contact Us
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </Container>
    </header>
  );
}
