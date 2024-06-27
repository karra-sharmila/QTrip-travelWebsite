
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const searchParams = new URLSearchParams(search);
  const city = searchParams.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  let url = config.backendEndpoint + "/adventures?city=" + city;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const adventureCardBody = document.getElementById("data")
  adventures.forEach(adventure => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "col-lg-3 col-sm-6 mb-4";
    cardDiv.innerHTML = `
    <a href="detail/?adventure=${adventure.id}" id="${adventure.id}">
      <div class="activity-card">
        <img src="${adventure.image}" alt="${adventure.name}">
        <p class="category-banner">${adventure.category}</p>
        <p class="w-100 d-flex justify-content-between p-2 m-0"><span>${adventure.name}</span><span>${adventure.currency}${adventure.costPerHead}</span></p>
        <p class="w-100 d-flex justify-content-between p-2 m-0"><span>Duration</span><span>${adventure.duration} Hours</span></p>
      </div>
  </a>`
  adventureCardBody.append(cardDiv);
  }) 
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filterList = list.filter((obj)=>{
    if(obj.duration <= high && obj.duration >= low){
      return obj;
    }
  })
  return filterList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let advList = list.filter((advObj)=>{
    if(categoryList.includes(advObj.category)){
      return advObj;
    }
  })
  return advList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.category.length != 0){
    list = filterByCategory(list,filters.category);
  }
  if(filters.duration != ""){
    let durationStr = filters.duration;
    let durationArr = durationStr.split("-");
    let low = durationArr[0];
    let high = durationArr[1];
    list = filterByDuration(list,low,high)
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters",JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
   try{
      let filters = JSON.parse(localStorage.getItem("filters"));
      // console.log("Filters retrieved from localStorage:", filters);
      return filters;
   }
   catch(error){
    console.error("error in getting local storage filters",error);
   }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const domFilters = filters.category;
  const domBody = document.getElementById("category-list");
  if(domFilters.length != 0){
    domFilters.forEach((filterEle)=>{
        let domEle = document.createElement("div");
        domEle.className = "category-filter";
        domEle.textContent = filterEle;
        domBody.append(domEle);
        console.log(domBody);
    })
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
