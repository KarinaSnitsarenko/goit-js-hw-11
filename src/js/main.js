// ======library iziToast=============
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// =======library SimpleLigthbox======
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  gallery.innerHTML = '';
  const searchQuery = e.target.elements.input.value;

  if (!searchQuery.trim()) {
    return iziToast.error({
      title: '❕',
      theme: 'light',
      message: `Please, fill in the search field`,
      messageSize: '20px',
      messageColor: '#808080',
      backgroundColor: '#EF4040',
      position: 'topLeft',
      timeout: 2500,
    });
  } else {
    getPhotos(searchQuery);
    e.currentTarget.reset();
  }
}

loader.classList.remove('is-hidden');

function getPhotos(name) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const searchParams = new URLSearchParams({
    key: '42189534-0458e72641624c0165f7139a5',
    q: `${name}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = BASE_URL + END_POINT + '?' + searchParams;

  fetch(url, searchParams)
    .then(response => {
      return response.json();
    })
    .then(photos => {
      const arrayPhotos = photos.hits;
      if (arrayPhotos.length === 0) {
        noImages();
      }
      renderPhoto(arrayPhotos);
      spanLoader.remove();
    })
    .catch(error => {
      iziToast.error({
        messageColor: '#FFF',
        color: '#EF4040',
        position: 'topRight',
        message: `${error}`,
      });
    });
  hideLoader();
}

function noImages() {
  gallery.innerHTML = '';
  iziToast.error({
    messageColor: '#FFF',
    color: '#EF4040',
    position: 'topRight',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}

function renderPhoto(photos) {
  const markup = photos
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class='gallery-item'>
  <a class='gallery-link' href='${largeImageURL}'>
    <img class='gallery-image' src='${webformatURL}' alt='${tags}'/>
  </a>
<div class='container-app'>
<p><span>Likes</span> ${likes}</p>
<p><span>Views</span> ${views}</p>
<p><span>Comments</span> ${comments}</p>
<p><span>Downloads</span> ${downloads}</p>
</div>
 </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('afterBegin', markup);
  simpleLightbox();
}

function simpleLightbox() {
  const galleryList = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsPosition: 'bottom',
    captionDelay: 250,
  });
  galleryList.on('show.simpleLightbox');
  galleryList.refresh();
}
