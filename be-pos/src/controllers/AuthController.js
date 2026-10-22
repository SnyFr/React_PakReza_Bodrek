import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


import pool from "../config/db.js";

//bikin data dummy
// const USERS = [
//   {
//     nama: "gilss",
//     email: "agil@gmail.com",
//     password: "12345678",
//   }
// ]

export const login = async(req, res) => {
  const {email, password} = req.body; //cara ngambil lewat destruct

  if(!email || !password) {
    res.status(400).json({
      //status angka depan 4, 5, 2
      //400 : bad responser (browser)
      //500 : server error (server/database)
      //200 : success
      status: false,
      message: "Email atau password required"})
  }
  //find()
  // const user = USERS.find((u) => u.email === email && u.password === password)
  const [user] = await pool.query("SELECT id, name, email, password FROM users WHERE email =?", [email])
  //email harus unik

  if(user.length === 0) {
    return res.status(401).json({
      status: false,
      message: "Invalid!",
    })
  }

  const dataUser = user[0];
  const isMatch = await bcrypt.compare (password, dataUser.password);

  if (!isMatch) {
    return res.status(401).json({
      status: false,
      message: "Email atau password gagal",
    }) //401: unauthorized/login gagal
  }

  const token = jwt.sign(
  {
    id: dataUser.id,
    name: dataUser.name,
    email: dataUser.email,
  },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPRIES_IN || '1d' }
);

  res.status(200).json ({
    status: true,
    message: `Welcome, ${dataUser.name}!!`,
    data: {
      user: {
        id: dataUser.id,
        name: dataUser.name,
        email: dataUser.email,
      },
      token,
    }
  })
}