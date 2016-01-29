mapboxgl.accessToken = 'pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jcsanford/cijna760h00id93ly3eqhr7ah',
  center: [0.00794800, 0.00677284],
  zoom: 12
});

setTimeout(function () {
  map.zoomTo(15)
}, 1000);
