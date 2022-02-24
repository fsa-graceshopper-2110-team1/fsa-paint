const router = require("express").Router();
const {
  models: { Order, Cart, OrderItem, User },
} = require("../db");
module.exports = router;

// GET /api/orders
router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: ["id"],
      include: ["orderItems", { model: User, attributes: ["email"] }],
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

// GET /api/orders/latest
router.get("/user/:id/latest", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: { userId: req.params.id },
      order: [["createdAt", "DESC"]], //finds latest
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
      order: [["id", "DESC"]],
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

    let items = await cart.getCartItems();
    const products = await Promise.all(items.map((item) => item.getProduct()));

    const prodQtty = products.reduce((acc, prod) => {
      if (!acc[prod.id]) acc[prod.id] = prod.quantity;
      return acc;
    }, {});

    const itemQtty = items.reduce((acc, item) => {
      acc[item.productId] ? acc[item.productId]++ : (acc[item.productId] = 1);
      return acc;
    }, {});

    Object.keys(itemQtty).forEach((prod) => {
      if (itemQtty[prod] > prodQtty[prod]) {
        const error = Error(`Product ${prod} is out of stock!`);
        error.status = 401;
        throw error;
      } else {
        console.log("ok");
      }
    });

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
