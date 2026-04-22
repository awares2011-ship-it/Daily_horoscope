'use client';

import { useEffect, useState } from 'react';

interface MilestoneToastProps {
  milestone: number | null;
  message: string;
  onDone: () => void;
}

export default function MilestoneToast({ milestone, message, onDone }: MilestoneToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (milestone === null) return;
    setVisible(true);

    // Trigger confetti
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then((m) => {
        const confetti = m.default;
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 }, colors: ['#6C5CE7', '#fd79a8', '#ffeaa7', '#55efc4'] });
      }).catch(() => { /* optional dep */ });
    }

    const t = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 4000);
    return () => clearTimeout(t);
  }, [milestone, onDone]);

  if (!visible || milestone === null) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 max-w-sm mx-auto pointer-events-none animate-slide-up">
      <div className="rounded-2xl bg-gradient-to-r from-cosmos-600 to-nebula-pink p-4 shadow-cosmos-lg text-center">
        <p className="text-white font-display font-bold text-base">{message}</p>
      </div>
    </div>
  );
}
