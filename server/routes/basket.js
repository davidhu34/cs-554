const { Router } = require('express');
const router = Router();
const basketsData = require('../data/basket');

const {
  assertIsValuedString,
  assertRequiredNumber,
  assertObjectIdString,
} = require('../utils/assertion');
const { HttpError, ValidationError } = require('../utils/errors');

//add basket
router.post('/', async (req, res, next) => {
  try {
    const { name, users, clothes = [], status = 'PENDING', time = 0 } = req.body;
    const size = parseInt(req.body.size);
    const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
      req.session.user || {};

    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(name, 'Basket name');
    assertRequiredNumber(size, 'Basket size');
    assertIsValuedString(groupId, 'Group Id');
    assertIsValuedString(status, 'Basket status');
    assertRequiredNumber(time, 'Time');

    const basket = await basketsData.getBasketByName(name);

    if (basket) {
      throw new ValidationError(`Basket already exists.`);
    }

    const result = await basketsData.addBasket({
      name,
      size,
      userId,
      groupId,
      users,
      clothes,
      status,
      time,
    });
    if (!result) {
      throw new HttpError(`Could not add basket for id`, 400);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
      req.session.user || {};
    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(groupId, 'Group Id');
    const { skip, limit } = req.query;
    let result = await basketsData.getBasketByGroupId({
      userId,
      groupId,
      skip: parseInt(skip),
      limit: parseInt(limit),
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/pending', async (req, res, next) => {
  try {
    const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
      req.session.user || {};
    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(groupId, 'Group Id');
    let result = await basketsData.getBasketsByStatus('PENDING');
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//get basket by basketId
router.get('/:id', async (req, res, next) => {
  try {
    const { _id: userId } = req.session.user;
    const { id } = req.params;
    assertIsValuedString(id, 'basket Id');
    const result = await basketsData.getBasket(userId, id);
    if (!result) {
      throw new HttpError(`Could not get basket for basket id:${id}`, 400);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//delete basket
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId, groupId } = req.session.user;
    const result = await basketsData.deleteBasket(userId, groupId, id);
    if (!result) {
      throw new HttpError(`Could not delete basket for basket id:${id}`, 400);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//update basket
router.put('/:id', async (req, res, next) => {
  try {
    const { id: basketId } = req.params;
    const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
      req.session.user || {};
    const { name, size, users, clothes, status, time } = req.body;
    assertIsValuedString(userId, 'User Id');
    const result = await basketsData.updateBasket(basketId, {
      name,
      size,
      userId,
      groupId,
      users,
      clothes,
      status,
      time,
    });
    if (!result) {
      throw new HttpError(`Could not update basket for basket id:${id}`, 400);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// update basket status
router.patch('/:id/status', async (req, res, next) => {
  try {
    const { id: basketId } = req.params;
    const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
      req.session.user || {};
    const { lastUpdateId, status, time } = req.body;
    assertObjectIdString(userId, 'User ID');
    assertObjectIdString(groupId, 'Group ID');
    const result = await basketsData.updateBasketStatus(basketId, {
      userId,
      groupId,
      status,
      time,
      lastUpdateId,
    });

    if (!result) {
      throw new HttpError(`Could not update basket for basket id:${id}`, 400);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// update basket clothes
router.patch('/:id/clothes', async (req, res, next) => {
  try {
    const { id: basketId } = req.params;
    const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
      req.session.user || {};
    const { clothesIdList = [] } = req.body;
    assertObjectIdString(userId, 'User ID');
    assertObjectIdString(groupId, 'Group ID');

    const result = await basketsData.updateBasketClothes(basketId, {userId, clothesIdList});

    if (!result) {
      throw new HttpError(`Could not update basket for basket id:${id}`, 400);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
