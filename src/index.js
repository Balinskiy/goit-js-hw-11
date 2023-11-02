import { getPhoto } from "./api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');

let query = "";
let currentPage = 1;
let totalPages = 0;

form.addEventListener('submit', handleSubmit);
button.addEventListener('click', onLoadMore)

const lightbox = new SimpleLightbox('.gallery a');

function handleSubmit(evt) {
    evt.preventDefault();
    const { searchQuery } = evt.currentTarget.elements;
    query = searchQuery.value;
    currentPage = 1;
  gallery.innerHTML = "";


  getPhoto(query, currentPage).then(data => {
    if (data.hits.length !== 0) {
                createMarkup(data);
      button.classList.remove('is-hidden');
      totalPages = Math.ceil(data.totalHits / 40);
      console.log(totalPages);

    } else {
      button.classList.add('is-hidden');
Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      }

  })

}

function onLoadMore() {
  currentPage += 1;
  getPhoto(query, currentPage).then(data => {
    createMarkup(data);
    if (totalPages === currentPage) {
      button.classList.add('is-hidden');
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  })
}



function createMarkup(arr) {
    const markup = arr.hits.map(({ largeImageURL, webformatURL, downloads, comments, views, likes, tags }) => `
<a href="${largeImageURL}" class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="100%" height="300"/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</a>
    `).join("");
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

