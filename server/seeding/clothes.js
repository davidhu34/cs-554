const { ObjectId } = require('mongodb');
const { addCloth } = require('../data/clothes');

const seedClothes = async ({
  timestamp1 = new Date().getTime(),
  timestamp2 = new Date().getTime(),
  userId,
  groupId,
} = {}) => {
  const cloth1 = {
    userId: '123654987897456253181',
    groupId: '123654987897456253171',
    name: Tshirt1,
    type: Tshirt,
  };

  const cloth2 = {
    userId: '123654987897456253182',
    groupId: '123654987897456253172',
    name: Tshirt1,
    type: Tshirt,
  };

  const cloth3 = {
    userId: '123654987897456253182',
    groupId: '123654987897456253172',
    name: Tshirt1,
    type: Tshirt,
  };

  const cloth4 = {
    userId: '123654987897456253182',
    groupId: '123654987897456253172',
    name: Tshirt1,
    type: Tshirt,
  };

  const u1 = await createUser(user1);
  const u2 = await createUser(user2);
  const u3 = await createUser(user3);
  const u4 = await createUser(user4);

  return { u1, u2, u3, u4 };
};

module.exports = { seedUsers };
