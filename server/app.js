const express = require('express');

const { configRoutes } = require('./routes');
const { applyMiddleware } = require('./middleware');

const app = express();

applyMiddleware(app);
configRoutes(app);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

module.exports = app;
