"use strict";

const axios = require("axios");

const {
  db,
  models: { User, Product },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      username: "codyw@paint.com",
      password: "123",
      firstName: "Cody",
      lastName: "Williams",
      isAdmin: true,
    }),
    User.create({
      username: "maryd@hello.com",
      password: "123",
      firstName: "Mary",
      lastName: "Doe",
    }),
  ]);

  console.log(`seeded ${users.length} users`);

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

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      mary: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
