window.onload = function() {
	var weatherData ={
		location:"",
		zipcode:null,
		city:null,
	
		genWeather: function(){
			var queryURL = 'https://api.wunderground.com/api/424faf8d8148f1a3/forecast/geolookup/conditions/q/' + weatherData.location + '.json'
			$.ajax({
			url: queryURL,
			type: 'GET'
		})
		.done(function(response) {
			console.log(response);
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log(queryURL);
			console.log("complete");
		});
		}
	}

	$("#getWeather").on("click", function(event){
	event.preventDefault();
	weatherData.zipcode = $("#zipCode").val().trim();
	weatherData.city = $("#city").val().trim();
	console.log(weatherData.city);
	console.log(weatherData.zipcode);
	if(weatherData.zipcode === "" && weatherData.city === ""){
		console.log("zip code or city was not provided");
	} else if(weatherData.zipcode != "" && weatherData.city === ""){
		weatherData.location = weatherData.zipcode;
		weatherData.genWeather();
	} else if(weatherData.city != "" && weatherData.zipcode === ""){
		weatherData.location = "CA/" + weatherData.city;
		weatherData.genWeather();
	}
	})
	
}



