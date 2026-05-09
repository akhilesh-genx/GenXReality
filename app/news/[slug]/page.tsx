import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { getNewsPostBySlug, formatDate, getAllNewsPosts, getPostSlug } from '@/lib/supabase';

export async function generateStaticParams() {
  const posts = await getAllNewsPosts();
  return posts.map((post) => ({
    slug: getPostSlug(post.id),
  }));
}

import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsPostBySlug(slug);
  
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.title} | GenXReality News`,
    description: article.meta_description,
    openGraph: {
      title: article.title,
      description: article.meta_description,
      images: [article.image_url],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsPostBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="pt-24">
      <Section>
        <Container size="md">
          <Link href="/news" className="inline-flex items-center text-white hover:text-brand-cyan mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
          </Link>
          
          <div className="mb-4 text-brand-cyan font-sans uppercase tracking-wider text-sm">
            Trends
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight heading-gradient">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 mb-12 text-white text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {formatDate(article.created_at)}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" /> GenXReality Team
            </div>
          </div>
          
          <div className="relative z-[2] aspect-video rounded-2xl overflow-hidden mb-12 bg-zinc-900 border border-white/10">
            {article.image_url && (
              <Image 
                src={article.image_url} 
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none prose-headings:heading-gradient prose-a:text-brand-primary">
            <div 
              className="text-white/90 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>
        </Container>
      </Section>
    </div>
  );
}
