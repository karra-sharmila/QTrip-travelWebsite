import config from "../conf/index.js";

async function init() {
  let cities = await fetchCities();
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
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
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
