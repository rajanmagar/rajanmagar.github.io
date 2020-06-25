// custom request
const request = new Request('http://www.omdbapi.com/?apikey=fda77f56&s=avengers', {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
})
// helper function
const getMovies = async () => await (await fetch(request)).json()

getMovies()