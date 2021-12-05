const { MongoClient } = require("mongodb");
const { mongoConfig } = require("./settings");

const { serverUrl: databaseUrl, database: databaseName } = mongoConfig;
const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(databaseUrl, connectOptions);

const connect = async (name = databaseName) => {
  if (!client.isConnected()) await client.connect();
  return client.db(name);
  // MongoClient.connect(databaseUrl, connectOptions, (error, client) => {
  //   if (error) {
  //     return console.log("Connection failed for some reason");
  //   }
  //   console.log("Connection established - All well");
  //   const db = client.db(name);
  //   return db;
  // });
};

const disconnect = async (name = databaseName) =>
  client.isConnected() && (await client.close());

const getCollection = async (collectionName) => {
  const db = await connect();
  return db.collection(collectionName);
};

module.exports = {
  client,
  connect,
  disconnect,
  getCollection,
};
