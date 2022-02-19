const db = require("../db");
const { INTEGER, ENUM, TEXT } = db.Sequelize.DataTypes;

const status = ["created", "pending", "confirmed", "compeleted", "failed"];

const Order = db.define("order", {
  total: {
    type: INTEGER,
    defaultValue: 0,
  },
  status: {
    type: ENUM(status),
    defaultValue: "created",
  },
  shippingAddress: {
    type: TEXT,
  },
});

module.exports = Order;
