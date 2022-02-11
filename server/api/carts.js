const router = require("express").Router();
const {
  models: { Cart, CartItem },
} = require("../db");
module.exports = router;

// GET /api/carts/
router.get("/", async (req, res, next) => {
  try {
    const carts = await Cart.findAll({ order: ["id"], include: ["cartItems"] });
    res.json(carts);
  } catch (err) {
    next(err);
  }
});

// GET /api/carts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { id: req.params.id },
      order: ["id"],
      include: ["cartItems"],
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// POST /api/carts {body: userId}
router.post("/", async (req, res, next) => {
  try {
    const cart = await Cart.create(req.body);
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/carts/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const cart = await Cart.findByPk(req.params.id);
    cart.destroy();

    //deleting a cart also deletes all cartItems associated with it
    const cartItems = await Cart.findAll({ where: { cartId: req.params.id } });
    cartItems.map((cartItem) => cartItem.destroy());

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
