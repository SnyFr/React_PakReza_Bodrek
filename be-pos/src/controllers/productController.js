import pool from "../config/db.js";

export const getAllProduct = async(req, res) => {
  try {
    const [rows] = await pool.query("SELECT product.*, categories.name AS cat_name FROM product LEFT JOIN categories ON product.category_id = categories.id")
    return res.status(200).json({
      status: true,
      message: "Products are deployed!!",
      total: rows.length,
      data: rows,
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed Fetch Product!!",
      error: error.message,
    })
  }
}

export const getProdById = async(req, res) => {
  
  const id = parseInt(req.params.id);
  try {
    const [product] = await pool.query("SELECT id, name, price, stock  FROM product WHERE id=?", [id]);
  
    const rows = product[0]
    if(!rows) {
      res.status(404).json ({
        status: false,
        message: "product not found!!",
      })
    }
    res.status(200).json({
          status: true,
          message: "product Found!",
          data: product,
        });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Failed to get product!!",
      error: error.message,
    });
  }
}

export const createProd = async(req, res) => {
  const {category_id, name, price, stock, description} = req.body
  try {
    if (!name) {
      return res.status(400).json({
        status: false,
        message: "Name required"
      })
    }
    const [user] = await pool.query("INSERT INTO product(category_id, name, price, stock, description) VALUES (?,?,?,?,?)", [category_id, name, price, stock, description]);
    return res.status(201).json({
      status:true,
      message: "Create Product Success!",
      data: {id: user.insertId, category_id, name, stock, price, description}
    })
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        status: false,
        message: "Product name already exists!",
      });
    }
    return res.status(500).json({
      status: false,
      message: "Create Failed!",
      error: error.message,
    });
  }
}

export const updateProd = async(req, res) => {
  const id = parseInt(req.params.id);
  const {category_id, name, price, stock, description} = req.body;
  try {
    const [user] = await pool.query("UPDATE product SET category_id=?, name=?, price=?, stock=?, description=? WHERE id=?", [category_id, name, price, stock, description, id])
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

export const deleteProd = async(req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [user] = await pool.query("DELETE FROM product WHERE id=?", [id])
    if(user.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: "Product not foundd!",
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
      message: "Delete Product Failed!",
      error: error.message,
    });
  }
   
}