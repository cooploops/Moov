window.onload = function () {

	$("#submit").on("click", function() {

		localStorage.clear();

		console.log("hit");

		var searchAddress = $("#address").val().trim();

		var parsed = parseAddress.parseLocation(searchAddress);

		console.log(parsed);

		localStorage.setItem("full_address", searchAddress);
		localStorage.setItem("addressCity", parsed.city);
		localStorage.setItem("addressZip", parsed.zip);
        
	});

}


//this is the button for Modal
$("#logIn-btn").on('click' , function(){
    $("#signUpModal").modal("show");
});
