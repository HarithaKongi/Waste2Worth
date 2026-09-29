import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Plastic", pricePerKg: 20, description: "Bottles, containers and clean recyclable plastics." },
    { name: "Paper", pricePerKg: 12, description: "Newspapers, cardboard and recyclable paper." },
    { name: "Metal", pricePerKg: 45, description: "Aluminium, steel and other recyclable metals." },
    { name: "E-Waste", pricePerKg: 80, description: "Small electronic items and components." },
    { name: "Organic", pricePerKg: 8, description: "Organic waste suitable for responsible processing." }
  ];

  for (const category of categories) {
    await prisma.wasteCategory.upsert({
      where: { name: category.name },
      update: category,
      create: category
    });
  }

  const adminPassword = await bcrypt.hash("Admin@12345", 12);
  await prisma.user.upsert({
    where: { email: "admin@waste2worth.local" },
    update: {},
    create: {
      name: "Waste2Worth Admin",
      email: "admin@waste2worth.local",
      passwordHash: adminPassword,
      role: UserRole.ADMIN
    }
  });

  console.log("Seed complete.");
  console.log("Demo admin: admin@waste2worth.local / Admin@12345");
}

main().finally(() => prisma.$disconnect());
