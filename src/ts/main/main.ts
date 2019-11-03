import { assignPrompt } from './feed';
import { test } from './greet';

console.info(test());

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(() => {
      console.log('Service worker registered!');
    })
    .catch(() => {
      console.warn('Error while service worker registering');
    });
}

window.addEventListener('beforeinstallprompt', (event: any) => {
  console.log('beforeinstallprompt', event);

  event.preventDefault();

  assignPrompt(event);

  return false;
});
