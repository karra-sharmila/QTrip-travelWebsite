import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  const url = config.backendEndpoint + "/cities"
  try{
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  catch(err){
    console.log("error:", err);
    return null;
  }
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cardContent = document.getElementById("data");
  let card = document.createElement("div");
  let url = "/pages/adventures/?city=" + id;
  card.className = "col-lg-3 col-6 mb-4";
  card.innerHTML = `
                <a href="${url}" id="${id}">
                      <div class="tile">
                        <img src="${image}" alt="${city}">
                        <p class="tile-text">
                            ${city} <br> ${description}
                        </p>
                      </div>
                </a>
  `
  cardContent.append(card);
}

export { init, fetchCities, addCityToDOM };
