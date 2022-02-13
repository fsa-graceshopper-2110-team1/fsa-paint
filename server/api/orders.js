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
    // creating an order includes a hook that copies all cart info into the order; only userId needed;
    const order = await Order.create({ userId: req.body.userId });
    const cart = await Cart.findOne({ where: { userId: req.body.userId } });
    // creating an order also generates order items for all cart items
    await OrderItem.generateOrderItems(cart, order);
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id {order}
router.put("/:id", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    //updating the entire user to be able to use this route to update any property
    order.update(req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
