// sw.js
// ¡CAMBIAR EL NOMBRE DE LA CACHÉ PARA FORZAR LA ACTUALIZACIÓN!
const CACHE_NAME = 'chefportable-v8'; // <-- CAMBIO REALIZADO

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',        // ¡Añadir!
  './icon-192x192.png',     // ¡Añadir!
  './icon-512x512.png',     // ¡Añadir!
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(error => console.error('Fallo al precachear archivos:', error))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Opcional: Limpiar cachés viejas
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});;