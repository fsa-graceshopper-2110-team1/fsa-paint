const router = require("express").Router();
const {
  models: { CartItem, Cart },
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

// POST /api/cartItems/ {body: cartId, productId, quantity}
router.post("/", async (req, res, next) => {
  try {
    const itemsToAdd = new Array(req.body.quantity).fill("").map((i) => {
      return { cartId: req.body.cartId, productId: req.body.productId };
    });
    const cartItems = await Promise.all(
      itemsToAdd.map((i) => CartItem.create(i))
    );
    // const cartItem = await CartItem.create(req.body);
    res.send(cartItems);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cartItems/removeOne/:cartId/:productId
router.delete("/removeOne/:cartId/:productId", async (req, res, next) => {
  try {
    //deletes all cart items for a product in the cart
    const cartItem = await CartItem.findOne({
      where: { cartId: req.params.cartId, productId: req.params.productId },
    });
    // const cart = await cartItem.getCart();
    // await cart.decrement("total", { by: cartItem.price });
    await cartItem.destroy();

    res.send(cartItem);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/cartItems/removeProduct/:cartId/:productId
router.delete("/removeProduct/:cartId/:productId", async (req, res, next) => {
  try {
    //deletes all cart items for a product in the cart
    const cartItems = await CartItem.findAll({
      where: { cartId: req.params.cartId, productId: req.params.productId },
    });

    // const totalDelete = cartItems.reduce((acc, ci) => acc + ci.price, 0);
    // const cart = await Cart.findByPk(req.params.cartId);
    // await cart.decrement("total", { by: totalDelete });

    await Promise.all(cartItems.map((cartItem) => cartItem.destroy()));

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
