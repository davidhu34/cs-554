const { ObjectId } = require("mongodb");
const { connect, disconnect } = require("../config/mongoConnection");

const {
  seedUsers,
} = require("./users");

const unseed = async (db) => {
  if (!!db) {
    console.log("cleaning up database..");
    await db.dropDatabase();
  }
};

const seed = async () => {
  let db = await connect();

  try {
    await unseed(db);

    await seedUsers();

    console.log('Seeding Completed.');
    return {
      // ...seedData,
    };
  } catch (error) {
    console.log("Seeding error:", error);
    await unseed(db);
    await disconnect();
  }
};

module.exports = seed;