var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var verify = require("./src/auth/controllers/verify");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var userRouter = require("./routes/users");

const mongooes = require("mongoose");
const dotenv = require("dotenv");

testApiRouter = require("./routes/testApi");

dotenv.config();

const uri = process.env.CONNECT_STRING;

mongooes
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect success");
  })
  .catch(err => {
    console.log("Some thing went wrong", err);
  });

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.all("*", verify);

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use("/testApi", testApiRouter);

// handle authentiaction per request

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
