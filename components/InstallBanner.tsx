'use client';

import { useEffect, useState } from 'react';
import { dismissInstallPrompt } from '@/lib/storage';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallBannerProps {
  label: string;
}

export default function InstallBanner({ label }: InstallBannerProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShow(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShow(false);
    dismissInstallPrompt();
  };

  if (!show) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 max-w-lg mx-auto animate-slide-up">
      <div className="rounded-2xl bg-dark-700 border border-cosmos-500/40 p-4 shadow-cosmos-lg flex items-center gap-3">
        <div className="text-3xl shrink-0">🔮</div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm">Install Daily Horoscope</p>
          <p className="text-white/50 text-xs">Get daily cosmic updates on your home screen</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 bg-cosmos-500 text-white text-xs font-bold rounded-lg hover:bg-cosmos-600 transition-colors"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="px-2 py-1.5 text-white/40 text-xs hover:text-white/70 transition-colors"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
