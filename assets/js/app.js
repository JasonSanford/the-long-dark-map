var map = new L.Map('map');

map.setView([0.00668, 0.00757], 15);

var tileUrl = 'https://api.mapbox.com/styles/v1/jcsanford/cijna760h00id93ly3eqhr7ah/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6ImNpam9lMXNqNzAwdTl1Zm01OXp0OWR0eGcifQ.1UnpWThNOderQiG8cNvaYA';
var tileLayer = new L.TileLayer(tileUrl, {minZoom: 14});
tileLayer.addTo(map);
