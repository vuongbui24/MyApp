const express = require("express");
const router = express.Router();
const register = require("../src/auth/controllers/register");
const login = require("../src/auth/controllers/login");
const checkAuthentication = require("../src/auth/controllers/checkAuthentication");
const refresh = require("../src/auth/controllers/refreshToken");

router
  .all("/", (_, __, next) => {
    next();
  })
  .get("/checkAuthentication", checkAuthentication)
  .post("/signUp", register)
  .post("/signIn", login)
  .post("/refreshToken", refresh);

module.exports = router;
