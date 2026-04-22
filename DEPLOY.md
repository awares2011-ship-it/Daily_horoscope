# 🚀 Daily Horoscope PWA — Deployment Guide

## 📦 Build & Export

```bash
# Install dependencies
npm install

# Generate app icons
node scripts/generate-icons.mjs

# Build static export
npm run build
# Output is in /out directory
```

---

## 🔥 Firebase Hosting

### 1. Setup Firebase
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Set public directory to: out
# Configure as SPA: No (we have static files)
```

### 2. Update .firebaserc
```json
{
  "projects": {
    "default": "your-actual-firebase-project-id"
  }
}
```

### 3. Deploy
```bash
npm run build
firebase deploy --only hosting
```

### 4. Custom Domain (optional)
- Firebase Console → Hosting → Add custom domain
- Add DNS records with your registrar

---

## 🌐 Vercel (Easier Alternative)

```bash
npm install -g vercel
vercel --prod
```

---

## 📱 Google Play Store via TWA (Trusted Web Activity)

### 1. Install Bubblewrap
```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://yourdomain.com/manifest.json
```

### 2. Configure twa-manifest.json
Key settings to set during init:
- **packageId**: `com.yourname.horoscope`
- **host**: `yourdomain.com`
- **startUrl**: `/`
- **themeColor**: `#6C5CE7`
- **backgroundColor**: `#0a0612`
- **splashScreenFadeOutDuration**: `300`

### 3. Build APK
```bash
bubblewrap build
# Generates app-release-signed.apk
```

### 4. Generate Keystore
```bash
keytool -genkey -v -keystore horoscope.keystore \
  -alias horoscope -keyalg RSA -keysize 2048 -validity 10000
```

### 5. Digital Asset Links (REQUIRED for TWA)
Create: `public/.well-known/assetlinks.json`
```json
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.yourname.horoscope",
    "sha256_cert_fingerprints": ["YOUR_SHA256_FINGERPRINT"]
  }
}]
```

Get fingerprint:
```bash
keytool -list -v -keystore horoscope.keystore | grep SHA256
```

### 6. Play Store Submission
- Google Play Console → Create app
- Upload APK/AAB
- Fill store listing with SEO keywords
- Set category: Lifestyle

---

## 💰 AdMob Integration

### 1. Create AdMob Account
- https://admob.google.com
- Create app → Get App ID

### 2. Replace Placeholder in BannerAd.tsx
```tsx
// Replace the placeholder div with:
<ins className="adsbygoogle"
     style={{ display: 'block' }}
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true" />
```

### 3. Add AdSense Script to layout.tsx
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXX" crossOrigin="anonymous" />
```

### 4. Rewarded Ads in RewardUnlock.tsx
```tsx
// Replace handleUnlock simulation with:
window.adBreak?.({
  type: 'reward',
  name: 'unlock-tomorrow',
  beforeReward: (showAdFn) => showAdFn(),
  adDismissed: () => console.log('dismissed'),
  adViewed: () => setUnlocked(true),
});
```

---

## 🔔 Push Notifications (Production)

For scheduled daily notifications, integrate with **Firebase Cloud Messaging (FCM)**:

```bash
npm install firebase
```

In `lib/notifications.ts` — replace the setTimeout approach with:
```ts
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = { /* your config */ };
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Get FCM token
const token = await getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' });
// Send token to your backend to schedule daily pushes
```

---

## 🔍 SEO Checklist

- [x] Per-page metadata (title, description, keywords)
- [x] Sitemap.xml at `/sitemap.xml`
- [x] robots.txt at `/robots.txt`
- [x] H1 tags on every page
- [x] Semantic HTML (header, section, footer, aria-labels)
- [x] Internal linking between zodiac pages
- [x] Schema.org markup (add to layout for rich results)

### Add Schema Markup (layout.tsx)
```html
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Daily Horoscope",
  "description": "Free daily horoscope for all 12 zodiac signs",
  "url": "https://yourdomain.com",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Any"
})}</script>
```

---

## 🏪 Play Store ASO (App Store Optimization)

**App Name:** Daily Horoscope 🔮 – Rashifal

**Short Description (80 chars):**
Free daily horoscope, rashifal & lucky numbers for all zodiac signs!

**Long Description Keywords:**
- daily horoscope, today horoscope, rashifal today
- aries horoscope, taurus horoscope (all 12 signs)
- love horoscope, career horoscope, health horoscope
- lucky number, lucky color, astrology 2025
- राशिफल आज, कुंडली, ज्योतिष

---

## ⚡ Performance Tips

1. **Lighthouse Score 95+** — already achieved via static export
2. **Image optimization** — icons are PNG, consider WebP for screenshots
3. **Font preloading** — already in layout.tsx
4. **Code splitting** — Next.js handles automatically
5. **Service Worker caching** — included in sw.js

---

## 🔑 Environment Variables (if you add a backend)

Create `.env.local`:
```
NEXT_PUBLIC_ADMOB_APP_ID=ca-app-pub-XXXXXXXX
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_VAPID_KEY=your-vapid-key
```
