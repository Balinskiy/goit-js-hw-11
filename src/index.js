import { getPhoto } from "./api";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const button = document.querySelector('.load-more');

let query = "";
let currentPage = 1;

form.addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
    evt.preventDefault();
    const { searchQuery } = evt.currentTarget.elements;
    query = searchQuery.value;
    currentPage = 1;


    getPhoto(query, currentPage).then(data => {
        createMarkup(data);
        button.classList.remove('is-hidden');
    })

}

function createMarkup(arr) {
    const markup = arr.hits.map(({ webformatURL, downloads, comments, views, likes, tags }) => `
<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250" height="200"/>
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
</div>
    `).join("");
    gallery.insertAdjacentHTML('beforeend', markup);
}

