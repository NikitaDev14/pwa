import { fromEvent } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { mergeMap, switchMap } from 'rxjs/operators';

import { assignPrompt } from './feed';
import { test } from './greet';

const testBtn: HTMLButtonElement = document.querySelector('#test-btn');

testBtn.addEventListener('click', test);

fromEvent(testBtn, 'click')
  .pipe(
    switchMap(() => fromFetch(
      'https://api.graph.cool/simple/v1/ciyz901en4j590185wkmexyex',
      {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          query: `
            query {
              allUsers {
                id
                name
              }
            }
          `,
        }),
      },
    )),
    mergeMap((rawResponse: Response) => {
      return rawResponse.json();
    }),
  )
  .subscribe((response: any) => {
    console.log(response);
  });

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker
//     .register('/serviceWorker.js')
//     .then(() => {
//       console.log('Service worker registered!');
//     })
//     .catch(() => {
//       console.warn('Error while service worker registering');
//     });
// }

window.addEventListener('beforeinstallprompt', (event: any) => {
  console.log('beforeinstallprompt', event);

  event.preventDefault();

  assignPrompt(event);

  return false;
});
