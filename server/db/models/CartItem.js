const db = require("../db");
const { INTEGER, DECIMAL } = db.Sequelize.DataTypes;

const CartItem = db.define("cartItem", {
  price: {
    type: DECIMAL,
    get() {
      const value = this.getDataValue("price");
      return value === null ? null : parseFloat(value);
    },
  },
});

//Hooks
CartItem.beforeCreate(async (cartItem) => {
  try {
    const [product, cart] = await Promise.all([
      cartItem.getProduct(),
      cartItem.getCart(),
    ]);
    cartItem.price = product.price;
    await cart.increment({ total: product.price });
  } catch (err) {
    console.log(err);
  }
});

//Class Methods

//Instance Methods

module.exports = CartItem;
