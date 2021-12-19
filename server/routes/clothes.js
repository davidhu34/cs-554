const { Router, json } = require('express');
const router = Router();
const clothesData = require('../data/clothes');
const userData = require('../data/user');

const {
  assertIsValuedString,
  assertRequiredObject,
  assertEmailString,
  assertNonEmptyArray,
  assertRequiredNumber,
} = require('../utils/assertion');
const { QueryError, ValidationError, HttpError } = require('../utils/errors');

//add clothes
router.post('/', async (req, res, next) => {
  try {
    // const { name, type, size } = req.body;
    // const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
    //   req.session.user || {};
    const { name, type, userId, groupId } = req.body;
    const size = parseInt(req.body.size);

    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(groupId, 'Group Id');
    assertIsValuedString(name, 'Cloth name');
    assertIsValuedString(type, 'Type');
    assertRequiredNumber(size, 'Size');

    const result = await clothesData.addCloth({ name, type, size, userId, groupId });
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
    // const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
    //   req.session.user || {};
    // const { skip, limit } = req.query;
    const { skip, limit, userId, groupId } = req.query;
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

router.get('/locations', async (req, res, next) => {
  try {
    // const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
    //   req.session.user || {};
    const { userId, groupId } = req.query;
    const result = await clothesData.getClothesLocations();
    if (!result) {
      throw new HttpError(`Could not get cloth for group id:${groupId}`, 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch('/locations', async (req, res, next) => {
  try {
    // const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
    //   req.session.user || {};
    // const { clothesIdList, basketId = '' } = req.body;
    const { clothesIdList, basketId = '', userId, groupId } = req.body;
    assertNonEmptyArray(clothesIdList);
    const result = await clothesData.setClothesLocation(clothesIdList, basketId);
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
    // const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
    //   req.session.user || {};
    const { userId, groupId } = req.query;
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
    // const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
    //   req.session.user || {};
    const { userId, groupId } = req.body;
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

    const isClothesEditable = await clothesData.isClothesEditable(clothId);

    if (!isClothesEditable) {
      throw new ValidationError(`Could not edit cloth for id:${clothId}`, 404);
    }
    // const { _id: userId = '61b91631d36271f9dc9b9bc4', groupId = '61b91631d36271f9dc9b9bc7' } =
    //   req.session.user || {};
    // const { name, type, size } = req.body;
    const { name, type, size, userId, groupId } = req.body;
    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(groupId, 'Group Id');
    const result = await clothesData.updateCloth(clothId, {
      userId,
      groupId,
      name,
      type,
      size,
    });
    if (!result) {
      throw new HttpError(`Could not update cloth for cloth id:${clothId}`, 404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
