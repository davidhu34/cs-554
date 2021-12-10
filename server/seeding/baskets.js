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
  { timestamp1 = new Date().getTime(), timestamp2 = new Date().getTime() } = {},
) => {
  const basket1 = {
    name: 'Basket 1',
    size: 3,
    userId: user1._id,
    groupId: user1.groupId,
    users: [user1, user2],
    clothes: [cloth1, cloth2],
    status: false,
    time: 2,
    createdAt: timestamp1,
  };

  const basket2 = {
    name: 'Basket 1',
    size: 3,
    userId: user3._id,
    groupId: user3.groupId,
    users: [user3, user4],
    clothes: [cloth3, cloth4],
    status: false,
    time: 3,
    createdAt: timestamp1,
  };

  const b1 = await addBasket(basket1);
  const b2 = await addBasket(basket2);

  return { b1, b2 };
};

module.exports = { seedBaskets };
