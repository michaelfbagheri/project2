$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyCfxrNFR0IkXIzWEPrkJVR5UX0MGrqteL0",
    authDomain: "mikesproject-bd0c2.firebaseapp.com",
    databaseURL: "https://mikesproject-bd0c2.firebaseio.com",
    projectId: "mikesproject-bd0c2",
    storageBucket: "mikesproject-bd0c2.appspot.com",
    messagingSenderId: "911450662789"
  };
  firebase.initializeApp(config);

  console.log("inside js");

  $(".user-create").on("submit", function(event) {
    event.preventDefault();
    var userName = $(this)
      .children(".name")
      .val();
    var email = $(this)
      .children(".email")
      .val();
    var password = $(this)
      .children(".password")
      .val();

    var newUser = {
      name: userName,
      email: email,
      Authentication: "XXXXXXXXXXXXX"
    };

    createAccount(email, password, userName).then(function(uid) {
      newUser.Authentication = uid;

      console.log("new user being added with name: " + newUser.name + " " + newUser.Authentication);
      $.ajax({
        method: "POST",
        url: "/user/create",
        data: newUser
      }).then(function(data) {
        console.log(data);
        location.reload();
      });
    });
  });

  function createAccount(email, password, userName) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function() {
        return firebase
          .auth()
          .currentUser.updateProfile({ displayName: userName })
          .then(function() {
            var name = firebase.auth().currentUser.displayName;
            var uid = firebase.auth().currentUser.uid;
            console.log("new user was created with name:" + name + " and " + uid + " as Id.");
            return uid;
          });
      });
  }
});
