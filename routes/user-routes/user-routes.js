const router = require("express").Router();
const { User } = require("../../db/models");

// Lists down all users
router.get("/", (req, res) => {
  User.findAll().then(userList => {
    res.send(userList);
  });
});

// Get a user with given id
router.get("/:id", (req, res) => {
  const user_id = Number(req.params.id);
  // res.send(userId);
  User.findOne({
    where: {
      user_id: user_id
    }
  }).then(user => {
    res.send(user);
  });
});

// Create a user
router.post("/create", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  User.create({
    firstName: firstName,
    lastName: lastName,
    password: password
  }).then(user => {
    res.send(user);
  });
});

module.exports = router;
