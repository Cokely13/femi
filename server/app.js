// const path = require("path");
// const express = require("express");
// const morgan = require("morgan");
// require("dotenv").config();
// const app = express();
// module.exports = app;

// // logging middleware
// app.use(morgan("dev"));

// // body parsing middleware
// app.use(express.json());

// // auth and api routes
// // app.use("/auth", require("./auth"));
// app.use("/api", require("./api"));

// app.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "..", "public/index.html"))
// );

// // static file-serving middleware
// app.use(express.static(path.join(__dirname, "..", "public")));

// app.use("/uploads", express.static("uploads"));

// // any remaining requests with an extension (.js, .css, etc.) send 404
// app.use((req, res, next) => {
//   if (path.extname(req.path).length) {
//     const err = new Error("Not found");
//     err.status = 404;
//     next(err);
//   } else {
//     next();
//   }
// });

// // sends index.html
// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public/index.html"));
// });

// // error handling endware
// app.use((err, req, res, next) => {
//   console.error(err);
//   console.error(err.stack);
//   res.status(err.status || 500).send(err.message || "Internal server error.");
// });

const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const app = express();
module.exports = app;

app.use(morgan("dev"));
app.use(express.json());

// app.use("/auth", require("./auth")); // leave this commented out for now
app.use("/api", require("./api"));

// Error middleware
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
