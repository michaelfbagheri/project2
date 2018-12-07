
module.exports = function (app) {
  //   app.get("/", function(req, res) {
  //     res.render("intro");
  //   });

  app.get("/partytime", function(req, res) {
    res.render("index");
  });
};
