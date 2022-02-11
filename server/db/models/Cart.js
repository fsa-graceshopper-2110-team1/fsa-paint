const db = require("../db");
const { DECIMAL } = db.Sequelize.DataTypes;

const Cart = db.define("cart", {
  total: {
    type: DECIMAL,
    defaultValue: 0,
    get() {
      const value = this.getDataValue("total");
      return value === null ? null : parseFloat(value);
    },
  },
});

module.exports = Cart;

//Hooks

//Class Methods

//Instance Methods
