'use client';

interface ThemeToggleProps {
  theme: 'dark' | 'light';
  onToggle: () => void;
  darkLabel: string;
  lightLabel: string;
}

export default function ThemeToggle({ theme, onToggle, darkLabel, lightLabel }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-dark-700 border border-white/10
                 text-white/70 text-xs font-semibold hover:bg-dark-600 hover:text-white transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? lightLabel : darkLabel}
    </button>
  );
}
