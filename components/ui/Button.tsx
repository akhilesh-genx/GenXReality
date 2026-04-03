'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; // Retained for backwards compatibility
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size = 'md', href, children, ...props }, ref) => {
    
    // Base Style: "View all Services" style as the fallback/global layout
    const baseVariant = 'bg-transparent border border-brand-primary text-brand-primary uppercase tracking-widest font-bold';

    const variants = {
      primary: baseVariant,
      secondary: baseVariant,
      outline: baseVariant,
      ghost: baseVariant,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-base',
    };

    const cleanedClassName = className?.replace(/hover:bg-\S+/g, '');

    const classes = cn(
      'group relative inline-flex items-center justify-center rounded-full transition-all duration-[700ms] ease-out overflow-hidden hover:scale-[1.03]',
      'hover:text-black focus:outline-none focus:ring-2 focus:ring-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed z-10',
      variants[variant || 'primary'],
      sizes[size],
      cleanedClassName
    );

    const FillEffect = () => (
      <span className="absolute inset-0 bg-brand-primary origin-left scale-x-0 transition-transform duration-[700ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-x-100 -z-10" />
    );

    const innerContent = (
      <>
        <FillEffect />
        <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      </>
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {innerContent}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {innerContent}
      </button>
    );
  }
);

Button.displayName = 'Button';
