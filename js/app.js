const root = document.getElementById('root');

function gettingTrendingMovies() {
  fetch(
    "https://api.themoviedb.org/3/trending/all/week?api_key=7b403300d752c7d5e552aa9ff4e21a66"
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      data.results.forEach((movie) => {
        movie.genre_ids.forEach((genre) => {
          let ele = root.querySelector(`.y${genre}`);
          let titlesWrapper;

          if (ele !== null) {
            ele.classList.remove('hide');
            titlesWrapper= ele.querySelector('.titles-wrapper');
            titlesWrapper.insertAdjacentHTML('beforeend', `
            <div class="movie">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <div class="overlay">
              <div class="title">${movie.title}</div>
              <div class="rating">${movie.vote_average}/10</div>
              <div class="plot">
                ${movie.overview}
              </div>
              <div class="listToggle">
                <div>
                  <i class="fa fa-fw fa-plus"></i>
                  <i class="fa fa-fw fa-check"></i>
                </div>
                </div>
              </div>
            </div>
          `)
          }
        });
      });
    });
}

function genreSearch() {
  fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=7b403300d752c7d5e552aa9ff4e21a66&language=en-US"
  )
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      json.genres.forEach(ele => {
        insertGenres(ele.name, ele.id);
      })
    })
}

genreSearch();
gettingTrendingMovies();


function insertGenres(genreName, genreId) {
  root.insertAdjacentHTML('beforeend', `
    <div class="titleList y${genreId} hide">
    <div class="title">
      <h1>${genreName}</h1>
      <div class="titles-wrapper">
        
        </div>
      </div>
    </div>
  `)
}