import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.daily.horoscope',
  appName: 'Daily Horoscope',

  // ✅ VERY IMPORTANT (fix)
  webDir: 'out',

  bundledWebRuntime: false,

  android: {
    backgroundColor: '#0a0612'
  },

  plugins: {
    AdMob: {
      // ✅ Use TEST ID for now (DO NOT use real ID in testing)
      appId: 'ca-app-pub-3940256099942544~3347511713'
    }
  }
};

export default config;
