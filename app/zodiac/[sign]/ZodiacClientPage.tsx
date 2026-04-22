'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { getZodiacById, ZODIAC_SIGNS } from '@/data/zodiac';
import { getDailyHoroscope } from '@/lib/horoscope-engine';
import { translations, type Language } from '@/data/i18n';
import { getAppState, setFavoriteSign as storeFav, setLanguage as storeLang } from '@/lib/storage';
import HoroscopeCard from '@/components/HoroscopeCard';
import RewardUnlock from '@/components/RewardUnlock';
import ShareButtons from '@/components/ShareButtons';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BannerAd from '@/components/BannerAd';
import StarField from '@/components/StarField';
import SkeletonLoader from '@/components/SkeletonLoader';
import NotificationPanel from '@/components/NotificationPanel';

interface Props { signId: string; }

export default function ZodiacClientPage({ signId }: Props) {
  const sign = getZodiacById(signId);
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const state = getAppState();
    setLang(state.language as Language);
    setIsFavorite(state.favoriteSign === signId);
    setMounted(true);
  }, [signId]);

  const handleLangChange = useCallback((l: Language) => {
    setLang(l);
    storeLang(l);
  }, []);

  const handleFavorite = () => {
    const next = !isFavorite;
    setIsFavorite(next);
    storeFav(next ? signId : null);
  };

  if (!sign) {
    return (
      <div className="min-h-dvh bg-dark-900 flex flex-col items-center justify-center gap-4 px-4">
        <div className="text-6xl">🔮</div>
        <p className="text-white/70 text-lg text-center">Sign not found</p>
        <Link href="/" className="cosmos-btn">← Back Home</Link>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="min-h-dvh bg-dark-900 p-4">
        <div className="max-w-lg mx-auto pt-4"><SkeletonLoader /></div>
      </div>
    );
  }

  const today = new Date();
  const dateStr = today.toLocaleDateString(
    lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-US',
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  const signName = lang === 'hi' ? sign.nameHindi : lang === 'mr' ? sign.nameMarathi : sign.name;
  const dateRange = lang === 'hi' ? sign.dateRangeHindi : lang === 'mr' ? sign.dateRangeMarathi : sign.dateRange;
  const horoscope = getDailyHoroscope(sign.id, today, lang);

  const cards = [
    { key: 'general', title: t.general, icon: '🔮', content: horoscope.general, gradient: sign.gradient },
    { key: 'love',    title: t.love,    icon: '❤️', content: horoscope.love,    gradient: 'linear-gradient(135deg,#fd79a8,#e84393)' },
    { key: 'career',  title: t.career,  icon: '💼', content: horoscope.career,  gradient: 'linear-gradient(135deg,#fdcb6e,#e17055)' },
    { key: 'health',  title: t.health,  icon: '🧘', content: horoscope.health,  gradient: 'linear-gradient(135deg,#55efc4,#00b894)' },
  ];

  const related = ZODIAC_SIGNS.filter((s) => s.id !== sign.id).slice(0, 4);
  const shareText = `${signName}: ${horoscope.general.slice(0, 120)}… Lucky: ${horoscope.luckyNumber} | ${t.shareText}`;

  return (
    <div className="min-h-dvh bg-cosmic-gradient relative">
      <StarField count={40} />
      <div className="page-container">

        {/* Nav */}
        <div className="flex items-center justify-between mb-4 pt-2">
          <Link href="/" className="flex items-center gap-1 text-white/60 hover:text-white text-sm transition-colors font-semibold">
            ← {t.backHome}
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotif(!showNotif)}
              className="w-9 h-9 rounded-xl bg-dark-700 border border-white/10 flex items-center justify-center text-base hover:border-white/30 transition-all"
              aria-label="Toggle notifications"
            >🔔</button>
            <LanguageSwitcher current={lang} onChange={handleLangChange} label={t.selectLanguage} />
          </div>
        </div>

        {showNotif && (
          <div className="mb-4 animate-slide-up">
            <NotificationPanel t={t} />
          </div>
        )}

        {/* Hero */}
        <div
          className="relative rounded-3xl overflow-hidden mb-6 p-6 border border-white/10"
          style={{ background: sign.gradient + 'cc' }}
          role="banner"
          aria-label={`${signName} zodiac sign`}
        >
          <div className="absolute inset-0 bg-dark-900/50" />
          <div className="relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-6xl animate-float leading-none">{sign.symbol}</div>
                <div>
                  <h1 className="font-display font-bold text-3xl text-white leading-tight">{signName}</h1>
                  <p className="text-white/60 text-sm">{dateRange}</p>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/80">{sign.element}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white/80">☄️ {sign.ruling}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleFavorite}
                className="text-2xl hover:scale-125 transition-transform shrink-0"
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >{isFavorite ? '⭐' : '☆'}</button>
            </div>
            <div className="flex flex-wrap gap-1 mt-3">
              {sign.traits.map((trait) => (
                <span key={trait} className="text-xs px-2.5 py-1 rounded-full bg-white/15 text-white/80 font-medium backdrop-blur-sm">{trait}</span>
              ))}
            </div>
            <p className="text-white/40 text-xs mt-3">{dateStr}</p>
          </div>
        </div>

        {/* Horoscope sections */}
        <h2 className="section-title">🌟 {t.todaysHoroscope}</h2>
        <div className="space-y-3">
          {cards.map((c, i) => (
            <HoroscopeCard key={c.key} title={c.title} content={c.content} icon={c.icon} gradient={c.gradient} delay={i * 80} />
          ))}
        </div>

        {/* Lucky stats */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-dark-700 border border-white/10 rounded-2xl p-4 text-center animate-slide-up" style={{ animationDelay: '320ms' }}>
            <p className="text-white/50 text-xs mb-1">{t.luckyNumber}</p>
            <p className="text-cosmos-400 font-display font-bold text-5xl leading-tight">{horoscope.luckyNumber}</p>
          </div>
          <div className="bg-dark-700 border border-white/10 rounded-2xl p-4 text-center animate-slide-up" style={{ animationDelay: '380ms' }}>
            <p className="text-white/50 text-xs mb-1">{t.luckyColor}</p>
            <p className="text-white font-bold text-base mb-2">{horoscope.luckyColor}</p>
            <div
              className="w-10 h-10 rounded-full mx-auto border-2 border-white/30 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${sign.color}, ${sign.color}99)`,
                boxShadow: `0 0 12px ${sign.color}66`,
              }}
            />
          </div>
        </div>

        {/* Share */}
        <ShareButtons
          text={shareText}
          shareLabel={t.shareHoroscope}
          copyLabel={t.copyText}
          copiedLabel={t.copiedToClipboard}
        />

        {/* Tomorrow locked */}
        <RewardUnlock sign={sign} lang={lang} t={t} />

        {/* Related signs */}
        <div className="mt-8">
          <h2 className="section-title">🔭 Other Signs</h2>
          <div className="grid grid-cols-4 gap-2">
            {related.map((s) => (
              <Link
                key={s.id}
                href={`/zodiac/${s.id}`}
                className="flex flex-col items-center gap-1 p-3 rounded-xl bg-dark-700 border border-white/10 hover:border-white/30 hover:scale-105 transition-all"
                aria-label={`View ${s.name} horoscope`}
              >
                <span className="text-2xl">{s.symbol}</span>
                <span className="text-white/60 text-xs">{s.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* SEO content */}
        <section className="mt-8 bg-dark-700/50 border border-white/5 rounded-2xl p-5" aria-label="About this zodiac sign">
          <h2 className="text-white/70 font-bold text-sm mb-2">About {sign.name}</h2>
          <p className="text-white/40 text-xs leading-relaxed">
            {sign.name} ({sign.symbol}) is a {sign.element} sign ruled by {sign.ruling}, born between {sign.dateRange}.
            Known for being {sign.traits.join(', ')}, {sign.name} individuals bring unique cosmic energy to everything they do.
            Check back every day for your personalized {sign.name} daily horoscope covering love, career, health, lucky numbers and colors.
            Available in English, Hindi (राशिफल) and Marathi (राशिभविष्य).
          </p>
        </section>

        <footer className="mt-8 pb-4 text-center text-white/20 text-xs">
          <p>{sign.name} Horoscope • {sign.name} Rashifal • Daily Astrology</p>
        </footer>
      </div>

      <BannerAd />
    </div>
  );
}
