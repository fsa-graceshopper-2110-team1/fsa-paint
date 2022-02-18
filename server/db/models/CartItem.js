const db = require("../db");
const { INTEGER } = db.Sequelize.DataTypes;

const CartItem = db.define("cartItem", {
  // price: {
  //   type: INTEGER,
  // },
});

//Hooks
// CartItem.beforeCreate(async (cartItem) => {
//   try {
//     const [product, cart] = await Promise.all([
//       cartItem.getProduct(),
//       cartItem.getCart(),
//     ]);
//     cartItem.price = product.price;
//     await cart.increment({ total: product.price });
//   } catch (err) {
//     console.log(err);
//   }
// });

//Class Methods

//Instance Methods

module.exports = CartItem;
