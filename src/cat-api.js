import axios from "axios";

axios.defaults.headers.common['x-api-key'] =
  'live_n5sGLEMBsLfFOxsGN4V0XZXFHNQgxfTNv2K4ChPvrk2N5ZWzfWeonnHk1zNlKy4c';
  
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

function fetchBreeds() {
    return axios.get(`/breeds`)
    .then(({data}) => data);
  };
  
function fetchCatByBreed(catId) {
    return axios
      .get(`/images/search?breed_ids=${catId}`)
      .then(({data}) => data);
 };

export { fetchBreeds, fetchCatByBreed };

//-----before axios-------

// const BASE_URL = 'https://api.thecatapi.com/v1';
//
// const options = {
//   headers: {
//     'x-api-key':
//       'live_n5sGLEMBsLfFOxsGN4V0XZXFHNQgxfTNv2K4ChPvrk2N5ZWzfWeonnHk1zNlKy4c',
//   },
// };

// export function fetchBreeds() {
//   const url = `${BASE_URL}/breeds`;

//   return fetch(url, options).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }

//     return response.json();
//   });
// }

// export function fetchCatByBreed(catId) {
//   const url = `${BASE_URL}/images/search?breed_ids=${catId}`;

//   return fetch(url, options).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
