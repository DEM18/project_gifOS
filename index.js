const BACKGROUND_COLOR_SAILOR_DAY = "#110038";
const BACKGROUND_COLOR_SAILOR_NIGHT = "##FFF4FD";
const BUTTON_VALUE_SAILOR_DAY = "sailor-day";
const BUTTON_VALUE_SAILOR_NIGHT = "sailor-night";
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
const EMPTY_STRING = "";

let recorder;
document.getElementById("search-bar").addEventListener("input", onChangeSearchBarInput); 

/* 

function getSuggestedGifEndpoint(endpointURI, term) { //returns string for endpoint
  return `${BASEURL_SUGGESTED_GIF}/${endpointURI}?api_key=${APIKEY}&q=${term}`;
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


async function fetchSuggestedGifs(endpointURI, term) { // fetch API for gifs
  let response = await fetch(getSuggestedGifEndpoint(endpointURI, term))
    .then(response => response.json())
    .then(responseData => responseData.data); 

  return response;
} */

async function displayGifsSectionByElementId( results, elementId ) { 
  let gifsSectionWrapper = document.getElementById( elementId );
  gifResults = results;

  gifsSectionWrapper.innerHTML ="";

  gifResults.forEach(
      gif => ( 
          gifsSectionWrapper.innerHTML += getGifWrapper( gif , elementId )
      )
  ); 
}

function displaySearchbBarDropdownResults( results ) {
  let gifResultsContainer = document.getElementById("gif-results");
  let fetchGifResults = results;

  document.getElementById("idSearchgifResultsWrapper").classList.toggle("show");

  fetchGifResults.forEach(gif => ( gifResultsContainer.innerHTML += `
  <button class="result" id="result">${gif.title}</button>`
  )); 
}

function displaySuggestionsGifsTags( results ) {
  let fetchGifResults = results;
  let gifResultstagsContainer = document.getElementById("idTagsSection");

  fetchGifResults.forEach(gif => ( gifResultstagsContainer.innerHTML += ` 
    <div class="tagWrapper">
    <span class="tag">${gif.title}</span>
    </div>`
  )); 
} 

async function onChangeSearchBarInput() { 
  let inputText = document.getElementById("search-bar").value;
  let searchBarInput = document.getElementById("search-bar");

  if (searchBarInput != "") {
    document.getElementById("idBtnSearch").disabled = false;
  }

  fetchSearchGifs( inputText);
  displaySuggestionsGifsTags();
  displaySearchbBarDropdownResults();

}

async function searchGif() {
  let inputText = document.getElementById("search-bar").value; 

  document.getElementById(SECTION_ID_SUGGESTED_GIFS).classList.add("not-show");
  document.getElementById(SECTION_ID_TREND_GIFS).classList.add("not-show");

  fetchSearchGifs( inputText );

  //display fetchgifs();

  document.getElementById(SECTION_ID_SEARCH_GIFS).style.display = "block";
}

function toggleChangeThemeDropdown() {
  document.getElementById("dropdown-change-theme").classList.toggle("show");
}

function changeThemeOfPage() {
  let body = document.body;
  let dropdownChangeTheme = document.getElementById("dropdown-change-theme");
  let dropdownSelectedOption = dropdownChangeTheme.value;

  switch (dropdownSelectedOption) {
    case BUTTON_VALUE_SAILOR_DAY:
      body.style.backgroundColor = BACKGROUND_COLOR_SAILOR_DAY;
    break;
    case BUTTON_VALUE_SAILOR_NIGHT:
      body.style.backgroundColor = BACKGROUND_COLOR_SAILOR_NIGHT;
    break;
  }  
}


displayGifsSectionByElementId( fetchRandomGifs(), LIST_ID_SUGGESTED_GIFS );