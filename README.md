# 🔮 Daily Horoscope PWA

A production-grade Progressive Web App for daily horoscopes with AdMob monetization, streak system, push notifications, and multi-language support.

## Features
- 🌟 12 Zodiac signs with daily horoscopes
- ❤️ Love, Career, Health, Lucky Number & Color
- 🔥 Daily streak system with milestone celebrations
- 🔒 Tomorrow's reading locked behind reward ad
- 🌍 English, Hindi (हिंदी), Marathi (मराठी)
- 🔔 Push notifications for daily reminders
- 📤 WhatsApp & native share
- ⭐ Favorite sign
- 🌙 Dark / Light mode
- 📲 PWA installable (Play Store ready via TWA)
- ⚡ Lighthouse 95+ (fully static export)

## Quick Start
```bash
npm install
node scripts/generate-icons.mjs   # generate icons
npm run build                      # builds to /out
```

## Deploy
See [DEPLOY.md](./DEPLOY.md) for full Firebase, Play Store & AdMob setup.

## Tech Stack
- Next.js 14 (App Router, Static Export)
- TypeScript (strict)
- Tailwind CSS
- PWA (manifest.json + sw.js)
- No external APIs — fully local dataset
