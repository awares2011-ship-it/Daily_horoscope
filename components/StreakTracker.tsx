'use client';

import clsx from 'clsx';

interface StreakTrackerProps {
  streak: number;
  t: { streakMessage: string; streakDays: string; keepItUp: string; amazing: string; legendary: string };
}

const getStreakEmoji = (streak: number) => {
  if (streak >= 30) return '🌟';
  if (streak >= 14) return '💎';
  if (streak >= 7) return '🔥';
  if (streak >= 3) return '✨';
  return '⭐';
};

const getStreakMessage = (streak: number, t: StreakTrackerProps['t']) => {
  if (streak >= 14) return t.legendary;
  if (streak >= 7) return t.amazing;
  return t.keepItUp;
};

export default function StreakTracker({ streak, t }: StreakTrackerProps) {
  if (streak < 1) return null;

  const emoji = getStreakEmoji(streak);
  const msg = getStreakMessage(streak, t);
  const pct = Math.min((streak / 30) * 100, 100);

  return (
    <div className={clsx(
      'relative rounded-2xl p-4 overflow-hidden',
      'bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20',
      'border border-orange-500/30 animate-glow-pulse'
    )}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl animate-float">{emoji}</span>
          <div>
            <p className="text-white font-bold text-sm">
              {t.streakMessage} <span className="text-orange-400 text-lg">{streak}</span>-{t.streakDays}!
            </p>
            <p className="text-white/60 text-xs">{msg}</p>
          </div>
        </div>
      </div>

      {/* Progress bar toward 30-day milestone */}
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-white/40 text-xs mt-1 text-right">{streak}/30</p>
    </div>
  );
}
