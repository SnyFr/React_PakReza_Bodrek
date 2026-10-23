import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


import pool from "../config/db.js";
import prisma from "../config/prisma.js";

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
  try {
    const user = await prisma.user.findUnique({
      where: {email: email},
    })
    if(!user) {
      return res.status(401).json({
      status: false,
      message: "Invalid!",
    })
    }

    const isMatch = await bcrypt.compare (password, user.password);

    if (!isMatch) {
    return res.status(401).json({
      status: false,
      message: "Email atau password gagal",
    }) //401: unauthorized/login gagal
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPRIES_IN || '1d' },
    );

    res.status(200).json ({
      status: true,
      message: `Welcome, ${user.name}!!`,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      }
    });

  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal server error", error: error.message
    })
  }

  const me = async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: {id: userId},
        select: {
          id: true,
          name: true, 
          email: true, 
          created_at: true,
        }
      })
      return res.status(200).json({
        status: true,
        data: user,
      })
    } catch (error) {
      res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message,
    })
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
    },
  })
  }
}