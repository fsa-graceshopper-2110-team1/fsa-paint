const db = require("../db");
const { INTEGER, DECIMAL } = db.Sequelize.DataTypes;

const OrderItem = db.define("orderItem", {
  price: {
    type: DECIMAL,
    get() {
      const value = this.getDataValue("price");
      return value === null ? null : parseFloat(value);
    },
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
