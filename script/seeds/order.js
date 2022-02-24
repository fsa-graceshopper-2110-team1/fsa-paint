const {
  models: { Order, OrderItem, Cart },
} = require("../../server/db");

async function orderSeed() {
  let orders = await Promise.all([
    Order.create({
      userId: 2,
    }),
    Order.create({
      userId: 1,
    }),
    Order.create({
      userId: 2,
    }),
  ]);

  const carts = await Promise.all([
    Cart.findOne({
      where: { userId: 1 },
    }),
    Cart.findOne({
      where: { userId: 2 },
    }),
  ]);

  const [orderItems1, orderItems2, orderItems3] = await Promise.all([
    OrderItem.generateOrderItems(carts[0], orders[0]),
    OrderItem.generateOrderItems(carts[1], orders[1]),
    OrderItem.generateOrderItems(carts[0], orders[2]),
  ]);

  const orderItems = [...orderItems1, ...orderItems2, ...orderItems3];

  console.log(
    `seeded ${orders.length} orders, ${orderItems.length} orderItems`
  );

  return [orders];
}

module.exports = orderSeed;
