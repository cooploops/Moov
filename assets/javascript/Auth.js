// Initialize Firebase

 var database = firebase.database();


	$("#btnSignUp").on('click', function() {

	   $("#signUpModal").modal("hide");

	   location.href = "SignUp.html";
	   
	});



	var txtEmail1 = $("#txtEmail1");
 	var txtPassword1 = $("#txtPassword1");

	$("#btnLogin").on('click', function() {


	    var email = txtEmail1.val();
	    var pass = txtPassword1.val();
	    var auth = firebase.auth();
	    // sing in
	    auth.signInWithEmailAndPassword(email, pass)

	    .then( function(user){
	    	console.log(database.ref('/Users/' + user.uid));
	    }).catch(function(error) {
		      console.log(error.code);
		      console.log(error.message);
   		});

	    $("#signUpModal").modal("hide");
	});

	firebase.auth().onAuthStateChanged( function(firebaseUser) {

		console.log(firebaseUser);

	    if (firebaseUser) {
	        $("#logOut-btn").css("display" , "block");
	        $("#profile").css("display","block");
	        $("#logIn-btn").css("display" , "none");

	     //    console.log(firebaseUser.uid);
	    	// console.log(firebaseUser.photoURL);
	    	// console.log(firebaseUser.)


	        database.ref('/Users/' + firebaseUser.uid).once("value").then( function(snapShot){

	    	console.log(snapShot.val());

		    	if(!snapShot.val()){

			    	database.ref('/Users/' + firebaseUser.uid).set({
					       'email': firebaseUser.email,
					       'full address': "",
					       'display name' : firebaseUser.displayName,
					       'city' : "",
					       'zipCode' : '',
					       'photoURL' : firebaseUser.photoURL,
					       'Moover' : 'on' //this bolean is for determining whether the user is a mover or not
				  	});

				  	window.location.href = "SignUpFacebook.html";

		    	}
	    	})


	    } else {
	        console.log('not logged in');
	        $("#logOut-btn").css("display" , "none");
	        $("#profile").css("display","none");
	        $("#logIn-btn").css("display" , "block");
	    }

	    
	});

	$("#facebookBtn").on('click' , function(){

		$("#signUpModal").modal("hide");

		facebookSignIn();

		

	})

	$("#logOut-btn").on('click', function() {
	    firebase.auth().signOut();
	    // $("#content").empty();
	})
// }

//this is Facebook SDK

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '311962162613192',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.10'
    });
    FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));


	// FB.getLoginStatus(function(response) {
	//     statusChangeCallback(response);
	// });

function facebookSignIn(){

	var provider = new firebase.auth.FacebookAuthProvider();

    provider.addScope('user_friends');

    firebase.auth().signInWithPopup(provider).then( function(result) {

    	 console.log(result.credential);

        if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // ...
            //, {access_token : token}
            FB.api("/me/friends", {access_token : token}, function(response) {
                        console.log(response);
            });
        }
        // The signed-in user info.
        var userFB = result.user;

        console.log(userFB);

        console.log(userFB.uid);


    }).catch(function(error) {
        // Handle Errors here.
        // ...
        console.log(error.code);
        console.log(error.message);
        console.log(error.email);
        console.log(error.credential);
    });
}

