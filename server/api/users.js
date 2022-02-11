const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // do not include password (even though it's hashed, for extra protection since it's not needed by the FE)
      attributes: ["id", "username", "firstName", "lastName", "isAdmin"],
      order: [["id"]],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      // do not include password (even though it's hashed, for extra protection since it's not needed by the FE)
      attributes: ["id", "username", "firstName", "lastName", "isAdmin"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST /api/users
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //updating the entire user to be able to use this route to update any property
    user.update(req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
