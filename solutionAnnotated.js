// encapsulated object which contains the variables and visuals for the map
const myMap = {
	//these empty variables will be filled later
	coordinates: [],
	businesses: [],
	map: {},
	markers: {},

	// this function not only builds the map, but factors in the current location from getCoords
	//and adds a marker to that location, so the map opens on the user's location with their marker in the center
	//of the screen
	buildMap() {
		//"L" refers to the leaflet library?
		this.map = L.map('map', {
		//this refers to the myMap const, though the "coordinates" have not been filled in at this point.
		center: this.coordinates,
		zoom: 11,
		});
		// add openstreetmap tiles
		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		minZoom: '15',
		}).addTo(this.map)
		// create and add geolocation marker
		const marker = L.marker(this.coordinates)
		marker
		//appends marker to map
		.addTo(this.map)
		//defines popup
		.bindPopup('<p1><b>You are here</b><br></p1>')
		//opens new pop up while closing the last one
		.openPopup()
	},

	// add business markers
	addMarkers() {
		//iterates over the businesses array at the top and makes coordinates arrays for each of them
		//this coordinates array is coming from an object created in the event listener
		for (var i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
		//takes the name from the businesses array of objects and puts it in a popup
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
}

// get coordinates via geolocation api
//need permission from the user to get the info, so this function is async
//the api returns an object, and the function picks out the lat and long to return in an array
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}

// get foursquare businesses
//async because fetching information from an api
//makes an array
async function getFoursquare(business) {
	const options = {
		method: 'GET',
		headers: {
		Accept: 'application/json',
		Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
		}
	}
	//setting a variable that is easier to change here than trying to read the fetch url
	let limit = 5
	//same for these. Taking the lat and lon from the myMap object, which is now reference by name
	//bc this function is outside it
	let lat = myMap.coordinates[0]
	let lon = myMap.coordinates[1]
	//making a variable so it can be referenced to be parsed
	let response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
	//turning the response to text
	let data = await response.text()
	//making the data an object that JS can reference
	let parsedData = JSON.parse(data)
	//specifying the "results" of the parsedData object
	let businesses = parsedData.results
	return businesses
}
// process foursquare array
function processBusinesses(data) {
	//editing the businesses variable?
	//this sets up the objects which will be in the businesses array at the top of myMap
	//"element" is a filler
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}


// event handlers
// window load
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})