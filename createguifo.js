const CLASSNAME_MEDIUM_WRAPPER_MODAL = "medium-wrapper";
const CLASSNAME_BIG_WRAPPER_MODAL = "big-wrapper";
const CLASSNAME_SMALL_WRAPPER_MODAL = "small-wrapper";
const CLASSNAME_DISPLAY_ELEMENT = "show";
const CLASSNAME_HIDE_ELEMENT = "not-show";
const INIT_I_PROGRESS_BAR = 0;
const SET_INTERVAL_LIMIT = 1000;
const PROGRESS_BAR_LIMIT = 2;
const ID_PREVIEW_VIEW_GIF_WRAPPER = "idPreviewViewGifUploaded";
const MY_GUIFOS_UPLOADED_GIF_TITLE = "Guifo Subido Con Éxito";


let i = INIT_I_PROGRESS_BAR;
let idSetInterval;
let objectUrl = "";
let form = new FormData();
let gifDone = "";

function displayProgressiveBar() {
  let progressBarWrapper = document.getElementById("idProgressiveBar");

  progressBarWrapper.innerHTML = "";

 idSetInterval = setInterval(completeProgression, SET_INTERVAL_LIMIT);
}  

function completeProgression() {
 
  if( i < PROGRESS_BAR_LIMIT ) {
    let progressBarWrapper = document.getElementById("idProgressiveBar");

    progressBarWrapper.innerHTML += `<div class="progression" id="idProgression"></div>`;
  
    i++;
    console.log(i);
  } else {
    i = INIT_I_PROGRESS_BAR;
    clearInterval(idSetInterval);
  }
}

