const {
  models: { Order, OrderItem },
} = require("../../server/db");

async function orderSeed() {
  const orders = await Promise.all([
    Order.create({
      userId: 1,
      status: "confirmed",
      total: 40.04,
    }),
    Order.create({
      userId: 2,
      status: "confirmed",
      total: 10.01,
    }),
  ]);
  const orderItems = await Promise.all([
    OrderItem.create({
      orderId: orders[0].id,
      productId: 4,
      price: 10.01,
    }),
    OrderItem.create({
      orderId: orders[0].id,
      productId: 45,
      price: 10.01,
    }),
    OrderItem.create({
      orderId: orders[0].id,
      productId: 23,
      price: 10.01,
    }),
    OrderItem.create({
      orderId: orders[0].id,
      productId: 23,
      price: 10.01,
    }),
    OrderItem.create({
      orderId: orders[1].id,
      productId: 2,
      price: 10.01,
    }),
  ]);

  console.log(
    `seeded ${orders.length} orders, ${orderItems.length} orderItems`
  );

  return [orders, orderItems];
}

module.exports = orderSeed;
