import { horoscopeDataset, type HoroscopeData } from '@/data/horoscope';
import type { Language } from '@/data/i18n';

export interface DailyHoroscope {
  general: string;
  love: string;
  career: string;
  health: string;
  luckyNumber: number;
  luckyColor: string;
}

function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return () => {
    hash ^= hash << 13;
    hash ^= hash >> 17;
    hash ^= hash << 5;
    return Math.abs(hash) / 2147483647;
  };
}

function pickItem<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function getDailyHoroscope(
  zodiacId: string,
  date: Date = new Date(),
  lang: Language = 'en',
  offset: number = 0
): DailyHoroscope {
  const targetDate = new Date(date);
  targetDate.setDate(targetDate.getDate() + offset);
  const seed = targetDate.toDateString() + zodiacId + lang;
  const rng = seededRandom(seed);

  const data: HoroscopeData = horoscopeDataset[zodiacId] ?? horoscopeDataset['aries'];

  const getContent = (
    en: string[],
    hi: string[],
    mr: string[]
  ): string => {
    if (lang === 'hi') return pickItem(hi.length > 0 ? hi : en, rng);
    if (lang === 'mr') return pickItem(mr.length > 0 ? mr : en, rng);
    return pickItem(en, rng);
  };

  return {
    general: getContent(data.general, data.generalHindi, data.generalMarathi),
    love: getContent(data.love, data.loveHindi, data.loveMarathi),
    career: getContent(data.career, data.careerHindi, data.careerMarathi),
    health: getContent(data.health, data.healthHindi, data.healthMarathi),
    luckyNumber: pickItem(data.luckyNumbers, rng),
    luckyColor: pickItem(data.luckyColors, rng),
  };
}

export function getWeeklyHoroscope(
  zodiacId: string,
  lang: Language = 'en'
): DailyHoroscope[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) =>
    getDailyHoroscope(zodiacId, today, lang, i)
  );
}
