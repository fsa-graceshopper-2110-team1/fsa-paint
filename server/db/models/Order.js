const db = require("../db");
const { DECIMAL, ENUM } = db.Sequelize.DataTypes;

const status = ["confirmed", "pending", "failed"];

const Order = db.define("order", {
  total: {
    type: DECIMAL,
    defaultValue: 0,
    get() {
      const value = this.getDataValue("total");
      return value === null ? null : parseFloat(value);
    },
  },
  status: {
    type: ENUM(status),
    defaultValue: "pending",
  },
});

//class methods
Order.generateOrder = async function (cart) {
  const order = await Order.create({
    userId: cart.userId,
    total: cart.total,
    status: "pending",
  });
  return order;
};

module.exports = Order;
