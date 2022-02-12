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

//hooks
Order.beforeCreate(async (order) => {
  try {
    const user = await order.getUser();
    const cart = await user.getCart();
    order.total = cart.total;
  } catch (err) {
    console.log(err);
  }
});

//class methods

module.exports = Order;
