const CACHE_NAME = 'horoscope-v2';
const STATIC_ASSETS = ['/', '/manifest.json', '/offline.html', '/icons/icon-192x192.png', '/icons/icon-512x512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(STATIC_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fresh = fetch(e.request).then((res) => {
        if (res.ok) caches.open(CACHE_NAME).then((c) => c.put(e.request, res.clone()));
        return res;
      }).catch(() => caches.match('/offline.html'));
      return cached || fresh;
    })
  );
});

self.addEventListener('push', (e) => {
  const d = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(d.title || 'Daily Horoscope 🔮', {
    body: d.body || 'Your cosmic reading for today is ready! ✨',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    tag: 'daily-horoscope',
    data: { url: d.url || '/' },
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = e.notification.data?.url || '/';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((ws) => {
      const w = ws.find((x) => x.url.includes(url));
      return w ? w.focus() : clients.openWindow(url);
    })
  );
});
