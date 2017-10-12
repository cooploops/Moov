  var database = firebase.database();

  var userUID;

  $("#saveInfo").on('click', function(event){

		  	event.preventDefault();


		  	var email = $("#inputEmail").val().trim();
			var pass = $("#inputPassword").val().trim();

			var auth = firebase.auth();

			var name = $("#inputName").val().trim();
		  	var address = $("#inputAddress").val().trim();
		  	var city = $("#inputCity").val().trim();
		  	var zipCode = $("#inputZip").val().trim();
		  	var state = $("#inputState").val().trim();
		  	var isMoov = $("#isMoov").val().trim();
		  	var txtDes = $("#txtDes").val().trim();

		  	var fullAddress = address + "," + city + " " + state + "," + zipCode;

		  	initMap(fullAddress).then(function(curLocation){

		  		console.log(curLocation.lat);

		  		auth.createUserWithEmailAndPassword(email, pass).then( function(user){

		  		userUID = user.uid;

			     // create a new Node
				    database.ref('/Users/' + userUID).set({

				        'email': email,
				        'full address': fullAddress,
				        'lat' : curLocation.lat,
				        'lng' : curLocation.lng,
				        'display name' : name,
				        'city' : city,
				        'zipCode' : zipCode,
				        'photoURL' : '',
				        'Moover' : isMoov, //this bolean is for determining whether the user is a mover or not
				        'chat' : [1,2,3],
				        'description' : txtDes,
				        
				    })

				}).catch(function(error) {
			      console.log(error.code);
			      console.log(error.message);

				}).then(function() {

					window.location.href = "index.html";

				});
		  	})
	});



    function initMap(address) {

    	console.log(address);
    	geocoder = new google.maps.Geocoder();

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