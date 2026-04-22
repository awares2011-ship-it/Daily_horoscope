import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: { default: 'Daily Horoscope 🔮 – Love, Career & Lucky Numbers', template: '%s | Daily Horoscope 🔮' },
  description: 'Get your free daily horoscope for all 12 zodiac signs. Love, career, health, lucky numbers & colors. Available in English, Hindi & Marathi.',
  keywords: ['daily horoscope', 'rashifal today', 'astrology app', 'zodiac prediction', 'love horoscope', 'career horoscope', 'lucky number', 'kundli', 'rashifal', 'राशिफल'],
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-32x32.png', sizes: '32x32' },
      { url: '/icons/icon-192x192.png', sizes: '192x192' },
    ],
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'Daily Horoscope' },
  openGraph: {
    type: 'website',
    title: 'Daily Horoscope 🔮',
    description: 'Your free daily horoscope for love, career, health & lucky numbers.',
    siteName: 'Daily Horoscope',
  },
  twitter: { card: 'summary_large_image', title: 'Daily Horoscope 🔮' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#6C5CE7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const state = JSON.parse(localStorage.getItem('horoscope_app_state') || '{}');
                if (state.theme === 'light') {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch(e) {}

              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
