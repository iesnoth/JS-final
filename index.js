//make map                                            
const map = L.map('map').setView([0, 0], 19);

// add openstreetmap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

//find user's location and set marker THIS WORKS
async function getCoords() {
    const myPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    if (navigator.geolocation) {
          map.panTo([myPosition.coords.latitude, myPosition.coords.longitude]);
          L.marker([myPosition.coords.latitude, myPosition.coords.longitude]).addTo(map);
          return [myPosition.coords.latitude, myPosition.coords.longitude]
      }
    else {console.log("Geolocation has failed.")}
}

const coords = getCoords()
console.log(coords)

//click event
document.getElementById("groceries").addEventListener("click", () => displayOption("groceries"));


//still need to work on this, maybe lengthen the radius
//it's going to ask for location permission every time I choose something from the dropdown menu,
//bc I am recalling getCoords in displayOption. However, I don't know how to fix this.
async function displayOption(id) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3uTzJAp7xsWq/IYnf2/ZKGrGA2SdHA1D3sKNgCg82Vt4='
        }
    };

    try {
        const coords = await getCoords();
        console.log(coords)
        await fetch(`https://api.foursquare.com/v3/places/search?query=${id}&ll=${coords[0]}%2C${coords[1]}&radius=3000&limit=3`, options)
        .then(response => response.json())
        .then(response => console.log(response.results[0].name))

    } catch (error) {
        console.error(error);
    }
}
