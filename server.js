// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

// Data
var lunches = [
  {
    lunch: "Beet & Goat Cheese Salad with minestrone soup."
  },
  {
    lunch: "Pizza, two double veggie burgers, fries with a Big Gulp"
  }
];

// Routes
app.get("/signup", function(req, res) {
  res.render("index", lunches[0]);
});

app.get("/signin", function(req, res) {
  res.render("index", lunches[1]);
});

app.get("/index", function(req, res) {
  res.render("all-lunches", {
    foods: lunches,
    eater: "david"
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
