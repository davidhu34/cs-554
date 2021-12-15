const { ObjectId } = require('mongodb');
const { baskets: getBasketsCollection } = require('../config/mongoCollections');

const { QueryError } = require('../utils/errors');
const { idQuery, parseMongoData } = require('../utils/mongodb');
const {
  assertObjectIdString,
  assertIsValuedString,
  assertRequiredObject,
  assertRequiredString,
  assertRequiredNumber,
  assertNonEmptyArray,
} = require('../utils/assertion');
const { setClothesBasketLocation, getClothesBasketLocation, getAllClothesBasketLocations } = require('../utils/redis');

const nextStatus = {
  'PENDING': 'WASHING',
  'WASHING': 'WASHING_DONE',
  'WASHING_DONE': 'DRYING',
  'DRYING': 'DRYING_DONE',
  'DRYING_DONE': 'PENDING',
};
const usersData = require('./user');
const { getGroup } = require('./group');

const assertStatus = (status) => {
  assertIsValuedString(status, 'Basket status');

  if (
    status !== 'PENDING' &&
    status !== 'WASHING' &&
    status !== 'WASHING_DONE' &&
    status !== 'DRYING' &&
    status !== 'DRYING_DONE'
  ) {
    throw new QueryError(`Please provide proper status`);
  }
}
const getByObjectId = async (objectId) => {
  const collection = await getBasketsCollection();
  let basket = await collection.findOne(idQuery(objectId));
  return parseMongoData(basket);
};

