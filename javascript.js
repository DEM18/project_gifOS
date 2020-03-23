function toggleDropdown() {
  document.getElementById("btn-dropdown").classList.toggle("show");
}

async function getSuggestedGifs() {
  //funcion que hace el llamado a la API y devuelve SUGGESTED GIFS
  let response = await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=HA7VTTTjRQ3MypIjMiiIcXq7PAFS6a5O&q=cheeseburgers&limit=5`
  );
  let responseData = await response.json(); //devuelve archivo json
  let suggestedGifs = responseData.data;

  return suggestedGifs; // devuelve array de suggested gifs
}

async function displaySuggestedGifs() {
  let suggestedGifs = await getSuggestedGifs(); //devuelve array de suggested gifs
  let listGifs = document.getElementById("list-suggested-gifs");

  suggestedGifs.forEach(gif => 
    listGifs.innerHTML += `
    <div class="gif-container bordered">
        <span class="hashtag-gif-name">${gif.id}</span>
            <div class="gif-image-container">
                <img class="gif-image" src=${gif.images.fixed_height.url}>
                <button class="btn-see-more">Ver más…</button>
            </div>
    </div>`)
}

displaySuggestedGifs();

// gifName.innerHTML = gif.id;
// gifImage.setAttribute("src", gif.images.fixed_height.url);
