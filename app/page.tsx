'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ZODIAC_SIGNS } from '@/data/zodiac';
import { translations, type Language } from '@/data/i18n';
import { getAppState, setAppState, updateStreak, setFavoriteSign as storeFav, setLanguage as storeLang, setTheme as storeTheme } from '@/lib/storage';
import ZodiacCard from '@/components/ZodiacCard';
import StreakTracker from '@/components/StreakTracker';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import InstallBanner from '@/components/InstallBanner';
import MilestoneToast from '@/components/MilestoneToast';
import NotificationPanel from '@/components/NotificationPanel';
import ThemeToggle from '@/components/ThemeToggle';
import StarField from '@/components/StarField';
import BannerAd from '@/components/BannerAd';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [streak, setStreak] = useState(0);
  const [favoriteSign, setFavoriteSign] = useState<string | null>(null);
  const [milestone, setMilestone] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const t = translations[lang];
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    const state = getAppState();
    setLang(state.language as Language);
    setTheme(state.theme);
    setFavoriteSign(state.favoriteSign);

    const { streak: s, milestone: m } = updateStreak();
    setStreak(s);
    if (m) setMilestone(m);
    setMounted(true);
  }, []);

  const handleLangChange = useCallback((l: Language) => {
    setLang(l);
    storeLang(l);
  }, []);

  const handleThemeToggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    storeTheme(next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    document.documentElement.classList.toggle('light', next === 'light');
  }, [theme]);

  const handleFavoriteToggle = useCallback((id: string) => {
    const next = favoriteSign === id ? null : id;
    setFavoriteSign(next);
    storeFav(next);
  }, [favoriteSign]);

  const getMilestoneMsg = () => {
    if (milestone === 3) return t.milestoneThree;
    if (milestone === 7) return t.milestoneSeven;
    if (milestone === 14) return t.milestoneFourteen;
    return '';
  };

  // Sort: favorites first
  const sorted = [...ZODIAC_SIGNS].sort((a, b) => {
    if (a.id === favoriteSign) return -1;
    if (b.id === favoriteSign) return 1;
    return 0;
  });

  if (!mounted) {
    return (
      <div className="min-h-dvh bg-dark-900 flex items-center justify-center">
        <div className="text-cosmos-400 text-4xl animate-spin">🔮</div>
      </div>
    );
  }

  return (
    <div className={`min-h-dvh bg-cosmic-gradient relative ${theme}`}>
      <StarField count={50} />
      <InstallBanner label={t.installApp} />
      <MilestoneToast milestone={milestone} message={getMilestoneMsg()} onDone={() => setMilestone(null)} />

      <div className="page-container">
        {/* Top bar */}
        <header className="flex items-center justify-between mb-6 pt-2">
          <div className="flex-1">
            <h1 className="font-display font-bold text-xl text-gradient leading-tight">
              {t.appName}
            </h1>
            <p className="text-white/40 text-xs">{today}</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} darkLabel={t.darkMode} lightLabel={t.lightMode} />
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="w-9 h-9 rounded-xl bg-dark-700 border border-white/10 flex items-center justify-center text-base hover:border-white/30 transition-all"
              aria-label="Settings"
            >
              ⚙️
            </button>
          </div>
        </header>

        {/* Language switcher */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">{t.selectLanguage}</p>
          <LanguageSwitcher current={lang} onChange={handleLangChange} label={t.selectLanguage} />
        </div>

        {/* Settings panel */}
        {showSettings && (
          <div className="mb-5 animate-slide-up">
            <NotificationPanel t={t} />
          </div>
        )}

        {/* Hero */}
        <div className="relative rounded-3xl overflow-hidden mb-6 bg-gradient-to-br from-cosmos-900 via-dark-700 to-dark-800 border border-cosmos-500/30 p-6">
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="relative text-center">
            <div className="text-6xl mb-3 animate-float inline-block">🔮</div>
            <h2 className="font-display font-bold text-2xl text-white mb-2 leading-tight">
              {t.checkHoroscope}
            </h2>
            <p className="text-white/60 text-sm mb-4">{t.tagline}</p>
            {streak > 0 && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-sm font-bold">
                🔥 {streak} {t.days} {t.streakDays}
              </div>
            )}
          </div>
        </div>

        {/* Streak tracker */}
        {streak > 0 && (
          <div className="mb-5">
            <StreakTracker streak={streak} t={t} />
          </div>
        )}

        {/* Zodiac grid */}
        <section aria-label="Zodiac signs">
          <h2 className="section-title">✨ Choose Your Sign</h2>
          <div className="grid grid-cols-3 gap-3">
            {sorted.map((sign, i) => (
              <ZodiacCard
                key={sign.id}
                sign={sign}
                isFavorite={favoriteSign === sign.id}
                language={lang}
                onFavoriteToggle={handleFavoriteToggle}
                animationDelay={i * 40}
              />
            ))}
          </div>
        </section>

        {/* Quick links */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[
            { href: '/zodiac/aries', label: '♈ Aries Today', bg: 'from-red-500/20 to-orange-500/20', border: 'border-red-500/30' },
            { href: '/zodiac/leo', label: '♌ Leo Today', bg: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30' },
            { href: '/zodiac/libra', label: '♎ Libra Today', bg: 'from-pink-500/20 to-purple-500/20', border: 'border-pink-500/30' },
            { href: '/zodiac/scorpio', label: '♏ Scorpio Today', bg: 'from-gray-500/20 to-slate-600/20', border: 'border-gray-500/30' },
          ].map(({ href, label, bg, border }) => (
            <Link
              key={href}
              href={href}
              className={`bg-gradient-to-br ${bg} border ${border} rounded-xl p-3 text-center text-white/80 text-sm font-semibold hover:text-white transition-all hover:scale-105`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* SEO footer */}
        <footer className="mt-10 text-center text-white/20 text-xs space-y-1 pb-4">
          <p>Daily Horoscope • Rashifal • Astrology • Zodiac</p>
          <p>© {new Date().getFullYear()} Daily Horoscope. Free & Ad-supported.</p>
        </footer>
      </div>

      <BannerAd />
    </div>
  );
}
