const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

// GET /api/products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({ order: ["id"] });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/products
router.post("/", async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// PUT /api/products/:id
router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const updatedProduct = await product.update(req.body);
    res.json(updatedProduct);
  } catch (err) {
    next(err);
  }
});
