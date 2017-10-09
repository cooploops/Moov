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
                    locations.push({
                        position: { lat: child.val().lat, lng: child.val().lng },
                        displayName: child.val()["display name"],
                        photo: child.val().photoURL,
                        email: child.val().email
                                    });

                        markers = [];
                        console.log(locations);

                        locations.forEach(function(element, i) {
                            let isNear = arePointsNear(element.position, curLocations, 15)
                            // console.log(curLocations);
                            console.log(isNear)
                            
                            if (isNear) {

                                console.log(element);

                                var row = $("<div class='row'>");
                                var card = $("<div class='card w-100 mx-2 my-1' style='width: 20rem;'>");
                                var cardBody = $("<div class='card-body p-1'>");
                                var img = $("<img class='card-img-top profilePhoto mr-auto'>");
                                var anchor = $("<a class='btn btn-primary contact'>");
                                var h4 = $("<h4 class='card-title'>");
                                var h6 = $("<h6>");

                                row.append(card.append(cardBody.append(img.attr("src", element.photo).attr("alt", "Card image cap"))
                                .append(anchor.attr("href", "#").text("Contact")).append(h4.attr("id", "profileName").text(element.displayName)).append(h6.attr("id", "profileEmail").text(element.email))));

                                $(".resultsField").append(row);

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