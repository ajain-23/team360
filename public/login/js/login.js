var firstnames = {
  "hidden":"for privacy's sake"
};
var testinput;
function getstudent(){
  window.testinput = document.getElementById("testinput").value.toString();
  console.log(testinput)
  return firebase.database().ref('/admin/' + testinput).once('value').then(function(snapshot) {
  var get_password = snapshot.val().Value;
  console.log(get_password);
  return firebase.database().ref('/users/' + get_password).once('value').then(function(snapshot) {
    document.getElementById('studentforadmin').style.display = "block";
    document.getElementById('admindashboard').style.display = "none";

    var radar = snapshot.val().Radar;
    document.getElementById("radar").innerHTML = "<img src='" + radar + "' style='position:relative;top:22%;width:557.25px;height:402.50px;'/></img>";

    var adj = snapshot.val().Adjective.toString().split(';');
    var adj_string = ""
    for (var i = 0; i < adj.length; i++) {
       adj_string += adj[i] + "<br><br>"
     }

     var feedback = snapshot.val().Feedback.toString().split(';');
     var fb_string = ""
     for (var i = 0; i < feedback.length; i++) {
	       fb_string += feedback[i] + "<br><br>"
      }

      var impr = snapshot.val().Improvement.toString().split(';');
      var im_string = ""
      for (var i = 0; i < impr.length; i++) {
	       im_string += impr[i] + "<br><br>"
       }

      var strength = snapshot.val().Strength.toString().split(';');
      var strn_string = ""
      for (var i = 0; i < strength.length; i++) {
 	      strn_string += strength[i] + "<br><br>"
      }
      console.log(adj_string, fb_string, im_string, strn_string, testinput)
      document.getElementById('dbname1').innerHTML = testinput
      document.getElementById("ir1").innerHTML = snapshot.val().InsightRating;
      document.getElementById("adj1").innerHTML = adj_string;
      document.getElementById("fdbk1").innerHTML = fb_string;
      document.getElementById("impmt1").innerHTML = im_string;
      document.getElementById("strn1").innerHTML = strn_string;
    });
  });
};

function returnadmin() {
  document.getElementById('studentforadmin').style.display = "none";
  document.getElementById('admindashboard').style.display = "block";

}

function dashboard() {

  var user = firebase.auth().currentUser;

  return firebase.database().ref('/users/' + user.uid).once('value').then(function(snapshot) {
    console.log(user);
    if (user.email === "admin@admin.edu" || user.email === "gwynevere.hunger@berkeley.edu" || user.email === "s.t@berkeley.edu") {
      document.getElementById('student').innerHTML = "";
      document.getElementById('admin').removeAttribute("hidden");
      document.getElementById("dbname").innerHTML = firstnames[user.email.toString()];

    }
    else {
      document.getElementById('admin').innerHTML = "";
      document.getElementById("dbname").innerHTML = firstnames[user.email.toString()];
      document.getElementById("student").removeAttribute("hidden");

      var radar = snapshot.val().Radar;
      document.getElementById("radar").innerHTML = "<img src='" + radar + "' style='position:relative;top:22%;width:557.25px;height:402.50px;'/></img>";

      var adj = snapshot.val().Adjective.toString().split(';');
      var adj_string = ""
      for (var i = 0; i < adj.length; i++) {
	       adj_string += adj[i] + "<br><br>"
       }

       var feedback = snapshot.val().Feedback.toString().split(';');
       var fb_string = ""
       for (var i = 0; i < feedback.length; i++) {
 	       fb_string += feedback[i] + "<br><br>"
        }

        var impr = snapshot.val().Improvement.toString().split(';');
        var im_string = ""
        for (var i = 0; i < impr.length; i++) {
  	       im_string += impr[i] + "<br><br>"
         }

        var strength = snapshot.val().Strength.toString().split(';');
        var strn_string = ""
        for (var i = 0; i < strength.length; i++) {
   	      strn_string += strength[i] + "<br><br>"
        }

      document.getElementById("ir").innerHTML = snapshot.val().InsightRating;
      document.getElementById("adj").innerHTML = adj_string;
      document.getElementById("fdbk").innerHTML = fb_string;
      document.getElementById("impmt").innerHTML = im_string;
      document.getElementById("strn").innerHTML = strn_string;
    }
});
}

