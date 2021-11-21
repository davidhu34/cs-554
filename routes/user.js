const { Router } = require("express");
const router = Router();
const usersData = require("../data/user");

const {
    assertIsValuedString,
    assertRequiredObject,
    assertEmailString,
    assertNonEmptyArray,
  } = require("../utils/assertion");
const { QueryError, ValidationError, HttpError } = require("../utils/errors");

//add user
router.post("/", async (req, res) => {
    try {
      const reqBody = req.body; 
      console.log(req.body);
      assertRequiredObject(reqBody);

      let { uid, displayName, email, createdAt = new Date().getTime() } = reqBody;
      assertIsValuedString(uid, "User ID");
      assertIsValuedString(displayName, "User name");
      assertEmailString(email, "Email");
      const userPresent = await usersData.getUser(uid);

      if (userPresent) {
        throw new ValidationError(`User already exists.`);
      }

      const newUser = await usersData.createUser(reqBody);
      res.status(200).json(newUser);

    } catch (e) {
        res.status(400).json({ error: e });
    }
});

router.put('/:id', async(req, res) => {    
    console.log(req.body);

    
});

//Get all users
router.get("/all", async (req, res) => {
    try {
      const allUsers = await usersData.getAllUsers();

      return res.status(200).json(allUsers);
    } catch (e) {
      res.status(400).json({ error: e });
    }
});

module.exports = router;
  