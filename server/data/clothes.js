const { ObjectId } = require('mongodb');
const { clothes: getClothesCollection } = require('../config/mongoCollections');

const { QueryError } = require('../utils/errors');
const { idQuery, parseMongoData } = require('../utils/mongodb');
const {
  assertObjectIdString,
  assertIsValuedString,
  assertRequiredObject,
} = require('../utils/assertion');

const { getUser } = require('./user');

const getByObjectId = async (objectId) => {
  const collection = await getClothesCollection();
  let cloth = await collection.findOne(idQuery(objectId));
  return parseMongoData(cloth);
};

const getClothByGroupId = async (userId, groupId,  skip) => {
  assertObjectIdString(userId, 'User Id');

  // We can only do this once we have group routes.

  // const group = await getGroup(groupId);
  // console.log(group);
  // if (!group) {
  //   throw new QueryError(`Could not get group for (${groupId})`);
  // }

  const collection = await getClothesCollection();
  let cloth = await collection
    .find({ groupId: new ObjectId(groupId) })
    .skip(skip)
    .limit(10)
    .toArray();

  if (cloth == null) {
    throw new QueryError(`Could not get cloth for (${groupId})`);
  }
  return cloth;
};

const getCloth = async (id) => {
  assertObjectIdString(id, 'Cloth Id');
  let cloth = await getByObjectId(id);
  if (cloth == null) {
    throw new QueryError(`Could not get cloth for (${id})`);
  }
  return cloth;
};

const addCloth = async (data) => {
  assertRequiredObject(data);
  const { userId, groupId, name, type } = data;
  const createdAt = new Date().getTime();

  assertObjectIdString(userId, 'Cloth added by user ID');
  assertIsValuedString(name, 'Cloth name');
  assertIsValuedString(type, 'Cloth type');

  data.clothId = new ObjectId().toHexString();

  const collection = await getClothesCollection();

  const clothData = {
    _id: new ObjectId(data.clothId),
    userId: new ObjectId(userId),
    groupId: new ObjectId(groupId),
    name,
    type,
    createdAt,
    updatedAt: createdAt,
    createdBy: new ObjectId(userId),
    updatedBy: new ObjectId(userId),
  };
  const { result, insertedCount, insertedId } = await collection.insertOne(clothData);
  if (!result.ok || insertedCount !== 1) {
    throw new QueryError(`Could not add cloth for user ID(${userId})`);
  }

  let cloth = await getByObjectId(insertedId);
  console.log(cloth);
  return cloth;
};

const updateCloth = async (clothId, data) => {
  assertRequiredObject(data);
  const { userId, groupId, name, type } = data;
  assertObjectIdString(clothId, 'Cloth id');
  assertObjectIdString(userId, 'Cloth added by user ID');
  assertObjectIdString(groupId, 'Group id');
  assertIsValuedString(name, 'Cloth name');
  assertIsValuedString(type, 'Cloth type');

  const lastCloth = await getCloth(clothId);

  if (lastCloth == null) {
    throw `Cloth not found for cloth ID(${clothId})`;
  }

  const newUpdate = {
    userId: new ObjectId(userId),
    groupId: new ObjectId(groupId),
    name,
    type,
    updatedAt: new Date().getTime(),
    updatedBy: new ObjectId(userId),
  };

  const collection = await getClothesCollection();
  const { modifiedCount, matchedCount } = await collection.updateOne(
    { _id: new ObjectId(clothId), userId: new ObjectId(userId) },
    { $set: newUpdate },
  );

  if (!modifiedCount && !matchedCount) {
    throw new QueryError(`Could not update cloth ID(${clothId})`);
  }
  const updatedCloth = await getCloth(clothId);
  data.clothId = clothId;
  updatedCloth.payment = await updateClothPayment(updatedCloth.paymentId, data);
  return updatedCloth;
};

const deleteCloth = async (id) => {
  assertObjectIdString(id, 'Cloth id');

  let deleteCloth = await getCloth(id);

  if (deleteCloth == null) {
    throw `Cloth not found for cloth ID(${id})`;
  }

  const collection = await getClothesCollection();
  let { deletedCount } = await collection.deleteOne({ _id: new ObjectId(id) });

  if (deletedCount === 0) {
    throw new QueryError(`Could not delete cloth for (${id})`);
  }
  deleteCloth.message = 'Successfully deleted';
  return deleteCloth;
};

const deleteClothByGroupId = async (userId, groupId) => {
  const allClothes = await getClothByGroupId(groupId);

  const collection = await getClothesCollection();
  const { deletedCount } = await collection.deleteMany({
    userId: new ObjectId(userId),
    groupId: new ObjectId(groupId),
  });
  if (deletedCount === 0) {
    throw new QueryError(`Could not delete all clothes for (${userId})`);
  }
  allClothes.message = 'Successfully deleted all clothes.';
  return parseMongoData(allClothes);
};

module.exports = {
  getClothByGroupId,
  addCloth,
  getCloth,
  updateCloth,
  deleteCloth,
  deleteClothByGroupId,
};
