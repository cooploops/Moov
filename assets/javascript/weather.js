  // // Initialize Firebase
  // var config = {
  //   apiKey: "AIzaSyCsJJyoocEMnWy96UEDk4AJiLNWl3y64KI",
  //   authDomain: "moov-7f456.firebaseapp.com",
  //   databaseURL: "https://moov-7f456.firebaseio.com",
  //   projectId: "moov-7f456",
  //   storageBucket: "moov-7f456.appspot.com",
  //   messagingSenderId: "26403369152"
  // };
  // firebase.initializeApp(config);

// window.onload = function() {
	var weatherData ={
		location:"",
		zipcode:null,
		city:null,
	
		genWeather: function(){
			var queryURL = 'https://api.wunderground.com/api/424faf8d8148f1a3/forecast10day/geolookup/conditions/q/' + weatherData.location + '.json'
			$.ajax({
			url: queryURL,
			type: 'GET'
		})
		.done(function(response) {
			// reset row to blank so it doesn't keep adding new rows
			$(".forecast").html("");
			// logging response and URL to make sure it works
			console.log(response);
			// simplify going through the object but shortening chains
			var forecast = response.forecast.simpleforecast.forecastday;
			var current = response.current_observation;
			// create new row to hold weather information
			var titleRow = $("<div> class='row'>");
			titleRow.html("<h4 class=text-center>"+response.location.city+" 5 day forecast</h4><br>");
			$(".forecast").append(titleRow);
			var weatherRow = $("<div class='row'>");
			// data comes in array for each day so create array that pulls data for 5 days including today
			for(i=0;i<5;i++){
				var newCol = $("<div class='col dailyForecast text-center'>");
				newCol.html("<h4>"+forecast[i].date.weekday_short+"</h4><br><img src='"+forecast[i].icon_url+"'><br><p>Conditions: "+forecast[i].conditions+"<br>High: "+forecast[i].high.fahrenheit+"<br>Low: "+forecast[i].low.fahrenheit);
				weatherRow.append(newCol);
			}
			$(".forecast").append(weatherRow);

			console.log(response);
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			// always want to see queryURL because I need to see what it was if it was wrong
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
	
// }