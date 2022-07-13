var express = require("express");
const { getUser, getUsers, active } = require("../src/user/controllers");
var router = express.Router();

router.get("/", getUsers).get("/currentUser", getUser);

router.get("/active", active);

module.exports = router;
