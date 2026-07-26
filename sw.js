// Cache per la PWA
const CACHE_NAME = 'uniAgenda-v3';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './source/css/app.css',
  './source/css/themes.css',
  './source/css/dashboard.css',
  './source/html/dashboard.html',
  './source/html/calendar.html',
  './source/html/notes.html',
  './source/js/app.js',
  './source/js/dashboard.js',
  './source/js/calendar.js',
  './source/js/notes.js',
  './assets/images/icon.svg',
];

// Installazione del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Gestione delle richieste (usa la cache se disponibile)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Notifiche push
self.addEventListener('push', (event) => {
  const data = event.data?.json();
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: './assets/images/icon.svg',
      badge: '/assets/fallback-icon.png'
    })
  );
});

// Attivazione del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
