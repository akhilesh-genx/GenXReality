import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, fullWidth = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'relative py-20 md:py-32 overflow-hidden',
          fullWidth ? 'w-full' : '',
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';
