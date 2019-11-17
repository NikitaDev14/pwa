const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';

self.addEventListener('install', (event: ExtendableEvent) => {
  console.log('[Service Worker] Installing Service Worker ...', event);

  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then((cache: Cache) => {
        console.log('[Service Worker] Precaching App Shell');

        cache.addAll([
          '/',
          '/index.html',
          '/main.js',
          '/material.min.js',
          '/css/app.css',
          '/css/feed.css',
          '/images/main-image.jpg',
          'https://fonts.googleapis.com/css?family=Roboto:400,700',
          'https://fonts.googleapis.com/icon?family=Material+Icons',
          'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css',
        ]);
      }),
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[Service Worker] Activating Service Worker ...', event);

  event.waitUntil(
    caches.keys()
      .then((itemKeysList: string[]) => {
        return Promise.all(
          itemKeysList.map((keyItem: string) => {
            if (keyItem !== CACHE_STATIC_NAME && keyItem !== CACHE_DYNAMIC_NAME) {
              console.log('[Service Worker] Removing old cache.', keyItem);

              return caches.delete(keyItem);
            }
          }),
        );
      }),
  );

  return self.Clients;
});

self.addEventListener('fetch', (event: FetchEvent) => {
  // override response
  event.respondWith(
    caches.match(event.request)
      .then((response: Response): Response | Promise<any> => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((resp: Response) => {
            return caches.open(CACHE_DYNAMIC_NAME)
              .then((cache: Cache): Response => {
                cache.put(event.request.url, resp.clone());

                return resp;
              });
          })
          .catch((error: Error) => {
            console.warn(error);

            return null;
          });
        }),
  );
});
