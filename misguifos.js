const LIST_ID_MIS_GUIFOS = "list-mis-gifos";

let localStorageData = Object.keys(localStorage);
console.log("localStorageData", localStorageData);

async function initMyGuifosPage() {

  let arrayResponseMyGuifos = localStorageData.map(element => getMyGuifos(element));
  let finalResult = Promise.all(arrayResponseMyGuifos);
  let data = await finalResult;
  console.log(data);
 
  displayGifsSectionByElementId( data, LIST_ID_MIS_GUIFOS ); 
}

async function getMyGuifos( element ) {
    let gifResponse = await fetchMyGuifos( element );

    return gifResponse;
}

initMyGuifosPage();
console.log(localStorage);
 