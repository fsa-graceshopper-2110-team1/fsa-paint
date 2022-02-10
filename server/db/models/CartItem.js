const db = require("../db");
const { INTEGER } = db.Sequelize.DataTypes;

const CartItem = db.define("cartItem", {
  quantity: {
    type: INTEGER,
  },
});

module.exports = CartItem;
