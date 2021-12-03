const { defaultErrorHandling } = require('../utils/errors');
const userRouter = require('./user');
const clothesRouter = require('./clothes');

const configRoutes = (app) =>
  app.use('/user', userRouter).use('/clothes', clothesRouter).use(defaultErrorHandling);

module.exports = {
  configRoutes,
};
