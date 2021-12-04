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

const { getUser } = require('./user');

const getByObjectId = async (objectId) => {
  const collection = await getBasketsCollection();
  let cloth = await collection.findOne(idQuery(objectId));
  return parseMongoData(cloth);
};

const addBasket = async (data) => {
  assertRequiredObject(data);
  const { name, size, userId, groupId, users, clothes } = data;
  const createdAt = new Date().getTime();

  assertObjectIdString(userId, 'Basket added by user ID');
  assertIsValuedString(name, 'Basket name');
  assertRequiredNumber(size, 'Basket size');
  assertIsValuedString(groupId, 'Group Id');

  data.basketId = new ObjectId().toHexString();

  const collection = await getBasketsCollection();

  const basketData = {
    _id: new ObjectId(data.basketId),
    //groupId: new ObjectId(groupId),
    name,
    size,
    users,
    clothes,
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

const getBasket = async (id) => {
  assertObjectIdString(id, 'Basket Id');
  let basket = await getByObjectId(id);
  if (basket == null) {
    throw new QueryError(`Could not get basket for (${id})`);
  }
  return basket;
};

const getBasketByUserId = async (userId) => {
  assertObjectIdString(userId, 'User Id');
  // const user = await getUser(userId);
  // console.log(user);
  // if (!user) {
  //   throw new QueryError(`Could not get user for (${userId})`);
  // }

  const collection = await getBasketsCollection();
  let basket = [];
  if (created) {
    basket = await collection.find({ createdId: new ObjectId(userId) }).toArray();
  } else {
    basket = await collection.find({ 'baskets.users.id': new ObjectId(userId) });
  }

  if (basket == null) {
    throw new QueryError(`Could not get basket for (${userId})`);
  }
  return basket;
};

const getBasketByGroupId = async (groupId) => {
  assertObjectIdString(groupId, 'Group Id');
  // const user = await getUser(userId);
  // console.log(user);
  // if (!user) {
  //   throw new QueryError(`Could not get user for (${userId})`);
  // }

  const collection = await getBasketsCollection();
  let basket = [];
  basket = await collection.find({ groupId: new ObjectId(groupId) }).toArray();

  if (basket == null) {
    throw new QueryError(`Could not get basket for (${groupId})`);
  }
  return basket;
};

const deleteBasket = async (id) => {
  assertObjectIdString(id, 'Cloth id');

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

const deleteBasketByUserId = async (userId) => {
  const allBaskets = await getBasketByUserId(userId);

  const collection = await getBasketsCollection();
  const { deletedCount } = await collection.deleteMany({ createdBy: new ObjectId(userId) });
  if (deletedCount === 0) {
    throw new QueryError(`Could not delete all clothes for (${userId})`);
  }
  allBaskets.message = 'Successfully deleted all clothes.';
  return parseMongoData(allBaskets);
};

const deleteBasketByGroupId = async (userId) => {
  const allBaskets = await getBasketByGroupId(userId);

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
  getBasketByUserId,
  getBasketByGroupId,
  deleteBasket,
  deleteBasketByUserId,
  deleteBasketByGroupId,
};
