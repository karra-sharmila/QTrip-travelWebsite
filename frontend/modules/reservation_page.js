import config from "../conf/index.js";

async function fetchReservations() {
  const url = config.backendEndpoint + "/reservations/";
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("error in fetching data : ", err);
  }
  return null;
}

function addReservationToTable(reservations) {
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
    const advUrl = "/pages/adventures/detail/?adventure=" + element.adventure ;
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
}

export { fetchReservations, addReservationToTable };
