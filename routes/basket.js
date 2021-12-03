const { Router } = require('express');
const router = Router();
const basketsData = require('../data/basket');

const { assertIsValuedString, assertRequiredNumber } = require('../utils/assertion');
const { HttpError } = require('../utils/errors');

//add basket
router.post('/', async (req, res) => {
  try {
    const { name, size, users, clothes } = req.body;
    const { _id: userId, groupId } = req.session.user;

    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(name, 'Basket name');
    assertRequiredNumber(size, 'Basket size');
    assertIsValuedString(groupId, 'Group Id');

    const result = await basketsData.addBasket({ name, size, userId, groupId, users, clothes });
    if (!result) {
      throw new HttpError(`Could not add basket for id`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//get basket by userId or groupId
router.get('/', async (req, res) => {
  try {
    const { _id: userId, groupId } = req.session.user;
    const { created, group } = req.params;
    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(groupId, 'Group Id');
    let result;
    if (group) {
      result = await basketsData.getBasketByGroupId(groupId);
    } else {
      result = await basketsData.getBasketByUserId(userId, created);
    }
    if (!result) {
      throw new HttpError(`Could not get basket for user id:${userId}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//get basket by basketId
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    assertIsValuedString(id, 'basket Id');
    const result = await basketsData.getBasket(id);
    if (!result) {
      throw new HttpError(`Could not get basket for basket id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//delete basket
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await basketsData.deleteBasket(id);
    if (!result) {
      throw new HttpError(`Could not delete basket for basket id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

//delete basket by userId
router.delete('/', async (req, res) => {
  try {
    const { _id: userId } = req.session.user;
    const result = await basketsData.deleteClothByUserId(userId);
    if (!result) {
      throw new HttpError(`Could not delete cloth for cloth id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//update basket
router.put('/:id', async (req, res) => {
  try {
    const { id: clothId } = req.params;
    const { id: userId } = req.session.user;
    const { name, size, users, clothes } = req.body;
    assertIsValuedString(userId, 'User Id');
    const result = clothesData.updateCloth(clothId, {
      name,
      size,
      userId,
      groupId,
      users,
      clothes,
    });
    if (!result) {
      throw new HttpError(`Could not update basket for basket id:${clothId}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

module.exports = router;
