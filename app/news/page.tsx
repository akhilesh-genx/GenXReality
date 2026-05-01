import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { getAllNewsPosts, formatDate, getPostSlug } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 0; // Fetch completely fresh data on every single page load

export default async function NewsPage() {
  const articles = await getAllNewsPosts();

  // Filter the articles to get up to 4 posts, each with a distinct category
  const uniqueCategoryArticles: typeof articles = [];
  const seenCategories = new Set<string>();

  for (const article of articles) {
    const defaultCategory = article.category || 'News';
    if (!seenCategories.has(defaultCategory)) {
      seenCategories.add(defaultCategory);
      uniqueCategoryArticles.push(article);
    }
    if (uniqueCategoryArticles.length === 4) {
      break;
    }
  }

  return (
    <div className="pt-24 min-h-screen">
      <Section id="news" className="bg-transparent">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase heading-gradient">GenXReality News & Trends!</h2>
            <p className="text-white text-lg">Stay updated with our latest technological breakthroughs.</p>
          </div>

          {/* NEWS STACK */}
          <div className="flex flex-col gap-10 mb-24">
            {uniqueCategoryArticles.length === 0 ? (
              <div className="text-center py-20 text-white/60">
                <p className="text-xl italic">No news updates available at the moment. Please check back later!</p>
              </div>
            ) : (
              uniqueCategoryArticles.map((article, index) => {
                const isImageRight = index % 2 === 0;
                const slug = getPostSlug(article.source_url);
                const category = article.category || 'News';
                
                return (
                  <div key={article.id} className="news-card flex flex-col md:flex-row min-h-[450px] md:min-h-[500px] glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-brand-primary/50 transition-all duration-500 group/card">
                    <div className={`relative w-full md:w-1/2 aspect-[16/9] md:aspect-auto overflow-hidden bg-zinc-900 border-b border-white/10 md:border-b-0 ${isImageRight ? 'md:order-2 md:border-l' : 'md:order-1 md:border-r'}`}>
                      {article.image_url && (
                        <Image 
                          src={article.image_url} 
                          alt={article.title} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover/card:scale-110" 
                        />
                      )}
                      <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-sans uppercase border border-white/10">
                        {category}
                      </div>
                    </div>
                    <div className={`flex-1 flex flex-col justify-center p-8 md:p-16 ${isImageRight ? 'md:order-1' : 'md:order-2'}`}>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-sm text-brand-primary font-sans">{formatDate(article.created_at)}</span>
                      </div>
                      <h3 className="text-2xl md:text-4xl font-bold mb-6 group-hover/card:text-brand-primary transition-colors heading-gradient">{article.title}</h3>
                      <p className="text-white/80 text-lg leading-relaxed mb-8 line-clamp-3">{article.short_description}</p>
                      <div className="mt-auto md:mt-0 pt-4">
                        <Button size="sm" href={`/news/${slug}`}>
                          Read Article <span className="text-xl leading-none ml-1">&rarr;</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
