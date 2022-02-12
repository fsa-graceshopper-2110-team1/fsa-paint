const db = require("../db");
const { STRING, DECIMAL, INTEGER, TEXT, ENUM } = db.Sequelize.DataTypes;

const status = ["active", "inactive"];

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
  status: {
    type: ENUM(status),
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = Product;
