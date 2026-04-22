'use client';

import { useMemo } from 'react';

export default function StarField({ count = 60 }: { count?: number }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 4,
      duration: 2 + Math.random() * 3,
    })), [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white animate-star-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}
