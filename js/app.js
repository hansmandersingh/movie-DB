const root = document.getElementById("root");
const form = document.querySelector(".search");
const searchResults = document.querySelector(".searchResults");
let tempMovie;
let searchedMovies = [];

function gettingTrendingMovies() {
  fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=7b403300d752c7d5e552aa9ff4e21a66"
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      tempMovie = data.results;
      moviePrint(data.results);
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
      json.genres.forEach((ele) => {
        insertGenres(ele.name, ele.id);
      });
    });
}

function moviePrint(dataResults) {
  dataResults.forEach((movie) => {
    movie.genre_ids.forEach((genre) => {
      let ele = root.querySelector(`.y${genre}`);
      let titlesWrapper;

      if (ele !== null) {
        ele.classList.remove("hide");
        titlesWrapper = ele.querySelector(".titles-wrapper");
        titlesWrapper.insertAdjacentHTML(
          "beforeend",
          `
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
      `
        );
      }
    });
  });
}

function insertGenres(genreName, genreId) {
  root.insertAdjacentHTML(
    "beforeend",
    `
    <div class="titleList y${genreId} hide">
    <div class="title">
      <h1>${genreName}</h1>
      <div class="titles-wrapper">
        
        </div>
      </div>
    </div>
  `
  );
}

genreSearch();
gettingTrendingMovies();

function findingMovie(string) {
  searchedMovies = [];
  tempMovie.forEach((movie) => {
    let movieTitle = movie.title.toLowerCase();
    let movieOverview = movie.overview.toLowerCase();
    let searchString = string.toLowerCase();

    if (
      movieTitle.includes(searchString) ||
      movieOverview.includes(searchString)
    ) {
      searchedMovies.push(movie);
    }
  });
  console.log(searchedMovies);
  return searchedMovies;
}

form.addEventListener("keyup", (event) => {
  let elementsWithTitle = document.querySelectorAll(".movie");
  let titleListEles;

  if (event.target.value !== "") {
    findingMovie(event.target.value);
    elementsWithTitle.forEach((ele) => {
      ele.parentNode.removeChild(ele);
    });

    titleListEles = document.querySelectorAll(".titleList");
    titleListEles.forEach((ele) => {
      ele.classList.add("hide");
    });

    moviePrint(searchedMovies);

    searchResults.textContent = `Found ${searchedMovies.length} with the query "${event.target.value}"`;
  } else {
    elementsWithTitle.forEach((ele) => {
      ele.parentNode.removeChild(ele);
    });

    titleListEles = document.querySelectorAll(".titleList");
    titleListEles.forEach((ele) => {
      ele.classList.add("hide");
    });

    searchResults.textContent = `Found ${searchedMovies.length} with the query "${event.target.value}"`;
    moviePrint(tempMovie);
  }
});
