const shareImageButton: HTMLButtonElement = document.querySelector('#share-image-button');
const createPostArea: HTMLDivElement = document.querySelector('#create-post');
const closeCreatePostModalButton: HTMLButtonElement = document.querySelector('#close-create-post-modal-btn');

let deferredPrompt: any;

export function assignPrompt(event: any): void {
  deferredPrompt = event;
}

function openCreatePostModal(): void {
  createPostArea.style.display = 'block';

  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult: any) => {
      console.log(choiceResult);

      if (choiceResult.outcome === 'dismissed') {
        console.log('Cancel!');
      } else {
        console.log('Applied!');
      }
    });

    deferredPrompt = null;
  }
}

function closeCreatePostModal(): void {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
