const root = document.getElementById("root");
const form = document.querySelector(".search");
const searchResults = document.querySelector(".searchResults");
const navigation = document.querySelector('.navigation');
let tempMovie;
let searchedMovies = [];
let myListArray = [];
let newArraytoget = [];

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
        <div class="movie" data-movie="${movie.title.toLowerCase()}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
        <div class="overlay">
          <div class="title">${movie.title}</div>
          <div class="rating">${movie.vote_average}/10</div>
          <div class="plot">
            ${movie.overview}
          </div>
          <div class="listToggle" data-toggled="false">
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

    if (movieTitle.includes(searchString) ||  movieOverview.includes(searchString)) {
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

    searchResults.textContent = `Found ${searchedMovies.length} with the query "${event.target.value}"`;
    moviePrint(searchedMovies);
  } else {
    searchResults.textContent = "";

    elementsWithTitle.forEach((ele) => {
      ele.parentNode.removeChild(ele);
    });

    titleListEles = document.querySelectorAll(".titleList");
    titleListEles.forEach((ele) => {
      ele.classList.add("hide");
    });

    moviePrint(tempMovie);
  }
});


root.addEventListener('click', function(e) {
  if (e.target.nodeName === "I") {
    let listToggle = e.target.parentNode.parentNode;
    let movieEle = listToggle.parentNode.parentNode;
    let movieEleData = movieEle.getAttribute('data-movie');

    tempMovie.forEach(movie => {
      if ((movie.title.toLowerCase() === movieEleData)) {
        
        let allMoviesToChange = document.querySelectorAll(`[data-movie ='${movie.title.toLowerCase()}']`);

        allMoviesToChange.forEach(movieToChange => {
          let checkData = movieToChange.querySelector('.listToggle');

          if (checkData.getAttribute('data-toggled') == 'false') {
            myListArray.push(movie);
            checkData.setAttribute('data-toggled', 'true');
            console.log(myListArray)
          }else {
            if (myListArray.length !== 0){
              myListArray.splice( myListArray.indexOf(movieEleData), 1);
            }
            console.log(myListArray)
            checkData.setAttribute('data-toggled', 'false');
          }
        })
      }
    })

    
    let uniqueObj = {};
    for (let i in myListArray) {
      let objTitle = myListArray[i].title;
      uniqueObj[objTitle] = myListArray[i];
    }
    for (let i in uniqueObj) {
      newArraytoget.push(uniqueObj[i]);
    }
    console.log(newArraytoget)


  }
})

navigation.addEventListener('click', (event) => {
  if (event.target.nodeName === )
})