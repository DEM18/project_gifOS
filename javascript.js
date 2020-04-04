const APIKEY = "HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O";
const BASEURL = "https://api.giphy.com/v1/gifs";
const POST_BASEURL = "https://upload.giphy.com/v1/gifs";
const ENDPOINT_SERCH = "search";
const ENDPOINT_TRENDING = "trending";
const ENDPOINT_RANDOM = "random";
const EMPTY_STRING = "";
const LIST_ID_TRENDING_GIFS = "list-trend-gifs";
const LIST_ID_SUGGESTED_GIFS = "list-suggested-gifs";
const SECTION_ID_SUGGESTED_GIFS = "suggestedGifSection";
const SEARCH_BAR_ID = "search-bar";
const MY_GUIFOS_CAPTURE_VIDEO_TITLE = "Un Chequeo Antes de Empezar";
const MY_GUIFOS_RECORD_VIDEO_TITLE = "Capturando Tu Guifo";
const MY_GUIFOS_PREVIEW_VIEW_TITLE = "Vista Previa";
const MY_GUIFOS_UPLOAD_GIF_TITLE = "Subiendo Guifo";

let recorder;

function getEndpoint(endpointURI, keyWord, resultsLimit, rating) { //returns string for endpoint
  return `${BASEURL}/${endpointURI}?api_key=${APIKEY}&q=${keyWord}&limit=${resultsLimit}&rating=${rating}`;
}

function postEndpoint() { //returns string for post endpoint
 return `${POST_BASEURL}/api_key=${APIKEY}`;
}

async function postGif(file) { // fetch API for posting gif
  let response = await fetch(postEndpoint(), {
    method: 'POST',
    body: JSON.stringify(file),
    headers:{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
  console.log(response);
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

/* MIS GUIFOS SECTION */

function configModal( title, content, footer ) {
  let modalTitle = document.getElementById("idMyGifosModalTitle");
  let contentModal = document.getElementById("idContentMyGifosModal");
  let footerModal = document.getElementById ("idFooter");

  modalTitle.innerText = title; 
  contentModal.innerHTML = content;
  footerModal.innerHTML = footer;
  
}

function createGif() { //display modal of create gif
  let title = MY_GUIFOS_CAPTURE_VIDEO_TITLE;
  let content = `<div><video id='idVideoCaption'></video></div>`;
  let footer = `<button class='btn' id='idBtnCaptureVideo'>Capturar</button><button class='btn'><img src='./assets/icons/camera.svg'></button>`;

  configModal( title, content, footer );
  
  let captureBtnModal = document.getElementById("idBtnCaptureVideo");
  captureBtnModal.addEventListener("click", recordVideo);
  
  initializeVideoCapture();
}

function initializeVideoCapture() {  //initialize camera caption 
 let p = navigator.mediaDevices.getUserMedia({ video: true });

 p.then(function(stream) {
   let video = document.getElementById("idVideoCaption");
   video.srcObject = stream;
   video.play();
 });
}

function recordVideo() { //display modal of recordVideo
  let title = MY_GUIFOS_RECORD_VIDEO_TITLE;
  let content = `<div><video controls id='idVideoRecord'></video></div>`;
  let footer = `<button class='btn' id='idBtnStopRecordVideo'>stop recording</button>
    <button class='btn'>Counter</button>
    <button class='btn' id='idBtnStartRecordVideo'>start recording</button>
    <button class='btn'>
      <img src='./assets/icons/recording.svg'>
    </button>`;
    
  configModal( title, content, footer );
  startVideoRecord()// Monta el modal en el DOM
}

function startVideoRecord() { //start video record with permissions

  let btnStopRecording = document.getElementById("idBtnStopRecordVideo");
  btnStopRecording.addEventListener("click", stopRecord);
  let form = new FormData();
  let gifDone;
  let objectUrl;

  navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
    height: { max: 480 }
    } 
    })
    .then(function(stream) { 
    let video = document.getElementById("idVideoRecord");
    video.srcObject = stream;
    video.play();

    recorder = RecordRTC(stream, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      
      onGifRecordingStarted: function() {
       console.log('started')
     },
    }); 

    recorder.startRecording();
   })

  function stopRecord() {
    recorder.stopRecording(function(){
      gifDone = this.getBlob();
      objectUrl = this.toURL();
        
      form.append('file', gifDone, 'myGif.gif');
      console.log(form.get('file'));
    })

    let title = MY_GUIFOS_PREVIEW_VIEW_TITLE;
    let content = `<div><img src='' id='idImagePreviewView'></div>`;
    let footer = `<button class='btn'>Repetir Captura</button><button class='btn' id='idBtnUploadGif'>Subir Guifo</button>`;

    configModal( title, content, footer );
    setSrcToImageId(objectUrl,"idImagePreviewView");
    let btnUploadGif = document.getElementById("idBtnUploadGif");
    btnUploadGif.addEventListener("click", () => { uploadGif(gifDone) });

  } 
}

function setSrcToImageId(src,imageId){

  document.getElementById(imageId).src = src ;
} 

function uploadGif(gif) {
  let gifRecordedFile = gif;
  let title = MY_GUIFOS_UPLOAD_GIF_TITLE;
  let content = `<div><img src='./assets/images/globe_img.png'>
    <span>Estamos subiendo tu guifo…</span>
    <span>Tiempo restante: 38 años algunos minutos</span>
    </div>`;
  let footer = `<button class='btn'>Cancelar</button>`;

  configModal( title, content, footer );
  postGif(gifRecordedFile);

}


displayfetchGifsOnElementId( LIST_ID_SUGGESTED_GIFS, ENDPOINT_SERCH, "random", 4, EMPTY_STRING );
displayfetchGifsOnElementId( LIST_ID_TRENDING_GIFS, ENDPOINT_TRENDING, EMPTY_STRING, EMPTY_STRING, "G" );


 

// changeTheme();
/*-------------------------------*/
//TODO
//sacar input search-bar como constante
//arreglar nombres de variables
//ordernar alfabeticamente