self.addEventListener('install', (event: MessageEvent | ErrorEvent) => {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  console.log('[Service Worker] Activating Service Worker ...', event);

  return self.Clients;
});

self.addEventListener('fetch', (event: FetchEvent) => {
  // override response
  event.respondWith(fetch(event.request));
});
