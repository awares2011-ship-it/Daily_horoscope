'use client';

import Link from 'next/link';
import { ZodiacSign } from '@/data/zodiac';
import { Language } from '@/data/i18n';
import clsx from 'clsx';

interface ZodiacCardProps {
  sign: ZodiacSign;
  isFavorite: boolean;
  language: Language;
  onFavoriteToggle: (id: string) => void;
  animationDelay?: number;
}

export default function ZodiacCard({
  sign,
  isFavorite,
  language,
  onFavoriteToggle,
  animationDelay = 0,
}: ZodiacCardProps) {
  const name = language === 'hi' ? sign.nameHindi : language === 'mr' ? sign.nameMarathi : sign.name;
  const dateRange =
    language === 'hi'
      ? sign.dateRangeHindi
      : language === 'mr'
      ? sign.dateRangeMarathi
      : sign.dateRange;

  const elementColors: Record<string, string> = {
    Fire: 'text-orange-400',
    Earth: 'text-green-400',
    Air: 'text-blue-300',
    Water: 'text-cyan-400',
  };

  return (
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <Link
        href={`/zodiac/${sign.id}`}
        className={clsx(
          'group relative block rounded-2xl overflow-hidden transition-all duration-300',
          'bg-dark-700 border border-white/10 hover:border-white/30',
          'hover:scale-105 hover:shadow-cosmos-lg hover:-translate-y-1',
          'backdrop-blur-sm'
        )}
        aria-label={`View ${name} horoscope`}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          style={{ background: sign.gradient }}
        />

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavoriteToggle(sign.id);
          }}
          className="absolute top-2 right-2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 transition-all text-sm"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>

        <div className="relative p-4 text-center">
          {/* Symbol */}
          <div
            className="text-4xl mb-1 animate-float"
            style={{ animationDelay: `${animationDelay * 0.5}ms` }}
          >
            {sign.symbol}
          </div>

          {/* Name */}
          <h3 className="text-white font-display font-bold text-sm mb-0.5 leading-tight">
            {name}
          </h3>

          {/* Date Range */}
          <p className="text-white/50 text-xs leading-tight mb-2">{dateRange}</p>

          {/* Element badge */}
          <span
            className={clsx(
              'text-xs font-mono px-2 py-0.5 rounded-full bg-white/10',
              elementColors[sign.element]
            )}
          >
            {sign.element}
          </span>
        </div>

        {/* Bottom gradient line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: sign.gradient }}
        />
      </Link>
    </div>
  );
}
