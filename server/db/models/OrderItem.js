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
    orderItem.update({ price: product.price });
  } catch (err) {
    console.log(err);
  }
});

//class methods
OrderItem.generateOrderItems = async function (cart, order) {
  let items = await cart.getCartItems();

  const orderItems = await Promise.all(
    items.map((item) => {
      return OrderItem.create({
        orderId: order.id,
        productId: item.productId,
      });
    })
  );

  //update order total with sum order item prices
  const oiTotal = orderItems.reduce((acc, oi) => acc + oi.price, 0);
  order = await order.update({ total: oiTotal });

  return orderItems;
};

module.exports = OrderItem;
