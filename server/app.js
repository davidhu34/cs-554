const express = require("express");
const cors = require("cors");
const { configRoutes } = require("./routes");
const { applyMiddleware } = require("./middleware");

const app = express();
app.use(cors());
applyMiddleware(app);
configRoutes(app);

module.exports = app;

/*

return {data:data, length:data.length}

*/
