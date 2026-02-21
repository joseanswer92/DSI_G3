import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seed (según tu schema actual: solo IDs + relaciones)');

  // Limpieza en orden por FK / tabla puente
  await prisma.postCategory.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();
  await prisma.tenant.deleteMany();

  // 1) Tenant
  const tenant = await prisma.tenant.create({ data: {} });

  // 2) Users
  const user1 = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      profile: { create: {} },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      profile: { create: {} },
    },
  });

  // 3) Categories
  const cat1 = await prisma.category.create({ data: {} });
  const cat2 = await prisma.category.create({ data: {} });

  // 4) Post
  const post = await prisma.post.create({ data: {} });

  // 5) N-N PostCategory
  await prisma.postCategory.createMany({
    data: [
      { postId: post.id, categoryId: cat1.id },
      { postId: post.id, categoryId: cat2.id },
    ],
  });

  console.log('✅ Seed listo');
  console.log({
    tenantId: tenant.id,
    userIds: [user1.id, user2.id],
    categoryIds: [cat1.id, cat2.id],
    postId: post.id,
  });
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });