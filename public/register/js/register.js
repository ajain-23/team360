
function register(){
  var email = document.getElementById("email_input").value;
  var password = document.getElementById("password_input").value;
  console.log(email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("Account already exists!")
    // ...
  });
  var currentUser = firebase.auth().currentUser;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        window.location.href="../login/newlogin.html"
      // User is signed in.
    } else {
      // No user is signed in.
    }
  });

}
