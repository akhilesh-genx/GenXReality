import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  if (typeof window !== 'undefined') {
    console.warn('Supabase credentials missing in browser. This is expected if you are on a static page that doesn\'t need live data.');
  } else {
    // During build, we still want to know if they are missing
    // console.error('Supabase credentials missing during build!');
  }
}

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey)
  : null as any;

export interface NewsPost {
  id: string | number;
  title: string;
  image_url: string;
  source_url: string;
  content: string;
  meta_description: string;
  short_description: string;
  category: string; // Newly added column
  created_at: string;
}

/** Fetch all news posts ordered newest first */
export async function getAllNewsPosts(): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from('Website_Auto_Post')
    .select(
      'id, title, image_url, source_url, content, meta_description, short_description, category, created_at'
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    return [];
  }

  return (data ?? []) as NewsPost[];
}

/** Convert a source_url into a URL-safe internal slug */
export function getPostSlug(source_url: string): string {
  if (!source_url) return '';
  // Simply encode the entire source_url to use as a unique slug
  return encodeURIComponent(source_url);
}

/** Fetch a single news post by matching its source_url field */
export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  try {
    const decoded = decodeURIComponent(slug);

    const { data, error } = await supabase
      .from('Website_Auto_Post')
      .select('id, title, image_url, source_url, content, meta_description, short_description, category, created_at')
      .eq('source_url', decoded)
      .maybeSingle();

    if (error) {
      console.error('Supabase fetch error:', error.message);
      return null;
    }

    return data as NewsPost | null;
  } catch (err) {
    console.error('Error decoding slug or fetching post:', err);
    return null;
  }
}

/** Format ISO date string into human-readable form */
export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}
