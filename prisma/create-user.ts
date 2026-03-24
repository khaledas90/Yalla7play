import { PrismaClient, Role } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env") });

const connectionString = process.env.DATABASE_URL || "";

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const email = process.env.NEW_ADMIN_EMAIL || "admin@yalla7play.com";
const password = process.env.NEW_ADMIN_PASSWORD || "Adminyalla7play@123456";
const roleInput = process.env.NEW_ADMIN_ROLE || "SUPER_ADMIN";
const role = roleInput === "SUPER_ADMIN" ? Role.SUPER_ADMIN : Role.ADMIN;

async function createPrismaClient() {
  const url = new URL(connectionString);
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: parseInt(url.port, 10) || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    connectionLimit: 10,
    connectTimeout: 30000,
    acquireTimeout: 30000,
    allowPublicKeyRetrieval: true,
  });

  return new PrismaClient({ adapter });
}

async function main() {
  const prisma = await createPrismaClient();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: {
        password: hashedPassword,
        role,
      },
      create: {
        email,
        password: hashedPassword,
        role,
      },
    });

    console.log("User is ready:");
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
    console.log(`Password: ${password}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  console.error("Failed to create user:", error);
  process.exit(1);
});
