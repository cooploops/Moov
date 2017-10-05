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

 var txtEmail = $("#txtEmail");
 var txtPassword = $("#txtPassword");

function signUp(){

	$("#btnSignUp").on('click', function() {
	    // console.log("hello");
	    var email = txtEmail.val();
	    var pass = txtPassword.val();
	    var auth = firebase.auth();

	    var email2 = email2;

	    // sing up
	   auth.createUserWithEmailAndPassword(email, pass).then(function(user){

	     // create a new Node
	    database.ref('/Users/' + user.uid).set({
	        'email': email2,
	        'full address': "",
	        'display name' : "",
	        'city' : "",
	        'zipCode' : '',
	        'photoURL' : '',
	    })

	   });
	   
	});

};

function logIn(){

	$("#btnLogin").on('click', function() {

	    var email = txtEmail.val();
	    var pass = txtPassword.val();
	    var auth = firebase.auth();
	    // sing in
	    auth.signInWithEmailAndPassword(email, pass);
	});

	firebase.auth().onAuthStateChanged(function(firebaseUser) {

	    if (firebaseUser) {
	        $("#btnLogout").removeClass("hide");
	        $("#btnLogout").addClass("show");
	    } else {
	        console.log('not logged in');
	        $("#btnLogout").removeClass("show");
	        $("#btnLogout").addClass("hide");
	    }
	});

}


function logOut(){
	$("#btnLogout").on('click', function() {
	    firebase.auth().signOut();
	    $("#content").empty();
	})
}