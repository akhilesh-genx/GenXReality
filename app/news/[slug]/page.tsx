'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { articles } from '@/lib/cms';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function ArticlePage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="pt-32 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
        <Button href="/news">Back to News</Button>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <Section>
        <Container size="md">
          <Link href="/news" className="inline-flex items-center text-white/60 hover:text-brand-cyan mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
          </Link>
          
          <div className="mb-4 text-brand-cyan font-mono uppercase tracking-wider text-sm">
            {article.category}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 mb-12 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {article.date}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" /> Aether Editorial Team
            </div>
          </div>
          
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 bg-zinc-900">
            <Image 
              src={article.coverImage} 
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <div className="prose prose-invert prose-lg max-w-none">
            <p className="lead text-xl text-white/80 mb-8 font-medium">
              {article.excerpt}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h2>The Shift to Spatial</h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
            <blockquote>
              &quot;The screen is a window into another world. Spatial computing breaks the glass and lets you step inside.&quot;
            </blockquote>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
            </p>
            <h3>Enterprise Adoption</h3>
            <p>
              Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </p>
          </div>
        </Container>
      </Section>
    </div>
  );
}
