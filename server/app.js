const express = require("express");
const cors = require("cors");
const { configRoutes } = require("./routes");
const { applyMiddleware } = require("./middleware");

const app = express();
app.use(cors());
applyMiddleware(app);
configRoutes(app);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

module.exports = app;

/*

return {data:data, length:data.length}

*/
