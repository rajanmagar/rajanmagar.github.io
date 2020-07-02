// custom request
const request = (name) =>
  new Request(`http://www.omdbapi.com/?apikey=fda77f56&s=${name}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  });
const requestMovie = (name) =>
  new Request(`http://www.omdbapi.com/?apikey=fda77f56&i=${name}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  });
// helper function
const getMovies = async (search) => {
  const response = await (await fetch(request(search))).json();
  if (response.Error) {
    return [];
  }
  return response.Search;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search For A Movie</b></label>
  <input type="text" class="input" />
  <ul class="movies"></ul>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.movies');
const resultWrapper = document.querySelector('.results');

const onInput = async (event) => {
  const movies = await getMovies(event.target.value);
  dropdown.innerHTML = '';
  dropdown.classList.remove('is-hidden');
  for (let movie of movies) {
    const options = document.createElement('li');
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    options.classList.add('movie');
    options.innerHTML = `
      <img src="${imgSrc}" alt="${movie.Title}" />
      <p>${movie.Title}</p>
    `;
    options.addEventListener('click', () => {
      dropdown.classList.add('is-hidden');
      input.value = movie.Title;
      onMovieSelect(movie);
    });
    dropdown.appendChild(options);
  }
};
input.addEventListener('input', debounce(onInput, 1000));

document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.add('is-hidden');
  }
});

const onMovieSelect = async (movie) => {
  const response = await (await fetch(requestMovie(movie.imdbID))).json();
  console.log(response);
};
