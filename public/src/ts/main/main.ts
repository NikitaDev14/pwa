import { test } from './greet';

console.log(test());


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.')
}