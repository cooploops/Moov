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


  var crUser = firebase.auth().currentUser;



  database.ref('/Users/' + crUser.uid).once("value").then( function(snapShot){

  	$("#userName").text(snapShot.val()["Full Name"]);

  })

  $("#saveInfo").on('click', function(event){
  	event.preventDefault();

  	var name = $("#inputName").val().trim();
  	var address = $("#inputAddress").val().trim();
  	var city = $("#inputCity").val().trim();
  	var zipCode = $("#inputZip").val().trim();
  	var state = $("#inputState").val().trim();
  	var isMoov = $("#isMoov").val().trim();

  	var fullAddress = address + "," + city + " " + state + "," + zipCode;

  	var latLng = geocodeAddress(fullAddress);

  	database.ref('/Users/' + crUder.uid).update({
	    'Full address': fullAdrees,
	    'display name' : name,
	    'city' : city,
	    'zipCode' : zipCode,
	    'photoURL' : '',
	    'lat' : latLng.lat,
	    'lng' : latLng.lng,
	    'Moover' : isMoov //this bolean is for determining whether the user is a mover or not
  	})
  })

    function geocodeAddress(address) {
        return new Promise(function(resolve, reject) {
            geocoder.geocode({ 'address': address }, function(results, status) {
                if (status == "OK") {
                    var currentLocation = {
                        address: results[0].formatted_address,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                    }

                    resolve(currentLocation);
                } else {
                    reject(status);
                }
            });
        });
    }



  