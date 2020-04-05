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
      btnUploadGif.addEventListener("click", () => { uploadGif(form) });
  
    } 
  }
  
  function setSrcToImageId(src,imageId){
  
    document.getElementById(imageId).src = src ;
  } 
  
  async function uploadGif(gif) {
    let gifRecordedFile = gif;
    let title = MY_GUIFOS_UPLOAD_GIF_TITLE;
    let content = `<div><img src='./assets/images/globe_img.png'>
      <span>Estamos subiendo tu guifo…</span>
      <span>Tiempo restante: 38 años algunos minutos</span>
      </div>`;
    let footer = `<button class='btn'>Cancelar</button>`;
  
    configModal( title, content, footer );
  
    let postRequestResponse = await postGif(gifRecordedFile)
      .then(response => response.json());
  
    console.log(postRequestResponse);
  }