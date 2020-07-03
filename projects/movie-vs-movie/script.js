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

createAutoComplete({
  root: document.querySelector('.autocomplete'),
  renderOption(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
    return `
      <img src="${imgSrc}" alt="${movie.Title}" />
      <p>${movie.Title} (${movie.Year})</p>
    `;
  },
  onSelect(movie) {
    onMovieSelect(movie);
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
});

const onMovieSelect = async (movie) => {
  const response = await (await fetch(requestMovie(movie.imdbID))).json();
  document.querySelector('.summary').innerHTML = movieTemplate(response);
};

const movieTemplate = (detail) => {
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
    <article class="notification">
      <p class="title">${detail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification">
      <p class="title">${detail.BoxOffice}</p>
      <p class="subtitle">Box office</p>
    </article>
    <article class="notification">
      <p class="title">${detail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification">
      <p class="title">${detail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification">
      <p class="title">${detail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
  `;
};
