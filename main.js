const APIKEY = "HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O";
const BASEURL = "https://api.giphy.com/v1";
const KEY_GIF_LOCAL_STORAGE = "gif1";
const POST_BASEURL = "https://upload.giphy.com/v1";
const RESOURCE_NAME_SEARCH = "search";
const RESOURCE_NAME_TRENDING = "trending";
const RESOURCE_NAME_RANDOM = "random";
const RESOURCE_SEARCH_SUGGESTED = "related";
const RESOURCE_NAME_GIFS = "gifs";
const RESOURCE_NAME_TAGS = "tags";

let words = ["cat", "dog", "program", "singer", "love", "music", "friends", "dance", "happy"];

/*----------getEndpoints functions ---------*/

function getEndpointSearchGifs( keyWord, resultsLimit ) { 
    return `${BASEURL}/${RESOURCE_NAME_GIFS}/${RESOURCE_NAME_SEARCH}?api_key=${APIKEY}&q=${keyWord}&limit=${resultsLimit}`;
}

function getEndpointTrendingGifs() { 
    return `${BASEURL}/${RESOURCE_NAME_GIFS}/${RESOURCE_NAME_TRENDING}?api_key=${APIKEY}`;
}

function getEndpointRandomGifs() { 
    return `${BASEURL}/${RESOURCE_NAME_GIFS}/${RESOURCE_NAME_RANDOM}?api_key=${APIKEY}`;
}

function getEndpointSuggestionsGifs( term ) { 
    return `${BASEURL}/${RESOURCE_NAME_TAGS}/${RESOURCE_SEARCH_SUGGESTED}/${term}?api_key=${APIKEY}`;
}

function getEndpointPostGifOnGiphy() { 
    return `${POST_BASEURL}/${RESOURCE_NAME_GIFS}?api_key=${APIKEY}`;
}

function getEndpointMyGuifos( idGif ) { 
    return `${BASEURL}/${RESOURCE_NAME_GIFS}/${idGif}?api_key=${APIKEY}`;
}

/*-------Asynchronus functions ----*/ 

async function fetchSearchGifs( keyWord, resultsLimit ) { 
    let response = await fetch(getEndpointSearchGifs( keyWord, resultsLimit ))
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
    let response = await fetch(getEndpointPostGifOnGiphy(), {
      method: 'POST',
      body: gif
    });
   return response;
}

async function fetchMyGuifos( idGif ) { 
    let response = await fetch(getEndpointMyGuifos( idGif ))
      .then(response => response.json())
      .then(responseData => responseData.data); 
  
    return response;
}


/*-------create gif wrapper -----------*/

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
        case LIST_ID_MIS_GUIFOS:
            return getGifWrapperImage( gif );
            break;
    }
}

function getGifWrapperTitleImage( gif ) {
    return (`<div class="gif-container bordered">  
          <div class='hashtag-gif-name-wrapper'>
            <span class='gif-name'>${gif.title}</span>
            <img class='btn-close' src='./assets/icons/button3.svg'>	
          </div>
        <div class="gif-image-container">
          <img class="gif-image" src=${gif.images.fixed_height.url}>
          <button class="btn-see-more">Ver más…</button>
          </div>
    </div>`);
}

function getGifWrapperImage( gif ) {
    return (`<div class="gif-container bordered">
            <div class="gif-image-container">
                <img class="gif-image" src=${gif.images.fixed_height.url}>
                <button class="btn-see-more">Ver más…</button>
            </div>
        </div>`);
}

function getRandomWord() {
   let word = words[Math.floor(Math.random()*words.length)];

   return word;
}

/*---- display elements in DOM functions ----*/

async function displayGifsSectionByElementId( result, elementId ) { 
    let resultArrayGifs = result;
    console.log(resultArrayGifs);
    console.log(elementId);
    let gifsSectionWrapper = document.getElementById( elementId );
  
    gifsSectionWrapper.innerHTML ="";
  
    resultArrayGifs.forEach(
        gif => ( 
            gifsSectionWrapper.innerHTML += getGifWrapper( gif , elementId )
        )
    ); 
}

/*---- save informtion in Local Storage functions ---*/

function saveDataToLocalStorage( key, value ) {
    let localStorageKey = key;
    let localStorageValue = value;

    console.log("localStorageKey", localStorageKey);
    console.log("localStorageValue", localStorageValue);

    localStorage.setItem(`${localStorageKey}`, `${localStorageValue}`);
}