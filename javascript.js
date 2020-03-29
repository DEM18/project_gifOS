const APIKEY = "HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O";
const BASEURL = "https://api.giphy.com/v1/gifs";
const ENDPOINT_SERCH = "search";
const ENDPOINT_TRENDING = "trending";
const ENDPOINT_RANDOM = "random";
const EMPTY_STRING = "";
const LIST_ID_TRENDING_GIFS = "list-trend-gifs";
const LIST_ID_SUGGESTED_GIFS = "list-suggested-gifs";
const SECTION_ID_SUGGESTED_GIFS = "suggestedGifSection";


function getEndpoint(endpointURI, keyWord, resultsLimit, rating) { //returns string for endpoint
  return `${BASEURL}/${endpointURI}?api_key=${APIKEY}&q=${keyWord}&limit=${resultsLimit}&rating=${rating}`;
}

async function fetchGifs(endpointURI, keyWord, resultsLimit, rating) { //call to API for gifs
  let response = await fetch(getEndpoint(endpointURI, keyWord, resultsLimit, rating));
  let responseData = await response.json(); //devuelve archivo json
  let arrayGifsResults = responseData.data;

  return arrayGifsResults; //return gifs
}

function toggleDropdown() {
  document.getElementById("btn-dropdown").classList.toggle("show");
}

async function searchGif() { 
  const empty = "";
  let gifResultsContainer = document.getElementById("gif-results");
  let sectionSuggestedGifs = document.getElementById(SECTION_ID_SUGGESTED_GIFS);

  console.log(sectionSuggestedGifs);
  let inputText = document.getElementById("search-bar").value;
  let gifResults = await fetchGifs(ENDPOINT_SERCH, inputText, 3, empty);
  
  gifResultsContainer.innerHTML = "";
  
  displayfetchGifsOnElementId( LIST_ID_TRENDING_GIFS, ENDPOINT_SERCH, inputText, EMPTY_STRING, EMPTY_STRING );

  gifResults.forEach(
    gif => ( gifResultsContainer.innerHTML += `
    <button class="result first" id="result">${gif.title}</button>
    `)
    );
    
    document.getElementById("btn-search").classList.toggle("show");
    sectionSuggestedGifs.style.display = "none";

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

  gifClass.innerHTML = "";

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


displayfetchGifsOnElementId( LIST_ID_SUGGESTED_GIFS, ENDPOINT_SERCH, "random", 4, EMPTY_STRING );
displayfetchGifsOnElementId( LIST_ID_TRENDING_GIFS, ENDPOINT_TRENDING, EMPTY_STRING, EMPTY_STRING, "G" );


// changeTheme();
/*-------------------------------*/
//TODO
//sacar empty, poner const global
//arreglar nombres de variables
//ordernar alfabeticamente