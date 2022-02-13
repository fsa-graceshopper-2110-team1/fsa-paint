const db = require("../db");
const { INTEGER } = db.Sequelize.DataTypes;

const OrderItem = db.define("orderItem", {
  price: {
    type: INTEGER,
  },
});

//hooks

//updates inventory for created orders -- TODO: may need to move this over to order and make it based on status confirmed so we dont decrease inventory from failed orders
OrderItem.beforeCreate(async (orderItem) => {
  try {
    const product = await orderItem.getProduct();
    product.quantity = product.quantity - 1;
  } catch (err) {
    console.log(err);
  }
});

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
