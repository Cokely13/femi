"use strict";

const {
  db,
  models: { User, Step, Food, Sleep, Goal, GoalRating },
} = require("../server/db");

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0]; // Format: YYYY-MM-DD
};

const randomRating = () => Math.floor(1 + Math.random() * 10); // 1–10

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
    User.create({
      username: "Bob",
      email: "bob@example.com",
      password: "123",
    }),
  ]);

  const users = [alice, bob];

  // 🗓 Create 5 days of data per user
  for (const user of users) {
    for (let i = 0; i < 5; i++) {
      const date = daysAgo(i);

      await Step.create({
        date,
        value: Math.floor(4000 + Math.random() * 6000), // 4000–9999
        userId: user.id,
      });

      await Food.create({
        date,
        healthy: randomRating(), // 1–10
        portion: randomRating(), // 1–10
        userId: user.id,
      });

      await Sleep.create({
        date,
        quality: randomRating(), // 1–10
        time: Math.floor(5 + Math.random() * 3), // 5–7 hours
        userId: user.id,
      });
    }
  }
  await Promise.all([
    Goal.create({
      category: "Walking",
      targetMinutes: 60,
      frequency: "Daily",
      date: daysAgo(0),
      userId: alice.id,
    }),
    Goal.create({
      category: "App Development",
      targetMinutes: 120,
      frequency: "Weekdays",
      userId: bob.id,
    }),
    Goal.create({
      category: "Reading",
      targetMinutes: 45,
      frequency: "One-Time",
      date: daysAgo(2),
      userId: alice.id,
    }),
  ]);

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
