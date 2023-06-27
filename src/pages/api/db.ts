import { PrismaClient } from '@prisma/client';

// Declare a variable to hold the PrismaClient instance
let prisma: PrismaClient;

// Export a function to get the PrismaClient instance
export function getPrismaClient() {
  // Check if the PrismaClient instance already exists
  if (!prisma) {
    // Create a new PrismaClient instance with the database URL provided in the environment variable
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
  // Return the PrismaClient instance
  return prisma;
}

// Export the function as the default export
export default getPrismaClient;
