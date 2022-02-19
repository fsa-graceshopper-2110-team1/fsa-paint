const db = require("../db");
const { INTEGER, ENUM } = db.Sequelize.DataTypes;

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
});

module.exports = Order;
