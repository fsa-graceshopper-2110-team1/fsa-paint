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
      include: ["orderItems"],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

// GET /api/orders/user/:id -- all orders for a user
router.get("/user/:id", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.id },
      order: ["id", "DESC"],
      include: ["orderItems"],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders {body: userId, cartId, shippingAddress}
router.post("/", async (req, res, next) => {
  try {
    let order = await Order.create(req.body);
    // creating an order also generates order items for all cart items
    // adding each orderitem also updates the total price
    let cart = await Cart.findByPk(req.body.cartId);
    const orderItems = await OrderItem.generateOrderItems(cart, order);
    order = await Order.findOne({
      where: { id: order.id },
      include: ["orderItems"],
    });
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

// PUT /api/orders/:id/status {status}
router.put("/:id/status", async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.id);
    order.update({ status: req.body });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
