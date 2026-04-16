import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Mail, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 bg-transparent border-t border-white/10 pt-12 pb-6 md:py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-display font-bold tracking-tighter mb-6 block text-brand-primary">
              GenXReality
            </Link>
            <p className="text-white max-w-sm mb-8">
              Building practical XR solutions for real-world business impact.
            </p>
            <div className="flex gap-4">
              <SocialLink href="mailto:hello@genxreality.com" icon={<Mail size={20} />} />
              <SocialLink href="https://www.linkedin.com/company/genxreality/" icon={<Linkedin size={20} />} />
              <SocialLink href="https://www.instagram.com/genxreality/" icon={<Instagram size={20} />} />
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-display font-bold mb-6">Platform</h4>
              <ul className="space-y-4">
                <FooterLink href="/product">VR Headset</FooterLink>
                <FooterLink href="/services">XR Solutions</FooterLink>
                <FooterLink href="/services">Developers</FooterLink>
                <FooterLink href="/news">Research</FooterLink>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <FooterLink href="/#about">About Us</FooterLink>
                <FooterLink href="/news">News</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex justify-center items-center text-sm text-white text-center">
          <p>&copy; {new Date().getFullYear()} GenXReality Inc. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-white hover:text-brand-cyan transition-colors">
        {children}
      </Link>
    </li>
  );
}
