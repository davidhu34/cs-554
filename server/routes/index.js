const { defaultErrorHandling } = require('../utils/errors');
const userRouter = require('./user');
const clothesRouter = require('./clothes');
const basketRouter = require('./basket');
const groupRouter = require('./group');
// const messagingRouter = require('./messaging');

const configRoutes = (app) =>
  app
    .use('/user', userRouter)
    .use('/clothes', clothesRouter)
    .use('/baskets', basketRouter)
    .use('/group', groupRouter)
    // .use('/messaging', messagingRouter)
    .use(defaultErrorHandling);

module.exports = {
  configRoutes,
};
