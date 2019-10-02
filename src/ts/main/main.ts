import { assignPrompt } from './feed';
import { test } from './greet';

console.log(test());

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/serviceWorker.js')
    .then(() => {
      console.log('Service worker registered!');
    });
}

window.addEventListener('beforeinstallprompt', (event: any) => {
  console.log('beforeinstallprompt', event);

  event.preventDefault();

  assignPrompt(event);
});
