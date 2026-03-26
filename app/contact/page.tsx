'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Banner Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mb-12">
        <Image
          src="https://picsum.photos/seed/vrcontact/1920/600"
          alt="Contact Us"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <Container>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tighter">Contact <span className="text-brand-primary">Us</span></h1>
            <p className="text-xl text-white/80 max-w-2xl">
              Ready to transform your reality? Let&apos;s build the future together.
            </p>
          </Container>
        </div>
      </div>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8 uppercase">Get in Touch</h2>
              <p className="text-xl text-white/60 mb-12">
                Whether you&apos;re interested in our VR headsets, enterprise solutions, or just want to say hello, we&apos;d love to hear from you.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <Mail className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Email Us</h3>
                    <p className="text-white/60">contact@genxreality.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <Phone className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Call Us</h3>
                    <p className="text-white/60">+91 7780788136</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-brand-primary/10 rounded-lg border border-brand-primary/20">
                    <MapPin className="text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1 uppercase tracking-wide">Visit HQ</h3>
                    <p className="text-white/60">
                      Telephone Colony, Chengicherla, Hyderabad,<br />
                      Telangana 500092, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.690471450892!2d78.60266717462784!3d17.426635901674288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9f3da2cf6323%3A0x70ad222a4c12f9c6!2sGenXReality!5e0!3m2!1sen!2sin!4v1772885226964!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>

            <div className="glass-panel p-6 md:p-10 rounded-3xl border-brand-primary/20 flex flex-col gap-10">
              <div className="w-full">
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Send a Message</h3>
                <div className="elfsight-app-442eee75-a698-48d4-a12d-f7e7508c2be5" data-elfsight-app-lazy></div>
                <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
              </div>

              <div className="w-full border-t border-white/10 pt-8">
                <h3 className="text-2xl font-bold mb-6 uppercase tracking-wide">Book a Consultation</h3>
                <div className="w-full bg-black/40 rounded-2xl p-4 border border-white/5">
                  {/* Elfsight Appointment Booking | Untitled Appointment Booking */}
                  <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
                  <div className="elfsight-app-df4f0fb5-7643-4ace-b1de-6544e4a8e337" data-elfsight-app-lazy></div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
