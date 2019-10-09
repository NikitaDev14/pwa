const shareImageButton: HTMLButtonElement = document.querySelector('#share-image-button');
const createPostArea: HTMLDivElement = document.querySelector('#create-post');
const closeCreatePostModalButton: HTMLButtonElement = document.querySelector('#close-create-post-modal-btn');
const sharedMomentsArea: HTMLDivElement = document.querySelector('#shared-moments');

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

function createCard(): void {
  const cardWrapper: HTMLDivElement = document.createElement('div');
  cardWrapper.className = 'shared-moment-card mdl-card mdl-shadow--2dp';

  const cardTitle: HTMLDivElement = document.createElement('div');
  cardTitle.className = 'mdl-card__title';
  cardTitle.style.backgroundImage = 'url("/images/sf-boat.jpg")';
  cardTitle.style.backgroundSize = 'cover';
  cardTitle.style.height = '180px';
  cardWrapper.appendChild(cardTitle);

  const cardTitleTextElement: HTMLHeadingElement = document.createElement('h2');
  cardTitleTextElement.className = 'mdl-card__title-text';
  cardTitleTextElement.textContent = 'San Francisco Trip';
  cardTitle.appendChild(cardTitleTextElement);

  const cardSupportingText: HTMLDivElement = document.createElement('div');
  cardSupportingText.className = 'mdl-card__supporting-text';
  cardSupportingText.textContent = 'In San Francisco';
  cardSupportingText.style.textAlign = 'center';
  cardWrapper.appendChild(cardSupportingText);

  (window as any).componentHandler.upgradeElement(cardWrapper);
  sharedMomentsArea.appendChild(cardWrapper);
}

fetch('https://httpbin.org/get')
  .then((res: any) => {
    return res.json();
  })
  .then((data: any) => {
    createCard();
  });
