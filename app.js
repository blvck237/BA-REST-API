const express = require("express");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const products = require("./routes/products");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json" }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", products);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  
  console.log("Log: err", err);
  // render the error page
  return res.status(err.status || 500).json({
    error: err.status === 500 ? `Internal Server Error: ${err}` : `${err}`
  });
});

module.exports = app;
