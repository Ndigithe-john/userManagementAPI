const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const userRoutes = require("./api/routes/routes");
app.use("/user", userRoutes); //Sets up a middle ware whre incoming requests have to go throuth i
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header(`Access-Control-Allow-Origin`, "*");
  res.header(
    "Acess-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST,PUT,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});
module.exports = app;
