var express = require("express");

var router = express.Router();

router
  .route("/")
  .all(function (req, res, next) {
    next();
  })
  .get(function (req, res, next) {
    res.send("API is you");
  });

module.exports = router;
