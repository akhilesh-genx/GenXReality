export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: string;
  content?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'The Future of Spatial Computing in Enterprise',
    slug: 'future-spatial-computing',
    excerpt: 'How Fortune 500 companies are leveraging XR to maximize operational efficiency and improve safety.',
    coverImage: 'https://picsum.photos/seed/xr1/800/600',
    date: 'Oct 12, 2025',
    category: 'Enterprise',
  },
  {
    id: '2',
    title: 'Introducing Aether OS 2.0',
    slug: 'aether-os-2',
    excerpt: 'A deep dive into the new gesture recognition system and neural interface capabilities.',
    coverImage: 'https://picsum.photos/seed/xr2/800/600',
    date: 'Sep 28, 2025',
    category: 'Product',
  },
  {
    id: '3',
    title: 'WebXR: Building the Immersive Web',
    slug: 'webxr-building',
    excerpt: 'Why the browser is becoming the most important platform for VR/AR experiences.',
    coverImage: 'https://picsum.photos/seed/xr3/800/600',
    date: 'Sep 15, 2025',
    category: 'Development',
  },
  {
    id: '4',
    title: 'Haptic Feedback in Virtual Chemistry Labs',
    slug: 'haptic-chemistry',
    excerpt: 'Revolutionizing education with tactile feedback in molecular simulation.',
    coverImage: 'https://picsum.photos/seed/xr4/800/600',
    date: 'Aug 30, 2025',
    category: 'Education',
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'IMMERSIVE XR EXPERIENCES',
    description: 'Design and deploy interactive XR experiences that enhance visualization, engagement, and decision-making across industries.',
    icon: 'Building',
  },
  {
    id: '2',
    title: 'XR App Development',
    description: 'Custom-built XR applications for Meta Quest, Apple Vision Pro, and cross-platform ecosystems tailored to your business needs.',
    icon: 'Code',
  },
  {
    id: '3',
    title: 'XR TRAINING SOLUTIONS',
    description: 'Simulation-based training environments that improve safety, reduce costs, and accelerate workforce learning.',
    icon: 'Briefcase',
  },
  {
    id: '4',
    title: 'Immersive Education',
    description: 'Next-gen learning tools that make abstract concepts tangible through VR.',
    icon: 'GraduationCap',
  },
];
