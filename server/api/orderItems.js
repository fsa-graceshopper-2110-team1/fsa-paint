const router = require("express").Router();
const {
  models: { OrderItem },
} = require("../db");
module.exports = router;

// GET /api/orderItems/
router.get("/", async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      order: ["id"],
    });
    res.json(orderItems);
  } catch (err) {
    next(err);
  }
});

// GET /api/orderItems/:id
router.get("/:id", async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      where: { id: req.params.id },
      order: ["id"],
    });
    res.json(orderItems);
  } catch (err) {
    next(err);
  }
});
