import pool from "../config/db.js";
import snap  from "../config/midtrans.js";

export const createTransaction = async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { user_id, payment_method, items, pay = 0 } = req.body;
    const userId = req.user?.id;

    // const isMidTrans = payment_method === "1" || payment_method === "midtrans"
    
    let change = 0;
    let cashReceive = 0;
    let status = "pending";

    if (!user_id || payment_method === undefined || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Data request tidak valid.' });
    }

    // A. Hitung Subtotal & Siapkan Item Details
    let subtotal = 0;
    const itemDetailsForMidtrans = [];
    const orderItemsToInsert = [];

    for (const item of items) {
      const [rows] = await connection.query(
        'SELECT id, name, price, stock FROM product WHERE id = ? AND is_active = 1',
        [item.product_id]
      );

      if (rows.length === 0) {
        throw new Error(`Produk ID ${item.product_id} tidak ditemukan/tidak aktif.`);
      }

      const product = rows[0];

      if (product.stock < item.qty) {
        throw new Error(`Stok ${product.name} tidak mencukupi.`);
      }

      subtotal += product.price * item.qty;

      orderItemsToInsert.push({
        product_id: product.id,
        qty: item.qty,
        price: product.price
      });

      itemDetailsForMidtrans.push({
        id: String(product.id),
        price: product.price,
        quantity: item.qty,
        name: product.name.substring(0, 50)
      });
    }

    // Hitung Pajak (misal 10%) & Total
    const tax = Math.round(subtotal * 0.1);
    const total = subtotal + tax;

    // Format order_number
    const orderNumber = await generateOrderNumber(connection);
    console.log(req.user)
    console.log("order number :", orderNumber)

    // B. Insert ke tabel orders (payment_method disimpan angka 1 / 2)
    const [orderResult] = await connection.query(
      `INSERT INTO orders (order_number, user_id, payment_method, subtotal, tax, total, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [orderNumber, user_id, payment_method, subtotal, tax, total]
    );

    const orderId = orderResult.insertId;

    // C. Insert ke order_details
    for (const detail of orderItemsToInsert) {
      await connection.query(
        `INSERT INTO order_details (order_id, product_id, qty, price)
         VALUES (?, ?, ?, ?)`,
        [orderId, detail.product_id, detail.qty, detail.price]
      );
    }

    // D. Ambil User untuk Midtrans Customer Details
    const [userRows] = await connection.query('SELECT name, email FROM users WHERE id = ?', [userId]);
    const user = userRows[0] || { name: 'Customer', email: 'customer@example.com' };

    let snapToken = null;
    let snapRedirectUrl = null;

    // Jika payment_method == 1 (QRIS via Midtrans), generate Snap Transaction
    if (Number(payment_method) === 1) {
      const parameter = {
        transaction_details: {
          order_id: orderNumber,
          gross_amount: total
        },
        item_details: [
          ...itemDetailsForMidtrans,
          { id: 'TAX-10', price: tax, quantity: 1, name: 'Tax (10%)' }
        ],
        customer_details: {
          first_name: user.name,
          email: user.email
        },
        // Opsional: batasi payment channel Midtrans khusus QRIS (Gopay/QRIS)
        enabled_payments: ['gopay']
      };

      const snapResponse = await snap.createTransaction(parameter);
      snapToken = snapResponse.token;
      snapRedirectUrl = snapResponse.redirect_url;

      // Update Snap Token & Redirect URL di orders
      await connection.query(
        `UPDATE orders SET snap_token = ?, snap_redirect_url = ? WHERE id = ?`,
        [snapToken, snapRedirectUrl, orderId]
      );
    } else if (Number(payment_method) === 2) {
      // Jika Cash / Tunai, status langsung settlement / dikelola manual di kasir
      await connection.query(`UPDATE orders SET status = 'settlement' WHERE id = ?`, [orderId]); 
      cashReceive = Number(pay)
      if(cashReceive < Number(total)) {
        await connection.rollback()
        return res.status(400).json({
          status: false,
          message: "The cash is less than the total..",
        })
      }
      change = cashReceive - Number(total);
      status = "settlement";

    }

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: 'Transaksi berhasil dibuat',
      data: {
        order_id: orderId,
        orderNumber,
        user_id,
        payment_method,
        subtotal,
        total,
        tax,
        status: Number(payment_method) === 1 ? 'Order berhasil, silahkan bayar dengan gopay' : 'payment cash berhasil',
        payment_details: payment_method === 2 ? 
        {
          cashReceive: cashReceive,
          change: change,
        } : null,
        snap_token: snapToken,
        snap_redirect_url: snapRedirectUrl
      }
    });
  } catch (error) {
    await connection.rollback();
    return res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

export const getAllTransaction = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT
        orders.id,
        orders.order_number,
        orders.payment_method,
        order_details.product_id,
        product.name
        FROM orders
        LEFT JOIN order_details ON orders.id = order_details.order_id
        LEFT JOIN product ON order_details.product_id = product.id ORDER BY orders.id DESC`
    );
    return res.status(200).json({ success: true, data: rows });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const generateOrderNumber = async(connection) => {

  //TR-19102026-001
  const now = new Date();
  const year = now.getFullYear()
  const month = now.getMonth()
  const date = now.getDate()
  const prefix = `TR-${year}${month}${date}-`

  //query buat manggil connection
  const [lastOrder] = await connection.query("SELECT order_number FROM orders WHERE order_number LIKE ? ORDER BY id DESC LIMIT 1 FOR UPDATE", [`${prefix}`]);

  let nextNumber = 1;
  if(lastOrder.length > 0) {
    const lastNumber = lastOrder[0].order_number;
    const currentNumber = parseInt(lastNumber.split("-")[2], 10)
    if(!isNaN(currentNumber)) {
      nextNumber = currentNumber + 1;
    }
  }
  return `${prefix}${String(nextNumber).padStart(4, "0")}`
}