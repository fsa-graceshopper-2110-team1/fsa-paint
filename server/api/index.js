const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/carts", require("./carts"));
router.use("/cartItems", require("./cartItems"));
router.use("/orders", require("./orders"));
router.use("/orderItems", require("./orderItems"));
router.use("/checkout", require('./checkout'))

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
