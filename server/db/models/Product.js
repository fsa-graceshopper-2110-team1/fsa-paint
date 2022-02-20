const db = require("../db");
const { STRING, DECIMAL, INTEGER, TEXT, BOOLEAN } = db.Sequelize.DataTypes;

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
    validate: {
      //errors out if an orderItem tries to get placed when it's out of stock
      //we should catch it on the FE before this hits but this is for backup
      min: 0,
    },
  },
  description: {
    type: TEXT,
  },
  category: {
    type: STRING,
  },
  status: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = Product;
