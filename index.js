//make map                                            
const map = L.map('map').setView([0, 0], 19);

// add openstreetmap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

//find user's location and set marker
async function getCoords() {
    const myPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    if (navigator.geolocation) {
          map.panTo([myPosition.coords.latitude, myPosition.coords.longitude]);
          L.marker([myPosition.coords.latitude, myPosition.coords.longitude]).addTo(map);
      }
    else {console.log("Geolocation has failed.")}
}

getCoords()



