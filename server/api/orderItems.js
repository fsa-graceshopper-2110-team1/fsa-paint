const router = require("express").Router();
const {
  models: { OrderItem },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orderItems = await OrderItem.findAll({
      order: ["id"],
      include: ["orders"],
    });
    res.json(orderItems);
  } catch (err) {
    next(err);
  }
});
