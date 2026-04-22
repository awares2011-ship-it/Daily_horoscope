import type { Language } from '@/data/i18n';

export interface AppState {
  language: Language;
  theme: 'dark' | 'light';
  favoriteSign: string | null;
  streak: number;
  lastVisit: string | null;
  totalVisits: number;
  notificationsEnabled: boolean;
  notificationTime: string;
  milestonesShown: number[];
  installPromptDismissed: boolean;
}

const DEFAULT_STATE: AppState = {
  language: 'en',
  theme: 'dark',
  favoriteSign: null,
  streak: 0,
  lastVisit: null,
  totalVisits: 0,
  notificationsEnabled: false,
  notificationTime: '08:00',
  milestonesShown: [],
  installPromptDismissed: false,
};

const STORAGE_KEY = 'horoscope_app_state';

export function getAppState(): AppState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function setAppState(updates: Partial<AppState>): AppState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const current = getAppState();
    const next = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  } catch {
    return DEFAULT_STATE;
  }
}

export function updateStreak(): { streak: number; isNewDay: boolean; milestone: number | null } {
  if (typeof window === 'undefined') return { streak: 0, isNewDay: false, milestone: null };
  const state = getAppState();
  const today = new Date().toDateString();
  const isNewDay = state.lastVisit !== today;

  if (!isNewDay) {
    return { streak: state.streak, isNewDay: false, milestone: null };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = state.lastVisit === yesterday.toDateString();
  const newStreak = wasYesterday ? state.streak + 1 : 1;
  const newVisits = state.totalVisits + 1;

  const milestones = [3, 7, 14, 30];
  const milestone =
    milestones.find(
      (m) => newStreak === m && !state.milestonesShown.includes(m)
    ) ?? null;

  const newMilestonesShown = milestone
    ? [...state.milestonesShown, milestone]
    : state.milestonesShown;

  setAppState({
    streak: newStreak,
    lastVisit: today,
    totalVisits: newVisits,
    milestonesShown: newMilestonesShown,
  });

  return { streak: newStreak, isNewDay: true, milestone };
}

export function setFavoriteSign(signId: string | null): void {
  setAppState({ favoriteSign: signId });
}

export function setLanguage(lang: Language): void {
  setAppState({ language: lang });
}

export function setTheme(theme: 'dark' | 'light'): void {
  setAppState({ theme });
}

export function dismissInstallPrompt(): void {
  setAppState({ installPromptDismissed: true });
}
