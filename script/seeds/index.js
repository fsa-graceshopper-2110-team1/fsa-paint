const userSeed = require("./user");
const productSeed = require("./product");
const cartSeed = require("./cart");
const orderSeed = require("./order");

const {
  db,
  models: { Cart, Order, OrderItem },
} = require("../../server/db");

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  const [users, products] = await Promise.all([userSeed(), productSeed()]);

  const [carts, cartItems] = await cartSeed();

  const [orders, orderItems] = await orderSeed();

  //TESTING CLASS METHODS FOR COVERTING CART TO ORDER
  // const cart = await Cart.findByPk(1);
  // const newOrder = await Order.generateOrder(cart);
  // const newOIs = await OrderItem.generateOrderItems(cart, newOrder);

  console.log(`
  
  
            seeded successfully
            
            
  `);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
