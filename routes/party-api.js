var db = require("../models");
const fs = require('fs');
const asyncLib = require('async');
const jsonData = require('../mapdata');

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

  app.get("/", function(req, res) {
    db.Party.findAll({}).then(function(dbParty) {
      var hbsObject = {
        party: dbParty
      };
      // console.log("inside the /api/partylocation get statement .then " + dbParty);
      res.render("intro", hbsObject);
    });
  });

  app.post("/party/create", function(req, res) {


          db.Party.create({
            eventName: req.body.eventName,
            eventAddress: req.body.eventAddress,
            eventDate: req.body.eventDate,
            eventTime: req.body.eventTime,
            eventHostAuthenticationId: req.body.eventHostAuthenticationId,
            eventZip: req.body.eventZipCode,
            eventDescription: req.body.eventDiscription
          }).then(function(dbParty) {
            res.send(dbParty);
          }).catch(err => res.send(err));
  //

        //res.redirect("/");
      //});
      // console.log(dbParty);
      //.redirect("/");

  });

  app.post('/add-record', (req, res) => {
    console.log('yoyoyoy', req.body);

      jsonData.push({
        title: req.body.eventName,
        zip: req.body.eventZipCode,
        lat: req.body.lat,
        lng: req.body.lng
      });

    fs.writeFile("mapdata.json", JSON.stringify(jsonData, null, 2), err => {
      res.send({msg: 'file updated'})
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

  app.get("/read-json", (req, res) => {
    res.send(jsonData);
  });
};
