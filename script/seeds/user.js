const {
  models: { User },
} = require("../../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function userSeed() {
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

  //   return {
  //     users: {
  //       cody: users[0],
  //       mary: users[1],
  //     },
  //   };
}

module.exports = userSeed;
