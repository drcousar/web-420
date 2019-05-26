/**
 * ===========================
 * Title: api-gateway-app
 * Name: app.js
 * Author: Donald Cousar
 * Date: 5/26/2019
 * ===========================
 */

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const apiCatalog = require("./routes/api-catalog");

const app = express();

// use mongoose
mongoose.Promise = require("bluebird");
// Connect to atlas instance
// Set up connection string and connect
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0-qr21r.mongodb.net/api-gateway?retryWrites=true",
    {
      promiseLibrary: require("bluebird")
    }
  )
  .then(() => console.log("Connected to api-gateway db"))
  .catch(err => console.error(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiCatalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
