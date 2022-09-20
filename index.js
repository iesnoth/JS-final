//make map                                            
const map = L.map('map').setView([0,0], 5);

// add openstreetmap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
//find user's location
L.control.locate().addTo(map);

// Allow the user to select a business type from a list and
//map the five nearest locations on the map using the Foursquare API.

/* Link each of the options from the dropdown to an onclick event.
Said onclick will have a function with a fetch request for the 5 closest of that thing
The 5 closest places will need to have markers on the map 
 */
//Using this method of getting coordinates to put the right coordinates into the fetch request.                                                             
async function getCoords(){
    let myPosition = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    console.log(myPosition)
}
try {
    getCoords();
} catch (error){
    console.error(error);
}

document.getElementById("groceries").addEventListener("click", displayOption("groceries"));

function displayOption(id){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'fsq3uTzJAp7xsWq/IYnf2/ZKGrGA2SdHA1D3sKNgCg82Vt4='
        }
      };
      
      fetch(`https://api.foursquare.com/v3/places/search?query=${id}&ll=37.69%2C-97.35&radius=3000&limit=1`, options)
        .then(response => response.json())
        .then(response => console.log(response.results[0].name))
        .catch(err => console.error(err));
}



// What events will your application need?
// What APIs will you need and in what order?

// How will you add that information to the map?
// Add a simple select interface for the user with the following
// values: coffee, restaurant, hotel, and market.
