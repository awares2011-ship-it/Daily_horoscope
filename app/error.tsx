'use client';
import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-dvh bg-dark-900 flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-7xl">⚠️</div>
      <h1 className="text-white font-display font-bold text-2xl">Something went wrong</h1>
      <p className="text-white/50 text-sm max-w-xs">The cosmos encountered an unexpected disturbance.</p>
      <div className="flex gap-3">
        <button onClick={reset} className="cosmos-btn">Try Again</button>
        <Link href="/" className="cosmos-btn">← Home</Link>
      </div>
    </div>
  );
}