firebase.auth().signOut().then(function() {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

function signin(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  //await sleep(2000);
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    window.location.href="Iogin.html";

    // ...
  });
  document.getElementById("login").innerHTML = "";
  setTimeout(dashboard, 1800);

}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      console.log(user.uid);
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
var teamid = document.getElementById("teamview");
var teamid1 = document.getElementById("teamview1");
var teamid2 = document.getElementById("teamview2");
var teamid3 = document.getElementById("teamview3");

function myteams() {
    if (teamid.style.display === "none") {
        teamid.style.display = "block";
        teamid1.style.display = "block";
        teamid2.style.display = "block";
        teamid3.style.display = "block";
    } else {
        teamid.style.display = "none";
        teamid1.style.display = "none";
        teamid2.style.display = "none";
        teamid3.style.display = "none";
    }
}

var a = document.getElementById("adj");
var b = document.getElementById("strn");
var c = document.getElementById("impmt");
var d = document.getElementById("fdbk");
var e = document.getElementById("ir");

function adj() {
    if (a.style.display === "none") {
        a.style.display = "block";
        b.style.display = "none";
        c.style.display = "none";
        d.style.display = "none";
        e.style.display = "none";
    } else {
        a.style.display = "none";
    }
}

function strn() {

    if (b.style.display === "none") {
        a.style.display = "none";
        b.style.display = "block";
        c.style.display = "none";
        d.style.display = "none";
        e.style.display = "none";
    } else {
        b.style.display = "none";
    }
}

function improve() {
    if (c.style.display === "none") {
        a.style.display = "none";
        b.style.display = "none";
        c.style.display = "block";
        d.style.display = "none";
        e.style.display = "none";
    } else {
        c.style.display = "none";
    }
}

function generalfb() {
    if (d.style.display === "none") {
        a.style.display = "none";
        b.style.display = "none";
        c.style.display = "none";
        d.style.display = "block";
        e.style.display = "block";
    } else {
        d.style.display = "none";
        e.style.display = "none";
    }
}


var a1 = document.getElementById("adj1");
var b1 = document.getElementById("strn1");
var c1 = document.getElementById("impmt1");
var d1 = document.getElementById("fdbk1");
var e1 = document.getElementById("ir1");

function adj1() {
    if (a1.style.display === "none") {
        a1.style.display = "block";
        b1.style.display = "none";
        c1.style.display = "none";
        d1.style.display = "none";
        e1.style.display = "none";
    } else {
        a1.style.display = "none";
    }
}

function strn1() {

    if (b1.style.display === "none") {
        a1.style.display = "none";
        b1.style.display = "block";
        c1.style.display = "none";
        d1.style.display = "none";
        e1.style.display = "none";
    } else {
        b1.style.display = "none";
    }
}

function improve1() {
    if (c1.style.display === "none") {
        a1.style.display = "none";
        b1.style.display = "none";
        c1.style.display = "block";
        d1.style.display = "none";
        e1.style.display = "none";
    } else {
        c1.style.display = "none";
    }
}

function generalfb1() {
    if (d1.style.display === "none") {
        a1.style.display = "none";
        b1.style.display = "none";
        c1.style.display = "none";
        d1.style.display = "block";
        e1.style.display = "block";
    } else {
        d1.style.display = "none";
        e1.style.display = "none";
    }
}

$(function() {
    $("form input").keypress(function (e) {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            $('button[type=submit] .default').click();
            return false;
        } else {
            return true;
        }
    });
});
