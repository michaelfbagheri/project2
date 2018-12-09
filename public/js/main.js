$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyCfxrNFR0IkXIzWEPrkJVR5UX0MGrqteL0",
    authDomain: "mikesproject-bd0c2.firebaseapp.com",
    databaseURL: "https://mikesproject-bd0c2.firebaseio.com",
    projectId: "mikesproject-bd0c2",
    storageBucket: "mikesproject-bd0c2.appspot.com",
    messagingSenderId: "911450662789"
  };
  firebase.initializeApp(config);

  var currentUserLoggedIn = " ";

  function updateDom() {

    $('#current-username').text(firebase.auth().currentUser.displayName)
  }


  $("#host-button-enable").on("click", function () {
    var uid = firebase.auth().currentUser;
    if (uid == null) {
      $("#host-button-enable").prop("disabled", true);
      $("#host-button-enable").text("sign in Please!");

    };
  });


  $(".user-create").on("submit", function (event) {
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

    createAccount(email, password, userName).then(function (uid) {
      // newUser.Authentication = uid;
      // $('#current-username').text(uid);
      console.log("new user being added with name: " + newUser.name + " " + newUser.Authentication);
      $.ajax({
        method: "POST",
        url: "/user/create",
        data: newUser
      }).then(function (data) {
        console.log(data);
        location.reload();
      });
    });
  });

  function createAccount(email, password, userName) {
    firebase.auth().signOut();
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function () {
        return firebase
          .auth()
          .currentUser.updateProfile({ displayName: userName })
          .then(function () {
            var name = firebase.auth().currentUser.displayName;
            var uid = firebase.auth().currentUser.uid;
            console.log("new user was created with name:" + name + " and " + uid + " as Id.");
            console.log("new user was created with name:" + name + " and " + uid + " as Id.");
            return uid;
          });
      });
  }

  //create an event
  $(".party-create").on("submit", function (event) {
    event.preventDefault();

    var uid = firebase.auth().currentUser.uid;
    if (uid) {
      var addEvent = {
        eventHostAuthenticationId: firebase.auth().currentUser.uid,
        eventName: $("#event-name")
          .val()
          .trim(),
        eventAddress: $("#event-address")
          .val()
          .trim(),
        eventDate: $("#event-date")
          .val()
          .trim(),
        eventTime: $("#event-time")
          .val()
          .trim(),
        eventDiscription: $('#event-description')
          .val()
          .trim(),
        eventZipCode: $('#event-zip')
          .val()
          .trim()
      };

      $.ajax({
        method: "POST",
        url: "/party/create",
        data: addEvent
      }).then(function (data) {
        console.log(data);
        location.reload();
      });
    } else {
      console.log("please sign up or login");
    }
  });

  updateDom();
});
