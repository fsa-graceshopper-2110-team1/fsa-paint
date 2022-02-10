const db = require("../db");
const { DECIMAL, ENUM } = db.Sequelize.DataTypes;

const status = ["confirmed", "pending", "failed"];

const Order = db.define("order", {
  total: {
    type: DECIMAL,
  },
  status: {
    type: ENUM(status),
  },
});

module.exports = Order;
