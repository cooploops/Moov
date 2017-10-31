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
			var titleRow = $("<div> class='row align-items-start'>");
			titleRow.html("<h4 class=text-center>"+response.location.city+" 5 Day Forecast</h4>");
			$(".forecast").append(titleRow);
			var weatherRow = $("<div class='row'>");
			// data comes in array for each day so create array that pulls data for 5 days including today
			for(i=0;i<5;i++){
				var newCol = $("<div class='col dailyForecast text-center'>");
				newCol.html("<h4>"+forecast[i].date.weekday_short+"</h4><br><img src='"+forecast[i].icon_url+"'><br><p>Conditions: "+forecast[i].conditions+"<br><span id='highTemp'>"+forecast[i].high.fahrenheit+"</span> | <span id='lowTemp'>"+forecast[i].low.fahrenheit)+"</span>";
				weatherRow.append(newCol);
			}
			$(".forecast").append(weatherRow);
			$(".weather").css({"background-color":"rgba(255,255,255,0.69)","border":"10px solid rgb(116,155,122)","border-radius":"5px"});
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

	weatherData.zipcode = localStorage.getItem("addressZip");
	weatherData.city = localStorage.getItem("addressCity");
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
	} else if (weatherData.zipcode != "" && weatherData.city != ""){
		weatherData.location = weatherData.zipcode;
		weatherData.genWeather();
	}

	
