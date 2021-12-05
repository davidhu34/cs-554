const { defaultErrorHandling } = require('../utils/errors');
const userRouter = require('./user');
const clothesRouter = require('./clothes');
const basketRouter = require('./basket');

const configRoutes = (app) =>
  app
    .use('/user', userRouter)
    .use('/clothes', clothesRouter)
    .use('/baskets', basketRouter)
    .use(defaultErrorHandling);

module.exports = {
  configRoutes,
};
