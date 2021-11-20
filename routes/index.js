const { defaultErrorHandling } = require("../utils/errors");
const userRouter = require("./user");

const configRoutes = (app) =>
  app
    .use("/user", userRouter)
    .use(defaultErrorHandling);

module.exports = {
  configRoutes,
};
