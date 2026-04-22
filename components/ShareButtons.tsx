'use client';

import { useState } from 'react';

interface ShareButtonsProps {
  text: string;
  shareLabel: string;
  copyLabel: string;
  copiedLabel: string;
}

export default function ShareButtons({ text, shareLabel, copyLabel, copiedLabel }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + (typeof window !== 'undefined' ? window.location.href : ''))}`;
    window.open(url, '_blank', 'noopener');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text + ' ' + window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title: 'Daily Horoscope 🔮', text, url: window.location.href });
      } catch { /* user cancelled */ }
    } else {
      handleWhatsApp();
    }
  };

  return (
    <div className="mt-6">
      <p className="text-white/60 text-xs mb-3 text-center font-semibold uppercase tracking-wider">
        {shareLabel}
      </p>
      <div className="flex gap-2">
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl
                     bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366]
                     text-sm font-bold hover:bg-[#25D366]/30 transition-all"
          aria-label="Share on WhatsApp"
        >
          <span>📱</span> WhatsApp
        </button>
        <button
          onClick={handleNativeShare}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl
                     bg-cosmos-500/20 border border-cosmos-500/30 text-cosmos-300
                     text-sm font-bold hover:bg-cosmos-500/30 transition-all"
          aria-label="Share horoscope"
        >
          <span>🔗</span> Share
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl
                     bg-white/10 border border-white/20 text-white/80
                     text-sm font-bold hover:bg-white/20 transition-all"
          aria-label="Copy to clipboard"
        >
          {copied ? '✅' : '📋'}
        </button>
      </div>
      {copied && (
        <p className="text-green-400 text-xs text-center mt-2 animate-fade-in">{copiedLabel}</p>
      )}
    </div>
  );
}
