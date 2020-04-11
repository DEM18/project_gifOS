const BACKGROUND_COLOR_SAILOR_DAY = "#FFF4FD";
const BACKGROUND_COLOR_SAILOR_NIGHT = "#110038";
const BUTTON_ID_SAILOR_DAY = "btn-sailor-day";
const BUTTON_ID_SAILOR_NIGHT = "btn-sailor-night";
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
window.onclick = function(event) {
  document.getElementById("idSearchgifResultsWrapper").classList.remove("show");
}

function displaySearchbBarDropdownResults( results ) {
  let gifResultsContainer = document.getElementById("gif-results");
  let fetchGifResults = results;

  gifResultsContainer.innerHTML = "";

  document.getElementById("idSearchgifResultsWrapper").classList.toggle("show");

  fetchGifResults.forEach(gif => ( gifResultsContainer.innerHTML += `
  <button class="result" id="result">${gif.title}</button>`
  )); 
}

function displaySuggestionsGifsTags( results ) {
  let suggestionsGifResults = results;
  let gifResultstagsContainer = document.getElementById("idTagsSection");

  gifResultstagsContainer.innerHTML = "";

  for (let index = 0; index < 3; index++) {
    gifResultstagsContainer.innerHTML += ` 
      <div class="tagWrapper">
        <span class="tag">#${suggestionsGifResults[index].name}</span>
      </div>`
  }
} 

async function onChangeSearchBarInput() { 
  let inputText = document.getElementById("search-bar").value;
  let searchBarInput = document.getElementById("search-bar");

  if (searchBarInput != "") {
    document.getElementById("idBtnSearch").disabled = false;
  }

  let searchGifResults = await fetchSearchGifs( inputText, 3);
  displaySearchbBarDropdownResults( searchGifResults );

  let suggestionsGifResults = await fetchSuggestionsGifs( inputText );
  displaySuggestionsGifsTags( suggestionsGifResults );

  document.getElementById("idBtnSearch").disabled = true;
}

async function onClickSearchGif() {
  let inputText = document.getElementById("search-bar").value; 

  document.getElementById(SECTION_ID_SUGGESTED_GIFS).classList.add("not-show");
  document.getElementById(SECTION_ID_TREND_GIFS).classList.add("not-show");

  let searchGifResults = await fetchSearchGifs( inputText, EMPTY_STRING );

  document.getElementById(SECTION_ID_SEARCH_GIFS).style.display = "block";
  displayGifsSectionByElementId( searchGifResults, LIST_ID_SEARCH_GIFS);
}

function toggleChangeThemeDropdown() {
  document.getElementById("dropdown-change-theme").classList.toggle("show");
}

function changeThemeOfPage( idBtn) {
  let body = document.body;
  let dropdownSelectedOption = idBtn;
  console.log(dropdownSelectedOption);

  switch (dropdownSelectedOption) {
    case BUTTON_ID_SAILOR_DAY:
      body.style.backgroundColor = BACKGROUND_COLOR_SAILOR_DAY;
    break;
    case BUTTON_ID_SAILOR_NIGHT:
      body.style.backgroundColor = BACKGROUND_COLOR_SAILOR_NIGHT;
    break;
  }   
}


async function initMainPage() {
  let suggestedGifsResults = await fetchSearchGifs(getRandomWord(), 4);
  displayGifsSectionByElementId( suggestedGifsResults, LIST_ID_SUGGESTED_GIFS );

  let trendingGifsResults = await fetchTrendingGifs();
  displayGifsSectionByElementId( trendingGifsResults, LIST_ID_TRENDING_GIFS );
  
}

initMainPage();
