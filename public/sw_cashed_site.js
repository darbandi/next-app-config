const cacheName = 'v8';

// call install event
self.addEventListener('install', () => {});

// call activate event
self.addEventListener('activate', (e) => {
  e.waiteUntil(
    caches.keys().then((cacheNames) => {
      return new Promise.all(
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

  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // make copy/clone of response
        const resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          // add the response to the cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(e.request).then((res) => res))
  );
});
