// custom request
const request = (name) =>
  new Request(`https://www.omdbapi.com/?apikey=fda77f56&s=${name}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  });
const requestMovie = (name) =>
  new Request(`https://www.omdbapi.com/?apikey=fda77f56&i=${name}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  });
// helper function

const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src="${imgSrc}" alt="${movie.Title}" />
      <p>${movie.Title} (${movie.Year})</p>
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  async getItems(search) {
    const response = await (await fetch(request(search))).json();
    if (response.Error) {
      return [];
    }
    return response.Search;
  },
};

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('.left-autocomplete'),
  onSelect(movie) {
    document.querySelector('.guide').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('.left-summary'), 'left');
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('.right-autocomplete'),
  onSelect(movie) {
    document.querySelector('.guide').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('.right-summary'), 'right');
  },
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, target, side) => {
  const response = await (await fetch(requestMovie(movie.imdbID))).json();
  target.innerHTML = movieTemplate(response);
  side === 'left' ? (leftMovie = response) : (rightMovie = response);
  if (leftMovie && rightMovie) {
    runComparison();
  }
};

const runComparison = () => {
  const leftStat = document.querySelectorAll('.left-summary .notification');
  const rightStat = document.querySelectorAll('.right-summary .notification');
  leftStat.forEach((leftItem, index) => {
    const rightItem = rightStat[index];
    const left = parseInt(leftItem.dataset.value);
    const right = parseInt(rightItem.dataset.value);
    if (right > left) {
      leftItem.classList.add('winner');
    } else {
      rightItem.classList.add('winner');
    }
  });
};

const movieTemplate = (detail) => {
  const dollar = parseInt(
    detail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );
  const metascore = parseInt(detail.Metascore);
  const imdbRating = parseInt(detail.imdbRating);
  const imdbVotes = parseInt(detail.imdbVotes.replace(/,/g, ''));
  const awards = detail.Awards.split(' ').reduce((prev, curr) => {
    const value = parseInt(curr);
    if (isNaN(value)) {
      return prev;
    } else {
      return prev + curr;
    }
  }, 0);
  return `
    <article class="media">
      <figure class="media-left">
        <p class="image">
          <img src="${detail.Poster}" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <h1>${detail.Title}</h1>
          <h4>${detail.Genre}</h4>
          <p>${detail.Plot}</p>
        </div>
      </div>
    </article>
    <article data-value=${awards} class="notification">
      <p class="title">${detail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollar} class="notification">
      <p class="title">${detail.BoxOffice}</p>
      <p class="subtitle">Box office</p>
    </article>
    <article data-value=${metascore} class="notification">
      <p class="title">${detail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification">
      <p class="title">${detail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification">
      <p class="title">${detail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
