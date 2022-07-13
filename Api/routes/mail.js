const express = require("express");
const router = express.Router();
const send = require("../src/mail/send");

router.post("/send", send);
