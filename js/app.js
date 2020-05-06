function gettingTrendingMovies() {
  fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=7b403300d752c7d5e552aa9ff4e21a66')
    .then(data => {
      return data.json();
    }).then(data => {
      data.results.forEach(movie => {


        movie.genre_ids.forEach(genre => {
          
        })
      });
    })
}

gettingTrendingMovies();

function genreSearch() {
  fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=7b403300d752c7d5e552aa9ff4e21a66&language=en-US').then(data => {
    return data.json();
  }).then(json => {
    console.log(json.genres)
  })
}

genreSearch();

