module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("intro", { title: "Wi_Party | Home" });
  });
  app.get("/partytime", function(req, res) {
    res.render("index", { title: "Wi_Party | PartyTime" });
  });
};
