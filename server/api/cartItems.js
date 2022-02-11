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

// GET /api/cartItems/:id
router.get("/:id", async (req, res, next) => {
  try {
    const cartItem = await CartItem.findByPk(req.params.id);
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});

// POST /api/cartItems/ {body: userId, cartId}
router.post("/", async (req, res, next) => {
  try {
    const cartItem = await CartItem.create(req.body);
    res.json(cartItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cartItems/:cartId/:productId
router.delete("/:id", async (req, res, next) => {
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
