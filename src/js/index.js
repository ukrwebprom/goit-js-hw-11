import { Pixabay } from './pixabay';
import Notiflix from 'notiflix';
import {getTemplate} from './template';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let gallery = new SimpleLightbox('.gallery a');
const options = {
  key: '6736465-0b79670fedc04dddfca766fb6',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};
const pixabay = new Pixabay(options);
const form = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', loadMore);

async function onSubmit(evt) {
  evt.preventDefault();
  const query = evt.target.elements.searchQuery.value;
  cleanPage();
  try {
    const images = await pixabay.findImages(query);
    if (pixabay.imgFound > options.per_page)
      Notiflix.Notify.success(`Hooray! We found ${pixabay.imgFound} images.`);
    afterImagesLoaded(images);
  } catch (e) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

async function loadMore() {
  const images = await pixabay.getImages();
  afterImagesLoaded(images);
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function afterImagesLoaded(imgs) {
  renderImgs(imgs);
  if (pixabay.isMore) {
    loadMoreBtn.classList.remove('hidden');
    return;
  }
  loadMoreBtn.classList.add('hidden');
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}

function renderImgs(imgs) {
  const cards = imgs.map(getTemplate).join(' ');
  galleryContainer.insertAdjacentHTML('beforeend', cards);
  gallery.refresh();
}

function cleanPage() {
  loadMoreBtn.classList.add('hidden');
  galleryContainer.innerHTML = '';
}
