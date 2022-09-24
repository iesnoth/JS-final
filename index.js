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
    else { console.log("Geolocation has failed.") }
}

const coords = getCoords()
console.log(coords)

//click event
document.getElementById("groceries").addEventListener("click", () => displayOption("groceries"));

//it's going to ask for location permission every time I choose something from the dropdown menu,
//bc I am recalling getCoords in displayOption. However, I don't know how to fix this.

//I need this function to call the information, parse only the names and locations of the businesses,
//put those businesses and coordinates into array(s),
//and make them accessible
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
        await fetch(`https://api.foursquare.com/v3/places/search?query=${id}&ll=${coords[0]}%2C${coords[1]}&radius=5000&limit=3`, options)
            .then(response => response.json())
           // .then(return response)


    } catch {
        console.log("There's been an error.")
    };

}

//OBJECT for reference
// "fsq_id": "581bcf0ebda2d737772cb35d",
//       "categories": [
//         {
//           "id": 13002,
//           "name": "Bakery",
//           "icon": {
//             "prefix": "https://ss3.4sqi.net/img/categories_v2/food/bakery_",
//             "suffix": ".png"
//           }
//         },
//         {
//           "id": 13035,
//           "name": "Coffee Shop",
//           "icon": {
//             "prefix": "https://ss3.4sqi.net/img/categories_v2/food/coffeeshop_",
//             "suffix": ".png"
//           }
//         },
//         {
//           "id": 13046,
//           "name": "Ice Cream Parlor",
//           "icon": {
//             "prefix": "https://ss3.4sqi.net/img/categories_v2/food/icecream_",
//             "suffix": ".png"
//           }
//         }
//       ],
//       "chains": [],
//       "distance": 717,
//       "geocodes": {
//         "main": {
//           "latitude": 37.684456,
//           "longitude": -97.345578
//         },
//         "roof": {
//           "latitude": 37.684456,
//           "longitude": -97.345578
//         }
//       },
//       "link": "/v3/places/581bcf0ebda2d737772cb35d",
//       "location": {
//         "address": "535 W Douglas Ave",
//         "address_extended": "Ste 140",
//         "census_block": "201730043021022",
//         "country": "US",
//         "cross_street": "btwn McLean Blvd & N Sycamore St",
//         "dma": "Wichita-Hutchinson Plus",
//         "formatted_address": "535 W Douglas Ave (btwn McLean Blvd & N Sycamore St), Wichita, KS 67213",
//         "locality": "Wichita",
//         "neighborhood": [
//           "Downtown"
//         ],
//         "postcode": "67213",
//         "region": "KS"
//       },
//       "name": "Milkfloat",
//       "related_places": {},
//       "timezone": "America/Chicago"
//     },
