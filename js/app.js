const root = document.getElementById("root");
const form = document.querySelector(".search");
const searchResults = document.querySelector(".searchResults");
const navigation = document.querySelector("[href='/myList']");
let tempMovie;
let searchedMovies = [];
let tempArrayToUse = [];
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

function uniqueArr() {
  newArraytoget = [];
  let uniqueObj = {};
  for (let i in tempArrayToUse) {
    let objTitle = tempArrayToUse[i].title;
    uniqueObj[objTitle] = tempArrayToUse[i];
  }
  for (let i in uniqueObj) {
    newArraytoget.push(uniqueObj[i]);
  }
}

function redraw() {
  uniqueArr();
  let createMovieWrap = document.querySelector('.titles-wrapper');

  createMovieWrap.innerHTML = "";

  newArraytoget.forEach(movie => {
    createMovieWrap.insertAdjacentHTML('beforeend', `
    <div class="movie" data-movie="${movie.title.toLowerCase()}">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
    <div class="overlay">
      <div class="title">${movie.title}</div>
      <div class="rating">${movie.vote_average}/10</div>
      <div class="plot">
        ${movie.overview}
      </div>
      <div class="listToggle" data-toggled="true">
        <div>
          <i class="fa fa-fw fa-plus"></i>
          <i class="fa fa-fw fa-check"></i>
        </div>
        </div>
      </div>
    </div>
  `)
  })
}


root.addEventListener('click', function(e) {
  if (e.target.nodeName === "I") {
    let listToggle = e.target.parentNode.parentNode;
    let movieData = listToggle.parentNode.parentNode;
    let allMovies = document.querySelectorAll('.movie');
    
    
    allMovies.forEach(element => {
      if (element.getAttribute('data-movie') === movieData.getAttribute('data-movie')) {
        let toggleEle = element.querySelector('.listToggle');
        if (toggleEle.getAttribute('data-toggled') === 'false'){
          tempMovie.forEach(e => {
            if (e.title.toLowerCase() === movieData.getAttribute('data-movie')){
              tempArrayToUse.push(e);
            }
          })
          toggleEle.setAttribute('data-toggled', 'true');
        } else {
          tempArrayToUse.forEach(e => {
            if (e.title.toLowerCase() === movieData.getAttribute('data-movie')) {
              tempArrayToUse.splice(tempArrayToUse.indexOf(e), 1);
            }
          })
          toggleEle.setAttribute('data-toggled', 'false');
        } 
        console.log(tempArrayToUse)
      }
    });

    // console.log(tempArrayToUse)
    uniqueArr();
    // console.log(newArraytoget)
  }
})

navigation.addEventListener('click' , function(e) {
  e.preventDefault();

  let allTitleList = document.querySelectorAll('.titleList');

  allTitleList.forEach((ele) => {
    ele.parentNode.removeChild(ele);
  });

  root.insertAdjacentHTML(
    "beforeend",
    `
    <div class="titleList">
    <div class="title">
      <h1>My List</h1>
      <div class="titles-wrapper">
        
        </div>
      </div>
    </div>
  `
  );

  
  console.log(newArraytoget)

  root.addEventListener('click', function(e) {
    if (e.target.nodeName === "I") {
      let listToggle = e.target.parentNode.parentNode;
      let movieData = listToggle.parentNode.parentNode;

      console.log(listToggle.getAttribute('data-toggled'))
      if (listToggle.getAttribute('data-toggled') === 'false') {
        console.log(newArraytoget)
        redraw();
      }

      newArraytoget.forEach(ele => {
        newArraytoget.splice(newArraytoget.indexOf(ele.title), 1)
      })

      
    }
  })

  redraw();
})
