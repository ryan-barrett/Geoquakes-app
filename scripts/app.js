// define globals

//define endpoint
var dailyQuakes =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

//define map
var map;

//when info is gathered
$(document).ready(function() {
  //callback for listing quake data/markers
  listQuakeData();
});

//function for gathering quake locations and marker settings
function listQuakeData(dataResponse) {
  $.ajax({
    method: "GET",
    url: dailyQuakes,
    dataType: "json",
    success: function(dataResponse) {
      // console.log(dataResponse);

      //defining unnamed Object as variable
      var earthquakes = dataResponse;

      //for each location, create a list item and marker
      earthquakes.features.forEach(function listAndMarker(quake) {
        //List item of earthquake info
        var title = quake.properties.title;
        var hoursAgo = Math.round(
          (Date.now() - quake.properties.time) / 3600000
        );
        $(".earthquakeData").append(
          `<li>${hoursAgo} hours ago | ${title}</li>`
        );

        //Create Marker
        var lat = quake.geometry.coordinates[1];
        var lng = quake.geometry.coordinates[0];
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, lng),
          map: map,
          title: title
        });
      });
    }
  });
}

//function for creating map
function createMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 37.78,
      lng: -122.44
    },
    zoom: 3
  });
}
