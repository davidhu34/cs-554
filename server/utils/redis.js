const redis = require('redis');

const client = redis.createClient();
const prepareClient = async () => {
  try {
    if (!client.isOpen) await client.connect();
  } catch (error) {
    console.error(error);
  }
};

const CLOTHES_BASKET_LOCATION_KEY = 'clothes_basket_location';

const getClothesBasketLocation = async (clothes) => {
  const clothesIdList = Array.isArray(clothes) ? clothes : [clothes];
  try {
    await prepareClient();
    const basketIdList = await Promise.all(
      clothesIdList.map((id) => client.hGet(CLOTHES_BASKET_LOCATION_KEY, id))
    );
    return basketIdList;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const setClothesBasketLocation = async (clothes, basketId) => {
  const clothesIdList = Array.isArray(clothes) ? clothes : [clothes];
  try {
    await prepareClient();
    await Promise.all(
      clothesIdList.map((id) => client.hSet(CLOTHES_BASKET_LOCATION_KEY, id, basketId))
    );
    return basketId;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  client,
  prepareClient,
  getClothesBasketLocation,
  setClothesBasketLocation,
};
