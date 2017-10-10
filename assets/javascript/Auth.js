// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCsJJyoocEMnWy96UEDk4AJiLNWl3y64KI",
    authDomain: "moov-7f456.firebaseapp.com",
    databaseURL: "https://moov-7f456.firebaseio.com",
    projectId: "moov-7f456",
    storageBucket: "moov-7f456.appspot.com",
    messagingSenderId: "26403369152"
  };

  firebase.initializeApp(config);

 var database = firebase.database();

 var txtEmail2 = $("#txtEmail2");
 var txtPassword2 = $("#txtPassword2");

// function signUp(){

	$("#btnSignUp").on('click', function() {
	    // console.log("hello");
	    var email = txtEmail2.val().trim();
	    var pass = txtPassword2.val().trim();
	    var auth = firebase.auth();

	    var email2 = email;

	    // sing up
	   auth.createUserWithEmailAndPassword(email, pass).then(function(user){

	     // create a new Node
		    database.ref('/Users/' + user.uid).set({

		        'email': email2,
		        'full address': "",
		        'lat' : 23,
		        'lng' : 23,
		        'display name' : "",
		        'city' : "",
		        'zipCode' : '',
		        'photoURL' : '',
		        'Moover' : false , //this bolean is for determining whether the user is a mover or not
		        'chat' : [1,2,3],
		        'Full name' : 'everything',
		    })

	   }).catch(function(error) {
	      console.log(error.code);
	      console.log(error.message);
	   });

	   $("#signUpModal").modal("hide");
	   
	});

// };

// function logIn(){

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

	firebase.auth().onAuthStateChanged(function(firebaseUser) {

	    if (firebaseUser) {
	        $("#logOut-btn").css("display" , "block");
	        $("#logIn-btn").css("display" , "none");
	    } else {
	        console.log('not logged in');
	        $("#logOut-btn").css("display" , "none");
	        $("#logIn-btn").css("display" , "block");
	    }

	    database.ref('/Users/' + firebaseUser.uid).once("value").then( function(snapShot){

	    	console.log(snapShot.val());

	    	if(!snapShot.val()){

	    		database.ref('/Users/' + firebaseUser.uid).set({
			        'email': firebaseUser.email,
			        'full address': "",
			        'display name' : "",
			        'city' : "",
			        'zipCode' : '',
			        'photoURL' : '',
			        'Moover' : false //this bolean is for determining whether the user is a mover or not
		  		});

	    	}
	    })
	});

	$("#facebookBtn").on('click' , function(){

		facebookSignIn();

		$("#signUpModal").modal("hide");

	})

// }


// function logOut(){

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

    firebase.auth().signInWithRedirect(provider);

    firebase.auth().getRedirectResult().then( function(result) {

        if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // ...
            //, {access_token : token}
            FB.api("/me/friends", function(response) {
                        console.log(response);
            });
        }
        // The signed-in user info.
        var userFB = result.user;
        console.log(userFB.uid);


    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
        console.log(errorCode);
        console.log(errorMessage);
        console.log(email);
        console.log(credential);
    });
}

//This is repeatetive since signout works for both email/password signup and facebook sign up.

// function facebookSignout() {
//    firebase.auth().signOut()
   
//    .then(function() {
//       console.log('Signout successful!')
//    }, function(error) {
//       console.log('Signout failed')
//    });
// }