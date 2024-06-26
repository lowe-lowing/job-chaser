import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker"; // https://fakerjs.dev/
// const { PrismaClient } = require("@prisma/client");
// const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

// Based on this schema
// script seed.ts in package.json
//"seed": "ts-node prisma/seed.ts"

async function main() {
  // Skapa användare
  const userPromises = Array.from({ length: 20 }).map(() => {
    return prisma.user.create({
      data: {
        name: faker.internet.displayName(),
        email: faker.internet.email(),
        password: "qwe",
      },
    });
  });

  const users = await Promise.all(userPromises);

  // Skapa inlägg för varje användare
  for (const user of users) {
    const postPromises = Array.from({ length: 5 }).map(() => {
      return prisma.jobPost.create({
        data: {
          title: faker.lorem.sentence(3),
          company: faker.company.name(),
          description: faker.lorem.paragraphs(3), // Begränsa innehållet till 3 stycken
          location: faker.location.city(),
          salary: parseInt(faker.finance.amount({ min: 1000, max: 5000 })),
          userId: user.id,
        },
      });
    });
    const posts = await Promise.all(postPromises);
    for (const post of posts) {
      const applicationPrimises = Array.from({
        length: Math.floor(Math.random() * 10) + 1,
      }).map(() => {
        const randomUser = users[Math.floor(Math.random() * 10) + 1];
        return prisma.jobApplication.create({
          data: {
            coverLetter: faker.lorem.paragraphs(3),
            jobPostId: post.id,
            userId: randomUser.id,
          },
        });
      });
      await Promise.all(applicationPrimises);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
