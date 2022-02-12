const db = require("../db");
const { STRING, DECIMAL, INTEGER, TEXT } = db.Sequelize.DataTypes;

const Product = db.define("product", {
  name: {
    type: STRING,
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
    type: INTEGER,
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
    type: STRING,
  },
});

module.exports = Product;
