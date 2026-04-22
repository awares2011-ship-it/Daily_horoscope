import { ZODIAC_SIGNS } from '@/data/zodiac';
import ZodiacClientPage from './ZodiacClientPage';

export function generateStaticParams() {
  return ZODIAC_SIGNS.map((sign) => ({ sign: sign.id }));
}

interface PageProps {
  params: { sign: string };
}

export function generateMetadata({ params }: PageProps) {
  const id = params.sign?.toLowerCase() ?? '';
  const sign = ZODIAC_SIGNS.find((s) => s.id === id);
  if (!sign) return { title: 'Horoscope' };
  return {
    title: `${sign.name} Daily Horoscope 🔮 Today | Love, Career & Lucky Number`,
    description: `Check ${sign.name} horoscope for today including love, career, health and lucky predictions. Updated daily.`,
    keywords: [`${sign.name} horoscope`, `${sign.name} daily horoscope`, `${sign.name.toLowerCase()} rashifal`, 'astrology', 'zodiac'],
  };
}

export default function ZodiacPage({ params }: PageProps) {
  return <ZodiacClientPage signId={params.sign?.toLowerCase() ?? ''} />;
}
