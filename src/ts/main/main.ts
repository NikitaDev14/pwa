import { assignPrompt } from './feed';
import { test } from './greet';

console.log(test());

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
});

fetch('https://httpbin.org/ip')
  .then((response: Response) => {
    console.log(response);

    return response.json();
  })
  .then((responseJson: any) => {
    console.log(responseJson);
  })
  .catch((error: any) => {
    console.error(error);
  });
