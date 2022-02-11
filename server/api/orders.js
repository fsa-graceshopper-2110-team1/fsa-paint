const router = require("express").Router();
const {
  models: { Order, Cart, OrderItem },
} = require("../db");
module.exports = router;

// GET /api/orders
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

// GET /api/orders/:id
router.get("/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id },
      order: ["id"],
      include: ["orderItems"],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders {body: userId}
router.post("/", async (req, res, next) => {
  try {
    const order = await Order.create({ userId: req.body.userId });
    const cart = await Cart.findOne({ where: { userId: req.body.userId } });
    await OrderItem.generateOrderItems(cart, order);
    res.json(order);
  } catch (err) {
    next(err);
  }
});
