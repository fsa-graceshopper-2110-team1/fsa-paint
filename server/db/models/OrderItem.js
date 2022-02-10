const db = require("../db");
const { INTEGER } = db.Sequelize.DataTypes;

const OrderItem = db.define("orderItem", {
  quantity: {
    type: INTEGER,
  },
});

module.exports = OrderItem;
