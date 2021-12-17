const { Router } = require("express");
const router = Router();
const groupsData = require("../data/group");
const usersData = require("../data/user");
const basketsData = require("../data/basket");

const {
  assertObjectIdString,
  assertIsValuedString,
  assertRequiredString,
  assertRequiredObject,
  assertEmailString,
  assertNonEmptyArray,
} = require("../utils/assertion");
const { QueryError, ValidationError, HttpError } = require("../utils/errors");

//add group
router.post("/", async (req, res) => {
  let i = 0;
  try {
    const reqBody = req.body;
    // console.log(req.body);
    assertRequiredObject(reqBody);
    // console.log("Session in Group ROute: ", req.session.user);
    let { name, users } = reqBody;
    assertIsValuedString(name, "Group name");
    assertNonEmptyArray(users, "Users");

    const groupPresent = await groupsData.getGroupByName(name);
    // console.log("GROUP PResent", groupPresent);
    i++;
    // console.log("Counter:", i);
    if (groupPresent) {
      throw new ValidationError(`Group already exists.`);
    }

    const userId = users[0]._id;

    const user = await usersData.getByObjectId(userId);
    if (!user) {
      throw new HttpError(`No user found`, 404);
    }

    if (user.groupId) {
      throw new ValidationError(`User already in another group`, 400);
    }

    const newGroup = await groupsData.createGroup(reqBody);
    // console.log(newGroup);
    // req.session.user = users[0];

    req.session.user.groupId = newGroup._id;
    res.status(200).json(newGroup);
  } catch (e) {
    // console.log(e);
    res.status(400).json({ error: e });
  }
});

//Get all groups
router.get("/", async (req, res) => {
  try {
    // console.log(req.session.user);
    const allGroups = await groupsData.getAllGroups();

    return res.status(200).json(allGroups);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

// Get group by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log("group", id);
  try {
    assertObjectIdString(id, "Group ID");
    const result = await groupsData.getGroup(id);

    if (!result) {
      throw new HttpError(`Could not get group for group id:${id}`, 404);
    }
    // console.log("Group with ID: ", result);
    res.status(200).json(result);
  } catch (e) {
    // console.log(e);
    res.status(400).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  req.session.user = req.body;
  let id = req.params.id;
  let user = req.session.user;
  // console.log("session User in group's PUT req:", user);
  try {
    // below Lines Commented by Dhruveel
    // assertRequiredObject(reqBody);
    // let user = reqBody;

    const group = await groupsData.getGroup(id);

    if (!group) {
      throw new HttpError(`Could not get group for group id: ${id}`, 404);
    }

    const isUserPresent = await usersData.getByObjectId(user._id);

    if (!isUserPresent) {
      throw new HttpError(`Could not get user for user id: ${user._id}`, 404);
    }

    assertIsValuedString(user.uid, "User ID");
    assertIsValuedString(user.name, "User name");
    assertEmailString(user.email, "Email");

    if (user.groupId) {
      throw new ValidationError(`User already in another group`, 404);
    }

    user.groupId = id;
    usersData.updateUser(user._id, user);

    const users = group.users;
    users.push(user);
    group.users = users;

    const updatedGroup = await groupsData.updateGroup(id, group);
    // console.log(updatedGroup);
    res.status(200).json(updatedGroup);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.post("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(req.body);
    req.session.user = req.body;

    let user = req.session.user;
    // console.log(user);

    assertObjectIdString(id);

    const group = await groupsData.getGroup(id);

    if (!group) {
      throw new HttpError(`Could not get group for group id: ${id}`, 404);
    }

    let isUserPresent = await usersData.getByObjectId(user._id);

    if (!isUserPresent) {
      throw new HttpError(`Could not get user for user id: ${user._id}`, 404);
    }

    const isClothPresent = await basketsData.getClothFromBasketByUserId(
      user._id
    );
    if (isClothPresent) {
      throw new HttpError(
        `Please remove all the clothes from basket to exit out from the group`
      );
    }

    user.groupId = null;
    await usersData.updateUser(user._id, user);

    let users = group.users;
    users = users.filter((el) => el._id !== user._id);
    group.users = users;
    req.session.user = user;
    const updatedGroup = await groupsData.updateGroup(id, group);
    // console.log(updatedGroup);
    res.status(200).json(updatedGroup);
  } catch (e) {
    // console.log(e);
    res.status(400).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
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
