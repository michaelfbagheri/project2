var db = require("../models");
module.exports = function(app) {
  app.get("/", function(req, res) {
    db.Party.findAll({}).then(function(dbParty) {
      var hbsObject = {
        party: dbParty
      };
      // console.log("inside the /api/partylocation get statement .then " + dbParty);
      res.render("intro", hbsObject);
    });
  });


  app.get("/", function (req, res) {
    db.Party.findAll({}).then(function(dbParty) {
      var hbsObject = {
        party: dbParty
      };
      // console.log("inside the /api/partylocation get statement .then " + dbParty);
      res.render("intro", hbsObject);
    });
  });



  app.post("/party/create", function (req, res) {
    // console.log("the object you sent to /party/create is " + req.body.event_name);
    db.Party.create({
      eventName: req.body.event_name,
      eventAddress: req.body.event_address,
      eventDate: req.body.event_date,
      eventTime: req.body.event_time
    }).then(function(dbParty) {
      // console.log(dbParty);
      res.redirect("/");
    });
  });

  app.post("/user/create", function(req, res) {
    console.log("object you've sent to /user/create is " + req.body.Authentication);
    db.User.create({
      name: req.body.name,
      email: req.body.email,
      Authentication: req.body.Authentication
    }).then(function(dbUser) {
      console.log(dbUser);
      res.redirect("/");
    });
  });
};
