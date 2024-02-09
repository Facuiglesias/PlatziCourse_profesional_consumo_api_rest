let page = 1;
let maxPage;
let infiniteScroll;

searchFormBtn.addEventListener("click", () => {
  location.hash = `#search=${searchFormInput.value.trim()}`;
});
trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back();
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);

function navigator() {
  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { passive: false });
    infiniteScroll = undefined;
  }

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, { passive: false });
  }
}

function homePage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerCategoryTitle.classList.add("inactive");
  headerTitle.classList.remove("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  likedMoviesSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
  getLikedMovies();
}
function categoriesPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerCategoryTitle.classList.remove("inactive");
  headerTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("="); // ["#category", "id-name"]
  const [categoryId, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;
  getMoviesByCategory(categoryId);

  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}
function movieDetailsPage() {
  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerCategoryTitle.classList.add("inactive");
  headerTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  // ["movie", "id"]

  const [_, movieId] = location.hash.split("=");
  getMovieByid(movieId);
}
function searchPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerCategoryTitle.classList.add("inactive");
  headerTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  // ["search", "busqueda"]

  const query = decodeURI(location.hash.split("=")[1]);
  getMoviesBySearch(query);

  infiniteScroll = getPaginatedMoviesBySearch(query);
}
function trendsPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerCategoryTitle.classList.remove("inactive");
  headerTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias";

  getTrendingMovies();
  infiniteScroll = getPaginatedTrendingMovies;
}
