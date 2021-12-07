const { Router } = require('express');
const router = Router();
const usersData = require('../data/user');

const {
  assertObjectIdString,
  assertIsValuedString,
  assertRequiredObject,
  assertEmailString,
  assertNonEmptyArray,
} = require('../utils/assertion');
const { QueryError, ValidationError, HttpError } = require('../utils/errors');

//add user
router.post('/', async (req, res) => {
  try {
    const reqBody = req.body;
    assertRequiredObject(reqBody);

    let { uid, displayName, email } = reqBody;
    assertIsValuedString(uid, 'User ID');
    assertIsValuedString(displayName, 'User name');
    assertEmailString(email, 'Email');
    const userPresent = await usersData.getUser(uid);

    if (userPresent) {
      throw new ValidationError(`User already exists.`);
    }

    const newUser = await usersData.createUser(reqBody);
    console.log(newUser);
    req.session.user = newUser;
    res.status(200).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

router.put('/:id', async (req, res) => {
  console.log(req.body);
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    assertObjectIdString(id, 'Group ID');
    const result = await usersData.getUser(id);

    if (!result) {
      throw new HttpError(`Could not get user for user id:${id}`, 404);
    }

    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
});

//Get all users
router.get('/all', async (req, res) => {
  try {
    const allUsers = await usersData.getAllUsers();

    return res.status(200).json(allUsers);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

module.exports = router;
