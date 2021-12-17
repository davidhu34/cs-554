const { ObjectId } = require('mongodb');
const { connect, disconnect } = require('../config/mongoConnection');
const { seedGroups } = require('./groups');
const { seedUsers } = require('./users');
const { seedClothes } = require('./clothes');
const { seedBaskets } = require('./baskets');

const unseed = async (db) => {
  if (!!db) {
    console.log('cleaning up database..');
    await db.dropDatabase();
  }
};

const seed = async () => {
  let db = await connect();

  try {
    await unseed(db);

    const { u1, u2, u3, u4 } = await seedUsers();
    const { g1, g2 } = await seedGroups(u1, u2, u3, u4);
    const {
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
    } = await seedClothes(u1, u2, u3, u4, g1, g2);
    const { b1, b2 } = await seedBaskets(
      u1,
      u2,
      u3,
      u4,
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
    );

    console.log('Seeding Completed.');
    return {
      // ...seedData,
    };
  } catch (error) {
    console.log('Seeding error:', error);
    await unseed(db);
    await disconnect();
  }
};

module.exports = seed;
