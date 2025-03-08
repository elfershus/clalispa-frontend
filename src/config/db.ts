// src/config/db.ts

import prisma from '../lib/prisma';

export const initializeDatabase = async (): Promise<void> => {
  try {
    // Test the connection by running a simple query
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

export default { initializeDatabase };