// Obtain the user's current location.
async function getCoords(){
    let pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    console.log(pos)
    
}

try {
    getCoords();
} catch (error){
    console.error(error);
}
// Use the user's location to create a Leaflet map.                                                
const map = L.map('map').setView([37.697109, -97.3550958], 12);

// add openstreetmap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Allow the user to select a business type from a list and
//map the five nearest locations on the map using the Foursquare API.
// What events will your application need?
// What APIs will you need and in what order?
// How will you obtain the user's location?
// How will you add the user's location to the map?
// How will you get the selected location from the user?
// How will you add that information to the map?
// Add a simple select interface for the user with the following
// values: coffee, restaurant, hotel, and market.
// Next, create a space where you will place your map.


//PSEUDOCODE
/*Set up the map based on the user's location.
 */