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

## Built With
+ HTML
+ CSS
+ Javascript
+ jQuery
+ [Bootstrap](https://getbootstrap.com/)
+ [Google Fonts](https://fonts.google.com/)
+ [Google Maps API](https://developers.google.com/maps/)
+ [Facebook API](https://developers.facebook.com/)
+ [Open Weather API](https://openweathermap.org/api)
+ [Firebase](https://firebase.google.com/)

### Authors
+ [Alex Edward Ball](https://github.com/AlexEBall)
+ [Farid Sobhani](https://github.com/farid64)
+ [Saba Zin](https://github.com/siboo)
+ [TJ Cooper](https://github.com/cooploops)
