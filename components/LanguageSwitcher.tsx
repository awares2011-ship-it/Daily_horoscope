'use client';

import { Language } from '@/data/i18n';

interface LanguageSwitcherProps {
  current: Language;
  onChange: (lang: Language) => void;
  label: string;
}

const LANGS: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'hi', label: 'हि', flag: '🇮🇳' },
  { code: 'mr', label: 'मर', flag: '🟠' },
];

export default function LanguageSwitcher({ current, onChange, label }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-1 bg-dark-700 border border-white/10 rounded-xl p-1">
      {LANGS.map(({ code, label: l, flag }) => (
        <button
          key={code}
          onClick={() => onChange(code)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
            current === code
              ? 'bg-cosmos-500 text-white shadow-glow-purple'
              : 'text-white/50 hover:text-white hover:bg-white/10'
          }`}
          aria-label={`Switch to ${code} language`}
          title={`${flag} ${l}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
