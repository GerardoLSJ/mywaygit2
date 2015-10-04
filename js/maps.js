 /*Inicializ google maps*/
 var map, marker;
 var markersArray = [];
 var userLocation;
 var userDestination;
 var destinationMarker;
var directionsDisplay;
var peopleMarkersArray = [];
var directionsService = new google.maps.DirectionsService();
   google.maps.event.addDomListener(window, 'load', initialize);
   window.infowindow = new google.maps.InfoWindow({
   content: 'content'
});
var longis;
Parse.initialize("aJoirojoB2spO32c4NW0Nw1njnrhnWmDKWtLK0XH", "iGnSe8BxVAgQ2NEQXwbVyw2J3mH97OYSKipTie2o");
 function initialize() {
    var mapCanvas = document.getElementById('map');
    var mapOptions = {
      center: new google.maps.LatLng(19.3597927,-99.25811900000001),
      zoom: 8,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
     map = new google.maps.Map(mapCanvas, mapOptions);
                 google.maps.event.addListener(map, "click", function(event)
            {
               placeMarker(event.latLng);
               parseMarkers();
            });
     directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    getLocation();

  }



/*Empieza el código para localizar*/
function getLocation()
    {
        if (navigator.geolocation)
        {
       	 navigator.geolocation.getCurrentPosition(showPosition,showError);
       	 console.log("getLocation");
        }
    }

    function showPosition(position)
    {
         userLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       //	console.log(latlong);
		map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
		map.setZoom(14);

		   marker = new google.maps.Marker({
		    position: userLocation,
		    map: map,
		    title: 'Hello World!'
		  });
		  marker.setMap(map);
		  addCircle();
		  $("#calendarContainer").click();
	}
    
 function showError(error)
    {
        switch(error.code) 
        {
        case error.PERMISSION_DENIED:
          document.innerHTML="Request for Geolocation denied by the user."
          break;
        case error.POSITION_UNAVAILABLE:
          document.innerHTML="Unavailable location information."
          break;
        case error.TIMEOUT:
          document.innerHTML="Location request timed out."
          break;
        case error.UNKNOWN_ERROR:
          document.innerHTML="UNKNOWN_ERROR."
          break;
        }
    }

    //pone el Puntero
    function placeMarker(location) {
    	userDestination = location;
    	 deleteOverlays();
        destinationMarker = new google.maps.Marker({
            position: location, 
            map: map
        });
        markersArray.push(destinationMarker);

        calcRoute(userLocation, userDestination);

    }
 function deleteOverlays() {
            if (markersArray) {
                for (i in markersArray) {
                    markersArray[i].setMap(null);
                }
            markersArray.length = 0;
            }
        }

function calcRoute(start,end) {
	marker.setMap(null);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives : false
  };
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(result);
      console.log("IS OK");
      //displayDirections(result);
    }
  });

}



function addCircle(){

	var cityCircle = new google.maps.Circle({
      strokeColor: '#1976D2',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#2196F3',
      fillOpacity: 0.35,
      map: map,
      center: userLocation,
      radius: 300
    });
}


    /**************************Empieza el desmadre de PARSE**************************/
    function parseMarkers(){
     var GPS = Parse.Object.extend("GPS");
      var query = new Parse.Query(GPS);
      query.find({
	 	success: function(results) {
	  	longis = results;
	    console.log("Successfully retrieved " + results.length + " JSONS.");

	    for (var i = 0; i < results.length; i++) {
	     peopleLat = longis[i].get("latitud");
	     peopleLong = longis[i].get("longitud");
	     console.log(longis[i].get("longitud"));    
	     console.log(longis[i].get("latitud")); 
	     peopleMArkerLocation = new google.maps.LatLng(peopleLat, peopleLong);

	      peopleMarker = new google.maps.Marker({
            position: peopleMArkerLocation, 
            map: map
        });
        peopleMarkersArray.push(peopleMarker);
        peopleMarker.setMap(map);


	    }
	  },
	  error: function(error) {
	    console.log("Error: " + error.code + " " + error.message);
	  }
});
}


window.onload = function(){
	$(".dtpicker-buttonSet").attr("id", "agendarBtn");
	$("#agendarBtn").on("click", function(){
		$(".ui cards").fadeIn();
		console.log("AGENDAR A LA VERGA");
	});


	$(".goWith").click(function(){
		$("#contactos").fadeOut();
		$("#payContainer").fadeIn();

	});
	$(".discard").click(function(){
				$("#contactos").fadeOut();
	});
}












