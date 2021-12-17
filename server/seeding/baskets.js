const { ObjectId } = require('mongodb');
const { addBasket } = require('../data/basket');

const seedBaskets = async (
  user1,
  user2,
  user3,
  user4,
  cloth1,
  cloth2,
  cloth3,
  cloth4,
  cloth5,
  cloth6,
  cloth7,
  cloth8,
  cloth9,
  cloth10,
  cloth11,
  cloth12,
  cloth13,
  cloth14,
  cloth15,
  cloth16,
  cloth17,
  cloth18,
  cloth19,
  cloth20,
  cloth21,
  cloth22,
  cloth23,
  cloth24,
  cloth25,
  cloth26,
  cloth27,
  cloth28,
  { timestamp1 = new Date().getTime(), timestamp2 = new Date().getTime() } = {},
) => {
  const basket1 = {
    name: 'Basket 1',
    size: 20,
    userId: user1._id,
    groupId: user1.groupId,
    //users: [user1, user2],
    // clothes: [cloth1, cloth2],
    clothes: [
      cloth1._id,
      cloth2._id,
      cloth5._id,
      cloth6._id,
      cloth9._id,
      cloth10._id,
      cloth13._id,
      cloth14._id,
      cloth17._id,
      cloth18._id,
      cloth21._id,
      cloth22._id,
      cloth25._id,
      cloth26._id,
    ],
    status: 'PENDING',
    time: 2,
    createdAt: timestamp1,
    history: [
      {
        userId: user1._id,
        time: 2,
        status: 'PENDING',
        createdAt: timestamp1,
      },
    ],
  };

  const basket2 = {
    name: 'Basket 2',
    size: 33,
    userId: user3._id,
    groupId: user3.groupId,
    //users: [user3, user4],
    clothes: [
      cloth3._id,
      cloth4._id,
      cloth7._id,
      cloth8._id,
      cloth11._id,
      cloth12._id,
      cloth15._id,
      cloth16._id,
      cloth19._id,
      cloth20._id,
      cloth23._id,
      cloth24._id,
      cloth27._id,
      cloth28._id,
    ],
    status: 'PENDING',
    time: 20,
    createdAt: timestamp1,
    history: [
      {
        userId: user3._id,
        time: 20,
        status: 'PENDING',
        createdAt: timestamp1,
      },
    ],
  };

  const b1 = await addBasket(basket1);
  const b2 = await addBasket(basket2);

  return { b1, b2 };
};

module.exports = { seedBaskets };
