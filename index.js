//make map                                            
const map = L.map('map').setView([0,0], 5);

// add openstreetmap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
//find user's location
L.control.locate().addTo(map);
setView(center,zoom)
// Allow the user to select a business type from a list and
//map the five nearest locations on the map using the Foursquare API.


// What events will your application need?
// What APIs will you need and in what order?

// How will you add that information to the map?
// Add a simple select interface for the user with the following
// values: coffee, restaurant, hotel, and market.
