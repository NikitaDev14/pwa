const shareImageButton = document.querySelector('#share-image-button');
const createPostArea: HTMLDivElement = document.querySelector('#create-post');
const closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

let deferredPrompt;

export function assignPrompt(event: any) {
  deferredPrompt = event;
}

function openCreatePostModal() {
  createPostArea.style.display = 'block';


}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}