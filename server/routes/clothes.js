const { Router, json } = require('express');
const router = Router();
const clothesData = require('../data/clothes');
const userData = require('../data/user');

const {
  assertIsValuedString,
  assertRequiredObject,
  assertEmailString,
  assertNonEmptyArray,
} = require('../utils/assertion');
const { QueryError, ValidationError, HttpError } = require('../utils/errors');

//add clothes
router.post('/', async (req, res, next) => {
  try {
    const { name, type } = req.body;
    console.log(req.session.user);
    const { _id: userId, groupId } = req.session.user || {};

    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(groupId, 'Group Id');
    assertIsValuedString(name, 'Cloth name');
    assertIsValuedString(type, 'Type');

    const result = await clothesData.addCloth({ name, type, userId, groupId });
    if (!result) {
      throw new HttpError(`Could not add cloth for id`, 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const { _id: userId = '61b6e36f985cc7b6a36cd3e0', groupId = '61b6e370985cc7b6a36cd3e4' } =
      req.session.user || {};
    const { skip, limit } = req.query;
    assertIsValuedString(groupId, 'Group Id');
    const result = await clothesData.getClothByGroupId({
      userId,
      groupId,
      skip: parseInt(skip),
      limit: parseInt(limit),
    });
    if (!result) {
      throw new HttpError(`Could not get cloth for group id:${groupId}`, 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//get clothes by clothId
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId } = req.session.user;
    assertIsValuedString(id, 'Cloth Id');
    const user = await userData.getByObjectId(userId);
    if (!user) {
      throw new HttpError(`User not exist.`, 404);
    }
    const result = await clothesData.getCloth(userId, id);
    if (!result) {
      throw new HttpError(`Could not get cloth for cloth id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//delete clothes
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: userId = '61b6e36f985cc7b6a36cd3e0', groupId = '61b6e370985cc7b6a36cd3e4' } =
      req.session.user || {};
    const result = await clothesData.deleteCloth(userId, id);
    if (!result) {
      throw new HttpError(`Could not delete cloth for cloth id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  try {
    const { _id: userId, groupId } = req.session.user;
    const result = await clothesData.deleteClothByGroupId(userId, groupId);
    ``;
    if (!result) {
      throw new HttpError(`Could not delete group for group id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

//update clothes
router.put('/:id', async (req, res, next) => {
  try {
    const { id: clothId } = req.params;
    const { _id: userId = '61b6e36f985cc7b6a36cd3e0', groupId = '61b6e370985cc7b6a36cd3e4' } =
      req.session.user || {};
    const { name, type } = req.body;
    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(groupId, 'Group Id');
    const result = await clothesData.updateCloth(clothId, { userId, groupId, name, type });
    if (!result) {
      throw new HttpError(`Could not update cloth for cloth id:${clothId}`, 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
