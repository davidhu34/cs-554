const express = require('express');

const { configRoutes } = require('./routes');
const { applyMiddleware } = require('./middleware');

const app = express();

applyMiddleware(app);
configRoutes(app);

module.exports = app;
