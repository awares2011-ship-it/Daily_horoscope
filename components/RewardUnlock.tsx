'use client';

import { useState } from 'react';
import { getDailyHoroscope } from '@/lib/horoscope-engine';
import { Language, Translations } from '@/data/i18n';
import HoroscopeCard from './HoroscopeCard';
import { ZodiacSign } from '@/data/zodiac';

interface RewardUnlockProps {
  sign: ZodiacSign;
  lang: Language;
  t: Translations;
}

export default function RewardUnlock({ sign, lang, t }: RewardUnlockProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUnlock = async () => {
    setLoading(true);
    // Simulate reward ad — replace with real AdMob rewarded ad SDK call
    await new Promise<void>((r) => setTimeout(r, 1500));
    setLoading(false);
    setUnlocked(true);
  };

  const tomorrow = getDailyHoroscope(sign.id, new Date(), lang, 1);

  const cards = [
    { id: 'general', title: t.general,  icon: '🔮', content: tomorrow.general,  gradient: sign.gradient },
    { id: 'love',    title: t.love,     icon: '❤️', content: tomorrow.love,     gradient: 'linear-gradient(135deg,#fd79a8,#e84393)' },
    { id: 'career',  title: t.career,   icon: '💼', content: tomorrow.career,   gradient: 'linear-gradient(135deg,#fdcb6e,#e17055)' },
    { id: 'health',  title: t.health,   icon: '🧘', content: tomorrow.health,   gradient: 'linear-gradient(135deg,#55efc4,#00b894)' },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-white font-display text-lg font-bold mb-4 flex items-center gap-2">
        🔒 {t.tomorrowLocked}
      </h2>

      {!unlocked ? (
        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          {/* Blurred preview */}
          <div className="filter blur-sm pointer-events-none select-none opacity-50 p-4 space-y-3">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-dark-700 rounded-xl p-4 h-20" />
            ))}
          </div>
          {/* Unlock CTA overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-dark-900/70 backdrop-blur-xs">
            <div className="text-4xl mb-3 animate-float">🎁</div>
            <p className="text-white font-display font-bold text-base mb-1 text-center px-6">
              Unlock Tomorrow&apos;s Reading
            </p>
            <p className="text-white/60 text-xs mb-4 text-center px-8">
              Watch a short ad to reveal what the stars hold for you tomorrow
            </p>
            <button
              onClick={handleUnlock}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cosmos-500 to-nebula-pink
                         text-white font-bold text-sm hover:opacity-90 transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed animate-glow-pulse"
            >
              {loading ? '⏳ Loading Ad…' : t.unlockTomorrow}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 animate-fade-in">
          {cards.map((c, i) => (
            <HoroscopeCard
              key={c.id}
              title={c.title}
              icon={c.icon}
              content={c.content}
              gradient={c.gradient}
              delay={i * 80}
            />
          ))}
          <div className="flex gap-3 mt-2">
            <div className="flex-1 bg-dark-700 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/50 text-xs mb-1">{t.luckyNumber}</p>
              <p className="text-cosmos-400 font-display font-bold text-2xl">{tomorrow.luckyNumber}</p>
            </div>
            <div className="flex-1 bg-dark-700 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/50 text-xs mb-1">{t.luckyColor}</p>
              <p className="text-white font-bold text-sm mt-1">{tomorrow.luckyColor}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
