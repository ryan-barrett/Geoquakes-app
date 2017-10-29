// define globals
var weekly_quakes_endpoint =
  "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var mapCords = [];

$(document).ready(function() {
  console.log("Let's get coding!");
  $.ajax({
    method: "GET",
    url: weekly_quakes_endpoint,
    dataType: "json",
    //data:responseData,
    success: onSuccess
  }); //closes ajax

  function onSuccess(responseData) {
    var x = responseData;
    quakeArray = x.features;
    Array.from(x).forEach(function(quake) {
      console.log("test");

      var title = quake.properties.title;
      var hours_ago = Math.round(
        (Date.now() - quake.properties.time) / (1000 * 60 * 60)
      );
      $info_row_target.append(
        "<p>" + title + " / " + hours_ago + " hours ago</p>"
      );
      var lat = quake.geometry.coordinates[1];
      var lng = quake.geometry.coordinates[0];
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: title
      });
    });

    for (i = 0; i < responseData.features.length; i++) {
      $("h2").append(`${responseData.features[i].properties.title}`);
    }
  }
}); //closes documentReady

// function updateGlobal(cords){
// mapCords = cords;
