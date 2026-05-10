import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import "dotenv/config";
import pkg from '../../prisma/generated/prisma-client/index.js';
const { PrismaClient } = pkg;

neonConfig.webSocketConstructor = ws;

// In Prisma 7, pass the connection string directly to the adapter
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("CRITICAL: DATABASE_URL is missing from .env");
}

// Simplified adapter instantiation
const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({ adapter });

export default prisma;