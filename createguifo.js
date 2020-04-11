const CLASSNAME_MEDIUM_WRAPPER_MODAL = "medium-wrapper";
const CLASSNAME_BIG_WRAPPER_MODAL = "big-wrapper";
const CLASSNAME_SMALL_WRAPPER_MODAL = "small-wrapper";
const CLASSNAME_DISPLAY_ELEMENT = "show";
const CLASSNAME_HIDE_ELEMENT = "not-show";
const EMPTY_STRING = "";
const LIST_ID_TRENDING_GIFS = "list-trend-gifs";
const LIST_ID_SUGGESTED_GIFS = "list-suggested-gifs";
const SECTION_ID_SUGGESTED_GIFS = "suggestedGifSection";
const SEARCH_BAR_ID = "search-bar";
const MY_GUIFOS_CAPTURE_VIDEO_TITLE = "Un Chequeo Antes de Empezar";
const MY_GUIFOS_RECORD_VIDEO_TITLE = "Capturando Tu Guifo";
const MY_GUIFOS_PREVIEW_VIEW_TITLE = "Vista Previa";
const MY_GUIFOS_UPLOAD_GIF_TITLE = "Subiendo Guifo";
const MY_GUIFOS_UPLOADED_GIF_TITLE = "Guifo Subido Con Éxito";


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
      let content = `<div><img class='previewViewImage' src='' id='idImagePreviewView'>`;
      let footer = `<button class='btn one'>Repetir Captura</button><button class='btn two' id='idBtnUploadGif'>Subir Guifo</button>`;
  
      configModal( title, CLASSNAME_BIG_WRAPPER_MODAL, content, footer );
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
    let content = `<div class='uploadGifDetails'><div class='icon-glob-wrapper'><img class='icon-glob' src='./assets/images/globe_img.png'></div>
      <span class='upload-details text-bold'>Estamos subiendo tu guifo…</span>
      <div class="progressive-bar" id="idProgressiveBar">
      <div class="progression" id="idProgression"></div>
      </div>
      <span class='progress-detail'>Tiempo restante: <span class='text-line-through'>38 años</span> algunos minutos</span>
      </div>`;
    let footer = `<button class='btn'>Cancelar</button><button class='btn' id='btnTest'>test</button>`;
    
    configModal( title, CLASSNAME_BIG_WRAPPER_MODAL, content, footer );
  
    let postRequestResponse = await postGifOnGiphy(gifRecordedFile)
      .then(response => response.json());

    let idGifPost = postRequestResponse.data.id;
    saveDataToLocalStorage( idGifPost, idGifPost );

    document.getElementById("btnTest").addEventListener("click", showUploadedGifOptions);
  
    console.log(postRequestResponse);

  }

  function showUploadedGifOptions() {
    let title = MY_GUIFOS_UPLOADED_GIF_TITLE;
    let content = `<div class='uploadedGuifoWrapper'>  
      <div class='imgUploadedGuifo'><img src=''></div>
      <div class='optionsWrapper'>
      <span class='uploadStatusDetail'>Guifo creado con éxito</span>
      <button class='btn option one option1'>Copiar Enlace Guifo</button>
      <button class='btn option one option2'>Descargar Guifo</button>
      </div>
    </div>`;
    let footer = `<button class='btn'>Listo</button>`;

    configModal( title, CLASSNAME_SMALL_WRAPPER_MODAL, content, footer);
  }
 
  /*function fullProgressiveBar() {
     let progressiveBar = document.getElementById("idProgressiveBar"); 
    let progression = document.getElementById("idProgression");
    let progressionWidth = progression.clientWidth;

    progressionWidth + 15;
    progression.style.width = progressionWidth;
  } */

  
