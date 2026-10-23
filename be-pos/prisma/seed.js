import prisma from "../src/config/prisma.js"
import { userSeeder } from "./seeder/userSeeder.js"

async function main () {
  //naro seeder disini
  await userSeeder();
}
main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async() => {
    await prisma.$disconnect()
  })