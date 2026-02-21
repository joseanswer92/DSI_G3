// seed.ts (o deed.ts)
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";  // ← nombre correcto de la clase

// Para SQLite local, usa file:./ruta/a/tu/base.db
// Ejemplo común: file:./prisma/dev.db
const connectionString = process.env.DATABASE_URL || "file:./prisma/dev.db";

// Instancia del adapter
const adapter = new PrismaBetterSqlite3({
  url: connectionString,
});

const prisma = new PrismaClient({
  adapter,  // ← obligatorio en Prisma 7
  // log: ['query', 'info', 'warn', 'error'], // opcional para debug
});

async function main() {
  console.log("Seeding...");

  const tenant = await prisma.tenant.create({
    data: { name: "Tenant 1" },
  });

  await prisma.user.create({
    data: {
      email: "admin@test.com",
      password: "123456",  // ¡Hashea esto en producción!
      role: "ADMIN",
      tenantId: tenant.id,
    },
  });

  console.log("Seed completo");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error en el seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });