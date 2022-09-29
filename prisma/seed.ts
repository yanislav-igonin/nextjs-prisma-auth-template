import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const HASH_ROUNDS = 12;
const usersSeedCount = 1000;

const main = async () => {
  const password = await bcrypt.hash('1234qwerA_', HASH_ROUNDS);
  await prisma.user.create({
    data: {
      email: 'admin@admin.com',
      password,
    },
  });
  for (let i = 0; i < usersSeedCount; i++) {
    await prisma.user.create({
      data: {
        email: `seed${i}@user.com`,
        password,
      },
    });
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
