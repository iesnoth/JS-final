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
// Map the location on a Leaflet map.


// Allow the user to select a business type from a list and
//map the five nearest locations on the map using the Foursquare API.

//PSEUDOCODE
/*Set up the map based on the user's location.
 */