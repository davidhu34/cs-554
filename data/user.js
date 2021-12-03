const { users: getUserCollection } = require('../config/mongoCollections');
let { ObjectId } = require('mongodb');

const { QueryError, ValidationError } = require('../utils/errors');
const { parseMongoData } = require('../utils/mongodb');

const {
  assertIsValuedString,
  assertRequiredObject,
  assertEmailString,
} = require('../utils/assertion');

const getByObjectId = async (objectId) => {
  const collection = await getUserCollection();
  const user = await collection.findOne({ _id: objectId });
  return parseMongoData(user);
};

const getAllUsers = async () => {
  const collection = await getUserCollection();

  let userList = {};
  userList = await collection.find({}).toArray();

  return parseMongoData(userList);
};

const getUser = async (id) => {
  assertIsValuedString(id);
  return await getByObjectId(id);
};

const getUsersByGroup = async (groupId) => {
  assertIsValuedString(groupId, 'Group ID');

  const collection = await getUserCollection();
  const user = await collection.find({ groupId }).toArray();
  return parseMongoData(user);
};

const createUser = async (data) => {
  assertRequiredObject(data);

  let { uid, displayName, email, createdAt = new Date().getTime() } = data;

  assertIsValuedString(uid, 'User ID');
  assertIsValuedString(displayName, 'Display name');
  assertEmailString(email, 'Email Address');

  const userData = {
    uid: uid,
    name: displayName,
    email: email,
    createdAt: createdAt,
    groupId: '1234',
  };

  const collection = await getUserCollection();
  const { result, insertedCount, insertedId } = await collection.insertOne(userData);

  if (!result.ok || insertedCount !== 1) {
    throw new QueryError(`Could not create user`);
  }

  return await getByObjectId(insertedId);
};

module.exports = {
  createUser,
  getUser,
  getAllUsers,
  getUsersByGroup,
};
