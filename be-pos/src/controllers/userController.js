import pool from "../config/db.js";
import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";



// const USERS = [
//   {
//     id: 1,
//     name: "Gilss",
//     email: "agil@gmail.com",
//     password: "12345678",
//   },
//   {
//     id: 2,
//     name: "Romi",
//     email: "romi@gmail.com",
//     password: "12345678",
//   },
//   {
//     id: 3,
//     name: "Poki",
//     email: "poki@gmail.com",
//     password: "12345678",
//   },
// ]

//CRUD (CREATE, READ, UPDATE, DELETE)

//read
export const getAllUser = async(req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
      orderBy: {
        id: "desc"
      },
    })
    //const [rows] = await pool.query("SELECT id, name, email, is_active FROM users")
    return res.status(200).json({
      status: true,
      message: "Fetch user success",
      total: users.length,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed Fetch user",
      error: error.message,
    });
  }
}

export const getUserById = async(req, res) => {

  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: { id: id }
    })
    // const [user] = await pool.query("SELECT id, name, email, is_active FROM users WHERE id=?", [id]);

    // const rows = user[0];
    // if(!rows) {
    //   res.status(404).json({
    //     status: false,
    //     message: "User Not Found",
    //   });
    // }

    res.status(200).json({
        status: true,
        message: "User Found!",
        data: user,
      });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed!",
      error: error.message,
    });
  }
}

//create
export const createUser = async(req, res) => {
  const {name, email, password} = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashpassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })
    // const [user] = await pool.query("INSERT INTO users(name, email, password) VALUES (?,?,?)", [name, email, password]);
      return res.status(201).json({
        status: true,
        message: "Create Success!",
        data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Create Failed!",
      error: error.message,
    });
  }
}
  
  // const newUser = {
  //   id: USERS.length > 0 ? USERS[USERS.length - 1].id + 1 : 1,
  //   name,
  //   email, 
  //   password,

  // }
  // USERS.push(newUser);
  // //201 : status utk produk/nama baru
  // return res.status(201).json({
  //   status: true,
  //   message: "Create Success!",
  //   data: USERS,
  // })
  

//update
export const updateUser = async(req, res) => {
  const id = parseInt(req.params.id);
  const {name, email, password, is_active} = req.body;

  try {
  const dataUpdate = {}
  if(name) dataUpdate.name = name;
  if(email) dataUpdate.email = email;
  if(password) {
    dataUpdate.password = await bcrypt.hash(password, 10);
  } 
    
  const user = await prisma.user.update({
    where: {id: id},
    data: dataUpdate,
    select : {
      id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true,
      },
    })
    // if (!password) {
    //   await pool.query("UPDATE users SET name=?, email=?, is_active=? WHERE id=?", [name, email, is_active, id])
    // }else {
    //   await pool.query("UPDATE users SET name=?, email=?, password=?, is_active=? WHERE id=?", [name, email, password, is_active, id])
    // }
    return res.status(200).json({
      status: true,
      message: "Update Success!",
      data: user
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Update Failed!",
      error: error.message,
    });
  }

  // const userIndex = USERS.find((u) => u.id === id);
  // USERS[userIndex] = {
  //   ...USERS[userIndex],
  //   ...USERS[name && {name}],
  //   ...USERS[email && {email}],
  //   ...USERS[password && {password}],

  // }
}

//delete

export const deleteUser = async(req, res) => {
  const id = parseInt(req.params.id);
  // const userIndex = USERS.find((u) => u.id === id);
  try {
    // const user untuk memanggil data yang akan di delete, tetapi tidak perlu juga gapapa
    const user = await prisma.user.delete({
      where: { id: id },
    })
    // const [user] = await pool.query("DELETE FROM users WHERE id=?", [id])
    if(user.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "user not foundd!",
      })
    }
    // const deletedUser = USERS.splice(user, 1)[0];
    return res.status(200).json({
        status: true,
        message: "Delete Success!",
        data: user
      })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "DELETE Failed!",
      error: error.message,
    });
  }
   
}