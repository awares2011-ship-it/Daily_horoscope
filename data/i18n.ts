export type Language = 'en' | 'hi' | 'mr';

export interface Translations {
  appName: string;
  tagline: string;
  checkHoroscope: string;
  todaysHoroscope: string;
  general: string;
  love: string;
  career: string;
  health: string;
  luckyNumber: string;
  luckyColor: string;
  streakDays: string;
  streakMessage: string;
  tomorrowLocked: string;
  unlockTomorrow: string;
  shareHoroscope: string;
  copyText: string;
  installApp: string;
  darkMode: string;
  lightMode: string;
  selectLanguage: string;
  favoriteSign: string;
  dailyReminder: string;
  enableNotifications: string;
  notificationsEnabled: string;
  notificationTime: string;
  milestoneThree: string;
  milestoneSeven: string;
  milestoneFourteen: string;
  readMore: string;
  element: string;
  ruling: string;
  traits: string;
  shareText: string;
  copiedToClipboard: string;
  streak: string;
  days: string;
  keepItUp: string;
  amazing: string;
  legendary: string;
  loading: string;
  home: string;
  backHome: string;
  dateRange: string;
  notificationBody: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'Daily Horoscope 🔮',
    tagline: 'Your cosmic guide to love, career & destiny',
    checkHoroscope: 'Check Today\'s Horoscope 🔮',
    todaysHoroscope: "Today's Horoscope",
    general: 'General',
    love: '❤️ Love',
    career: '💼 Career',
    health: '🧘 Health',
    luckyNumber: '🔢 Lucky Number',
    luckyColor: '🎨 Lucky Color',
    streakDays: 'Day Streak',
    streakMessage: 'You\'re on a',
    tomorrowLocked: "Tomorrow's Reading (Locked)",
    unlockTomorrow: '🎁 Watch Ad to Unlock Tomorrow',
    shareHoroscope: 'Share Your Horoscope 🔮',
    copyText: '📋 Copy',
    installApp: '📲 Install App',
    darkMode: '🌙 Dark',
    lightMode: '☀️ Light',
    selectLanguage: 'Language',
    favoriteSign: '⭐ Favorite',
    dailyReminder: 'Daily Reminder',
    enableNotifications: '🔔 Enable Daily Notifications',
    notificationsEnabled: '✅ Notifications Active',
    notificationTime: 'Reminder Time',
    milestoneThree: '🎉 3-Day Streak! Cosmic energy flows!',
    milestoneSeven: '🔥 7-Day Streak! You\'re unstoppable!',
    milestoneFourteen: '🌟 14-Day Streak! You\'re a cosmic legend!',
    readMore: 'Read More',
    element: 'Element',
    ruling: 'Ruling Planet',
    traits: 'Key Traits',
    shareText: 'Check out my horoscope on Daily Horoscope 🔮',
    copiedToClipboard: '✅ Copied to clipboard!',
    streak: '🔥 Streak',
    days: 'days',
    keepItUp: 'Keep it up!',
    amazing: 'Amazing!',
    legendary: 'Legendary!',
    loading: 'Reading the stars...',
    home: 'Home',
    backHome: '← Back to All Signs',
    dateRange: 'Date Range',
    notificationBody: 'Your daily cosmic reading awaits! ✨',
  },
  hi: {
    appName: 'दैनिक राशिफल 🔮',
    tagline: 'प्रेम, करियर और भाग्य के लिए आपका ब्रह्मांडीय मार्गदर्शक',
    checkHoroscope: 'आज का राशिफल देखें 🔮',
    todaysHoroscope: 'आज का राशिफल',
    general: 'सामान्य',
    love: '❤️ प्रेम',
    career: '💼 करियर',
    health: '🧘 स्वास्थ्य',
    luckyNumber: '🔢 भाग्यशाली अंक',
    luckyColor: '🎨 भाग्यशाली रंग',
    streakDays: 'दिन की स्ट्रीक',
    streakMessage: 'आप',
    tomorrowLocked: 'कल का राशिफल (बंद)',
    unlockTomorrow: '🎁 कल का राशिफल खोलने के लिए विज्ञापन देखें',
    shareHoroscope: 'अपना राशिफल शेयर करें 🔮',
    copyText: '📋 कॉपी करें',
    installApp: '📲 ऐप इंस्टॉल करें',
    darkMode: '🌙 डार्क',
    lightMode: '☀️ लाइट',
    selectLanguage: 'भाषा',
    favoriteSign: '⭐ पसंदीदा',
    dailyReminder: 'दैनिक अनुस्मारक',
    enableNotifications: '🔔 दैनिक सूचनाएं सक्षम करें',
    notificationsEnabled: '✅ सूचनाएं सक्रिय',
    notificationTime: 'अनुस्मारक समय',
    milestoneThree: '🎉 3 दिन की स्ट्रीक! ब्रह्मांडीय ऊर्जा बह रही है!',
    milestoneSeven: '🔥 7 दिन की स्ट्रीक! आप अजेय हैं!',
    milestoneFourteen: '🌟 14 दिन की स्ट्रीक! आप एक ब्रह्मांडीय किंवदंती हैं!',
    readMore: 'और पढ़ें',
    element: 'तत्व',
    ruling: 'शासक ग्रह',
    traits: 'मुख्य गुण',
    shareText: 'दैनिक राशिफल पर मेरा राशिफल देखें 🔮',
    copiedToClipboard: '✅ क्लिपबोर्ड पर कॉपी!',
    streak: '🔥 स्ट्रीक',
    days: 'दिन',
    keepItUp: 'जारी रखें!',
    amazing: 'अद्भुत!',
    legendary: 'किंवदंती!',
    loading: 'तारे पढ़ रहे हैं...',
    home: 'होम',
    backHome: '← सभी राशियां',
    dateRange: 'तारीख सीमा',
    notificationBody: 'आपकी दैनिक ब्रह्मांडीय रीडिंग का इंतजार है! ✨',
  },
  mr: {
    appName: 'दैनिक राशिभविष्य 🔮',
    tagline: 'प्रेम, करिअर आणि नशीबासाठी तुमचा वैश्विक मार्गदर्शक',
    checkHoroscope: 'आजचे राशिभविष्य पाहा 🔮',
    todaysHoroscope: 'आजचे राशिभविष्य',
    general: 'सामान्य',
    love: '❤️ प्रेम',
    career: '💼 करिअर',
    health: '🧘 आरोग्य',
    luckyNumber: '🔢 भाग्यांक',
    luckyColor: '🎨 भाग्याचा रंग',
    streakDays: 'दिवसांची स्ट्रीक',
    streakMessage: 'तुम्ही',
    tomorrowLocked: 'उद्याचे भविष्य (बंद)',
    unlockTomorrow: '🎁 उद्याचे भविष्य उघडण्यासाठी जाहिरात पाहा',
    shareHoroscope: 'तुमचे राशिभविष्य शेअर करा 🔮',
    copyText: '📋 कॉपी करा',
    installApp: '📲 ॲप इंस्टॉल करा',
    darkMode: '🌙 डार्क',
    lightMode: '☀️ लाइट',
    selectLanguage: 'भाषा',
    favoriteSign: '⭐ आवडते',
    dailyReminder: 'दैनिक स्मरणपत्र',
    enableNotifications: '🔔 दैनिक सूचना सक्षम करा',
    notificationsEnabled: '✅ सूचना सक्रिय',
    notificationTime: 'स्मरणपत्र वेळ',
    milestoneThree: '🎉 ३ दिवसांची स्ट्रीक! वैश्विक ऊर्जा वाहत आहे!',
    milestoneSeven: '🔥 ७ दिवसांची स्ट्रीक! तुम्ही अजिंक्य आहात!',
    milestoneFourteen: '🌟 १४ दिवसांची स्ट्रीक! तुम्ही एक वैश्विक दंतकथा आहात!',
    readMore: 'अधिक वाचा',
    element: 'तत्व',
    ruling: 'शासक ग्रह',
    traits: 'मुख्य गुण',
    shareText: 'दैनिक राशिभविष्यावर माझे राशिभविष्य पाहा 🔮',
    copiedToClipboard: '✅ क्लिपबोर्डवर कॉपी!',
    streak: '🔥 स्ट्रीक',
    days: 'दिवस',
    keepItUp: 'सुरू ठेवा!',
    amazing: 'अद्भुत!',
    legendary: 'दंतकथा!',
    loading: 'तारे वाचत आहे...',
    home: 'होम',
    backHome: '← सर्व राशी',
    dateRange: 'तारखेची श्रेणी',
    notificationBody: 'तुमचे दैनिक वैश्विक वाचन प्रतीक्षेत आहे! ✨',
  },
};
