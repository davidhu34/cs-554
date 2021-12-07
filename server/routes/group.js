const { Router } = require('express');
const router = Router();
const groupsData = require('../data/group');

const {
    assertObjectIdString,
    assertRequiredString,
    assertRequiredObject,
    assertNonEmptyArray,
} = require('../utils/assertion');
const { QueryError, ValidationError, HttpError } = require('../utils/errors');

//add group
router.post('/', async (req, res) => {
    try {
      const reqBody = req.body;
      assertRequiredObject(reqBody);
  
      let { name, users } = reqBody;
      assertRequiredString(name, "Group name");
      assertNonEmptyArray(users, "Users");

      const groupPresent = await groupsData.getGroupByName(name);
  
      if (groupPresent) {
        throw new ValidationError(`Group already exists.`);
      }
  
      const newGroup = await groupsData.createGroup(reqBody);
      console.log(newGroup);
      res.status(200).json(newGroup);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
});

//Get all groups
router.get('/', async (req, res) => {
  try {
      const allGroups = await groupsData.getAllGroups();

      return res.status(200).json(allGroups);
  } catch (e) {
      res.status(400).json({ error: e });
  }
});

// Get group by ID
router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      assertObjectIdString(id, 'Group ID');
      const result = await groupsData.getGroup(id);

      if (!result) {
        throw new HttpError(`Could not get group for group id:${id}`, 404);
      }
      
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: e });
    }
  });

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        assertObjectIdString(id);

        const result = await groupsData.deleteGroup(id);

        if (!result) {
        throw new HttpError(`Could not delete group for group id:${id}`, 404);
        }
        res.status(200).json(result);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});
  
module.exports = router;
  