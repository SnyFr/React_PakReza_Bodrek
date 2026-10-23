import prisma from "../../src/config/prisma.js";
import bcrypt from "bcrypt";

export const userSeeder = async() => {
  const password = await bcrypt.hash("12345678", 10);
  //insert into
  await prisma.user.create({
    data: { 
      name: "Adminjudol",
      email: "adminjudol99@gmail.com",
      password: password,
    }
  })

  console.log("User Seed!")
}