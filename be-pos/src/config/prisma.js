import { PrismaClient } from "../generated/prisma/client.ts";
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import "dotenv/config"

const connectionString = process.env.DATABASE_URL;

if (!connectionString) throw new Error("ERRRRRRRRRRRRRRRRRRRRR");

const adapter = new PrismaMariaDb(connectionString)
const prisma = new PrismaClient({
    adapter: adapter
})

export default prisma;