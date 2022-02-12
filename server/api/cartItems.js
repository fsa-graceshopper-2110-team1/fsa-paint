const router = require("express").Router();
const {
  models: { CartItem },
} = require("../db");
module.exports = router;

// GET /api/cartItems/
router.get("/", async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      order: ["id"],
    });
    res.json(cartItems);
  } catch (err) {
    next(err);
  }
});

// GET /api/cartItems/cart/:id -- all cart items for a cart
router.get("/cart/:id", async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      where: { cartId: req.params.id },
    });
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// POST /api/cartItems/ {body: cartId, productId}
router.post("/", async (req, res, next) => {
  try {
    const cartItem = await CartItem.create(req.body);
    res.send(cartItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cartItems/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    cartItem.destroy();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cartItems/:cartId/:productId
router.delete("/cartItems/:cartId/:productId", async (req, res, next) => {
  try {
    //deletes all cart items for a product in the cart
    const cartItems = await Cart.findAll({
      where: { cartId: req.params.cartId, productId: req.params.productId },
    });
    cartItems.map((cartItem) => cartItem.destroy());

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
