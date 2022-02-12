const db = require("../db");
const { INTEGER } = db.Sequelize.DataTypes;

const Cart = db.define("cart", {
  total: {
    type: INTEGER,
    defaultValue: 0,
  },
});

module.exports = Cart;

//Hooks

//Class Methods

//Instance Methods
