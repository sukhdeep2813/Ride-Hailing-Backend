import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import "dotenv/config";
import pkg from '../../prisma/generated/prisma-client/index.js';
const { PrismaClient } = pkg;

neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DataBase_URL;
const pool = new Pool({
  connectionString: process.env.DataBase_URL,
});

const adapter = new PrismaNeon(pool);

const prisma = new PrismaClient({
  adapter,
});

export default prisma;
