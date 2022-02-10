//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const Cart = require("./models/Cart");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const OrderItem = require("./models/OrderItem");

//model associations
User.hasOne(Cart);
User.hasMany(Order);
Order.belongsTo(User);
Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
CartItem.belongsTo(Product);
Product.hasMany(CartItem);
OrderItem.belongsTo(Product);
Product.hasMany(OrderItem);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItem,
    Order,
    OrderItem,
  },
};
