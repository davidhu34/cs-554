const { getCollection } = require("./mongoConnection");

const USER_COLLECTION_NAME = "users";
const GROUP_COLLECTION_NAME = "groups";

module.exports = {
  users: () => getCollection(USER_COLLECTION_NAME),
  groups: () => getCollection(GROUP_COLLECTION_NAME)
};
