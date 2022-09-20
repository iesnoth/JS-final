//make map                                            
const map = L.map('map').setView([0, 0], 5);

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
async function getCoords() {
    let myPosition = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    return myPosition
}

document.getElementById("groceries").addEventListener("click", () => displayOption("groceries"));

async function displayOption(id) {
    // const options = {
    //     method: 'GET',
    //     headers: {
    //         accept: 'application/json',
    //         Authorization: 'fsq3uTzJAp7xsWq/IYnf2/ZKGrGA2SdHA1D3sKNgCg82Vt4='
    //     }
    // };

    // try {
    //     const coords = await getCoords();
    //     console.log(coords)
    //     await fetch(`https://api.foursquare.com/v3/places/search?query=${id}&ll=${coords[0]}%2C${coords[1]}&radius=3000&limit=1`, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response.results[0].name))

    // } catch (error) {
    //     console.error(error);
    // }

    // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       Authorization: 'fsq3uTzJAp7xsWq/IYnf2/ZKGrGA2SdHA1D3sKNgCg82Vt4='
    //     }
    //   };

      const coords = getCoords()
      //let latitude = coords[0]
      console.log(coords)
      
    //   await fetch(`https://api.foursquare.com/v3/places/search?query=${id}&ll=${coords[0].substring(0,5)}%2C${coords[1].substring(0,5)}&radius=3000&limit=1`, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

    // const marker = L.marker([48.87007, 2.346453]).addTo(map);
    // // marker.addTo(myMap).bindPopup('<p1><b>The Hoxton, Paris</b></p1>').openPopup()
    // marker.bindPopup("The Hoxton, Paris").openPopup();
}




//object for reference
// {
//     "results": [
//       {
//         "fsq_id": "518eda0b498ee6694e7cb4cf",
//         "categories": [
//           {
//             "id": 17059,
//             "name": "Butcher",
//             "icon": {
//               "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/food_butcher_",
//               "suffix": ".png"
//             }
//           },
//           {
//             "id": 17069,
//             "name": "Grocery Store / Supermarket",
//             "icon": {
//               "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/food_grocery_",
//               "suffix": ".png"
//             }
//           },
//           {
//             "id": 17077,
//             "name": "Meat and Seafood Store",
//             "icon": {
//               "prefix": "https://ss3.4sqi.net/img/categories_v2/shops/foodanddrink_",
//               "suffix": ".png"
//             }
//           }
//         ],
//         "chains": [],
//         "distance": 2314,
//         "geocodes": {
//           "main": {
//             "latitude": 37.695129,
//             "longitude": -97.376503
//           },
//           "roof": {
//             "latitude": 37.695129,
//             "longitude": -97.376503
//           }
//         },
//         "link": "/v3/places/518eda0b498ee6694e7cb4cf",
//         "location": {
//           "address": "2920 W Central Ave",
//           "census_block": "201730087002007",
//           "country": "US",
//           "cross_street": "",
//           "dma": "Wichita-Hutchinson Plus",
//           "formatted_address": "2920 W Central Ave, Wichita, KS 67203",
//           "locality": "Wichita",
//           "postcode": "67203",
//           "region": "KS"
//         },
//         "name": "Carniceria El Guero",
//         "related_places": {},
//         "timezone": "America/Chicago"
//       }
//     ],
//     "context": {
//       "geo_bounds": {
//         "circle": {
//           "center": {
//             "latitude": 37.69,
//             "longitude": -97.35
//           },
//           "radius": 3000
//         }
//       }
//     }
//   }



// What events will your application need?
// What APIs will you need and in what order?

// How will you add that information to the map?
// Add a simple select interface for the user with the following
// values: coffee, restaurant, hotel, and market.
