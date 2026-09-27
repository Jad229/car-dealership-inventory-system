import { query } from "../db/index.js";

export const createCustomer = async (req, res) => {
  const { name, email, phone } = req.body; // e.g {name = "John Doe", email = "john.doe@example.com", phone = "1234567890"}

  try {
    const sql = `INSERT INTO customers (name, email, phone) VALUES ($1, $2, $3) RETURNING customer_id, name, email, phone`;
    const customerResult = await query(sql, [name, email, phone]);
    res.status(201).json(customerResult.rows);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Could not create customer", error });
  }
};
