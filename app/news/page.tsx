'use client';

import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';
import { articles } from '@/lib/cms';

export default function NewsPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Banner Section */}
      <div className="relative h-[40vh] w-full overflow-hidden mb-12">
        <Image
          src="https://picsum.photos/seed/vrnewsbanner/1920/600"
          alt="GenxReality News Banner"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
          <Container>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 uppercase tracking-tighter">Latest <span className="text-brand-primary">Insights</span></h1>
            <p className="text-xl text-white/80 max-w-2xl font-light">
              Dive into our research, press releases, and industry thoughts.
            </p>
          </Container>
        </div>
      </div>

      <Section id="news" className="bg-black/50">
        <Container>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">News & Research</h2>
              <p className="text-white/60">Stay updated with our latest technological breakthroughs.</p>
            </div>
          </div>

          {/* NEWS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
            {articles.map((article) => (
              <div key={article.id} className="news-card flex flex-col h-full glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-brand-primary/50 transition-all duration-500 group">
                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-900 border-b border-white/10">
                  <Image src={article.coverImage} alt={article.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono uppercase border border-white/10">
                    {article.category}
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs text-brand-primary font-mono">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-primary transition-colors">{article.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed flex-1">{article.excerpt}</p>

                  <button className="mt-6 self-start text-sm uppercase tracking-wider font-bold text-white hover:text-brand-primary transition-colors flex items-center gap-2">
                    Read Article <span className="text-xl leading-none">&rarr;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
