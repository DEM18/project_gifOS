const APIKEY = "HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O";
const BASEURL = "https://api.giphy.com/v1/gifs";
const ENDPOINT_SERCH = "search";
const ENDPOINT_TRENDING = "trending";
const ENDPOINT_RANDOM = "random";
const EMPTY_STRING = "";
const LIST_ID_TRENDING_GIFS = "list-trend-gifs";
const LIST_ID_SUGGESTED_GIFS = "list-suggested-gifs";
const SECTION_ID_SUGGESTED_GIFS = "suggestedGifSection";
const SEARCH_BAR_ID = "search-bar";


function getEndpoint(endpointURI, keyWord, resultsLimit, rating) { //returns string for endpoint
  return `${BASEURL}/${endpointURI}?api_key=${APIKEY}&q=${keyWord}&limit=${resultsLimit}&rating=${rating}`;
}

async function fetchGifs(endpointURI, keyWord, resultsLimit, rating) { // fetch API for getting gifs
  let response = await fetch(getEndpoint(endpointURI, keyWord, resultsLimit, rating));
  let responseData = await response.json(); //devuelve archivo json
  let arrayGifsResults = responseData.data;

  return arrayGifsResults;
}

function toggleDropdown() {
  document.getElementById("btn-dropdown").classList.toggle("show");
}

// function enableSearchButton() {
//   let buttonSearch = document.getElementById("btn-search");

//   if (SEARCH_BAR_ID !== "") {
//     buttonSearch.disabled = false;
//   }
// }

async function searchGif() { 
  let gifResultsContainer = document.getElementById("gif-results");
  let inputText = document.getElementById("search-bar").value;
  let sectionSuggestedGifs = document.getElementById(SECTION_ID_SUGGESTED_GIFS);
  let gifResults = await fetchGifs(ENDPOINT_SERCH, inputText, 3, EMPTY_STRING);
  
  gifResultsContainer.innerHTML = "";

  displayfetchGifsOnElementId( LIST_ID_TRENDING_GIFS, ENDPOINT_SERCH, inputText, EMPTY_STRING, EMPTY_STRING );

  gifResults.forEach(
    gif => ( gifResultsContainer.innerHTML += `
    <button class="result first" id="result">${gif.title}</button>
    `)
    );
    
    document.getElementById("btn-search").classList.toggle("show");
    
    if (gifResults.length ) {
      sectionSuggestedGifs.style.display = "none";
    } else null;


  }
 
function changeThemeSailorNight() {
    let body = document.body;
    body.style.backgroundColor = "#110038";
}

function changeThemeDay() {
    let body = document.body;
    body.style.backgroundColor = "#FFF4FD";
}

async function displayfetchGifsOnElementId( elementId, endpointURI, keyWord, resultsLimit, rating ) {
  let gifClass = document.getElementById(elementId);
  let gifResults = await fetchGifs( endpointURI, keyWord, resultsLimit, rating );

  // gifClass.innerHTML = "";

  gifResults.forEach(
    gif =>
    (gifClass.innerHTML += `
    <div class="gif-container bordered">
    <div class="gif-image-container">
    <img class="gif-image" src=${gif.images.fixed_height.url}>
    <button class="btn-see-more">Ver más…</button>
    </div>
    </div>`)
    );
}

function createGif() {
  let createGifModal = document.getElementById("createGifModal");
  createGifModal.style.width = "860px"; 
  createGifModal.style.height = "548px";
  console.log(createGifModal);
  createGifModal.innerHTML = `
    <div class="first-step-title">
      <span>Crear guifos</span>
      <img class="close-btn" src="./assets/icons/close.svg">
    </div>
    <div class="getVideoCaption">
      Video caption
    </div>
    <div class="navigation-buttons">
    <button class='btn getCaptionImage'>
      <img src="./assets/icons/camera.svg">
    </button>
      <button class='btn caption'>Capturar</button>
    </div>
  `
}


displayfetchGifsOnElementId( LIST_ID_SUGGESTED_GIFS, ENDPOINT_SERCH, "random", 4, EMPTY_STRING );
displayfetchGifsOnElementId( LIST_ID_TRENDING_GIFS, ENDPOINT_TRENDING, EMPTY_STRING, EMPTY_STRING, "G" );


// changeTheme();
/*-------------------------------*/
//TODO
//sacar input search-bar como constante
//arreglar nombres de variables
//ordernar alfabeticamente