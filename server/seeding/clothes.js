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
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth2 = {
    userId: user2._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth3 = {
    userId: user3._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth4 = {
    userId: user4._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth5 = {
    userId: user1._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth6 = {
    userId: user2._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth7 = {
    userId: user3._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth8 = {
    userId: user4._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth9 = {
    userId: user1._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth10 = {
    userId: user2._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth11 = {
    userId: user3._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth12 = {
    userId: user4._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth13 = {
    userId: user1._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth14 = {
    userId: user2._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth15 = {
    userId: user3._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth16 = {
    userId: user4._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth17 = {
    userId: user1._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth18 = {
    userId: user2._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth19 = {
    userId: user3._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth20 = {
    userId: user4._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth21 = {
    userId: user1._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth22 = {
    userId: user2._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth23 = {
    userId: user3._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth24 = {
    userId: user4._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };
  const cloth25 = {
    userId: user1._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth26 = {
    userId: user2._id,
    groupId: group1._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth27 = {
    userId: user3._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const cloth28 = {
    userId: user4._id,
    groupId: group2._id,
    name: 'Tshirt1',
    size: 'medium',
    type: 'Tshirt',
  };

  const c1 = await addCloth(cloth1);
  const c2 = await addCloth(cloth2);
  const c3 = await addCloth(cloth3);
  const c4 = await addCloth(cloth4);
  const c5 = await addCloth(cloth5);
  const c6 = await addCloth(cloth6);
  const c7 = await addCloth(cloth7);
  const c8 = await addCloth(cloth8);
  const c9 = await addCloth(cloth9);
  const c10 = await addCloth(cloth10);
  const c11 = await addCloth(cloth11);
  const c12 = await addCloth(cloth12);
  const c13 = await addCloth(cloth13);
  const c14 = await addCloth(cloth14);
  const c15 = await addCloth(cloth15);
  const c16 = await addCloth(cloth16);
  const c17 = await addCloth(cloth17);
  const c18 = await addCloth(cloth18);
  const c19 = await addCloth(cloth19);
  const c20 = await addCloth(cloth20);
  const c21 = await addCloth(cloth21);
  const c22 = await addCloth(cloth22);
  const c23 = await addCloth(cloth23);
  const c24 = await addCloth(cloth24);
  const c25 = await addCloth(cloth25);
  const c26 = await addCloth(cloth26);
  const c27 = await addCloth(cloth27);
  const c28 = await addCloth(cloth28);

  return {
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8,
    c9,
    c10,
    c11,
    c12,
    c13,
    c14,
    c15,
    c16,
    c17,
    c18,
    c19,
    c20,
    c21,
    c22,
    c23,
    c24,
    c25,
    c26,
    c27,
    c28,
  };
};

module.exports = { seedClothes };
