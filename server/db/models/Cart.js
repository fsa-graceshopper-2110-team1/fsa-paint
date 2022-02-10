const db = require("../db");
const { DECIMAL } = db.Sequelize.DataTypes;

const Cart = db.define("cart", {
  total: {
    type: DECIMAL,
  },
});

module.exports = Cart;
