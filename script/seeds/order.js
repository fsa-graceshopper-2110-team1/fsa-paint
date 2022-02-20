const {
  models: { Order, OrderItem, Cart },
} = require("../../server/db");

const axios = require("axios");

async function orderSeed() {
  let orders = await Promise.all([
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

  const [orderItems1, orderItems2] = await Promise.all([
    OrderItem.generateOrderItems(carts[0], orders[0]),
    OrderItem.generateOrderItems(carts[1], orders[1]),
  ]);

  const orderItems = [...orderItems1, ...orderItems2];

  console.log(
    `seeded ${orders.length} orders, ${orderItems.length} orderItems`
  );

  return [orders];
}

module.exports = orderSeed;
