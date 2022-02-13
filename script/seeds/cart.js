const {
  models: { Cart, CartItem },
} = require("../../server/db");

async function cartSeed() {
  const carts = await Promise.all([
    Cart.create({
      userId: 1,
    }),
    Cart.create({
      userId: 2,
    }),
  ]);
  const cartItems = await Promise.all([
    CartItem.create({
      cartId: carts[0].id,
      productId: 2,
    }),
    CartItem.create({
      cartId: carts[0].id,
      productId: 10,
    }),
    CartItem.create({
      cartId: carts[0].id,
      productId: 10,
    }),
    CartItem.create({
      cartId: carts[0].id,
      productId: 13,
    }),
  ]);

  console.log(`seeded ${carts.length} carts, ${cartItems.length} cartItems`);

  return [carts, cartItems];
}

module.exports = cartSeed;
