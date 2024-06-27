import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url = config.backendEndpoint + "/reservations/";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("error in fetching data : ", err);
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
if(reservations.length){
  document.getElementById("no-reservation-banner").style.display = "none";
  document.getElementById("reservation-table-parent").style.display = "block";
  const reserveTable = document.getElementById("reservation-table");
  reservations.forEach((element) => {
    const date = new Date(element.date);
    const dateToShow = date.getDate() + "/" + (date.getMonth()+1) +"/" + date.getFullYear();
    const bookingTime = new Date(element.time);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const formattedDate = bookingTime.toLocaleString("en-IN", options).replace(" at", ",");
    const tRow = document.createElement("tr");
    const advUrl = "/frontend/pages/adventures/detail/?adventure=" + element.adventure ;
    tRow.innerHTML = `
                        <td scope="col">${element.id}</td>
                        <td scope="col">${element.name}</td>
                        <td scope="col">${element.adventureName}</td>
                        <td scope="col">${element.person}</td>
                        <td scope="col">${dateToShow}</td>
                        <td scope="col">${element.price}</td>
                        <td scope="col">${formattedDate}</td>
                        <td scope="col"><button id=${element.id} type="button" class="reservation-visit-button"><a href="${advUrl}">Visit Adventure</a></button></td>
    `;
    reserveTable.append(tRow);
  });
}
else{
  document.getElementById("no-reservation-banner").style.display = "block";
  document.getElementById("reservation-table-parent").style.display = "none";
}
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
