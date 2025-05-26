"use strict";

const {
  db,
  models: { User, Step, Food, Sleep },
} = require("../server/db");

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

async function seed() {
  await db.sync({ force: true });
  console.log("🔄 db synced");

  // 👤 Create 2 users
  const [alice, bob] = await Promise.all([
    User.create({
      username: "Alice",
      email: "alice@example.com",
      password: "123",
    }),
    User.create({ username: "Bob", email: "bob@example.com", password: "123" }),
  ]);

  const users = [alice, bob];

  // 🗓 Create 5 days of data per user
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const date = daysAgo(i);
      await Step.create({
        date,
        value: Math.floor(4000 + Math.random() * 6000),
        userId: user.id,
      });

      await Food.create({
        date,
        healthy: ["poor", "average", "good"][Math.floor(Math.random() * 3)],
        portion: ["poor", "average", "good"][Math.floor(Math.random() * 3)],
        userId: user.id,
      });

      await Sleep.create({
        date,
        quality: ["poor", "average", "good"][Math.floor(Math.random() * 3)],
        time: Math.floor(5 + Math.random() * 3), // e.g. 5–8 hours
        userId: user.id,
      });
    }
  }

  console.log(`✅ Seeded 2 users and 5 days of sleep/food/steps data each`);
}

async function runSeed() {
  console.log("🌱 seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("🔌 closing db connection");
    await db.close();
    console.log("✅ db connection closed");
  }
}

if (module === require.main) {
  runSeed();
}

module.exports = seed;
