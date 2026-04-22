import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-dark-900 flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-7xl animate-float">🔮</div>
      <h1 className="text-gradient font-display font-bold text-3xl">Page Not Found</h1>
      <p className="text-white/50 text-sm max-w-xs">The stars couldn&apos;t find what you were looking for.</p>
      <Link href="/" className="cosmos-btn mt-2">← Back to Horoscopes</Link>
    </div>
  );
}
