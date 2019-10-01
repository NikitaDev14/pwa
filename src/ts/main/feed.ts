const shareImageButton: HTMLButtonElement = document.querySelector('#share-image-button');
const createPostArea: HTMLDivElement = document.querySelector('#create-post');
const closeCreatePostModalButton: HTMLButtonElement = document.querySelector('#close-create-post-modal-btn');

let deferredPrompt: Event;

export function assignPrompt(event: Event): void {
  deferredPrompt = event;
}

function openCreatePostModal(): void {
  createPostArea.style.display = 'block';
}

function closeCreatePostModal(): void {
  createPostArea.style.display = 'none';
}
