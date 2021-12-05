const { Router, json } = require('express');
const router = Router();
const clothesData = require('../data/clothes');

const {
  assertIsValuedString,
  assertRequiredObject,
  assertEmailString,
  assertNonEmptyArray,
} = require('../utils/assertion');
const { QueryError, ValidationError, HttpError } = require('../utils/errors');

//add clothes
router.post('/', async (req, res) => {
  try {
    const { name, type } = req.body;
    console.log(req.session.user);
    const { _id: userId } = req.session.user;

    assertIsValuedString(userId, 'User Id');
    assertIsValuedString(name, 'Cloth name');
    assertIsValuedString(type, 'Type');

    const result = await clothesData.addCloth({ name, type, userId });
    if (!result) {
      throw new HttpError(`Could not add cloth for id`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//get clothes by userId
router.get('/', async (req, res) => {
  try {
    const { _id: userId } = req.session.user;
    console.log(userId);
    assertIsValuedString(userId, 'User Id');
    const result = await clothesData.getClothByUserId(userId);
    if (!result) {
      throw new HttpError(`Could not get cloth for user id:${userId}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//get clothes by clothId
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    assertIsValuedString(id, 'Cloth Id');
    const result = await clothesData.getCloth(id);
    if (!result) {
      throw new HttpError(`Could not get cloth for cloth id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//get clothes by groupId
// router.get('group/:groupId', async (req, res) => {});

//delete clothes
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clothesData.deleteCloth(id);
    if (!result) {
      throw new HttpError(`Could not delete cloth for cloth id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { _id: userId } = req.session.user;
    const result = await clothesData.deleteClothByUserId(userId);
    if (!result) {
      throw new HttpError(`Could not delete cloth for cloth id:${id}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//update clothes
router.put('/:id', async (req, res) => {
  try {
    const { id: clothId } = req.params;
    const { id: userId } = req.session.user;
    const { name, type } = req.body;
    assertIsValuedString(userId, 'User Id');
    const result = clothesData.updateCloth(clothId, { userId, name, type });
    if (!result) {
      throw new HttpError(`Could not update cloth for cloth id:${clothId}`, 404);
    }
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

module.exports = router;