const addBasket = async (data) => {
  assertRequiredObject(data);
  const { name, size, userId, groupId, clothes, status, time } = data;
  const createdAt = new Date().getTime();

  assertObjectIdString(userId, 'Basket added by user ID');
  assertIsValuedString(name, 'Basket name');
  assertRequiredNumber(size, 'Basket size');
  assertIsValuedString(groupId, 'Group Id');
  assertStatus(status);

  if (status === 'WASHING' || status === 'DRYING') {
    assertRequiredNumber(time, 'Task Time');
  }

  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }
  const group = await getGroup(groupId);
  if (!group) {
    throw new QueryError(`Group not exist for group id (${groupId})`);
  }
  if (size < clothes.length) {
    throw new QueryError(`No. of clothes must be less than size of basket.`);
  }

  data.basketId = new ObjectId().toHexString();

  const collection = await getBasketsCollection();

  const basketData = {
    _id: new ObjectId(data.basketId),
    groupId: new ObjectId(groupId),
    name,
    size,
    clothes,
    status,
    history: [{
      createdAt,
      userId: userId,
      status,
      _id: new ObjectId(),
    }],
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

const getBasketByName = async (name) => {
  assertRequiredString(name, 'Basket name');

  const collection = await getBasketsCollection();
  const basket = await collection.findOne({ name: name });
  return parseMongoData(basket);
};

const getBasketsByStatus = async (status) => {
  assertStatus(status);

  const collection = await getBasketsCollection();
  const basket = await collection.find({ status }).toArray();
  return parseMongoData(basket);
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

const getBasketByGroupId = async ({ userId, groupId, skip, limit }) => {
  assertObjectIdString(groupId, 'Group Id');
  assertRequiredNumber(skip, 'Pagination Skip');
  assertRequiredNumber(limit, 'Pagination Limit');

  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }

  const group = await getGroup(groupId);
  if (!group) {
    throw new QueryError(`Group not exist for group id (${groupId})`);
  }

  const collection = await getBasketsCollection();

  const data = await collection
    .find({ groupId: new ObjectId(groupId) })
    .limit(limit)
    .skip(skip)
    .toArray();

  if (data == null) {
    throw new QueryError(`Could not get basket for (${groupId})`);
  }
  let total = await collection.find({ groupId: new ObjectId(groupId) }).count();
  return { data: parseMongoData(data), skip, limit, total };
};

const deleteBasket = async (userId, groupId, id) => {
  assertObjectIdString(id, 'Basket id');
  assertObjectIdString(userId, 'User Id');
  assertObjectIdString(groupId, 'Group Id');
  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }
  const group = await getGroup(groupId);
  if (!group) {
    throw new QueryError(`Group not exist for group id (${groupId})`);
  }
  let basket = await getByObjectId(id);
  if (basket == null) {
    throw new QueryError(`Could not get basket for (${id})`);
  }

  let deleteBasket = await getBasket(userId, id);

  if (deleteBasket == null) {
    throw `Basket not found for basket ID(${id})`;
  }

  const collection = await getBasketsCollection();
  let { deletedCount } = await collection.deleteOne({
    _id: new ObjectId(id),
    groupId: groupId,
  });

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

const updateBasket = async (id, data) => {
  assertRequiredObject(data);
  const { name, userId, groupId, clothes } = data;
  const updatedAt = new Date().getTime();

  assertObjectIdString(id, 'Basket ID');
  assertObjectIdString(userId, 'Basket added by user ID');
  assertIsValuedString(name, 'Basket name');
  assertIsValuedString(groupId, 'Group Id');
  assertIsValuedString(status, 'Basket status');

  let previousBasket = await getByObjectId(id);

  if (!previousBasket) throw new QueryError(`Could not found basket for (${id})`);

  const user = await usersData.getByObjectId(userId);
  if (!user) {
    throw new QueryError(`User not exist for user id (${userId})`);
  }
  const group = await getGroup(groupId);
  if (!group) {
    throw new QueryError(`Group not exist for group id (${groupId})`);
  }
  if (size < clothes.length) {
    throw new QueryError(`No. of clothes must be less than size of basket.`);
  }

  const collection = await getBasketsCollection();

  const basketData = {
    ...previousBasket,
    name,
    size,
    updatedAt,
    updatedBy: new ObjectId(userId),
  };

  const { modifiedCount, matchedCount } = await collection.updateOne(
    { _id: new ObjectId(id), groupId: new ObjectId(groupId) },
    { $set: basketData },
  );

  if (!modifiedCount && !matchedCount) {
    throw new QueryError(`Could not update basket ID(${id})`);
  }

  return await getByObjectId(id);
};


const updateBasketStatus = async (id, data) => {
  assertRequiredObject(data);
  const { status, time = null, userId, groupId, lastUpdateId } = data;

  let basket = await getByObjectId(id);
  if (
    !basket ||
    !Array.isArray(basket.history) ||
    basket.history.length === 0
  ) {
    throw new QueryError(`Basket with ID\`${id}\` has invalid status history.`);
  }

  const validNextStatus = nextStatus[basket.status];
  if (validNextStatus !== status) {
    throw new QueryError(
      `Invalid basket status update: ${basket.status} can only update to ${validNextStatus}`
    );
  }

  const lastUpdate = basket.history[basket.history.length - 1];
  if (lastUpdateId !== lastUpdate._id) {
    throw new QueryError(`Basket status update request is out-of-date.`);
  }

  const options = { returnOriginal: false };
  const collection = await getBasketsCollection();
  const currentTimestamp = new Date().getTime();
  const newUpdate = {
    _id: new ObjectId(),
    userId,
    status,
    time,
    createdAt: currentTimestamp,
  };
  const ops = {
    $set: {
      status,
      time,
      updatedAt: currentTimestamp,
      updatedBy: new ObjectId(userId),
    },
    $push: {
      history: newUpdate,
    },
  };

  const { value: updatedBasket, ok } = await collection.findOneAndUpdate(
    idQuery(id),
    ops,
    options
  );

  if (!ok) {
    throw new QueryError(`Could not update basket with ID \`${id}\``);
  }

  return parseMongoData(updatedBasket);
};

const updateBasketClothes = async (id, { clothesIdList, userId }, isRemove = false) => {
  assertNonEmptyArray(clothesIdList);

  let basket = await getByObjectId(id);
  if (!basket || !Array.isArray(basket.history) || basket.history.length === 0) {
    throw new QueryError(`Basket with ID\`${id}\` has invalid status history.`);
  }

  for (const clothesId of clothesIdList) {
    assertObjectIdString(clothesId);
  }

  const options = { returnOriginal: false };
  const collection = await getBasketsCollection();
  const currentTimestamp = new Date().getTime();
  const ops = {
    $set: {
      updatedAt: currentTimestamp,
      updatedBy: new ObjectId(userId),
    },
  };

  if (isRemove) {
    ops.$pull = {
      clothes: {
        $in: clothesIdList,
      },
    };
  } else {
    ops.$addToSet = {
      clothes: {
        $each: clothesIdList,
      },
    };
  }

  const { value: updatedBasket, ok } = await collection.findOneAndUpdate(idQuery(id), ops, options);

  if (!ok) {
    throw new QueryError(`Could not update basket with ID \`${id}\``);
  }

  await setClothesBasketLocation(clothesIdList, isRemove ? '' : id);
  console.log(await getClothesBasketLocation(clothesIdList));
  return parseMongoData(updatedBasket);
};

module.exports = {
  addBasket,
  getBasket,
  getBasketByGroupId,
  getBasketsByStatus,
  deleteBasket,
  deleteBasketByGroupId,
  updateBasket,
  updateBasketStatus,
  updateBasketClothes,
  getBasketByName,
};
