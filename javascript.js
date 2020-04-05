const APIKEY = "HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O";
const BASEURL = "https://api.giphy.com/v1/gifs";
const POST_BASEURL = "https://upload.giphy.com/v1/gifs";
const ENDPOINT_SERCH = "search";
const ENDPOINT_TRENDING = "trending";
const ENDPOINT_RANDOM = "random";
const EMPTY_STRING = "";
const LIST_ID_TRENDING_GIFS = "list-trend-gifs";
const LIST_ID_SUGGESTED_GIFS = "list-suggested-gifs";
const LIST_ID_SEARCH_GIFS = "list-search-gifs";
const SECTION_ID_SUGGESTED_GIFS = "suggestedGifSection";
const SECTION_ID_TREND_GIFS = "trendGifSection";
const SECTION_ID_SEARCH_GIFS = "searchGifSection";
const SEARCH_BAR_ID = "search-bar";
const MY_GUIFOS_CAPTURE_VIDEO_TITLE = "Un Chequeo Antes de Empezar";
const MY_GUIFOS_RECORD_VIDEO_TITLE = "Capturando Tu Guifo";
const MY_GUIFOS_PREVIEW_VIEW_TITLE = "Vista Previa";
const MY_GUIFOS_UPLOAD_GIF_TITLE = "Subiendo Guifo";

let recorder;
document.getElementById("search-bar").addEventListener("input", onChangeSearchBarInput); 
window.onscroll = function(){functionScroll()};


function getEndpoint(endpointURI, keyWord, resultsLimit, rating) { //returns string for endpoint
  return `${BASEURL}/${endpointURI}?api_key=${APIKEY}&q=${keyWord}&limit=${resultsLimit}&rating=${rating}`;
}

function postEndpoint() { //returns string for post endpoint
 return `${POST_BASEURL}?api_key=JQhP1sBxi7d1SKpBsMlFDJYPGUobpcpK`;
}

async function postGif(file) { // fetch API for posting gif
  let response = await fetch(postEndpoint(), {
    method: 'POST',
    body: file
  });
 return response;
}

async function fetchGifs(endpointURI, keyWord, resultsLimit, rating) { // fetch API for gifs
  let response = await fetch(getEndpoint(endpointURI, keyWord, resultsLimit, rating))
    .then(response => response.json())
    .then(responseData => responseData.data); 

  return response;
}

async function onChangeSearchBarInput() { //fetch to API and display 3 results in dropdown 
  let gifResultsContainer = document.getElementById("gif-results");
  let inputText = document.getElementById("search-bar").value;
  
  
  let gifResults = await fetchGifs(ENDPOINT_SERCH, inputText, 3, EMPTY_STRING); 
  
  document.getElementById("idSearchgifResultsWrapper").classList.toggle("show"); //Display dropdown with results
  
  gifResults.forEach(gif => ( gifResultsContainer.innerHTML += `
  <button class="result" id="result">${gif.title}</button>`
  )); 

  gifResultsContainer.innerHTML = "";
}

async function searchGif() {
  let inputText = document.getElementById("search-bar").value; //analizar si es vacio que pasa
  let gifResultstagsContainer = document.getElementById("idTagsSection");

  displayfetchGifsOnElementId( LIST_ID_SEARCH_GIFS, ENDPOINT_SERCH, inputText, EMPTY_STRING, EMPTY_STRING );

  document.getElementById(SECTION_ID_SUGGESTED_GIFS).classList.toggle("not-show");
  document.getElementById(SECTION_ID_TREND_GIFS).classList.toggle("not-show");

  let gifResults = await fetchGifs(ENDPOINT_SERCH, inputText, 3, EMPTY_STRING); 
  
  gifResultstagsContainer.innerHTML = "";


  //create tags for fetched gifs
  gifResults.forEach(gif => ( gifResultstagsContainer.innerHTML += ` 
    <div class="tagWrapper">
    <span class="tag">${gif.title}</span>
    </div>`
  )); 


  //si el scrollTop == windows.height => volve a llamar al fetch
}

function functionScroll() {
  let docHeight = document.scrollingElement.scrollTop;
  let divHeight = document.getElementById("searchGifSection").offsetHeight;
  console.log(docHeight);
  console.log(divHeight);
}

async function displayfetchGifsOnElementId( elementId, endpointURI, keyWord, resultsLimit, rating ) { //Fetch API and insert results into DOM by an ID class given
  let gifClass = document.getElementById(elementId);
  let gifResults = await fetchGifs( endpointURI, keyWord, resultsLimit, rating );

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

function toggleDropdown() {
  document.getElementById("btn-dropdown").classList.toggle("show");
}

function changeThemeSailorNight() {
  let body = document.body;
  body.style.backgroundColor = "#110038";
}

function changeThemeDay() {
    let body = document.body;
    body.style.backgroundColor = "#FFF4FD";
}


displayfetchGifsOnElementId( LIST_ID_SUGGESTED_GIFS, ENDPOINT_SERCH, "random", 4, EMPTY_STRING );
displayfetchGifsOnElementId( LIST_ID_TRENDING_GIFS, ENDPOINT_TRENDING, EMPTY_STRING, EMPTY_STRING, "G" );

 

// changeTheme();
/*-------------------------------*/
//TODO
//sacar input search-bar como constante
//arreglar nombres de variables
//ordernar alfabeticamente