// custom request
const request = (name) =>
  new Request(`http://www.omdbapi.com/?apikey=fda77f56&s=${name}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
  });
// helper function
const getMovies = async (search) => await (await fetch(request(search))).json();

const input = document.querySelector('input');
input.addEventListener('input', (event) => {
  getMovies(event.target.value);
});
