const APIKEY = "HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O";
const BASEURL = "https://api.giphy.com/v1";
const POST_BASEURL = "https://upload.giphy.com/v1";
const RESOURCE_NAME_SEARCH = "search";
const RESOURCE_NAME_TRENDING = "trending";
const RESOURCE_NAME_RANDOM = "random";
const RESOURCE_SEARCH_SUGGESTED = "related";
const RESOURCE_NAME_GIFS = "gifs";
const RESOURCE_NAME_TAGS = "tags";

/* const LIST_ID_TRENDING_GIFS = "list-trend-gifs";
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
const EMPTY_STRING = ""; */

/*----------getEndpoints functions ---------*/

function getEndpointSearchGifs( keyWord ) { 
    return `${BASEURL}/${RESOURCE_NAME_GIFS}/${RESOURCE_NAME_SEARCH}?
        api_key=${APIKEY}&
        q=${keyWord}
    `;
}

function getEndpointTrendingGifs() { 
    return `${BASEURL}/${RESOURCE_NAME_GIFS}/${RESOURCE_NAME_TRENDING}?api_key=${APIKEY}`;
}

function getEndpointRandomGifs() { 
    return `${BASEURL}/${RESOURCE_NAME_GIFS}/${RESOURCE_NAME_RANDOM}?api_key=${APIKEY}`;
}

function getEndpointSuggestionsGifs( term ) { 
    return `${BASEURL}/${RESOURCE_NAME_TAGS}/${RESOURCE_SEARCH_SUGGESTED}/${term}`;
}

function getEndpointPostGifOnGiphy() { 
    return `${POST_BASEURL}/${RESOURCE_NAME_GIFS}?api_key=${APIKEY}`;
}

/*-------Asynchronus functions ----*/ 

async function fetchSearchGifs( keyWord ) { 
    let response = await fetch(getEndpointSearchGifs( keyWord ))
      .then(response => response.json())
      .then(responseData => responseData.data); 
  
    return response;
}
  
async function fetchTrendingGifs() { 
    let response = await fetch(getEndpointTrendingGifs())
      .then(response => response.json())
      .then(responseData => responseData.data); 
  
    return response;
}
  
async function fetchRandomGifs() { 
    let response = await fetch(getEndpointRandomGifs())
      .then(response => response.json())
      .then(responseData => responseData.data); 
  
    return response;
}
  
async function fetchSuggestionsGifs( term ) { 
    let response = await fetch(getEndpointSuggestionsGifs( term ))
      .then(response => response.json())
      .then(responseData => responseData.data); 
  
    return response;
}

async function postGifOnGiphy( gif ) { 
    let response = await fetch(getEndpointPostGif(), {
      method: 'POST',
      body: gif
    });
   return response;
}


/*-------crete gif wrapper -----------*/

function getGifWrapper( gif , elementId ) {
    switch (elementId) {
        case LIST_ID_SUGGESTED_GIFS: 
            return  getGifWrapperTitleImage( gif );
            break;
        case LIST_ID_TRENDING_GIFS:
            return getGifWrapperImage( gif );
            break;
        case LIST_ID_SEARCH_GIFS:
            return getGifWrapperImage( gif );
            break;
    }
}

function getGifWrapperTitleImage( gifTitle, gifImage ) {
    return (`<div class="gif-container bordered">  
          <div class='hashtag-gif-name-wrapper'>
            <span class='gif-name'>${gifTitle}</span>
            <img class='btn-close' src='./assets/icons/button3.svg'>	
          </div>
        <div class="gif-image-container">
          <img class="gif-image" src=${gifImage}>
          <button class="btn-see-more">Ver más…</button>
          </div>
    </div>`);
}

function getGifWrapperImage( gifImage ) {
    return (`<div class="gif-image-container">
          <img class="gif-image" src=${gifImage}>
          <button class="btn-see-more">Ver más…</button>
          </div>
        </div>`);
}