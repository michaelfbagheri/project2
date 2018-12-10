$(document).ready(function () {
  var config = {
    apiKey: "AIzaSyCfxrNFR0IkXIzWEPrkJVR5UX0MGrqteL0",
    authDomain: "mikesproject-bd0c2.firebaseapp.com",
    databaseURL: "https://mikesproject-bd0c2.firebaseio.com",
    projectId: "mikesproject-bd0c2",
    storageBucket: "mikesproject-bd0c2.appspot.com",
    messagingSenderId: "911450662789"
  };
  //Firebase Authentication section
  firebase.initializeApp(config);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log(firebase.auth().currentUser.displayName)
      $('#current-username').text(firebase.auth().currentUser.displayName)
    } else {
      $('#current-username').text("please Login")
    }
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
            return;
          });
      });
  }

  let lat, lng;
  $("#host-button-enable").on("click", function () {
    const input = document.querySelector('#event-address');
    const autocomplete = new google.maps.places.Autocomplete(input);
    google.maps.event.addListener(autocomplete, 'place_changed', (e) => {
      const place = autocomplete.getPlace();
      lat = place.geometry.location.lat();
      lng = place.geometry.location.lng();
      //console.log('lat and lng', lat, lng)
    });
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


  //create an event
  $(".party-create").on("submit", function (event) {
    event.preventDefault();

    var uid = firebase.auth().currentUser && firebase.auth().currentUser.uid;
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
          .trim(),
        lat,
        lng
      };

      $.ajax({
        method: "POST",
        url: "/party/create",
        data: addEvent
      }).then(function (data) {
        console.log('first done', data);
        $.ajax({
          method: "POST",
          url: "/add-record",
          data: addEvent
        }).then(function (data) {
          console.log('second done', data);
          window.location.reload();
        });
        //location.reload();
      });
    } else {
      console.log("please sign up or login");
    }
  });


});