function configModal( title, classname, content, footer ) {
    let createGuifoModalWrapper = document.getElementById("idCreateGuifoModalWrapper");
    let createGuifoModalTitle = document.getElementById("idCreateGuifoModalTitle");
    let createGuifoModalContent = document.getElementById("idCreateGuifoContentWrapperModal");
    let createGuifoModalFooter = document.getElementById ("idCreateGuifoFooterModal");
  
    createGuifoModalTitle.innerText = title; 
    createGuifoModalContent.innerHTML = content;
    createGuifoModalFooter.innerHTML = footer;
    createGuifoModalWrapper.classList.add(classname);
    
  }
  
  function createGif() { //display modal of create gif
    document.getElementById("idMisGuifosSection").classList.add(CLASSNAME_HIDE_ELEMENT);

    let title = MY_GUIFOS_CAPTURE_VIDEO_TITLE;
    let content = `<div><video class='createGuifoVideoCaptionWrapper' id='idVideoCaption'></video></div>`;
    let footer = `<button class='btn icon-btn'><img src='./assets/icons/camera.svg'></button><button class='btn' id='idBtnCaptureVideo'>Capturar</button>`;

  
    configModal( title, CLASSNAME_BIG_WRAPPER_MODAL, content, footer );
    
    let captureBtnModal = document.getElementById("idBtnCaptureVideo");
    captureBtnModal.addEventListener("click", captureVideo);
    
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
  
  function captureVideo() { //display modal of recordVideo
    let title = MY_GUIFOS_RECORD_VIDEO_TITLE;
    let content = `<div><video class='createGuifoVideoCaptionWrapper' controls id='idVideoRecord'></video></div>`;
    let footer = `<button class='btn icon-btn red'><img src='./assets/icons/recording.svg'></button>
      <button class='btn red' id='idBtnStopRecordVideo'>Listo</button>`;
      
    configModal( title, CLASSNAME_BIG_WRAPPER_MODAL, content, footer );
    startVideoRecord()
  }
  
  function startVideoRecord() { //start video record with permissions
  
    let btnStopRecording = document.getElementById("idBtnStopRecordVideo");
    btnStopRecording.addEventListener("click", stopRecord);
  
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
       },
      }); 
  
      recorder.startRecording();
     })
  
    function stopRecord() {
      recorder.stopRecording(function(){
        gifDone = this.getBlob();
        objectUrl = this.toURL();

        form.append('file', gifDone, 'myGif.gif');

        
      })
  
      let title = MY_GUIFOS_PREVIEW_VIEW_TITLE;
      let content = `<div><img class='previewViewImage' src='' id='idImagePreviewView'>`;
      let footer = `<button class='btn one' id='idRepeatRecordBtn'>Repetir Captura</button><button class='btn two' id='idBtnUploadGif'>Subir Guifo</button>`;
  
      configModal( title, CLASSNAME_BIG_WRAPPER_MODAL, content, footer );
      setSrcToImageId(objectUrl,"idImagePreviewView");

      let btnUploadGif = document.getElementById("idBtnUploadGif");
      btnUploadGif.addEventListener("click", () => { uploadGif( objectUrl, form ) });

      document.getElementById("idRepeatRecordBtn").addEventListener("click", captureVideo );
    } 
  }
  
  function setSrcToImageId( src, imageId ){
    document.getElementById(imageId).src = src ;
  } 
  
  async function uploadGif( gifImage, gif ) {
    let title = MY_GUIFOS_UPLOAD_GIF_TITLE;
    let content = `<div class='uploadGifDetails'><div class='icon-glob-wrapper'><img class='icon-glob' src='./assets/images/globe_img.png'></div>
      <span class='upload-details text-bold'>Estamos subiendo tu guifo…</span>
      <div class="progressive-bar" id="idProgressiveBar"></div>
      <span class='progress-detail'>Tiempo restante: <span class='text-line-through'>38 años</span> algunos minutos</span>
      </div>`;
    let footer = `<button class='btn' id='idCancelBtn'>Cancelar</button>`;
    
    configModal( title, CLASSNAME_BIG_WRAPPER_MODAL, content, footer );
  
    displayProgressiveBar(); 

    let postRequestResponse = await postGifOnGiphy(gif)
      .then(response => response.json());

    let idGifPost = postRequestResponse.data.id;
    saveDataToLocalStorage( idGifPost, idGifPost );
  
    if( postRequestResponse.data ) {
      showUploadedGifOptions( gifImage, idGifPost );
    }

    document.getElementById("idCancelBtn").addEventListener("click", () => { parent.location='index.html' } )
  }

  async function showUploadedGifOptions( gifImage, idGifPost) {
    console.log(gifImage);
    let title = MY_GUIFOS_UPLOADED_GIF_TITLE;
    let content = `<div class='uploadedGuifoWrapper'>  
      <div class='imgUploadedGuifo'><img src='' id='idPreviewViewGifUploaded'></div>
      <div class='optionsWrapper'>
      <span class='uploadStatusDetail'>Guifo creado con éxito</span>
      <button class='btn option one option1' id='idCopyLinkBtn'>Copiar Enlace Guifo</button>
      <a class='btn option one option2' href='' id='idAnchorBtnDownload' download>Descargar Guifo</a>
      </div>
    </div>`;
    let footer = `<button class='btn' id='idReadyBtn'>Listo</button>`;

    configModal( title, CLASSNAME_SMALL_WRAPPER_MODAL, content, footer);

    setSrcToImageId( gifImage, ID_PREVIEW_VIEW_GIF_WRAPPER );

    let fetchPostGifResults = await fetchMyGuifos( idGifPost );
    
    let gifImageUrl = document.getElementById("idAnchorBtnDownload").href = fetchPostGifResults.images.fixed_height.url;
    document.getElementById("idCopyLinkBtn").addEventListener("click", () => { copyTextToClipboard(gifImageUrl) });
    document.getElementById("idReadyBtn").addEventListener("click", () => { parent.location='index.html' } );

    document.getElementById("idMisGuifosSection").classList.toggle("not-show");
    

    initMyGuifosPage();
    
  }

  function copyTextToClipboard( text ) {
    document.execCommand( text );
    alert(`Guifo link copied to Clipboard`);
  }


initMyGuifosPage();
