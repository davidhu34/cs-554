const { getCollection } = require("./mongoConnection");

const USER_COLLECTION_NAME = "users";

module.exports = {
  users: () => getCollection(USER_COLLECTION_NAME),
};
