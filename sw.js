// sw.js

// IMPORTANTE: CAMBIAR A V4 PARA FORZAR LA INSTALACIÓN DE LA NUEVA VERSIÓN
const CACHE_NAME = 'chefportable-v4'; 

const urlsToCache = [
  './',
  './index.html',
  // Recursos externos necesarios
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cacheando recursos esenciales (v4)');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('ERROR CRÍTICO: Falló el cacheo de recursos.', error);
        throw error; 
      })
  );
});

// Esta sección borra las cachés antiguas (incluida la v3)
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
});


self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Estrategia Cache-First
        return response || fetch(event.request);
      })
  );
});