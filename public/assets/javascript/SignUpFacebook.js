
var database = firebase.database();




setTimeout( displayNames, 1000*7);

function displayNames(){

	var Auth = firebase.auth();

	var userUID = Auth.currentUser.uid;

	console.log(Auth.currentUser);
	console.log(userUID);

	database.ref('/Users/' + userUID).once('value').then( function(user){

		console.log(user.val());
		console.log(user.val()['display name']);
		// console.log(user.displayName);

		$("#welcomeName").text("Welcome " + user.val()['display name'] + "!");

		$("#inputNameFb").val(user.val()['display name']);
	})
};

$("#updateInfo").on('click', function(event){

		  	event.preventDefault();

			var auth = firebase.auth();

			var name = $("#inputNameFb").val().trim();
		  	var address = $("#inputAddressFb").val().trim();
		  	var city = $("#inputCityFb").val().trim();
		  	var zipCode = $("#inputZipFb").val().trim();
		  	var state = $("#inputStateFb").val().trim();
		  	var isMoov = $("#isMoovFb").val().trim();
		  	var txtDes = $("#txtDesFb").val().trim();

		  	var fullAddress = address + "," + city + " " + state + "," + zipCode;

		  	initMap(fullAddress).then(function(curLocation){

		  		console.log(curLocation.lat);

		  		var userUID2 = auth.currentUser.uid;
		  		var curUser = auth.currentUser;

			     // create a new Node
				    database.ref('/Users/' + userUID2).update({

				        'full address': fullAddress,
				        'lat' : curLocation.lat,
				        'lng' : curLocation.lng,
				        'display name' : name,
				        'city' : city,
				        'zipCode' : zipCode,
				        'photoURL' : curUser.photoURL,
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

