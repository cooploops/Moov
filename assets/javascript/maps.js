  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCsJJyoocEMnWy96UEDk4AJiLNWl3y64KI",
    authDomain: "moov-7f456.firebaseapp.com",
    databaseURL: "https://moov-7f456.firebaseio.com",
    projectId: "moov-7f456",
    storageBucket: "moov-7f456.appspot.com",
    messagingSenderId: "26403369152"
  };

  firebase.initializeApp(config);

    var database = firebase.database();

    var locations = [];

    var map, geocoder, service, bounds, infoWindow, address, google, maps;

    var markers = [];

    var losAngeles = { lat: 34.052235, lng: -118.243683 };

    function initMap() {
        // Create a map object and specify the DOM element for display.
        map = new google.maps.Map(document.getElementById('map'), {
            center: losAngeles,
            zoom: 8
        });
        // initialize classes
        geocoder = new google.maps.Geocoder();
        service = new google.maps.places.PlacesService(map);
        infoWindow = new google.maps.InfoWindow();
        bounds = new google.maps.LatLngBounds();

        // initialize array to hold map markers
        markers = [];

        address = localStorage.getItem("full_address");

        console.log(address)

        clearLocations();

        geocodeAddress(address)
            .then(function(curLocations) {


                database.ref("/Users").on("value", function(snap) {
                    snap.forEach(child => {
                    locations.push({position: { lat: child.val().lat, lng: child.val().lng },});

                        markers = [];
                        console.log(locations);

                        locations.forEach(function(element) {
                            let isNear = arePointsNear(element.position, curLocations, 15)
                            // console.log(curLocations);
                            console.log(isNear)
                            if (isNear) {
                                console.log(element);

                                var marker = new google.maps.Marker({
                                    position: element.position,
                                    map: map
                                });

                                bounds.extend(element.position);
                                markers.push(marker);
                            }
                        });
                        map.fitBounds(bounds);


                })
                }, function(errorObject) {
                console.log("Submit Failed: " + errorObject.code);
                });


            })
            .catch(function(error) {
            console.log(error);
        });

    }


    function geocodeAddress(address) {
        geocoder = new google.maps.Geocoder();
        return new Promise(function(resolve, reject) {
            geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == "OK") {
                    var currentLocation = {
                        address: results[0].formatted_address,
                        name: results[0].place_id,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                    }

                    resolve(currentLocation);
                } else {
                    reject(status);
                }
            });
        });
    }


    function arePointsNear(checkPoint, centerPoint, km) {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
        var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
        var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;
    }


    function clearLocations() {
        markers.forEach(function(element, index, array) {
            element.setMap(null);
        });
        markers = [];
    }