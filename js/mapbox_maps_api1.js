// creating an object for the map
mapboxgl.accessToken = mapboxKey;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    zoom: 10,
    center: [-95.1179, 29.5376]
});

const center = "Webster, Texas 77598";
const restaurants = [
    {
        name: "Mogul Indian Restaurant",
        address: "1055 Bay Area Blvd, Houston, TX 77058",
        long: '29.5377',
        lat: '-95.1183',
        info: "Delicious. What else?"
    },
    {
        name: "Landry's Seafood House",
        address: "Boardwalk #1, Kemah, TX 77565",
        long: '29.5403',
        lat: '-95.0177',
        info: "Not really a favorite"
    },
    {
        name: "Blue Bell",
        address: "1101 S Blue Bell Rd, Brenham, TX ",
        long: '30.1636',
        lat: '-96.3777',
        info: "Best. Ice Cream. Ever."
    }
];


restaurants.forEach(function(restaurant) {
    var popupAll = new mapboxgl.Popup()
        .setHTML('<h4>' + restaurant.name + '</h4>'+ restaurant.info + "<br>" + restaurant.address);
    var marker2 = new mapboxgl.Marker()
        .setLngLat([restaurant.lat, restaurant.long])
        .setPopup(popupAll)
        .addTo(map);
});

