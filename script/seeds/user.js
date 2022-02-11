const {
  models: { User },
} = require("../../server/db");

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

  return users;
}

module.exports = userSeed;
