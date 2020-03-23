function toggleDropdown() {
  document.getElementById("btn-dropdown").classList.toggle("show");
}

function showSearchGifResults() {
    document.getElementById("btn-search").classList.toggle("show");
  }
  
function changeThemeSailorNight() {
    let body = document.body;
    body.style.backgroundColor = "#110038";
}

function changeThemeDay() {
    let body = document.body;
    body.style.backgroundColor = "#FFF4FD";
}

async function getSuggestedGifs() {
  //funcion que hace el llamado a la API y devuelve SUGGESTED GIFS
  let response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O&q=cheeseburgers&limit=4`
  );
  let responseData = await response.json(); //devuelve archivo json
  let suggestedGifs = responseData.data;

  return suggestedGifs; // devuelve array de suggested gifs
}


async function displaySuggestedGifs() {
  let suggestedGifs = await getSuggestedGifs(); //devuelve array de suggested gifs
  let listGifs = document.getElementById("list-suggested-gifs");

  suggestedGifs.forEach(
    gif =>
      (listGifs.innerHTML += `
    <div class="gif-container bordered">
        <span class="hashtag-gif-name">${gif.title}</span>
            <div class="gif-image-container">
                <img class="gif-image" src=${gif.images.fixed_height.url}>
                <button class="btn-see-more">Ver más…</button>
            </div>
    </div>`)
  );
}

async function getTrendingGifs() {
  //funcion que hace el llamado a la API y devuelve TRENDING GIFS
  let response = await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O&limit=12&rating=G`
  );
  let responseData = await response.json(); //devuelve archivo json
  let trendingGifs = responseData.data;

  return trendingGifs; // devuelve array de trending gifs
}

async function displayTrendingdGifs() {
  let trendingGifs = await getTrendingGifs(); //devuelve array de trending gifs
  let listGifs = document.getElementById("list-trend-gifs");

  trendingGifs.forEach(
    gif =>
      (listGifs.innerHTML += `
            <div class="gif-container bordered">
                    <div class="gif-image-container">
                        <img class="gif-image" src=${gif.images.fixed_height.url}>
                        <button class="btn-see-more">Ver más…</button>
                    </div>
            </div>`)
  );
}

displaySuggestedGifs();
displayTrendingdGifs();
changeTheme();