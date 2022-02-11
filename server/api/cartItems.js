const router = require("express").Router();
const {
  models: { CartItem },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      order: ["id"],
      include: ["cart"],
    });
    res.json(cartItems);
  } catch (err) {
    next(err);
  }
});
