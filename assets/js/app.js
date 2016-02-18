mapboxgl.accessToken = 'pk.eyJ1IjoiamNzYW5mb3JkIiwiYSI6InRJMHZPZFUifQ.F4DMGoNgU3r2AWLY0Eni-w';

var initialPosition = [0.00794800, 0.00677284];
var initialZoom = 15;

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/jcsanford/cijna760h00id93ly3eqhr7ah',
  center: initialPosition,
  zoom: initialZoom - 3,
  minZoom: 12,
  maxZoom: 18
});

setTimeout(goToFullView, 1000);

function goToFullView() {
  map.fitBounds([[-0.001343, -0.001976], [0.016241, 0.015520]]);
}

function locationHovered(event) {
  var $section = $(event.target).closest('.location');
  var layer = $section.data('layer');

  $section[event.type === 'mouseenter' ? 'addClass' : 'removeClass']('hovered');

  $section.siblings('.location').each(function (i, o) {
    map.setPaintProperty($(o).data('layer'), 'text-color', '#000');
    map.setPaintProperty($(o).data('layer'), 'text-halo-color', '#fff');
  });

  if (event.type === 'mouseenter') {
    map.setPaintProperty(layer, 'text-color', '#B4C1B9');
    map.setPaintProperty(layer, 'text-halo-color', '#31393a');
  } else {
    map.setPaintProperty(layer, 'text-color', '#000');
    map.setPaintProperty(layer, 'text-halo-color', '#fff');
  }
}

function locationClicked(event) {
  var $section = $(event.target).closest('.location');
  var layer = $section.data('layer');

  if ($section.hasClass('selected')) {
    $section.removeClass('selected').find('.location-detail').hide();
    map.setPaintProperty(layer, 'text-color', '#000');
    map.setPaintProperty(layer, 'text-halo-color', '#fff');
    goToFullView();
  } else {
    $section.siblings('.location').each(function (i, o) {
      $(o).removeClass('selected').find('.location-detail').hide();
      map.setPaintProperty($(o).data('layer'), 'text-color', '#000');
      map.setPaintProperty($(o).data('layer'), 'text-halo-color', '#fff');
    });
    $section.addClass('selected').find('.location-detail').show();
    map.setPaintProperty(layer, 'text-color', '#B4C1B9');
    map.setPaintProperty(layer, 'text-halo-color', '#31393a');
    map.flyTo({
      center: [parseFloat($section.data('y')), parseFloat($section.data('x'))],
      zoom: 16
    });
  }
}

$('.location').hover(
  locationHovered,
  locationHovered
);

$('.location').on('click', locationClicked);
