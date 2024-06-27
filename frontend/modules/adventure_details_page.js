import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  try {
    let params = new URLSearchParams(search);
    let advId = params.get("adventure");
    return advId;
  } catch (err) {
    console.error("error while getting he aventure id: ", err);
  }
  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const url =
    config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("error while getting images:", err);
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const title = document.getElementById("adventure-name");
  title.textContent = adventure.name;
  const subtitle = document.getElementById("adventure-subtitle");
  subtitle.textContent = adventure.subtitle;
  const imgContent = document.getElementById("photo-gallery");
  const images = adventure.images;
  images.forEach((element) => {
    let imgDiv = document.createElement("div");
    imgDiv.innerHTML = `
    <img src=${element} id=${adventure.id} class="activity-card-image">
    `
    imgContent.append(imgDiv);
  });
  const advContent = document.getElementById("adventure-content");
  advContent.textContent = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const imgContent = document.getElementById("photo-gallery");
  imgContent.innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators"></div>
        <div class="carousel-inner"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  `
  const indicators = document.querySelector(".carousel-indicators");
  const innerCarousel = document.querySelector(".carousel-inner");
  images.forEach((element, index) => {
    var button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('data-bs-target', '#carouselExampleIndicators');
    button.setAttribute('data-bs-slide-to', `${index}`);
    button.setAttribute('aria-current', 'true');
    button.setAttribute('aria-label', `Slide ${index + 1}`);
    const carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      button.className = 'active';
      carouselItem.classList.add("active");
    }
    carouselItem.innerHTML = `
    <img
      src="${element}" class="d-block w-100 activity-card-image">
    `
    innerCarousel.append(carouselItem);
    indicators.append(button);
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  const reserveCost = document.getElementById("reservation-cost");
  reserveCost.textContent = (adventure.costPerHead * persons);
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  const form = document.getElementById("myForm");
  const url = config.backendEndpoint + "/reservations/new"
  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formEle = event.target.elements;
    const data = {
      name : formEle.name.value,
      date : formEle.date.value,
      person : formEle.person.value,
      adventure : adventure.id
    }
    // console.log(url);
    fetch(url, {
      method : "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body : JSON.stringify(data)
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok ' + res.statusText);
      }
      return res.json(); 
    })
    .then(data => {
      console.log("data send to backend: ",data);
      alert("Success");
      location.reload();
    })
    .catch(err => {
      console.error("error in ending post request:" , err);
      alert("Failed");
    })
  })
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  document.getElementById("reserved-banner").style.display = adventure.reserved ? "block" : "none";
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
