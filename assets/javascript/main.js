var database = firebase.database();

window.onload = function () {

	//this is the button for Modal
	$(document).on('click',"#logIn-btn", function(){
    	$("#signUpModal").modal("show");
	});


	$(".submit").on("click", function(e) {

		localStorage.removeItem("full_address","addressCity","addressZip");

		var searchAddress = $("#address").val().trim();

		var parsed = parseAddress.parseLocation(searchAddress);

		console.log(parsed);

		localStorage.setItem("full_address", searchAddress);
		localStorage.setItem("addressCity", parsed.city);
		localStorage.setItem("addressZip", parsed.zip);
        
	});

	$(document).on("click",'.contact', function(){
		console.log("hit");
		console.log($(this));
		console.log($(this)[0].parentNode.children[2].innerText);
		console.log($(this)[0].parentNode.children[4].innerText);
		var name = $(this)[0].parentNode.children[2].innerText;
		var email = $(this)[0].parentNode.children[4].innerText;
		$("#recipient-name").val(email);
		$("#emailModalLabel").text("New Message to " + name);
		$("#emailModal").modal("show");
		});
}





