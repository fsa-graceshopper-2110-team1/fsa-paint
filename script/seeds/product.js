const axios = require("axios");

const {
  models: { Product },
} = require("../../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function productSeed() {
  // Creating Products
  const BLUE_HEX = "24B1E0";
  const RED_HEX = "E60E0E";
  const YELLOW_HEX = "F2E70A";
  const GREEN_HEX = "0AF229";
  const COUNT = 10;
  //hex.value (hex.clean excludes #)
  //name.value
  //image.bare

  let [blues, reds, yellows, greens] = await Promise.all([
    axios.get(
      `https://www.thecolorapi.com/scheme?hex=${BLUE_HEX}&count=${COUNT}`
    ),
    axios.get(
      `https://www.thecolorapi.com/scheme?hex=${RED_HEX}&count=${COUNT}`
    ),
    axios.get(
      `https://www.thecolorapi.com/scheme?hex=${YELLOW_HEX}&count=${COUNT}`
    ),
    axios.get(
      `https://www.thecolorapi.com/scheme?hex=${GREEN_HEX}&count=${COUNT}`
    ),
  ]);

  blues = blues.data.colors.map((color) => {
    return {
      hex: color.hex.value,
      name: color.name.value,
      image: color.image.bare,
      category: "blue",
    };
  });

  reds = reds.data.colors.map((color) => {
    return {
      hex: color.hex.value,
      name: color.name.value,
      image: color.image.bare,
      category: "red",
    };
  });

  greens = greens.data.colors.map((color) => {
    return {
      hex: color.hex.value,
      name: color.name.value,
      image: color.image.bare,
      category: "green",
    };
  });

  yellows = yellows.data.colors.map((color) => {
    return {
      hex: color.hex.value,
      name: color.name.value,
      image: color.image.bare,
      category: "yellow",
    };
  });

  const colors = [...blues, ...greens, ...reds, ...yellows];

  function getRandomNum(min, max, dec) {
    return (Math.random() * (max - min) + min).toFixed(dec); //The maximum is exclusive and the minimum is inclusive
  }

  const products = await Promise.all(
    colors.map((color) =>
      Product.create({
        name: `${color.name} ${color.hex}`,
        hexCode: color.hex,
        imageUrl: color.image,
        category: color.category,
        price: getRandomNum(1, 100, 2),
        quantity: getRandomNum(1, 100, 0),
        finish: "matte",
      })
    )
  );

  console.log(`seeded ${products.length} products`);
}

module.exports = productSeed;
