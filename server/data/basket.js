const { ObjectId } = require('mongodb');
const { baskets: getBasketsCollection } = require('../config/mongoCollections');

const { QueryError } = require('../utils/errors');
const { idQuery, parseMongoData } = require('../utils/mongodb');
const {
  assertObjectIdString,
  assertIsValuedString,
  assertRequiredObject,
  assertRequiredNumber,
} = require('../utils/assertion');

const usersData = require('./user');
const { getGroup } = require('./group');

const getByObjectId = async (objectId) => {
  const collection = await getBasketsCollection();
  let cloth = await collection.findOne(idQuery(objectId));
  return parseMongoData(cloth);
};

const addBasket = async (data) => {
  assertRequiredObject(data);
  const { name, size, userId, groupId, users, clothes, status, time } = data;
  const createdAt = new Date().getTime();

  assertObjectIdString(userId, 'Basket added by user ID');
  assertIsValuedString(name, 'Basket name');
  assertRequiredNumber(size, 'Basket size');
  assertIsValuedString(groupId, 'Group Id');
  if (typeof status != 'boolean') {
    throw new HttpError(`Status must be boolean`, 404);
  }
  assertRequiredNumber(time, 'Time');

  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }

  const group = await getGroup(groupId);
  if (!group) {
    throw new QueryError(`Group not exist for group id (${userId})`);
  }

  data.basketId = new ObjectId().toHexString();

  const collection = await getBasketsCollection();

  const basketData = {
    _id: new ObjectId(data.basketId),
    //groupId: new ObjectId(groupId),
    name,
    size,
    users,
    clothes,
    status,
    time,
    createdAt,
    updatedAt: createdAt,
    createdBy: new ObjectId(userId),
    updatedBy: new ObjectId(userId),
  };
  const { result, insertedCount, insertedId } = await collection.insertOne(basketData);
  if (!result.ok || insertedCount !== 1) {
    throw new QueryError(`Could not add basket for user ID(${userId})`);
  }

  let basket = await getByObjectId(insertedId);
  return basket;
};

const getBasket = async (userId, id) => {
  assertObjectIdString(id, 'Basket Id');
  assertObjectIdString(userId, 'User Id');
  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }
  let basket = await getByObjectId(id);
  if (basket == null) {
    throw new QueryError(`Could not get basket for (${id})`);
  }
  return basket;
};

const getBasketByGroupId = async (userId, groupId) => {
  assertObjectIdString(groupId, 'Group Id');
  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }

  const group = await getGroup(groupId);
  if (!group) {
    throw new QueryError(`Group not exist for group id (${groupId})`);
  }

  const collection = await getBasketsCollection();
  let basket = [];
  basket = await collection.find({ groupId: new ObjectId(groupId) }).toArray();

  if (basket == null) {
    throw new QueryError(`Could not get basket for (${groupId})`);
  }
  return basket;
};

const deleteBasket = async (userId, id) => {
  assertObjectIdString(id, 'Cloth id');
  assertObjectIdString(userId, 'User Id');
  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }
  let basket = await getByObjectId(id);
  if (basket == null) {
    throw new QueryError(`Could not get basket for (${id})`);
  }

  let deleteBasket = await getBasket(id);

  if (deleteBasket == null) {
    throw `Basket not found for basket ID(${id})`;
  }

  const collection = await getBasketsCollection();
  let { deletedCount } = await collection.deleteOne({ _id: new ObjectId(id) });

  if (deletedCount === 0) {
    throw new QueryError(`Could not delete basket for (${id})`);
  }
  deleteBasket.message = 'Successfully deleted';
  return deleteBasket;
};

const deleteBasketByGroupId = async (userId, groupId) => {
  assertObjectIdString(id, 'Basket Id');
  assertObjectIdString(userId, 'User Id');
  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }
  const group = await getGroup(groupId);
  if (!group) {
    throw new QueryError(`Group not exist for group id (${userId})`);
  }
  const allBaskets = await getBasketByGroupId(groupId);

  const collection = await getBasketsCollection();
  const { deletedCount } = await collection.deleteMany({ groupId: new ObjectId(groupId) });
  if (deletedCount === 0) {
    throw new QueryError(`Could not delete all clothes for (${groupId})`);
  }
  allBaskets.message = 'Successfully deleted all clothes.';
  return parseMongoData(allBaskets);
};

module.exports = {
  addBasket,
  getBasket,
  getBasketByGroupId,
  deleteBasket,
  deleteBasketByGroupId,
};
