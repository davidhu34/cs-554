const { getCollection } = require('./mongoConnection');

const USER_COLLECTION_NAME = 'users';
const CLOTH_COLLECTION_NAME = 'clothes';

module.exports = {
  users: () => getCollection(USER_COLLECTION_NAME),
  clothes: () => getCollection(CLOTH_COLLECTION_NAME),
};
