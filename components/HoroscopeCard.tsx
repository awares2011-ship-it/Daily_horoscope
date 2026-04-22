'use client';

import { useState } from 'react';
import clsx from 'clsx';

interface HoroscopeCardProps {
  title: string;
  content: string;
  icon: string;
  gradient: string;
  delay?: number;
}

export default function HoroscopeCard({ title, content, icon, gradient, delay = 0 }: HoroscopeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const isLong = content.length > 160;
  const displayText = !expanded && isLong ? content.slice(0, 160) + '…' : content;

  return (
    <div
      className="animate-slide-up rounded-2xl overflow-hidden bg-dark-700 border border-white/10 hover:border-white/20 transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-1 w-full" style={{ background: gradient }} />
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
            style={{ background: gradient + '33' }}
          >
            {icon}
          </div>
          <h3 className="text-white font-display font-bold text-base">{title}</h3>
        </div>
        <p className="text-white/80 font-body text-sm leading-relaxed">{displayText}</p>
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-cosmos-400 text-xs hover:text-cosmos-300 transition-colors font-semibold"
          >
            {expanded ? 'Read less ↑' : 'Read more ↓'}
          </button>
        )}
      </div>
    </div>
  );
}
