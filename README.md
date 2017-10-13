# Moov
Hate moving with a passion? Wish there was an easier, more friendly way to get your stuff from one place to another? So do we and that's why we created Moov. The app that let's you see who's near you and available to help out with Mooving.

## Live Link
[https://cooploops.github.io/Moov](https://cooploops.github.io/Moov)

## Requirements
- Must use at least two APIs
- Must use AJAX to pull data
- Must utilize at least one new library or technology that we haven’t discussed
- Must have a polished frontend / UI
- Must meet good quality coding standards (indentation, scoping, naming)
- Must NOT use alerts, confirms, or prompts (look into modals!)
- Must have some sort of repeating element (table, columns, etc)
- Must use Bootstrap or Alternative CSS Framework
- Must be Deployed (Github Pages)
- Must have User Input Validation
- Utilize Firebase for Persistent Data Storage (Consider this basically a requirement).
- Mobile Responsive

### Prerequisites
+ Download [Chrome](https://www.google.com/chrome/browser/desktop/index.html) for your specific operating system.

## Code Higlights

### Resolving a promise object with Google Maps API
In this app we were able to use [Google Maps API](https://developers.google.com/maps/) in conjunction with an arePlacesNear function found on [Stack Overflow](https://stackoverflow.com/) from user [Guffa](https://stackoverflow.com/users/69083/guffa). These two functions together were quite powerful and allowed us to place markers on a map comparing the user's address with addressess from people signed up in our database. Without the arePlacesNear funciton it would have been nearly impossible to place markers based on user addresses and not places that are found in [Google's Places Library](https://developers.google.com/maps/documentation/javascript/places)

```
function geocodeAddress(address) {
geocoder = new google.maps.Geocoder();
return new Promise(function(resolve, reject) {
geocoder.geocode({ 'address': address }, function(results, status) {
if (status == "OK") {
var currentLocation = {
address: results[0].formatted_address,
name: results[0].place_id,
lat: results[0].geometry.location.lat(),
lng: results[0].geometry.location.lng()
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

```

### Using a node package to parse address, store particular pieces in local storage, and send in an AJAX call on next page
In this app we used a new technology we hadn't used before, Node.js, to install a pre-built package that would allow us to easily parse a user's address [Parse Address Node Package] and grab the data we needed to perform an AJAX call to the [Weather Underground API]. We stored the data from the user's address into the client's local storage because it was small and we were only using it to grab the 5 day weather forecast for that zip code or city. This node package saved us many hours and headaches from creating a function ourselves to parse a user's address.

```
	$(".submit").on("click", function() {

		localStorage.clear();

		var searchAddress = $("#address").val().trim();

		var parsed = parseAddress.parseLocation(searchAddress);

		console.log(parsed);

		localStorage.setItem("full_address", searchAddress);
		localStorage.setItem("addressCity", parsed.city);
		localStorage.setItem("addressZip", parsed.zip);
        
	});

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

```

## Built With
+ HTML
+ CSS
+ Javascript
+ jQuery
+ Node.js
+ [Bootstrap](https://getbootstrap.com/)
+ [Google Fonts](https://fonts.google.com/)
+ [Google Maps API](https://developers.google.com/maps/)
+ [Facebook API](https://developers.facebook.com/)
+ [Open Weather API](https://openweathermap.org/api)
+ [Firebase](https://firebase.google.com/)
+ [Parse Address Node Package](https://www.npmjs.com/package/parse-address)
+ [Weather Underground API](https://www.wunderground.com/weather/api/)

### Authors
+ [Alex Edward Ball](https://github.com/AlexEBall)
+ [Farid Sobhani](https://github.com/farid64)
+ [Saba Zin](https://github.com/siboo)
+ [TJ Cooper](https://github.com/cooploops)
