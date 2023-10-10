import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const catCard = document.querySelector('.cat-info');
const loaderMessage = document.querySelector('.loader-text');
const errorMessage = document.querySelector('.error');

breedSelect.addEventListener('change', onChangeSelect);

errorMessage.classList.add('hidden');

fetchBreeds()
  .then(response => {
    const markup = response
      .map(cat => {
        return `<option value="${cat.id}">${cat.name}</option>`;
      })
      .join('');
      breedSelect.innerHTML = markup;
    new SlimSelect({
      select: '.breed-select',
    });
    breedSelect.classList.remove('hidden');
  })
  .catch(error => {
     Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
  })
  .finally(() => {
    loaderMessage.classList.add('hidden');
    
  });

function onChangeSelect() {
  const selectedCat = breedSelect.value;
  loaderMessage.classList.remove('hidden');
  breedSelect.disabled = true;
  catCard.classList.add('hidden');
  catCard.innerHTML = '';
  fetchCatByBreed(selectedCat)
    .then(catInfo => {
      renderPage(catInfo);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loaderMessage.classList.add('hidden');
      breedSelect.disabled = false;
      catCard.classList.remove('hidden');
    });
}

function renderPage(info) {
  const markup = `<img src="${info[0].url}" alt="cat image" width = 400 height = 350>
        <h2>${info[0].breeds[0].name}</h2>
        <p>${info[0].breeds[0].description}</p>
        <p>${info[0].breeds[0].temperament}</p>`;

    catCard.innerHTML = markup;
}