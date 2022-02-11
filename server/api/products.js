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

// GET /api/products/categories
router.get("/categories", async (req, res, next) => {
  try {
    let categories = await Product.findAll({
      order: ["category"],
      attributes: ["category"],
    });
    categories = [...new Set(categories.map((cat) => cat.category))];
    res.send(categories);
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
