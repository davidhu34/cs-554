const { Router } = require('express');
const router = Router();
const basketsData = require('../data/basket');

const { assertIsValuedString, assertRequiredNumber } = require('../utils/assertion');
const { HttpError } = require('../utils/errors');

//add basket
router.post('/', async (req, res) => {
  try {
    const { name, size, users, clothes, status, time } = req.body;
    const { _id: userId, groupId } = req.session.user;

    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(name, 'Basket name');
    assertRequiredNumber(size, 'Basket size');
    assertIsValuedString(groupId, 'Group Id');
    assertIsValuedString(status, 'Basket status');
    assertRequiredNumber(time, 'Time');

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
      throw new HttpError(`Could not add basket for id`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

router.get('/', async (req, res) => {
  try {
    const { _id: userId = '61b12f933d2a722d43af730b', groupId = '61b12f933d2a722d43af730f' } = req.session.user || {};
    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(groupId, 'Group Id');
    const { skip, limit } = req.query;
    let result = await basketsData.getBasketByGroupId({ userId, groupId, skip, limit });
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//get basket by basketId
router.get('/:id', async (req, res) => {
  try {
    const { _id: userId } = req.session.user;
    const { id } = req.params;
    assertIsValuedString(id, 'basket Id');
    const result = await basketsData.getBasket(userId, id);
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

//update basket
router.put('/:id', async (req, res) => {
  try {
    const { id: basketId } = req.params;
    const { _id: userId, groupId } = req.session.user;
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
      throw new HttpError(`Could not update basket for basket id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

module.exports = router;
