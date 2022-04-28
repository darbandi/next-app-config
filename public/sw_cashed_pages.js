const cacheName = 'v6';

const cacheAssets = ['manifest.json', 'index.html'];

// call install event
self.addEventListener('install', (e) => {
  console.log('installed');

  e.waiteUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWating())
  );
});

// call activate event
self.addEventListener('activate', (e) => {
  console.log('activated');

  e.waiteUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('clear old cashe');
            return caches.delete(cache);
          }
        })
      );
    })
    //   .then(() => self.skipWating())
  );
});

// call fetch event
self.addEventListener('fetch', (e) => {
  console.log('fetching');

  e.respondWith(fetch(e.respond).catch(() => caches.match(e.request)));
});
