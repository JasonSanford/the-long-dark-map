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

var highlightedMapLayer;

setTimeout(goToFullView, 1000);

function goToFullView() {
  map.fitBounds([[-0.001343, -0.001976], [0.016241, 0.015520]]);
}

function highlightMapLayer(layer) {
  if (highlightedMapLayer === layer) {
    highlightedMapLayer = null;
    unhighlightMapLayer(layer);
  } else {
    unhighlightAllMapLayers();
    map.setPaintProperty(layer, 'text-color', '#B4C1B9');
    map.setPaintProperty(layer, 'text-halo-color', '#31393a');
    highlightedMapLayer = layer;
  }
}

function unhighlightAllMapLayers() {
  selectableLayers.forEach(function (layer) {
    unhighlightMapLayer(layer);
  });
}

function unhighlightMapLayer(layer) {
  map.setPaintProperty(layer, 'text-color', '#000');
  map.setPaintProperty(layer, 'text-halo-color', '#fff');
}

function highlightListItem(layerOrSection) {
  var $section;

  if (layerOrSection instanceof $) {
    $section = layerOrSection;
  } else {
    $('.location').each(function (i, o) {
      if ($(this).data('layer') === layerOrSection) {
        $section = $(this);
        return false;
      }
    });
  }

  if ($section.hasClass('selected')) {
    unHighlightListItem($section);
  } else {
    unHighlightAllListItems();
    $section.addClass('selected').find('.location-detail').show();
    $section[0].scrollIntoView();
  }
}

function unHighlightListItem($section) {
  $section.removeClass('selected').find('.location-detail').hide();
}

function unHighlightAllListItems() {
  $('.location').removeClass('selected').find('.location-detail').hide();
}

function locationHovered(event) {
  var $section = $(event.target).closest('.location');
  var layer = $section.data('layer');

  $section[event.type === 'mouseenter' ? 'addClass' : 'removeClass']('hovered');
}

function locationClicked(event) {
  var $section = $(event.target).closest('.location');
  var layer = $section.data('layer');

  if ($section.hasClass('selected')) {
    highlightedMapLayer = null;
    unhighlightMapLayer(layer);
    unHighlightListItem($section);
    goToFullView();
  } else {
    highlightMapLayer(layer);
    highlightListItem($section);
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

var selectableLayers = [];
$('.location').each(function () {
  selectableLayers.push($(this).data('layer'));
});

map.on('click', function (e) {
  map.featuresAt(e.point, {layer: selectableLayers, radius: 1, includeGeometry: true}, function (err, features) {
    if (err) throw err;
    if (features.length > 0) {
      var feature = features[0];
      highlightMapLayer(feature.properties.name);
      highlightListItem(feature.properties.name);
      map.flyTo({center: feature.geometry.coordinates, zoom: 16});
    } else {
      highlightedMapLayer = null;
      unhighlightAllMapLayers();
      unHighlightAllListItems();
    }
  });
});
