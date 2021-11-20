const express = require("express");
const { configRoutes } = require("./routes");
const app = express();

app.use(express.json());

configRoutes(app);

module.exports = app;
