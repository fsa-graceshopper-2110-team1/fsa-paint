const db = require("../db");
const { STRING, DECIMAL, INTEGER, TEXT, ENUM } = db.Sequelize.DataTypes;

// const CATEGORIES = ["blue", "red", "green", "yellow", "other"];

const FINISHES = ["matte", "glossy"];

const Product = db.define("product", {
  name: {
    type: STRING,
    // unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  hexCode: {
    type: STRING,
    allowNull: false,
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    get() {
      const value = this.getDataValue("price");
      return value === null ? null : parseFloat(value);
    },
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  description: {
    type: TEXT,
  },
  category: {
    type: STRING,
  },
});

module.exports = Product;
