const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.CONNECT_STRING;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to db was successfully");
  })
  .catch(err => {
    console.log("Some thing went wrong", err);
  });
