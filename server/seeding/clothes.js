const { ObjectId } = require('mongodb');
const { addCloth } = require('../data/clothes');

const seedClothes = async (
  user1,
  user2,
  user3,
  user4,
  group1,
  group2,
  { timestamp1 = new Date().getTime(), timestamp2 = new Date().getTime() } = {},
) => {
  const cloth1 = {
    userId: user1._id,
    groupId: group1._id,
    name: 'Tshirt1',
    type: 'Tshirt',
  };

  const cloth2 = {
    userId: user2._id,
    groupId: group1._id,
    name: 'Tshirt1',
    type: 'Tshirt',
  };

  const cloth3 = {
    userId: user3._id,
    groupId: group2._id,
    name: 'Tshirt1',
    type: 'Tshirt',
  };

  const cloth4 = {
    userId: user4._id,
    groupId: group2._id,
    name: 'Tshirt1',
    type: 'Tshirt',
  };

  const c1 = await addCloth(cloth1);
  const c2 = await addCloth(cloth2);
  const c3 = await addCloth(cloth3);
  const c4 = await addCloth(cloth4);

  return { c1, c2, c3, c4 };
};

module.exports = { seedClothes };
