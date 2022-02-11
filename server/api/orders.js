const router = require("express").Router();
const {
  models: { Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: ["id"],
      include: ["orderItems"],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
