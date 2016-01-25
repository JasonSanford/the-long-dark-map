var map = new L.Map('map');

map.on('load', function () {
  $.ajax({
    url: 'features.geojson',
    dataType: 'json',
    success: function (data) {
      data.features.forEach(function (feature) {
        var icon, markerColor;

        var clickable = !!feature.properties.name;

        switch (feature.properties.type) {
          case 'start':
            icon = 'play';
            markerColor = 'orange';
            break;
          case 'building':
            icon = 'home';
            markerColor = 'blue';
            break;
          case 'area':
            icon = 'crosshairs';
            markerColor = 'green';
            break;
          default:
            icon = 'coffee';
            markerColor = 'red';
        }

        var icon = L.divIcon({
          className: 'marker',
          iconSize: [21, 21],
          popupAnchor: [0, -13],
          html: '<i class="fa fa-lg fa-' + icon + ' ' + icon + '"></i>'
        });

        var marker = L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {icon: icon, clickable: clickable});

        if (feature.properties.name) {
          marker.bindPopup(feature.properties.name)
        }

        marker.addTo(map);
      });
    }
  });
});

map.setView([0.00668, 0.00757], 15);

var tileUrl = 'https://api.mapbox.com/styles/v1/jcsanford/cijna760h00id93ly3eqhr7ah/tiles/{z}/{x}/{y}?access_token=sk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6ImNpam9lMXNqNzAwdTl1Zm01OXp0OWR0eGcifQ.1UnpWThNOderQiG8cNvaYA';
var tileLayer = new L.TileLayer(tileUrl, {minZoom: 14});
tileLayer.addTo(map);
