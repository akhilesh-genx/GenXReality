import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-white/10">404</h1>
      <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
      <p className="text-white/60 mb-8 max-w-md">
        The page you are looking for doesn&apos;t exist or has been moved to another dimension.
      </p>
      <Button href="/">Return Home</Button>
    </div>
  );
}
