const {
  models: { User },
} = require("../../server/db");

async function userSeed() {
  // Creating Users
  const users = await Promise.all([
    User.create({
      id: 1,
      username: "cody@paint.com",
      password: "123",
      firstName: "Cody",
      lastName: "Williams",
      isAdmin: true,
    }),
    User.create({
      id: 2,
      username: "mary@hello.com",
      password: "123",
      firstName: "Mary",
      lastName: "Doe",
    }),
    User.create({
      id: 3,
      username: "john@hello.com",
      password: "123",
      firstName: "John",
      lastName: "Brennan",
    }),
  ]);

  console.log(`seeded ${users.length} users`);

  return users;
}

module.exports = userSeed;