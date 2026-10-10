import pool from "../config/db.js";

// all data cat
export const getAllCat = async(req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY id")
    return res.status(200).json({
      status: true,
      message: "Categories are deployed!!",
      total: rows.length,
      data: rows,
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed Fetch Categories!!",
      error: error.message,
    })
  }
}

//get data cat by id
export const getCatById = async(req, res) => {
  
  const id = parseInt(req.params.id);
  try {
    const [user] = await pool.query("SELECT id, name FROM categories WHERE id=?", [id]);
  
    const rows = user[0]
    if(!rows) {
      res.status(404).json ({
        status: false,
        message: "Categories not found!!",
      })
    }
    res.status(200).json({
          status: true,
          message: "Categories Found!",
          data: user,
        });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get Categories!!",
      error: error.message,
    });
  }
}

export const createCat = async(req, res) => {
  const {name} = req.body
  try {
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Name required"
      })
    }
    const [user] = await pool.query("INSERT INTO categories(name) VALUES (?)", [name]);
    return res.status(201).json({
      status:true,
      message: "Create Cat Success!",
      data: {id: user.insertId, name}
    })
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: false,
        message: "Category name already exists!",
      });
    }
    return res.status(500).json({
      status: false,
      message: "Create Failed!",
      error: error.message,
    });
  }
}

export const updateCat = async(req, res) => {
  const id = parseInt(req.params.id);
  const {name} = req.body;
  try {
    const [user] = await pool.query("UPDATE categories SET name=? WHERE id=?", [name, id])
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
}

export const deleteCat = async(req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [user] = await pool.query("DELETE FROM categories WHERE id=?", [id])
    if(user.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Category not foundd!",
      })
    }
    return res.status(200).json({
        status: true,
        message: "Delete Success!",
        data: user
      })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Delete Category Failed!",
      error: error.message,
    });
  }
   
}

