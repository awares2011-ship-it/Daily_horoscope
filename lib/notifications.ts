export interface NotificationConfig {
  time: string; // HH:MM format
  zodiacId?: string;
  language?: string;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  if (Notification.permission === 'denied') return false;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (typeof window === 'undefined') return 'unsupported';
  if (!('Notification' in window)) return 'unsupported';
  return Notification.permission;
}

export async function scheduleNotification(config: NotificationConfig): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  const granted = await requestNotificationPermission();
  if (!granted) return false;

  try {
    if ('serviceWorker' in navigator) {
      const reg = await navigator.serviceWorker.ready;
      if ('showNotification' in reg) {
        const [hours, minutes] = config.time.split(':').map(Number);
        const now = new Date();
        const scheduledTime = new Date();
        scheduledTime.setHours(hours, minutes, 0, 0);
        if (scheduledTime <= now) scheduledTime.setDate(scheduledTime.getDate() + 1);

        const delay = scheduledTime.getTime() - now.getTime();
        setTimeout(() => {
          reg.showNotification('Daily Horoscope 🔮', {
            body: 'Your cosmic reading for today is ready! ✨',
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            tag: 'daily-horoscope',
            requireInteraction: false,
            data: { url: '/' },
          });
        }, delay);
        return true;
      }
    }
  } catch { /* silent */ }

  return false;
}

export function showInstantNotification(title: string, body: string): void {
  if (typeof window === 'undefined') return;
  if (Notification.permission !== 'granted') return;
  try {
    new Notification(title, {
      body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      tag: 'horoscope-instant',
    });
  } catch { /* silent */ }
}

export function cancelNotifications(): void {
  if (typeof window === 'undefined') return;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.getNotifications({ tag: 'daily-horoscope' }).then((notifications) => {
        notifications.forEach((n) => n.close());
      });
    }).catch(() => { /* silent */ });
  }
}

export function saveNotificationTime(time: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('notification_time', time);
  } catch { /* silent */ }
}

export function getNotificationTime(): string {
  if (typeof window === 'undefined') return '08:00';
  try {
    return localStorage.getItem('notification_time') ?? '08:00';
  } catch {
    return '08:00';
  }
}
