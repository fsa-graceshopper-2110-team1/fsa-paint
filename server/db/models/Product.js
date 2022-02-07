const db = require("../db");
const { STRING, DECIMAL, INTEGER, TEXT, ENUM } = db.Sequelize.DataTypes;

const CATEGORIES = ["blue", "red", "green", "yellow", "other"];

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
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: STRING,
  },
  price: {
    type: DECIMAL,
    allowNull: false,
    validate: {
      notEmpty: true,
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
    type: ENUM(CATEGORIES),
    defaultValue: "other",
  },
  finish: {
    type: ENUM(FINISHES),
    allowNull: false,
  },
});

module.exports = Product;
