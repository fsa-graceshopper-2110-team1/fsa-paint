const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const html_colors = path.join(__dirname, "html_colors.csv");
const {
  models: { Product },
} = require("../../server/db");

async function importHtmlColors(colors) {
  try {
    const parser = fs.createReadStream(html_colors).pipe(
      parse({
        skip_empty_lines: true,
        columns: true,
      })
    );

    for await (const row of parser) {
      let color = {
        name: row.htmlColorName,
        hexCode: row.hexCode,
        category: row.colorGroup,
      };
      colors.push(color);
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function productSeed() {
  try {
    const colors = [];
    await importHtmlColors(colors);
    console.log(`CSV read! ${colors.length} records`);

    function getRandomNum(min, max, dec) {
      return (Math.random() * (max - min) + min).toFixed(dec); //The maximum is exclusive and the minimum is inclusive
    }

    const products = await Promise.all(
      colors.map((color) =>
        Product.create({
          name: color.name,
          hexCode: color.hexCode,
          category: color.category,
          price: getRandomNum(1, 100, 2),
          quantity: getRandomNum(1, 100, 0),
        })
      )
    );

    console.log(`seeded ${products.length} products`);
  } catch (err) {
    console.log(err);
  }
}

module.exports = productSeed;
