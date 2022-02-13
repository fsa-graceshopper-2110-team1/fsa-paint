const db = require("../db");
const { INTEGER } = db.Sequelize.DataTypes;

const OrderItem = db.define("orderItem", {
  price: {
    type: INTEGER,
  },
});

//hooks

//class methods
OrderItem.generateOrderItems = async function (cart, order) {
  const items = await cart.getCartItems();
  const orderItems = await Promise.all(
    items.map((item) =>
      OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        price: item.price,
      })
    )
  );
  return orderItems;
};

module.exports = OrderItem;
